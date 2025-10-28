const fetch = require('node-fetch');

module.exports = async function (context, req) {
  const text = (req.body && req.body.text) || '';
  if (!text || text.length < 3) {
    context.res = { status: 400, body: { error: 'text is required' } };
    return;
  }
  const endpoint = process.env.TEXT_ANALYTICS_ENDPOINT; // e.g., https://centralindia.api.cognitive.microsoft.com
  const key = process.env.TEXT_ANALYTICS_KEY;
  if (!endpoint || !key) {
    context.res = { status: 500, body: { error: 'Service not configured' } };
    return;
  }
  try {
    const url = `${endpoint.replace(/\/$/, '')}/text/analytics/v3.2/sentiment`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': key,
      },
      body: JSON.stringify({ documents: [{ id: '1', language: 'en', text }] }),
    });
    const json = await resp.json();
    if (!resp.ok) throw new Error(JSON.stringify(json));
    const doc = json.documents && json.documents[0];
    const sentiment = doc && doc.sentiment;
    const score = doc && doc.confidenceScores ? doc.confidenceScores[sentiment] : undefined;
    context.res = { status: 200, body: { sentiment, score } };
  } catch (err) {
    context.log('Sentiment error', err && err.message);
    context.res = { status: 500, body: { error: 'Analysis failed' } };
  }
};
