import React, { useEffect } from 'react';
import { createMap, Model, Build } from '../../utils/map3d';
import { useAtom } from 'jotai';
import { mapObj_atom,allModels } from '../../jotai/store';
import { Common } from '../../utils/mapMethods';
import { cameraList_S, labelLists } from '../../api/commonApi';
import configjson from '../../api/get_configjson';
import { message } from 'antd'
import './style.scss';
import utils from '../../utils';

let viewer = null;

export const getViewer = () => viewer;

const MapViewer = (props) => {

  const [mapObj, setMapObj] = useAtom(mapObj_atom)
  const [, setAllModels] = useAtom(allModels)

  useEffect(() => {
    if (props.url) {
      createMapsss(props.url.split(":")[0])
    }
  }, [props.url])

  const createMapsss = (url) => {
    console.log(configjson.projectId,configjson.mapkey);
    createMap.createMap({
      // id: "mapvision3d",
      id: "mapv3dContainer",
      url: "http://192.168.0.118:19901/aimapvision3d",
      // url: "http://"+ url +":19901/aimapvision3d",
      // url :configjson.url,
      projectId: configjson.projectId,
      mapkey: configjson.mapkey
    }, (async (mapViewer) => {
      viewer = mapViewer;
      console.log(mapViewer, 'mapViewer');

      //保存全局地图对象
      setMapObj({ ...mapObj, map1: mapViewer })

      //初始化地图
      Build.allShow(mapViewer, true)
      
      await mapViewer.Clear()
      await mapViewer.Stop()
      await mapViewer.SetMouseCallback(null)

      //初始化模型加载
      const deviceTyp = ["10001", "10003"];
      var deviceList = [];
      let actions = [];
      deviceTyp.forEach(element => {
        const action = cameraList_S({ category_id: element }).then((res) => {
          deviceList.push.apply(deviceList, res.data)
        })
        actions.push(action);
      });
      setAllModels(deviceList)
      Promise.all(actions).then(() => {
        let modelResource = deviceList.map((data) => Common.createModelConfig(data))
        Common.batchedAddModelByViewer(mapViewer, modelResource, 50, (res) => {
          console.log("加载数量:",res);
        }, () => {
          //初始化位置
         // Common.initializationPosition(mapViewer);
          message.success('地图资源加载完成')


          // utils.getXiaoPingEntities(mapViewer, () => {
          //   createMap.closeClear(mapViewer);
    
          // utils.showPai(mapViewer, true);
    
          // });
    
        })
      })

    }))
  }

  return (
    <div id="mapv3dContainer" style={{ width: props.setWidth }}></div>
  )
}

export default MapViewer;