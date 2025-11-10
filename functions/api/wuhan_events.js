// functions/api/wuhan_events.js
export const onRequest = async () => {
  const eventsData = await import('../../src/assets/Wuhan_events.json', {
    assert: { type: 'json' }
  });
  return new Response(JSON.stringify(eventsData.default), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
};
