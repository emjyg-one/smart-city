// functions/api/wuhan_road.js
export const onRequest = async () => {
  const roadData = await import('../../src/assets/Wuhan_roads.json', {
    assert: { type: 'json' }
  });
  return new Response(JSON.stringify(roadData.default), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
};
