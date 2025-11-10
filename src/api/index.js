import axios from 'axios';

// 替换为 Cloudflare Pages 的域名 + Functions 接口路径
const baseUrl = 'https://smart-city-alr.pages.dev';

export const getWuhanBuilding = () => {
  return axios.get(`${baseUrl}/api/wuhan_building`);
};

export const getWuhanRoad = () => {
  return axios.get(`${baseUrl}/api/wuhan_road`);
};

export const getWuhanBridge = () => {
  return axios.get(`${baseUrl}/api/wuhan_bridge`);
};

export const getWuhanEvents = () => {
  return axios.get(`${baseUrl}/api/wuhan_events`);
};
