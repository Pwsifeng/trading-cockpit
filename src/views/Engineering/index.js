import React, { useEffect, useState } from 'react'
import './index.scss'
import * as echarts from 'echarts'


export default function Engineering() {

  useEffect(() => {
    var mychart = echarts.init(document.querySelector('.ech'))
    option && mychart.setOption(option)
  }, [])

  const option = {
    color: [
      'rgba(92,245,255,0.42)'
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24：00']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [0, 12, 26, 20, 14, 8, 0],
        type: 'line',
        smooth: true,
        areaStyle: {}
      }
    ]
  };

  return (
    <div id='engin'>
      <div className='engin-left animate__animated animate__fadeInLeft'>
        <div className='xiangmu'>
          <div className='title'>
            <h2>项目管理</h2>
          </div>
          <div className='sel'>
            <span>2022年度项目</span>
          </div>
          <div className='xiang'>
            <div className='mian'>
              <p>845</p>
              <span>项目总数</span>
            </div>
            <div className='mian'>
              <p>532</p>
              <span>进行中</span>
            </div>
            <div className='mian'>
              <p>313</p>
              <span>已结束</span>
            </div>
          </div>
        </div>
        <div className='gongcheng'>
          <div className='title'>
            <h2>工程项目</h2>
          </div>
          {/* <ul >
            <li className='xiangmuxianqing'>
            <div>
                <div className='projectname'>临浦镇社区卫生服务中心过渡房装修工程</div>
                <p><span className='loction'></span>浙江省杭州市萧山区临浦镇社区</p>
                <p><span className='area'></span>9600㎡</p>
                <p><span className='content'></span>临浦镇社区卫生服务中心过渡房装修工程为临浦镇2022年重大的民生工程，
                目的是将浦南卫生院进行临时迁移安置，为浦南建设“未来社区”做先行准备。
                该装修工程位于临浦镇包洪线塘头钟公交站的旧厂房，施工单位路桥...</p>
                <p><span className='plan'></span>项目计划于2022年9月30日竣工</p>
                <p><span className='jindu'></span><span className='rateline'></span>100%</p>
              </div>
          </li>
   
            <li className='xiangmuxianqing'>
            <div>
                <div className='projectname'>区体育中心' 最后一公里”体验区改造项目</div>
                <p><span className='loction'></span>浙江省杭州市萧山区体育中心</p>
                <p><span className='area'></span>5600㎡</p>
                <p><span className='content'></span>临浦镇社区卫生服务中心过渡房装修工程为临浦镇2022年重大的民生工程，
                目的是将浦南卫生院进行临时迁移安置，为浦南建设“未来社区”做先行准备。
                该装修工程位于临浦镇包洪线塘头钟公交站的旧厂房，施工单位路桥...</p>
                <p><span className='plan'></span>项目计划于2022年12月30日竣工</p>
                <p><span className='jindu'></span><span className='rateline'></span>97%</p>
              </div>
            </li>
          </ul> */}
          <div className='search'>
            <p>输入工地名称</p>
            <p className='searchbutton'></p>
          </div>

          <table cellSpacing={0}>
            <thead>
              <tr>
                <td className='tb1'>项目名称</td>
                <td className='tb2'>当前进度</td>
                <td>当前进度</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>科创园一期项目</td>
                <td>1、公区装修完成70%，道路及铺装基层完成75%，铺装完成30%</td>
                <td>1、公区装修完成80%，道路及铺装基层基本完成，铺装完成50%，开始选苗。</td>
              </tr>
              <tr>
                <td>科创园二期项目</td>
                <td>1、基础底板完成95%，负一层底板完成85%，一层底板完成20%。</td>
                <td>1、基础底板完成，负一层底板完成85%，一层底板完成40%。</td>
              </tr>
              <tr>
                <td>棉北里文创园项目</td>
                <td>1、方案确定完成，报审规划中，落实初步设计工作，协助前期推动工规证办理。2、持续推进现场岗亭、洗车池、卫生间、道路硬化等准备工作。</td>
                <td>1、桩基进场，准备试桩工作。2、推进初步设计工作，协调施工单位、审计单位概算核对工作。</td>
              </tr>
              {/* <tr>
                <td>南门安置房项目</td>
                <td>04地块：粉刷完成70%；12地块：砌体结构95%；25地块：主体结构完成至19层；34地块：主体结构平均7层。</td>
                <td>04地块：粉刷完成80%；12地块：砌体结构完成；25地块：主体结构完成至23层，计划10月整体结顶；34地块：主体结构平均11层</td>
              </tr> */}
              {/* <tr>
                <td>塘湾码头停保基地项目</td>
                <td>1、1-4#楼拆除及清运完成100%
                  2、1-4#楼砖墙砌筑完成80%，抹灰完成20%；3#楼石膏板隔墙完成20%；
                  3、3#楼桥架线管安装完成60%，1#楼、2#楼线管安装完成20%；
                  4、7#楼基础完成100%，室外配电房基础浇筑完成100%；
                  5、拆除3#楼原消防管道，放线铺设管道完成50%；
                  6、1#楼、2#楼安装钢构门窗框架完成100%；
                  7、3#楼、2#楼、1#楼墙面抹灰完成30%；
                </td>
                <td>1、1-4#楼砖墙砌筑完成90%，3#楼石膏板隔墙完成50%；
                  2、3#楼桥架及线管安装完成65%，1#楼、2#楼线管安装完成25%；
                  3、7#楼柱子模板、钢筋施工完成80%；配电房柱子模板、钢筋施工完成20%；
                  4、3#楼消防管道铺设完成60%；
                  5、1-4#楼墙面抹灰完成50%，1、2#楼油漆工墙面粉刷施工完成10%；
                  6、4#楼原有窗户修补完成20%；
                  7、室外挖土完成15%；
                </td>
              </tr> */}
            </tbody>
          </table>

        </div>

      </div>
      <div className='engin-right animate__animated animate__fadeInLeft'>
        <div className='gongdi'>
          <div className='title2'>
            <h2>工地信息展示</h2>
          </div>
          <div className='xiang'>
            <div className='shu'>
              <p>监控设备</p>
            </div>
            <div className='mian'>
              <p>停车场设备</p>
            </div>
            <div className='shi'>
              <p>扬尘设备</p>
            </div>

          </div>
          {/* <div className='ech' id='ech'>

          </div> */}

        </div>
        <div className='searchgongdi'>
          <div className='search'>
            <p>输入工地名称</p>
            <p className='searchbutton'></p>
          </div>
        </div>

        <table className="table " border="0" >
          <thead className='tabelhead'>
            <tr>
              <th>车牌号</th>
              <th>进入工地时间</th>
              <th>离开工地时间</th>
              <th>所属停车场</th>
            </tr>
          </thead>
          <tbody >
            <tr>
              <td>浙A·66356</td>
              <td>2022-12-01 12:45:12</td>
              <td>2022-12-01 16:45:12</td>
              <td>1号停车场</td>
            </tr>
            <tr>
              <td>浙A·66356</td>
              <td>2022-12-01 12:45:12</td>
              <td>2022-12-01 16:45:12</td>
              <td>1号停车场</td>
            </tr>
            <tr>
              <td>浙A·66356</td>
              <td>2022-12-01 12:45:12</td>
              <td>2022-12-01 16:45:12</td>
              <td>西门停车场</td>
            </tr>
            <tr>
              <td>浙A·66356</td>
              <td>2022-12-01 12:45:12</td>
              <td>2022-12-01 16:45:12</td>
              <td>西门停车场</td>
            </tr>
            <tr>
              <td>浙A·66356</td>
              <td>2022-12-01 12:45:12</td>
              <td>2022-12-01 16:45:12</td>
              <td>1号停车场</td>
            </tr>
          </tbody>
        </table>

        <div className='zong'>
          <div className='title2'>
            <h2>车流量</h2>
          </div>

          <div className='til'>
            <div className='car'></div>

            <div className='partrate'>
              <p>西门停车位使用率</p>
              <p>83.3%</p>
            </div>
            <div className='partnum'>
              <span>停车位总数：30</span>
              <p>已占车位：26</p>

            </div>
          </div>
          <div className='ech' id='ech'>

          </div>
        </div>
      </div>
    </div>
  )
}
