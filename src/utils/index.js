/**
 * @Author: yangqixin
 * @TIME: 2022/11/16 11:12
 * @FILE: index.tsx
 * @Email: 958292256@qq.com
 * @Description:
 */

// 小品集合
let XP = [];

let gridEntities = [];

const utils = {
  getXP() {
    return XP;
  },

  showPai(view3d, visible) {
    utils.getPaiEntities(view3d, entities => {
      for (let entity of entities) {
        view3d.UpdateObjectVisible(entity.gid, visible);
      }
    });
  },

  getPaiEntities(viewer, cb) {
    utils.getEntities(viewer, "FX_", (entities) => {
      cb(entities.slice());
    });
  },

  getGridEntities: (viewer, cb) => {
    if (gridEntities.length > 0) {
      cb(gridEntities)
    }
    utils.getEntities(viewer, "WG", (entities) => {
      gridEntities = entities.slice();
      cb(gridEntities)
    })
  },

  getEntities: (view3d, prefix, cb) => {
    let container = []
    
    view3d.GetObjectsVisible(res => {
      for (let entity of res) {
        const gid = entity.gid;
        const match = gid.startsWith(prefix);
        if (match) {
          if (container) {
            container.push(entity);
          }
        }
      }
      cb && cb(container);
    })
    
  },

  getXiaoPingEntities: (view3d, cb, container) => {
    let xiaoPingPrefix = [
      'ChuangHu',
      "PointLight",
      // "WG_",
      // "FX_"
    ];

    view3d.GetObjectsVisible(res => {

      for (let entity of res) {
        const gid = entity.gid;
        const match = xiaoPingPrefix.find(prefix => gid.startsWith(prefix));
        if (match) {
          if (container) {
            container.push(entity);
          } else {
            XP.push(entity);
          }
        }
      }
      cb && cb(XP);
    });
  },

  setXiaoPingVisible(view3d, visible) {
    if (!view3d) {
      return;
    }
    // console.log('set visible: ', visible);
    XP.forEach((entity) => {
      view3d.UpdateObjectVisible(entity.gid, visible);
    });
  }
};


export default utils;
