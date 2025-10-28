module.exports = async function (context, req) {
  context.res = {
    status: 200,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json'
    },
    body: { ok: true, time: new Date().toISOString() }
  };
};
