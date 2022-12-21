import { createMap, Event, Model } from './map3d';
import { locationList } from '../api/commonApi';

export const Common = {
  //格式化坐标
  filter(value) {
    return value ? parseInt(value) : 0;
  },
  //飞行定位
  // mapFly(map, data) {
  //   createMap.FlyToPosition(map, data)
  // },
  mapFly(map,pos) {
    createMap.FlyToPosition(map,pos)
  },
  mapFly2(map) {
    createMap.FlyToPosition(map, {
      x:"120.04886249842039",
      y:"28.86814413318265",
      z:"408.86733880819054",
      pitch: "49.59799575805664",
      yaw: "-92.25021362304688",
      roll: "0.00001580705247761216"
    })
  },
  //初始化地图位置
  initializationPosition(map3d,data) {
    console.log(data);
    Common.mapFly(map3d,data)
  },
  //初始化地图位置
  initializationPosition2(map3d) {
    var list={
      x:"120.04886249842039",
      y:"100.86814413318265",
      z:"408.86733880819054",
      pitch: "49.59799575805664",
      yaw: "-92.25021362304688",
      roll: "0.00001580705247761216"
    }
    Common.mapFly(map3d,list)
  },
  //往地图递归添加模型
  addModel(index, data, map3d) {
    if (data.length <= index) {
      return
    };
    if (data[index].model_name !== null && data[index].model_url !== null) {
      let position = data[index].list_style ? data[index].list_style : data[index].center
      Model.modelLoading(map3d, {
        gid: data[index].model_url,
        filename: data[index].model_name,
        attr: data[index],
        location: {
          x: Common.filter(position.x),
          y: Common.filter(position.y),
          z: Common.filter(position.z),
          pitch: Common.filter(position.pitch),
          yaw: Common.filter(position.yaw),
          roll: Common.filter(position.roll)
        }
      }, (msg) => {
        if (++index < data.length) {
          setTimeout(() => {
            Common.addModel(index, data, map3d);
            console.log('加载了第', index, '个模型')
          }, 0)
        } else {
          console.log('模型加载完毕')
          Model.getModel(map3d);
        }
      })
    } else {
      if (++index < data.length) {
        setTimeout(() => {
          Common.addModel(index, data, map3d);
          console.log('加载了第', index, '个模型')
        }, 0)
      } else {
        console.log('模型加载完毕')
        Model.getModel(map3d);
      }
    }
  },
  //往地图递归添加图标
  add_iconModel(index, data, map3d) {
    if (data.length === 0) {
      return;
    }
    let iccon = data[index].model_name + "_icon"
    if (data[index].model_name === null) {
      iccon = "menjin_icon"
    }
    if (data[index].model_name === 'renlian') {
      iccon = "renlianxiangji_icon"
    }
    Model.createIcon(map3d, {
      typeStyle: iccon,
      attr: data[index],
      location: {
        x: "120.04986363386824",
        y: "28.851933746953684",
        z: "104.32541485976205",
        // x: Common.filter(data[index].center.x),
        // y: Common.filter(data[index].center.y),
        // z: Common.filter(data[index].center.z),
        pitch: Common.filter(data[index].center.pitch),
        yaw: Common.filter(data[index].center.yaw),
        roll: Common.filter(data[index].center.roll)
      }
    }, (msg) => {
      if (++index < data.length) {
        setTimeout(() => {
          Common.add_iconModel(index, data, map3d)
        })
      } else {
        console.log('图标模型加载完毕')
        Model.getModel(map3d);
      }
    })
  },
  //导航地图效果清除
  navigationClose(map3d) {
    Model.closeIcon(map3d);
    Event.clearPatrolPath(map3d);
    Model.getModel(map3d);
  },

  createModelConfig(model) {
    let position = model.list_style ?model.list_style : model.center
    return {
      gid: model.model_url,
      type: 'model',
      filename: model.model_name,
      attr: model,
      location: {
        // x: Common.filter(position.x),
        // y: Common.filter(position.y),
        // z: Common.filter(position.z),
        // pitch: Common.filter(position.pitch),
        // yaw: Common.filter(position.yaw),
        // roll: Common.filter(position.roll)
        x:"120.04886249842039",
        y:"28.86814413318265",
        z:"408.86733880819054",
        pitch: "49.59799575805664",
        yaw: "-92.25021362304688",
        roll: "0.00001580705247761216"
      }
    }
  },

  /**
   * 批量添加模型
   * @param map   {Object}
   * @param source {Array}
   * @param size  {Number} 每次最多添加10个。不能再多。多了数据传输会失败。如果一次想添加很多(50, 100个)，
   *                       要自己定义attr属性的值，不要把整个接口返回的模型数据附加到 attr
   * @param cb    {Function}
   */
  batchedAddModel(map, source, size = 10, cb) {
    if (!Array.isArray(source)) {
      return
    }
    const sourceSize = source.length
    const addModel = (startOffset, endOffset = 0) => {
      const sourceSlice = source.slice(startOffset, endOffset)

      if (startOffset > sourceSize - 1) {
        setTimeout(() => {
          cb && cb()
        }, 0)
        return
      }

      // 注意,此功能为异步操作
      map.OverLayerCreateObjects(sourceSlice, res => {
        if (startOffset < sourceSize) {
          setTimeout(() => {
            addModel(endOffset, endOffset + size)
          }, size || 0)
        }
      })
    }

    addModel(0, size)
  },

  async batchedAddModelByViewer(viewer, source, size = 50, cb1, cb2) {
    if (!Array.isArray(source)) {
      return
    }
    for (let i = 0; i < source.length; i += size) {
      await viewer.OverLayerCreateObjects(source.slice(i, i + size))
      cb1 && cb1(i, i + size)
    }
    cb2 && cb2(source.length)
  },

  // 单个，递归的添加模型
  addModelSync(map, source, cb) {
    const size = source.length
    const addModel = (index) => {
      if (index >= size) {
        cb && cb()
        return
      }
      const model = source[index]
      map.OverLayerCreateObject(model, res => {
        console.log('add model success: ', index, '/', size)
        setTimeout(() => {
          addModel(++index)
        }, 20)
      })
    }

    addModel(0)
  },

  /**
   * 显示模型
   * @param map
   * @param modelList
   */
  showModels(map, modelList) {
    if (map) {
      modelList.forEach(model => {
        map.UpdateObjectVisible(model.gid, true)
      })
    }
  },

  /**
   * 隐藏模型
   * @param map
   * @param modelList
   */
  hideModels(map, modelList) {
    if (map) {
      modelList.forEach(model => {
        map.UpdateObjectVisible(model.gid, false)
      })
    }
  },

  /**
   * 更新模型
   * @param map
   * @param modelList
   */
  batchUpdateModel(map, modelList) {
    if (map) {
      modelList.forEach(model => {
        map.OverLayerUpdateObject(model)
      })
    }
  },

  batchUpdateModelVisible(map, modelList) {
    if (map) {
      modelList.forEach(model => {
        map.UpdateObjectVisible(model.gid, model.visible)
      })
    }
  },

  batchRemoveModel(map, modelList) {
    if (map) {
      modelList.forEach(model => {
        map.OverLayerRemoveObjectById(model.gid)
      })
    }
  }
}