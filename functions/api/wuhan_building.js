// functions/api/wuhan_building.js
export const onRequest = async () => {
  // 导入本地 JSON 数据（注意路径要准确，相对于当前文件的位置）
  const buildingData = await import('../../src/assets/Wuhan_Buildings.json', {
    assert: { type: 'json' }
  });
  // 返回 JSON 响应，设置正确的 Content-Type
  return new Response(JSON.stringify(buildingData.default), {
    headers: {
      'Content-Type': 'application/json',
      // 可选：配置 CORS 允许前端跨域请求
      'Access-Control-Allow-Origin': '*'
    }
  });
};
