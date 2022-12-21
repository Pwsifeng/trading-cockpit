import React, { useEffect, useState } from 'react'
import './index.scss'
import * as echarts from 'echarts'

export default function Road() {



  return (
    <div id='road'>
      <div className='assetManagement-left animate__animated animate__fadeInLeft'>
        <div className='etc'>
          <div className='title'>
            <h2>ETC服务车次</h2>
          </div>
          <div className='carcount'>
            <div className='today'>
              <span>今日服务车次</span>
              <p>4567</p>
            </div>
            <div className='today'>
              <span>历史服务车次</span>
              <p>1456070</p>
            </div>
          </div>

        </div>

        <div className='roadcondition'>
          <div className='title'>
            <h2>道路状况</h2>
          </div>
          <ul >
            <li >
              <span>浙江省杭州市上城区思潮巷</span>
              <span className='greenlight'>畅通</span>
            </li>
            <li >
              <span>浙江省杭州市下城区苏荷巷近和汇路</span>
              <span className='greenlight'>畅通</span>
            </li>
            <li >
              <span>浙江省杭州市拱墅区景苑路</span>
              <span className='redlight'>拥挤</span>
            </li>
            <li >
              <span>浙江省杭州市拱墅区祥园路</span>
              <span className='greenlight'>畅通</span>
            </li>
            <li >
              <span>浙江省杭州市拱墅区涂麦路</span>
              <span className='redlight'>拥挤</span>
            </li>
            <li >
              <span>浙江省杭州市拱墅区西园支路</span>
              <span className='greenlight'>畅通</span>
            </li>
            <li >
              <span>浙江省杭州市上城区思潮巷</span>
              <span className='greenlight'>畅通</span>
            </li>
            <li >
              <span>浙江省杭州市上城区思潮巷</span>
              <span className='redlight'>拥挤</span>
            </li>
            <li >
              <span>浙江省杭州市上城区思潮巷</span>
              <span className='redlight'>拥挤</span>
            </li>
            <li >
              <span>浙江省杭州市上城区思潮巷</span>
              <span className='greenlight'>畅通</span>
            </li>
            <li >
              <span>浙江省杭州市上城区思潮巷</span>
              <span className='greenlight'>畅通</span>
            </li>
            <li >
              <span>浙江省杭州市上城区思潮巷</span>
              <span className='redlight'>拥挤</span>
            </li>
            <li >
              <span>浙江省杭州市拱墅区西园支路</span>
              <span className='greenlight'>畅通</span>
            </li>
            <li >
              <span>浙江省杭州市上城区思潮巷</span>
              <span className='greenlight'>畅通</span>
            </li>
            <li >
              <span>浙江省杭州市上城区思潮巷</span>
              <span className='redlight'>拥挤</span>
            </li>
          </ul>

        </div>

      </div>
      <div className='party-right animate__animated animate__fadeInLeft'>
        <div className='yixin'>
          <div className='title2'>
            <h2>新能源充电桩</h2>
          </div>
          <ul>
            <li>
              <img src={require('../../assess/road/icon_alarm.png')} alt="" />
              <div>
                <p><span>报警位置：</span><span>浙江省杭州市萧山区新塘街道</span></p>
                <p><span>报警类型：</span><span>积水报警</span></p>
                <p><span>报警时间：</span><span>2022-12-02 13:54:16</span></p>
              </div>
            </li>
            <li>
              <img src={require('../../assess/road/icon_alarm.png')} alt="" />
              <div>
                <p><span>报警位置：</span><span>浙江省杭州市萧山区四季大道与春永...</span></p>
                <p><span>报警类型：</span><span>积水报警</span></p>
                <p><span>报警时间：</span><span>2022-12-02 13:54:16</span></p>
              </div>
            </li>
            <li>
              <img src={require('../../assess/road/icon_alarm.png')} alt="" />
              <div>
                <p><span>报警位置：</span><span>浙江省杭州市萧山区杭州生态园</span></p>
                <p><span>报警类型：</span><span>积水报警</span></p>
                <p><span>报警时间：</span><span>2022-12-02 13:54:16</span></p>
              </div>
            </li>
            <li>
              <img src={require('../../assess/road/icon_alarm.png')} alt="" />
              <div>
                <p><span>报警位置：</span><span>浙江省杭州市萧山区河上镇</span></p>
                <p><span>报警类型：</span><span>积水报警</span></p>
                <p><span>报警时间：</span><span>2022-12-02 13:54:16</span></p>
              </div>
            </li>
            <li>
              <img src={require('../../assess/road/icon_alarm.png')} alt="" />
              <div>
                <p><span>报警位置：</span><span>浙江省杭州市萧山区华诚路与120县道...</span></p>
                <p><span>报警类型：</span><span>积水报警</span></p>
                <p><span>报警时间：</span><span>2022-12-02 13:54:16</span></p>
              </div>
            </li>
            <li>
              <img src={require('../../assess/road/icon_alarm.png')} alt="" />
              <div>
                <p><span>报警位置：</span><span>浙江省杭州市萧山区戴西路与三湖线交...</span></p>
                <p><span>报警类型：</span><span>积水报警</span></p>
                <p><span>报警时间：</span><span>2022-12-02 13:54:16</span></p>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}
