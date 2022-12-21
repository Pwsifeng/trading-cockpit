import React, { useEffect } from 'react';
import { createMap, Model, Build } from '../../utils/map3d';
import { useAtom } from 'jotai';
import { mapObj_atom } from '../../jotai/store';
import { Common } from '../../utils/mapMethods';
import { cameraList_S, labelLists } from '../../api/commonApi';
import configjson from '../../api/get_configjson';
import './style.scss';
// import * as mapv3d from 'tuyang-mapv3d'

const MapLight = (props) => {

  const [mapObj, setMapObj] = useAtom(mapObj_atom)

  useEffect(() => {
    if (props.url) { createMapsss(props.url) }
  }, [props.url])

  const createMapsss = (url) => {
    let obj = {
      id: "mapv3dContainer_light",
      url: configjson.url,
      projectId: configjson.projectId,
      mapkey: configjson.token,
      token: configjson.token
    }
    // console.log('obj', obj);

    var map_light = createMap.createMap(obj, (async () => {
      window.$mapLight = map_light
      setMapObj({ ...mapObj, map1: map_light })
      // console.log(url, configjson.projectId, configjson.token, '999');
      //初始化位置
      await (new Promise(resolve => {
        Common.initializationPosition(map_light)
        setTimeout(() => {
          resolve()
        }, 100)
      }))

      await (new Promise(resolve => {
        Build.allShow(map_light, true)
        setTimeout(() => {
          resolve()
        }, 100)
      }))
      let cameraList = await cameraList_S()
      var results = cameraList.data;

      await (new Promise(resolve => {
        map_light.Clear()
        setTimeout(() => {
          resolve()
        }, 100)
      }))
      map_light.Stop()
      Model.clearMouseCallBack(map_light)

      let modelResource = results.map(data => Common.createModelConfig(data))
      let iconResource = results.map(data => Common.createIconConfig(data))
      let moIcon = [...modelResource, ...iconResource]
      // console.log('添加模型', modelResource);
      await Common.batchedAddModel(map_light, moIcon, 10, res => {
      })

      // 隐藏室内
      // for (const iterator of modelResource) {
      //   await (new Promise(resolve => {
      //     map_light.UpdateObjectVisible(iterator.gid, iterator.indoor === false)
      //     setTimeout(() => {
      //       resolve()
      //     }, 20)
      //   }))
      // }

      // for (const iterator of iconResource) {
      //   await (new Promise(resolve => {
      //     map_light.UpdateObjectVisible(iterator.gid, iterator.indoor === false)
      //     setTimeout(() => {
      //       resolve()
      //     }, 20)
      //   }))
      // }
      map_light.Clear();
      for (let i = 0; i < moIcon.length; i += 20) {
        map_light.SetObjectsVisible(moIcon.slice(i, i + 20).map(x => {
          return { gid: x.gid, visible: x.indoor === false }
        }))
      }


      console.log('所有模型加载完毕!')
      await Model.getModel(map_light) // 附加一次点击事件

      // 创建文字标注
      labelLists().then(res => {
        if (res.msg === "success") {
          var res2Data = res.data;
          res2Data.forEach((element2, index2) => {
            var labelData = JSON.parse(element2.label_style.model)
            var labelPosition = labelData.location
            Model.labelLoading(map_light, {
              text: element2.label_name,
              attr: element2,
              location: {
                x: Common.filter(labelPosition.x),
                y: Common.filter(labelPosition.y),
                z: Common.filter(labelPosition.z),
                pitch: Common.filter(labelPosition.pitch),
                yaw: Common.filter(labelPosition.yaw),
                roll: Common.filter(labelPosition.roll)
              },
              fontcolor: labelData.fontcolor,
              fontsize: labelData.fontsize
            })
          })
        }
      })
    }))

    // var map_light
    // let viewer = new mapv3d.MapViewer({
    //   id: "mapv3dContainer_light",
    //   url: url,
    //   projectId: configjson.projectId,
    //   token: configjson.token,
    //   complete: () => {
    //     map_light = viewer.core.view3d
    //     setMapObj({ ...mapObj, map1: map_light })
    //     console.log(url, configjson.projectId, configjson.token, '999');
    //     //初始化位置
    //     setTimeout(() => {
    //       Common.initializationPosition(map_light)
    //     }, 0);

    //     Build.allShow(map_light, true)
    //     cameraList_S().then(res => {
    //       var results = res.data;

    //       map_light.Clear()
    //       map_light.Stop()
    //       Model.clearMouseCallBack(map_light)

    //       setTimeout(() => {
    //         // Common.addModel(0, results, map_light)
    //         let modelResource = results.map(data => Common.createModelConfig(data))

    //         Common.batchedAddModel(map_light, modelResource, 10, res => {
    //           console.log('所有模型加载完毕!')

    //           // 附加一次点击事件
    //           Model.getModel(map_light)
    //         })
    //       }, 100);
    //     })

    //     //创建文字标注
    //     labelLists().then(res => {
    //       if (res.msg === "success") {
    //         var res2Data = res.data;
    //         res2Data.forEach((element2, index2) => {
    //           var labelData = JSON.parse(element2.label_style.model)
    //           var labelPosition = labelData.location
    //           Model.labelLoading(map_light, {
    //             text: element2.label_name,
    //             attr: element2,
    //             location: {
    //               x: Common.filter(labelPosition.x),
    //               y: Common.filter(labelPosition.y),
    //               z: Common.filter(labelPosition.z),
    //               pitch: Common.filter(labelPosition.pitch),
    //               yaw: Common.filter(labelPosition.yaw),
    //               roll: Common.filter(labelPosition.roll)
    //             },
    //             fontcolor: labelData.fontcolor,
    //             fontsize: labelData.fontsize
    //           })
    //         })
    //       }
    //     })
    //   }
    // })
  }

  return (
    <div id="mapv3dContainer_light" style={{ width: props.setWidth }}></div>
  )
}

export default MapLight;