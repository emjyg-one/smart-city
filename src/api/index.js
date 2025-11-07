import axios from 'axios'

export const getWuhanBuilding=()=>{
  return axios.get('http://localhost:3000/Wuhan_building')
}
export const getWuhanRoad=()=>{
  return axios.get('http://localhost:3000/Wuhan_road')
}
export const getWuhanBridge=()=>{
  return axios.get('http://localhost:3000/Wuhan_bridge')
}
export const getWuhanEvents=()=>{
  return axios.get('http://localhost:3000/Wuhan_events')
}
