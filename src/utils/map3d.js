import axios from "axios";
import utils from "../utils/index";
var createObj = null;
var Polygon = null;
var paopao = []; //气泡gid
var _enableRain = false;
var _enableSnow = false;
var _enableClouds = false;
var _enableSnowye = false;
var selectObj = null;

//创建地图类
export const createMap = {
    playSequence(view3d, id) {
        view3d.PlaySequence(id)
    },
    createMap(options, callback) {
        //创建实例
        /* global MapVision */
        var view3d = new MapVision.View3d({
            id: options.id,
            url: options.url,
            projectId: options.projectId,
            mapkey: options.mapkey
        });
        view3d.Open(res => {
            console.log("MapVision View3d " + res)
            createMap.closeWkWang(view3d);
            view3d.OverLayerRemoveAll();
            createObj = null;
            view3d.OverLayerStopEdit();
            view3d.SetNorthControl(false, 0, 0, 0.5);   //地图指北
            if (callback) {
                callback(view3d);
            }
        });
        //延迟执行
        setTimeout(function () {
            SetResolution(options, view3d);
        }, 500);
        window.onkeydown = function (event) {
            if (event.code === "F11") {
                setTimeout(function () {
                    SetResolution(options, view3d);
                }, 500);
            }
        }
        return view3d;
    },
    closeAll(view3d) {
        view3d.OverLayerRemoveAll();
    },
    //设置屏幕
    // SetResolution(id, view3d) {
    //     if (view3d) {
    //         var divObj = document.getElementById(id);
    //         if (!divObj) {
    //             alert("error");
    //             return;
    //         }
    //         var width = divObj.clientWidth;
    //         var height = divObj.clientHeight;
    //         view3d.SetResolution(width, height);
    //     }
    // },
    // 获取当前视角位置
    getCurrent(view3d, callback) {
        view3d.GetCurrentPosition(pos => {
            var strPos = JSON.stringify(pos);
            callback(strPos)
        })
    },

    getMousePosition(view3d, callback) {
        view3d.SetMousePositionCallback((res) => {
            let data = {
                switchName: 'MousePosition',
                Personnel: res
            }
            window.parent.postMessage(data, '*')
            if (callback) {
                callback(res)
            }
        })
    },
    //返回初始位置
    initialPosition(view3d) {
        view3d.ResetHome();
    },
    eanbleKeyboard(view3d) {
        if (view3d) {
            view3d.enableKeyboard = false;
            view3d.enableMouse = true;
        }
    },
    //飞到位置点
    FlyToPosition(view3d, pos) {
        console.log(pos);
        if (!view3d) {
            return;
        }
        view3d.FlyToPosition(pos);
        Model.getModel(view3d);
    },
    flawto(view3d, location) {
        const pos = {
            x: location.x,
            y: location.y,
            z: location.z,
            pitch: 0, // 俯仰角 0——90度
            yaw: location.yaw, // 偏航角 0-360度
            roll: 0 // 翻滚角
        };

        view3d.FlyToPosition(pos);
    },
    // 根据id查找对象
    findObjectById(view3d, gid, callback) {
        // 注意,此功能为异步操作
        // FindObjectByName  同  FindObjectById  一样功能
        view3d.FindObjectById(gid, res => {
            if (callback) {
                callback(res);
            }
        });
    },
    // 删除所有外壳炫光----呼和浩特定制
    closeWkWang(view3d) {
        for (let i = 0; i <= 22; i++) {
            Model.showModel(view3d, "FW_V001_JZ00" + (i < 10 ? "0" + i : i) + "_WK", false);
        }
    },

    // closeWkWangTwo(view3d) {
    //     console.log("111")
    //     Model.showModel(view3d, "FW_V001_JZ0001_WK", false);
    // }
    //地面显示隐藏
    showDM(groundVisible, view3d) {
        groundVisible = !groundVisible;
        view3d.SetGroundVisible(groundVisible);
        Model.getModel(view3d);
    },
    //白天隐藏的材质
    closeClear(view3d){
       
       utils.setXiaoPingVisible(view3d, false);
       view3d.UpdateObjectVisible("ExponentialHeightFog", false);


    //viewer.drawer.updateObjectVisible("ExponentialHeightFog", true);
    }

}
//模型标注类
export const Model = {
    //雨
    enableRain(view3d) {
        console.log(view3d);
        _enableRain = !_enableRain;
        view3d.SetScenceRain(_enableRain);
    },

    /*
        ** 启用雪
        */
    enableSnow(view3d) {
        _enableSnow = !_enableSnow;
        view3d.SetScenceSnow(_enableSnow);
    },

    /*
    ** 启用云
    */
    enableClouds(view3d) {
        _enableClouds = !_enableClouds;
        view3d.SetScenceClouds(_enableClouds);
    },
    //夜
    btnSetInfo4(view3d) {
        _enableSnowye = !_enableSnowye;
        var suninfo={};
        if(_enableSnowye===true){
            suninfo={
                year: 2019,
                month: 7,
                day: 7,
                hour: 23,
                minute: 30
            }
            utils.setXiaoPingVisible(view3d, true);
        }else{
            suninfo={
                year: 2020,
                month: 9,
                day: 9,
                hour: 12,
                minute: 15
            }
            utils.setXiaoPingVisible(view3d, false);
        }

        view3d.SetScenceSunInfo(suninfo);
    },
    btnSetInfo2(view3d) {
        const suninfo = {
            year: 2019,
            month: 7,
            day: 7,
            hour: 12,
            minute: 30
        }
        view3d.SetScenceSunInfo(suninfo);
    },
    //创建模型
    creatmodel(view3d, videoType, callback) {
        var obj = {
            type: 'model',
            filename: videoType.fileName, // box, capsule, cone, cube, cylinder, pipe, pyramid, sphere, capsule
            radius: 1,
            scale: 1,
            attr: videoType.attr
        }
        view3d.OverLayerStartEdit(obj, res => {
            var strObj = JSON.stringify(res);
            createObj = res;
            // var myDate = new Date()
            view3d.OverLayerStopEdit();
            // return strObj
            callback(strObj)
        });
    },
    //模型高亮
    modelHighlight(view3d, gid) {
        view3d.SetObjectHighlight(gid);
        Model.getModel(view3d);
    },
    //去除地图高亮
    clearHighlight(view3d) {
        view3d.ClearHighlight();
        Model.getModel(view3d);
    },
    //关闭编辑
    endEditing(view3d) {
        view3d.OverLayerStopEdit();
        Model.getModel(view3d);
    },
    // 删除圆
    closeCircle(view3d) {
        var types = [10302];
        view3d.OverLayerRemoveAll(types);
    },
    // 绘制折线
    drawLine(view3d, callback) {
        const objLine = {
            type: "linestring",
            color: "#ff0f00",
            points: [],
        };
        var msg;
        view3d.OverLayerStartEdit(objLine, (res) => {
            msg = res
        });
        window.addEventListener("mousedown", function rightClick(e) {
            if (e.button === 2) {
                // message.success("绘制成功");
                view3d.OverLayerStopEdit();
                window.removeEventListener("mousedown", rightClick);
                if (callback) {
                    callback(msg);
                }
            }
        })
    },
    // 删除折线
    closeLine(view3d) {
        var types = [10200];
        view3d.OverLayerRemoveAll(types);
        Model.getModel(view3d);
    },
    //修改坐标
    modify(view3d, locations) {
        if (!createObj) {
            // alert("请先创建对象！");
            return;
        }
        var location = {
            x: locations.x,
            y: locations.y,
            z: locations.z,
            pitch: 0,
            yaw: locations.yaw,
            roll: 0
        }
        createObj.location = location
        view3d.OverLayerUpdateObject(createObj);
    },
    //电梯修改
    updateElevator(view3d, obj) {
        obj.position.z += 5000
        view3d.OverLayerUpdateObject(obj);
    },
    //删除所有模型
    allmove(view3d) {
        view3d.OverLayerRemoveAll();
        // createObj = null;
        // view3d.OverLayerStopEdit();
    },
    //加载模型
    modelLoading(view3d, strObj, callback) {
        var obj = {
            gid: strObj.gid,
            type: 'model',
            filename: strObj.filename, // box, capsule, cone, cube, cylinder, pipe, pyramid, sphere, capsule
            radius: 1,
            scale: 1,
            attr: strObj.attr,
            location: {
                x: strObj.location.x,
                y: strObj.location.y,
                z: strObj.location.z,
                pitch: 0,
                yaw: strObj.location.yaw,
                roll: 0
            }
        }
        // 注意,此功能为异步操作
        view3d.OverLayerCreateObject(obj, res => {
            // view3d.SetMouseCallback(null);
            callback(res)
        });
    },

    //加载标注
    labelLoading(view3d, strObj, callback) {
        let obj = {
            type: 'label',
            text: strObj.text,
            font: '黑体',
            fontcolor: strObj.fontcolor,
            fontsize: strObj.fontsize,
            halign: 'left', // left center right
            valign: 'top', // bottom center top
            location: strObj.location,
            attr: strObj.attr ? strObj.attr : {}
        };
        if (strObj.gid) {
            obj["gid"] = strObj.gid;
        }
        view3d.OverLayerCreateObject(obj, res => {
            //  view3d.SetMouseCallback(null);
            if (callback) {
                callback(res);
            }
        });
    },
    //删除当前模型对象
    delectObj(view3d) {
        view3d.OverLayerRemoveObject(createObj);
        createObj = null;
        view3d.OverLayerStopEdit();
    },
    //创建文本模型
    LabelModel(view3d, strObj, callback) {
        const obj = {
            type: 'label',
            text: strObj.text,
            font: '黑体',
            fontcolor: strObj.color,
            fontsize: strObj.size,
            halign: 'left', // left center right
            valign: 'top' // bottom center top
        };
        view3d.OverLayerStartEdit(obj, res => {
            var strObj = JSON.stringify(res);
            view3d.OverLayerStopEdit();
            if (callback) {
                callback(strObj);
            }
        });
    },
    // 编辑文本模型
    updeteLabelModel(view3d, obj) {
        view3d.OverLayerUpdateObject(obj);
    },
    //绘制面
    playPolygon(view3d, callback) {
        const obj = {
            type: 'polygon',
            color: '#00ff00',
            points: []
        };
        view3d.OverLayerStartEdit(obj, res => {
            var strObj = JSON.stringify(res);
            Polygon = res;
            view3d.OverLayerStopEdit();
            if (callback) {
                callback(strObj);
            }
        });
    },
    //创建报警面
    createPolygonAlarm(view3d, point, gid, callback) {
        // 注意,此功能为异步操作
        const obj = {
            gid: "alarmPolygon" + gid,
            type: 'cone',
            radius: 400.0, // 半径
            height: 300.0, // 高
            style: 'SplineOrangeHighlight1', // style 样式优先于color 
            location: {
                x: point.x,
                y: point.y,
                z: point.z + 400,
                pitch: 180, // 俯仰角 0——90度
                yaw: 0, // 偏航角 0-360度
                roll: 0 // 翻滚角
            }
        };
        view3d.OverLayerCreateObject(obj, res => {
            createObj = res;
            callback && callback(JSON.stringify(res));
        });
    },
    //创建面
    createPolygon(view3d, data, point, callback, Color, style) {
        // 注意,此功能为异步操作
        setTimeout(() => {
            view3d.OverLayerCreateObject({
                type: 'polygon',
                color: Color ? Color : '#00ff00',
                points: point,
                attr: data
            }, res => {
                // view3d.SetMouseCallback(null);
                createObj = res;
                var strObj = JSON.stringify(createObj);
                // console.log(strObj,'strObj')
                callback(strObj)
            });
        });
        // Model.getModel(view3d);
    },
    // 创建折线
    createZheLine(view3d, points, callback) {
        const obj = {
            type: 'linestring',
            style: 'red',
            linewidth: 20.0,
            points: points
        };
        view3d.OverLayerCreateObject(obj, res => {
            if (callback) {
                callback(res);
            }
        });
    },
    // 创建线柱子
    createLine(view3d, gid, points, text, fontsize, fontcolor, radius, height) {
        // const obj = {
        //     type: 'linestring',
        //     style: 'SplineOrangeHighlight',
        //     linewidth: 20.0,
        //     points: [points,
        //         {
        //             ...points,
        //             y: points.y + 1,
        //             z: points.z + 2500
        //         }
        //     ]
        // };
        const obj = {
            gid: "BjX_" + gid,
            type: 'cylinder',
            radius: radius ? radius : 100.0, // 半径
            height: height ? height : 3000.0, // 高
            style: 'SplineOrangeHighlight', // style 样式优先于color
            location: {
                x: points.x,
                y: points.y,
                z: points.z,
                pitch: 0, // 俯仰角 0——90度
                yaw: 0, // 偏航角 0-360度
                roll: 0 // 翻滚角
            }
        };
        const obj2 = {
            gid: "BjY_" + gid,
            type: 'cylinder',
            radius: 1000.0, // 半径
            height: 100.0, // 高
            style: 'SplineOrangeHighlight1', // style 样式优先于color
            location: {
                x: points.x,
                y: points.y,
                z: points.z,
                pitch: 0, // 俯仰角 0——90度
                yaw: 0, // 偏航角 0-360度
                roll: 0 // 翻滚角
            }
        };
        view3d.OverLayerCreateObject(obj2)
        view3d.OverLayerCreateObject(obj, res => {
            Model.labelLoading(view3d, {
                gid: "BjZ_" + gid,
                text: text,
                fontcolor: fontcolor ? fontcolor : "#ff0000",
                fontsize: fontsize ? fontsize : "200",
                location: {
                    x: points.x,
                    y: points.y + 100,
                    z: Number(points.z) + height ? height + 1000 : 4000,
                    pitch: -90
                }
            })
        });
    },
    // 创建报警线
    createLineBj(view3d, gid, points, text, fontsize, fontcolor) {
        // let point = Model.calculateCenterPoint(points);
        Model.createLine(view3d, gid, points, text, fontsize, fontcolor)
    },
    // 圆柱和文字
    closeLineAndText(view3d) {
        var types = [10101, 10327];
        view3d.OverLayerRemoveAll(types);
    },
    // 计算中心点公式
    calculateCenterPoint(points) {
        var area = 0.0 // 多边形面积
        var gravityLat = 0.0 // 重心点 latitude
        var gravityLng = 0.0 // 重心点 longitude
        for (let i = 0; i < points.length; i++) {
            let coordinate = points[i];
            // 1
            let lat = coordinate.x
            let lng = coordinate.y
            let nextLat = points[(i + 1) % points.length].x
            let nextLng = points[(i + 1) % points.length].y
            // 2
            let tempArea = (nextLat * lng - nextLng * lat) / 2.0
            // 3
            area += tempArea
            // 4
            gravityLat += tempArea * (lat + nextLat) / 3
            gravityLng += tempArea * (lng + nextLng) / 3
        }
        // 5
        gravityLat = gravityLat / area
        gravityLng = gravityLng / area
        return {
            x: gravityLat,
            y: gravityLng,
            z: points[0].z
        }
    },
    // 报警材质区域面
    createPolygonBj(view3d, point, style) {
        let pointArr = [...point, point[0]];
        (function loop() {
            let G1 = {
                "x": pointArr[0].x,
                "y": pointArr[0].y,
                "z": pointArr[0].z + 5000
            };
            let G2 = {
                "x": pointArr[1].x,
                "y": pointArr[1].y,
                "z": pointArr[1].z + 5000
            };
            let pointArrBj = [pointArr[0], G1, G2, pointArr[1]];
            Model.createPolygon(view3d, pointArrBj, res => {
                pointArr.splice(0, 1);
                if (pointArr.length > 1) {
                    loop();
                }
            }, "", style)
        }())
    },
    // 绘制多边形
    playPolygon2(view3d, item, callback) {
        const obj = {
            type: 'polygon',
            color: item.color,
            points: []
        };

        view3d.OverLayerStartEdit(obj, res => {
            var strObj = JSON.stringify(res);
            Polygon = res;
            // console.log(Polygon, strObj);
            view3d.OverLayerStopEdit();
            if (callback) {
                callback(strObj);
            }
        });
    },
    //删除面
    delectPolygon(view3d) {
        if (!Polygon) {
            // alert("请先创建对象！");
            return;
        }

        view3d.OverLayerRemoveObject(Polygon);
        Polygon = null;
        view3d.OverLayerStopEdit();
    },
    // 删除单个覆盖物
    delectMulch(view3d, selObj) {
        if (!selObj) {
            // alert("请先创建/选择对象！");
            return;
        }
        // alert("删除对象：" + selObj.gid);
        view3d.OverLayerRemoveObjectById(selObj.gid);
        // view3d.OverLayerRemoveObject(selObj);
        selObj = null;
    },
    removeGid(view3d, gid) {
        view3d.OverLayerRemoveObjectById(gid);
        Model.getModel(view3d);
    },
    // 显示隐藏模型
    showModel(view3d, id, flag) {
        view3d.UpdateObjectVisible(id, flag);
        // Model.getModel(view3d);
    },
    //清除鼠标
    clearMouseCallBack(view3d) {
        view3d.SetMouseCallback(null)
    },
    //点击获取当前模型信息
    getModel(view3d) {
        // 过滤 对象  prefix 对象名称前缀   ，path 路径前缀
        var paramers = {
            prefix: 'M,T,J,V',
            // prefix: '',
            path: '',
            speedroute: 10,
            showmouse: false
        };

        view3d.SetMouseCallback(null)
        view3d.SetParameters(paramers);
        view3d.SetMouseCallback(res => {
            console.log('点击到了:', res)
            if (Array.isArray(res)) {
                console.log(res, '数组')
            } else {
                let data = {}
                if (res.typename === "model") {
                    data = {
                        switchName: 'model',
                        Personnel: res,
                    }
                } else if (res.typename === "label" && res.attr) {
                    if (res.attr.buildId) {
                        data = {
                            switchName: 'buildLable',
                            Personnel: res.attr.buildId,
                        }
                    } else {
                        data = {
                            switchName: 'buildLable_wenzi',
                            Personnel: res.attr
                        }
                    }
                } else if (res.typename === "image") {
                    data = {
                        switchName: 'ImagePC',
                        Personnel: res,
                    }
                } else if (res.gid && res.gid.split("_")[0] === "MP") {
                    let buildarr = res.gid.split("_");
                    buildarr.shift();
                    let buildId = buildarr.join("_");
                    buildId = buildId.substring(0, buildId.length - 3)
                    console.log(buildId, 'buildId');
                    data = {
                        switchName: 'buildLable',
                        Personnel: buildId,
                    }
                } else if (res.typename === "polygon") {
                    data = {
                        switchName: 'polygon',
                        Personnel: res
                    }
                }
                window.postMessage(data, '*');
            }
            // callback(strObj)
        });
    },
    // 修改模型高亮颜色
    updateModelStyle(view3d, gid, style) {
        view3d.UpdateObjectStyle(gid, style);
    },
    // 修改面
    updatePolygon(view3d, obj, style, color) {
        obj.style = style && style !== "" ? style : null;
        obj.color = color ? color : '#00ff00';
        view3d.OverLayerUpdateObject(obj);
    },
    // 创建图标
    createIcon(view3d, style, callback) {
        // 注意,此功能为异步操作
        const obj = {
            type: 'image', // 10102  或  image
            style: style.typeStyle,
            scale: 3,
            location: {
                x: style.location.x,
                y: style.location.y,
                z: style.location.z + 300,
                pitch: style.location.pitch, // 俯仰角 0——90度
                yaw: style.location.yaw, // 偏航角 0-360度
                roll: style.location.roll // 翻滚角
            },
            attr: style.attr
        };
        view3d.OverLayerCreateObject(obj, res => {
            // console.log(res);
            createObj = res;
            var strObj = JSON.stringify(createObj);
            console.log(strObj);
            callback(res)
        });
    },
    createIconTwo(view3d, style, callback) {
        // 注意,此功能为异步操作
        const obj = {
            type: 'image', // 10102  或  image
            style: style.typeStyle,
            scale: 1,
            gid: style.gid,
            location: {
                x: style.location.x,
                y: style.location.y,
                z: style.location.z,
                pitch: style.location.pitch, // 俯仰角 0——90度
                yaw: style.location.yaw, // 偏航角 0-360度
                roll: style.location.roll // 翻滚角
            }
        };
        view3d.OverLayerCreateObject(obj, res => {
            // console.log(res);
            if (callback) {
                callback(res)
            }
        });
    },
    // 图标清除
    closeIcon(view3d) {
        var types = [10102];
        view3d.OverLayerRemoveAll(types);
    },
    // 泡泡清除
    closeAllPaopao(view3d) {
        if (paopao.length > 0) {
            paopao.forEach(item => {
                Model.removeGid(view3d, item)
            });
            paopao = [];
        }
    },
    // 创建广告牌气泡窗口
    createBillboardBubble(view3d, style) {
        const obj = {
            type: 'webbrowser',
            style: 'white',
            url: style.url,
            billborad: false, // 是否公告板,跟随屏幕旋转
            scale: 1.0, // 缩放比例
            width: style.width, // 宽度（厘米）
            height: style.height, // 高度（厘米）
            pwidth: style.pwidth, // 立柱的宽度（厘米）
            pheight: style.pheight, // 立柱的高度（厘米）
            location: {
                x: style.location.x,
                y: style.location.y,
                z: style.location.z + 100,
                pitch: style.location.pitch, // 俯仰角 0——90度
                yaw: style.location.yaw, // 偏航角 0-360度
                roll: style.location.roll // 翻滚角
            }
        };

        view3d.OverLayerCreateObject(obj, res => {
            paopao.push(res.gid)
        });
    },
    // 创建圆
    creatCircle(view3d, style, callback) {
        // 注意,此功能为异步操作
        const obj = {
            type: 'circle',
            radius: style.radius ? style.radius : 100, // 半径
            // style : 'red',
            color: style.color ? style.color : '#FF0000',
            location: style.location
        };
        view3d.OverLayerCreateObject(obj, res => {
            if (callback) {
                callback(res);
            }
        });
    }
}
// 建筑楼层类
export const Build = {
    //地面显示隐藏
    showDM(groundVisible, view3d) {
        view3d && view3d.SetGroundVisible(groundVisible);
    },

    getBuild(view3d, callback) {
        view3d.GetBuildingNames(res => {
            var strObj = JSON.stringify(res);
            callback(strObj)
        });
    },

    getFloor(view3d, buildingName, callback) {
        view3d.GetFloorNames(buildingName, res => {
            var strObj = JSON.stringify(res);
            callback(strObj)
        });
    },

    // 楼层显示隐藏
    showFloor(view3d, buildingName, floorName, floor) {
        view3d.SetBuildingVisible(buildingName, floorName === "all")
        if (floorName === 'all') {
            return
        }

        // floor undefined 的报错处理。
        if (!floor) {
            return;
        }

        if (floorName.indexOf('#') !== -1) {
            floorName = floorName.split('#')[1]
        }

        let floorNum = Build.getFloorNumberByName(floorName)
        let isCurrentFloorUnderground = floorName.startsWith('B')

        if (isCurrentFloorUnderground) {
            floorNum = -floorNum
            // 显示地下的情况时,把地面隐藏掉
            Build.showDM(false, view3d)
        } else {
            Build.showDM(true, view3d)
        }

        floor.forEach((item, index) => {
            let FNum = Build.getFloorNumberByName(item)
            var ItmFloor = item.substr(0, 1);
            if (ItmFloor === "B") {
                FNum = -FNum;
            }

            let floorVisible = true
            if (FNum > floorNum) {
                floorVisible = false
            }

            view3d.SetFloorVisible(buildingName, item, floorVisible);

            if (index === floor.length - 1) {
                setTimeout(() => {
                    // Model.getModel(view3d);
                }, 1000);
            }
        })
    },

    // 整个建筑显示隐藏
    allShow(view3d, buildVisible) {
        Build.getBuild(view3d, res => {
            Array.from(JSON.parse(res)).forEach(item => {
                view3d.SetBuildingVisible(item.id, buildVisible);
            })
            view3d._command = 100107
            createMap.closeWkWang(view3d)
        })
        Model.getModel(view3d);
    },

    // 爆炸分离
    splitBuild(view3d, buildingName, floorHeight) {
        view3d.SplitBuilding(buildingName, floorHeight);
    },

    // 分离恢复
    splitBuildReset(view3d, buildingName) {
        view3d.SplitBuildingReset(buildingName);
    },

    /**
     * 提取楼层号 V001_JZ0002#F003 => 3
     * @param floorId V001_JZ0002#F003
     * @returns {number} 数字格式的楼层号
     */
    getFloorNumberByFloorId(floorId) {
        let floorName = Build.getFloorNameByFloorId(floorId)
        return Build.getFloorNumberByName(floorName)
    },

    /**
     * V001_JZ0002#F003 => F003
     * @param floorId
     */
    getFloorNameByFloorId(floorId) {
        return floorId.split('#')[1]
    },

    /**
     * 提取楼层号 F001 => 1, B001 => -1
     * @param floorNameString F001,B001的格式
     * @returns {number|number} 数字格式的楼层号
     */
    getFloorNumberByName(floorNameString) {
        let floorReg = /\d+/
        let floorNumString = floorNameString.match(floorReg)[0]
        let isUnderFloor = floorNameString.startsWith('B')
        return floorNumString ? (isUnderFloor ? Number(floorNumString) * -1 : Number(floorNumString)) : 1
    },

    /**
     * V001_JZ0002#F003 => F3
     * @param floorId
     */
    getFloorLabelById(floorId) {
        return `${floorId[0]}${Build.getFloorNumberByFloorId(floorId)}`
    }
}
// 功能块
export const Event = {
    // 获取路网
    LwList: [],
    getLuWang(view3d, data, routeData, project, url, floorHeight) {
        let Luwang = data;
        if (Luwang.length < 2) {
            return;
        }
        let json = {
            "end": {
                "floor": Luwang[1].floor,
                "id": 0,
                "x": Luwang[1].x / 100,
                "y": Luwang[1].y / 100,
                "z": Luwang[1].z / 100
            },
            "project": project,
            "start": {
                "floor": Luwang[0].floor,
                "id": 0,
                "x": Luwang[0].x / 100,
                "y": Luwang[0].y / 100,
                "z": Luwang[0].z / 100
            }
        }
        axios.post(url, json).then(res => {
            if (res.data.msg === "OK") {
                let list = res.data.data;
                list.forEach(msg => {
                    let z = Number(msg.floor.slice(-1)) * floorHeight;
                    let obj = {
                        ...msg,
                        x: Number(msg.x) + 120,
                        y: Number(msg.y) - 150,
                        z: z
                    };
                    Event.LwList.push(obj);
                });
                Luwang.splice(0, 1);
                if (Luwang.length > 1) {
                    Event.getLuWang(view3d, Luwang, routeData, project, url, floorHeight);
                } else {
                    let routedata = {
                        ...routeData,
                        geom: Event.LwList.slice(1, Event.LwList.length - 1)
                    };
                    console.log(routedata, "routeData")
                    view3d.CreateRoute(routedata);
                }
            }
        })
    },
    // 创建路线
    createRoute(view3d, routeData, flag, project, url, floorHeight) {
        Event.LwList = [];
        if (flag) {
            Event.getLuWang(view3d, routeData.geom, routeData, project, url, floorHeight)
        } else {
            view3d.CreateRoute(routeData);
        }
    },
    // 开始迅游
    playPatrolPath(view3d, callback) {
        view3d.PlayRoute(res => {
            // console.log(res,'巡游的实时位置')
            // 返回播放结束节点的位置和索引
            if (callback) {
                callback(res);
            }
        });
    },
    // 继续播放
    continuePatrolPath(view3d) {
        view3d.ResumeRoute();
    },
    // 暂停播放
    pausePatrolPath(view3d) {
        view3d.PauseRoute();
    },
    // 停止播放
    stopPatrolPath(view3d) {
        view3d.StopRoute();
    },
    // 路径迅游清除
    clearPatrolPath(view3d) {
        view3d.Clear();
    },
    // 动画暂停
    stopMan(view3d) {
        view3d.Stop();
    },
    // 点线追查
    pointTracing(view3d, pointPosition, callback) {
        const json = {
            radius: 100, // 半径
            color: '#FF0000',
            location: pointPosition
        };
        Model.creatCircle(view3d, json, msg => {
            createMap.getMousePosition(view3d);
            if (callback) {
                callback(msg);
            }
        })
    },
    pointLineTracing(view3d, pointPosition) {

        // if (pointPosition.length > 1) {
        //     const points = pointPosition
        //     Model.createZheLine(view3d, points, msg => {
        //         createMap.getMousePosition(view3d)
        //     });
        // }
    },
    //视频投地
    videoProjection(view3d, position, url) {
        Event.close_videoProjection(view3d);
        setTimeout(() => {
            var video2 = {
                url: url,
                width: 2000, // 单位厘米  10米
                height: 1900, // 单位厘米  9米
                position: position
            }
            console.log(video2, '视频投地参数');
            view3d.StreamVideoOpen(video2);
            Model.getModel(view3d);
        }, 100);
    },
    //关闭投地
    close_videoProjection(view3d) {
        view3d.StreamVideoClose();
        Model.getModel(view3d);
    }
}
//设置屏幕
function SetResolution(options, view3d) {
    if (view3d) {
        var divObj = document.getElementById(options.id);
        if (!divObj) {
            console.log("设置屏幕 error");
            return;
        }
        var width = divObj.clientWidth;
        var height = divObj.clientHeight;
        view3d.SetResolution(width, height);
        Model.getModel(view3d);
    }
}