import { atom } from 'jotai'

const VIDEO_OBJ = atom({}) //视频控件
const userData_atom = atom({}) //用户详情
const topCount_atom = atom(99) //模块下标
const moduleName_atom = atom("") //模块组件名
const mapObj_atom = atom({map1:null,map2:null}) //地图对象
const alarmModelList_atom = atom([]) //报警闪光模型合集
const videoMsg_atom = atom("") //视频播放失败时触发控件提示
const polygonList_atom = atom([]) //被点击的面
const alarmList_atom = atom([])
const allModels = atom([])

export {
  VIDEO_OBJ,
  userData_atom,
  topCount_atom,
  moduleName_atom,
  mapObj_atom,
  alarmModelList_atom,
  videoMsg_atom,
  polygonList_atom,
  alarmList_atom,
  allModels
}