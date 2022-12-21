import React, { useLayoutEffect, useEffect, useState, Suspense, lazy, useRef, Fragment } from 'react'
import { moduleName_atom, mapObj_atom } from '../jotai/store'
import { useAtom } from 'jotai'
import Footer from './Footer'
import Head from './Head'
import { HashRouter as router, Routes, Route, Router } from 'react-router-dom'
import './index.scss'
import Smart from '../views/SmartCommunity'
import Engineering from '../views/Engineering'
import MapViewer from '../components/mapViewer'
import { getConfig_L } from '../api/commonApi'
import Party from '../views/Party'
import MapLight from '../components/map_light'
import MapDark from '../components/map_dark'
import configjson from '../api/get_configjson';
import { createMap,Model } from '../utils/map3d';
import { Common } from '../utils/mapMethods';
import utils from '../utils';
import Pubsub from 'pubsub-js'

import { getViewer } from '../components/mapViewer'

export default function Layouts() {

  const timerRef = useRef(null);//动画延迟计时器
  const [moduleName, setModuleName] = useAtom(moduleName_atom)
  const [ContentPage, setContentPage] = useState("div");//模块组件容器
  const [animateName, setAnimateName] = useState("animate__fadeInLeft")
  const [mapUrls, setMapUrls] = useState({ mapUrl1: "", mapUrl2: "" })
  const [tian, setTian] = useState(false)
  const [dark, setDark] = useState(false)//切换场景
  const [dark_width, setDw] = useState("50%")//切换场景
  const [darkall, setDa] = useState(false)
  const videoProjection_bolean = useRef(null);
  const [mapObj] = useAtom(mapObj_atom);

  const showTian = (val) => {
    console.log(val);
    setTian(val)
  }
  
  const panel = () => {
    setTian(false)
  }

  useEffect(()=> {
    Pubsub.subscribe("states",(_,item)=>{
      console.log(item);
      setTian(item)
    })
  },[])

  const showyu = () => {
    Model.enableRain(getViewer())
  }
  const showxue = () => {
    Model.enableSnow(getViewer())
  }
  const showyun = () => {
    Model.enableClouds(getViewer())
  }
  const showye = () => {
    Model.enableClouds(getViewer(false))
    Model.btnSetInfo4(getViewer())
    
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [moduleName])
  // 切换模块
  useLayoutEffect(() => {
    if (moduleName !== "") {
      setAnimateName("animate__fadeInLeft")
      setContentPage(lazy(() => import(`../views/${moduleName}`)))
    } else {
      // 启动服务默认进入Home页面，不写没有
      setModuleName('Home')
    }
  }, [moduleName])

  useEffect(() => {
    getMapURL();
  }, [])
    

  // 获取地图url配置
  const getMapURL = () => {
    getConfig_L().then(res => {
      console.log(res, "res");
      if (res.msg === "success") {
        let configMap = res.data[0]
        console.log('接口获取地图url配置:', configMap)
        setMapUrls({ mapUrl1: configMap.map_database_url, mapUrl2: configMap.digit_model_url });
        Common.initializationPosition(getViewer())
      }
    })
    
  }


  // 关闭模块
  //  const closePage = () => {
  //   setAnimateName("animate__fadeOutLeft")
  //   setTopCount("");
  //   timerRef.current = setTimeout(() => {
  //     setModuleName("");
  //   }, 500);
  // }

  return (
    <div id='layouts'>
      <Head cenel={showTian} />
      <Footer />
      <div className='masking_bg'></div>

      <div className='container'>
        <div className="map">
          <MapViewer setWidth="100%" url="192.168.0.25:10190" />
        </div>
        {/* {
          moduleName !== "" ? moduleName !== "Smart" ? <Suspense fallback={<div>"loading"</div>}>
            <div className={`${"popup animate_speed animate__animated"} ${animateName}`}>
              <ContentPage />
            </div>
          </Suspense> : <Suspense fallback={<div>"loading"</div>}><ContentPage /></Suspense> : null
        } */}
        {
          moduleName !== "" ? <Suspense fallback={<div>"loading"</div>}>
            <div className={`${"popup animate_speed animate__animated"} ${animateName}`}>
              <ContentPage />
            </div>
          </Suspense> : null
        }
        {
        tian ? <div className='tian'>
          <div className='top'>
            <p>天气模拟</p>
            <span onClick={()=>{
              Common.initializationPosition(getViewer(),{
                x:"120.0479131417419",
                y:"28.876155279850458",
                z:"364.7697043125991",
                pitch: "31.025169372558594",
                yaw: "80.06246185302734",
                roll: "0.000025903900677803904"
              })}}>复位</span>
            <img src={require('../assess/images/icon_close.png')} alt="" onClick={()=>panel()}  />
          </div>
          <ul>
            <li>
              <img src={require('../assess/images/icon_rain.png')} alt="" onClick={()=>showyu()} />
              <p>下雨</p>
            </li>
            <li>
              <img src={require('../assess/images/Frame 245.png')} alt="" onClick={()=>showxue()}/>
              <p>下雪</p>
            </li>
            <li>
              <img src={require('../assess/images/icon_sunny.png')} alt="" onClick={()=>showyun()} />
              <p>光照</p>
            </li>
            <li>
              <img src={require('../assess/images/icon_day_night.png')} alt="" onClick={()=>showye()}/>
              <p>昼夜变化</p>
            </li>
          </ul>
        </div> : null
      }
        {/* {
          <Router>
            <Routes>
              <Route path='/smart' element={<Smart/>}></Route>
              <Route path='/eng' element={<Engineering/>}></Route>
            </Routes>
          </Router>
        } */}
      </div>

    </div>
  )
}
