import React, { useEffect, useState } from 'react'
import './index.scss'
import { moduleName_atom, topCount_atom } from '../../jotai/store';
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom';
import { Common } from '../../utils/mapMethods';
import { getViewer } from '../../components/mapViewer'
import PubSub from 'pubsub-js'

const Footer = (props) => {

  const { cenel } = props;
  const moduleList = [
    { name: "首页", icon: "icon_home", moduleName: "Home" },
    { name: "智慧小区", icon: "icon_nav_1", moduleName: "SmartCommunity" },
    { name: "在建工程", icon: "icon_nav_2", moduleName: "Engineering" },
    { name: "资产管理", icon: "icon_nav_3", moduleName: "AssetManagement" },
    { name: "车辆运营", icon: "icon_nav_4", moduleName: "CarYun" },
    { name: "车路协同", icon: "icon_nav_5", moduleName: "Road" },
    { name: "党建文化", icon: "icon_nav_6", moduleName: "Party" }
  ]
  const [, setModuleName] = useAtom(moduleName_atom)
  const [topCount, setTopCount] = useAtom(topCount_atom)
  const [tianqi, setTianqi] = useState(false)

  useEffect(() => {
    
  }, [])


  const handleTab = (item, index) => {
    setTopCount(index)
    // console.log(item, index);
    // if (index === 0) {
    //   PubSub.publish("state", tianqi);
    //   PubSub.publish("states", false);
    // } 
    if (index === 1) {
      var pos = {
        x: "120.04971749509154",
        y: "28.875674994660017",
        z: "331.62782248787886",
        pitch: "33.811580657958984",
        yaw: "88.68724060058594",
        roll: "0.000016441013940493576"
      }
      Common.initializationPosition(getViewer(), pos)
      PubSub.publish("state", !tianqi);
    } else if (index === 2) {
      var pos = {
        x: "120.04706826486431",
        y: "28.8727877304662",
        z: "474.7809742781607",
        pitch: "60.188995361328125",
        yaw: "-74.81232452392578",
        roll: "0.000044651584175881"
      }
      Common.initializationPosition(getViewer(), pos)
      PubSub.publish("state", true);
    } 
    // else if (index === 3) {
    //   // 地图定位
    //   var pos = {
    //     x: "120.0433862461318",
    //     y: "28.870576143818223",
    //     z: "422.6506613728229",
    //     pitch: "44.958431243896484",
    //     yaw: "7.312611103057861",
    //     roll: "0.0000455470108136069"
    //   }
    //   Common.initializationPosition(getViewer(), pos)
    //   PubSub.publish("state", true);
    // } 
    else if (index === 6 || index === 0 || index === 3) {
      // 不显示天气按钮
      PubSub.publish("state", tianqi);
      // 不显示操作天气按钮，
      PubSub.publish("states", false);
    } else {
    }
    setModuleName(item.moduleName);
  }



  return (
    <div id='footer'>
      <ul>
        {
          moduleList.map((item, index) => {
            return (
              <li key={index}
                onClick={() => handleTab(item, index)} className={topCount === index ? 'animate__animated animate__zoomIn' : null}
              // onClick={()=>handlTab(item,index)}
              >
                {
                  topCount === index ? <img src={require('../../assess/images/' + item.icon + '_sele.png')} alt="" /> :
                    <img src={require('../../assess/images/' + item.icon + '.png')} alt="" />
                }
                <span className={topCount === index ? "active" : null}>{item.name}</span>
              </li>
            )
          })
        }
      </ul></div>
  )
}
export default Footer;