const crypto = require('crypto');

function validate(body) {
  const errs = {};
  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const message = (body.message || '').trim();
  if (!name) errs.name = 'Name is required';
  if (!email || !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) errs.email = 'Valid email is required';
  if (!message || message.length < 10) errs.message = 'Message must be at least 10 characters';
  return { errs, ok: Object.keys(errs).length === 0 };
}

module.exports = async function (context, req) {
  // Basic CORS
  context.res = context.res || {};
  const origin = req.headers.origin || '';
  const allowed = process.env.CORS_ORIGIN || '*';
  context.res.headers = {
    'Access-Control-Allow-Origin': allowed === '*' ? '*' : origin === allowed ? origin : allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
  };
  if (req.method === 'OPTIONS') { context.res.status = 204; return; }

  const body = req.body || {};
  const { ok, errs } = validate(body);
  if (!ok) {
    context.res = { status: 400, body: { error: 'Validation failed', fields: errs } };
    return;
  }

  const now = new Date().toISOString();
  const ua = (req.headers['user-agent'] || '').slice(0, 256);
  const ip = (req.headers['x-forwarded-for'] || req.headers['x-client-ip'] || req.headers['client-ip'] || '').split(',')[0].trim();
  const ipHash = ip ? crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16) : '';

  const doc = {
    id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
    name: body.name,
    email: body.email,
    phone: body.phone || '',
    message: body.message,
    createdAt: now,
    ipHash,
    ua,
    source: 'azure-function'
  };

  // Optional: persist to Cosmos DB if configured
  try {
    const endpoint = process.env.COSMOS_ENDPOINT;
    const key = process.env.COSMOS_KEY;
    const databaseId = process.env.COSMOS_DB || 'portfolio';
    const containerId = process.env.COSMOS_CONTAINER || 'messages';
    if (endpoint && key) {
      const { CosmosClient } = require('@azure/cosmos');
      const client = new CosmosClient({ endpoint, key });
      const { database } = await client.databases.createIfNotExists({ id: databaseId });
      const { container } = await database.containers.createIfNotExists({ id: containerId, partitionKey: { kind: 'Hash', paths: ['/email'] } });
      await container.items.create(doc);
    }
  } catch (err) {
    // log but do not fail request
    context.log('Cosmos write error', err && err.message);
  }

  context.res = { status: 200, body: { ok: true } };
};
