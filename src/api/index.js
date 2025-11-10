// src/api/index.js
import axios from 'axios';

// 创建 axios 实例（可选，用于统一配置请求头、超时等）
const request = axios.create({
  // 基础路径为空，因为静态文件在网站根目录下
  baseURL: '',
  // 设置超时时间（5秒）
  timeout: 5000,
  // 请求头配置（可选）
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器（可选，用于添加统一逻辑，如加载状态）
request.interceptors.request.use(
  (config) => {
    // 可在此处添加加载动画逻辑，例如：
    // store.dispatch('showLoading');
    return config;
  },
  (error) => {
    // 请求错误处理
    console.error('请求发送失败:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器（可选，用于统一处理响应）
request.interceptors.response.use(
  (response) => {
    // 可在此处关闭加载动画，例如：
    // store.dispatch('hideLoading');
    // 直接返回数据体（忽略响应头等信息）
    return response.data;
  },
  (error) => {
    // 响应错误处理
    console.error('请求响应失败:', error);
    // 可根据错误状态码提示不同信息
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.error('JSON文件不存在，请检查路径是否正确');
          break;
        case 500:
          console.error('服务器错误');
          break;
        default:
          console.error(`请求错误，状态码: ${error.response.status}`);
      }
    } else if (error.request) {
      console.error('无响应，请检查网络连接');
    }
    return Promise.reject(error);
  }
);

// 武汉建筑数据接口
export const getWuhanBuildings = () => {
  // 请求 public 目录下的 Wuhan_Buildings.json
  return request.get('/Wuhan_Buildings.json');
};

// 武汉道路数据接口
export const getWuhanRoads = () => {
  return request.get('/Wuhan_roads.json');
};

// 武汉桥梁数据接口（如果有）
export const getWuhanBridges = () => {
  return request.get('/Wuhan_bridge.json');
};

// 武汉事件数据接口（如果有）
export const getWuhanEvents = () => {
  return request.get('/Wuhan_events.json');
};

// 导出通用请求实例（供其他特殊请求使用）
export default request;
