/* eslint-disable no-undef */
//将geojson的数据整理到一起
const mockjs = require('mockjs')
const Wuhan_building = require('./src/assets/Wuhan_Buildings.json')
const Wuhan_road = require('./src/assets/Wuhan_roads.json')
const Wuhan_bridge = require('./src/assets/Wuhan_bridge.json')
const Wuhan_events = require('./src/assets/Wuhan_events.json')
module.exports = () => {
  return mockjs.mock({
    Wuhan_building,
    Wuhan_road,
    Wuhan_bridge,
    Wuhan_events,
  })
}
