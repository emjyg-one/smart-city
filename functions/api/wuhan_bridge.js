// functions/api/wuhan_bridge.js
export const onRequest = async () => {
  const bridgeData = await import('../../src/assets/Wuhan_bridge.json', {
    assert: { type: 'json' }
  });
  return new Response(JSON.stringify(bridgeData.default), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
};
