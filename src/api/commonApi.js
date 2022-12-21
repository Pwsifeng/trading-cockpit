import request from './http'
import configjson from './get_configjson'


/*-------------------------------------------------------------- Icc */
//获取视频地址
export function ICC_videoRtsp(params) {
  return request({
    url: `${configjson.Icc}/Rtsp`,
    data: params,
    method: 'POST'
  })
}

//获取回放视频地址
export function ICC_videoRtspBack(params) {
  return request({
    url: `${configjson.Icc}/BlackPlay`,
    data: params,
    method: 'POST'
  })
}

//获取大华设备在线量
export function ICC_DeviceCount(params) {
  return request({
    url: `${configjson.Icc}/DeviceCount`,
    data: params,
    method: 'POST'
  })
}

/*-------------------------------------------------------------- Url3 */

//设备数据统计
export function device_count(params) {
  return request({
      url: `${configjson.Url3}/device/device_count/list`,
      method: 'post',
      data: params
  })
}

/*-------------------------------------------------------------- Url */

//获取报警列表
export function eventInfoList(params) {
  return request({
      url: `${configjson.Url}/event/info/list`,
      method: 'post',
      data: params
  })
}

//报警统计
export function infoCount() {
  return request({
      url: `${configjson.Url}/event/info/count`,
      method: 'get'
  })
}

//登录
export function getLogin(params) {
  return request({
      url: `${configjson.Url}/sys/user/list`,
      method: 'post',
      data: params
  })
}

//获取平台配置
export function getConfig() {
  return request({
      url: `${configjson.Url}/sys/config/list`,
      method: 'get'
  })
}

//头部模块列表
export function layoutList(params) {
  return request({
      url: `${configjson.Url}/layout/config/list`,
      method: 'post',
      data: params
  })
}

// --->相机列表
export function infoList(params) {
  return request({
      url: `${configjson.Url}/device/info/list`,
      method: 'post',
      data: params
  })
}

//视频监控树
export function regionList(params) {
  return request({
      url: `${configjson.Url}/device/region/list`,
      method: 'post',
      data: params
  })
}

//七日报警
export function weekCount() {
  return request({
      url: `${configjson.Url}/event/info/week/count`,
      method: 'get'
  })
}

//所有的设备类型
export function categoryList() {
  return request({
      url: `${configjson.Url}/device/category/list`,
      method: 'get'
  })
}

//报警记录
export function infoInfoList(params) {
  return request({
      url: `${configjson.Url}/event/info/type/list`,
      method: 'post',
      data: params
  })
}

//确定忽略
export function infoUpdate(params) {
  return request({
      url: `${configjson.Url}/event/info/update`,
      method: 'post',
      data: params
  })
}

/*-------------------------------------------------------------- Url2 */

//根据字段模糊查询设备(非相机的设备)
export function deviceInfoSelectDeviceInfo(params) {
  return request({
      url: `${configjson.Url2}/device/info/SelectDeviceInfo`,
      method: 'post',
      data: params
  })
}

//根据字段模糊查询相机类设备
export function deviceCameraSelectDeviceInfo(params) {
  return request({
      url: `${configjson.Url2}/device/camera/SelectDeviceInfo`,
      method: 'post',
      data: params
  })
}

//查询设备属于哪个网格
export function cameraRegion(params) {
  return request({
      url: `${configjson.Url2}/camera/region`,
      method: 'post',
      data: params
  })
}

//巡逻路线
export function lineList() {
  return request({
      url: `${configjson.Url2}/patrol/line/list`,
      method: 'get',
  })
}

//get巡逻预案
export function PlanList() {
  return request({
      url: `${configjson.Url2}/patrol/plan/list`,
      method: 'get',
  })
}

//post巡逻预案
export function PlanList_p(params) {
  return request({
      url: `${configjson.Url2}/patrol/plan/list`,
      method: 'post',
      data: params
  })
}

//根据id查巡逻路线
export function lineAlllist(params) {
  return request({
      url: `${configjson.Url2}/patrol/line/alllist`,
      method: 'post',
      data: params
  })
}

//建筑id查建筑和楼层数据
export function labelList(params) {
  return request({
      url: `${configjson.Url2}/figure/label/listId`,
      method: 'post',
      data: params
  })
}

//查询黑白地图url配置
export function getConfig_L() {
  return request({
      url: `${configjson.Url2}/sys/config/list`,
      method: 'get'
  })
}

//获取所有建筑信息
export function buildList() {
  return request({
      url: `${configjson.Url2}/map/build/list`,
      method: 'get'
  })
}

//获取初始化位置接口
export function locationList() {
  return request({
      url: `${configjson.Url2}/init/location/list`,
      method: 'get'
  })
}

//查种类设备详情
export function infoListS(params) {
  return request({
      url: `${configjson.Url2}/device/info/listS`,
      method: 'post',
      data: params
  })
}

//查文字标注
export function labelLists() {
  return request({
      url: `${configjson.Url2}/figure/label/list`,
      method: 'get'
  })
}

//点线追查
export function traceDrag(params) {
  return request({
      url: `${configjson.Url2}/trace/drag`,
      method: 'post',
      data: params
  })
}

//查询漫游列表
export function roamflyList() {
  return request({
      url: `${configjson.Url2}/roam/fly/list`,
      method: 'get'
  })
}

//资源图谱相机计总
export function Cameratotal() {
  return request({
      url: `${configjson.Url2}/device/category/count`,
      method: 'get'
  })
}

//资源图谱树图
export function Treetotal(params){
  return request({
      url: `${configjson.Url2}/Resource/map`,
      method:'post',
      data: params
  })
}

//所有相机模型列表
export function cameraList_S(params) {
  return request({
      url: `${configjson.Url2}/device/camera/listS`,
      method: 'post',
      data: params
  })
}

//人脸应用  --->人脸库
export function businessFace(params) {
  return request({
      url: `${configjson.Url2}/business/selectFacebank`,
      method: 'post',
      data: params
  })
}

// --->历史轨迹查询
export function businessSearch(params) {
  return request({
      url: `${configjson.Url2}/business/SearchImg`,
      method: 'post',
      data: params
  })
}

//监区楼层查面坐标
export function roomList(params) {
  return request({
      url: `${configjson.Url2}/bed/room/list`,
      method: 'post',
      data: params
  })
}

//场景接口--->添加
export function locationAdd(params) {
  return request({
      url: `${configjson.Url2}/map/location/add`,
      method: 'post',
      data: params
  })
}

//--->删除
export function locationDelete(params) {
  return request({
      url: `${configjson.Url2}/map/location/delete`,
      method: 'post',
      data: params
  })
}

//--->修改
export function locationUpdate(params) {
  return request({
      url: `${configjson.Url2}/map/location/update`,
      method: 'post',
      data: params
  })
}

//--->查询
export function locationList_h() {
  return request({
      url: `${configjson.Url2}/map/location/list`,
      method: 'get'
  })
}

/*-------------------------------------------------------------- doorInterface */
//门禁控制
export function SPCC_doControl(params) {
  return request({
      url: `${configjson.doorInterface}/SPCC/doControl`,
      method: 'post',
      data: params
  })
}

//门禁状态
export function SPCC_DoorState(params) {
  return request({
      url: `${configjson.doorInterface}/SPCC/DoorState`,
      method: 'post',
      data: params
  })
}

//门禁进出记录
export function SPCC_DoorList(params) {
  return request({
      url: `${configjson.doorInterface}/SPCC/DoorList`,
      method: 'post',
      data: params
  })
}

//床位信息查询 -- 犯人列表
export function GKBedInformationRoom(params) {
  return request({
      url: `${configjson.doorInterface}/SPCC/GKBedInformationRoom`,
      method: 'post',
      data: params
  })
}

/*-------------------------------------------------------------- positionPerson */
//人员定位列表
export function GetPeopleInfo() {
  return request({
      url: `${configjson.positionPerson}/PS/GetPeopleInfo`,
      method: 'get'
  })
}

//历史轨迹查询
export function GetlocationPaths(params) {
  return request({
      url: `${configjson.positionPerson}/PS/locationPaths`,
      method: 'post',
      data: params
  })
}