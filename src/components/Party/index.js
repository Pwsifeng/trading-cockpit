import React, { useState } from 'react'
import './index.scss'

export default function Party() {

  const [isClose,setClose] = useState(false)

  const panel = () => {
    setClose(false)
  }

  const showClose = () => {
    setClose(true)
  }

  return (
    <div id='party'>
      <div className='party-left animate__animated animate__fadeInLeft'>
        <div className='zuzhi'>
          <div className='title'>
            <h2>党组织位置</h2>
          </div>
          <div className='xin'>
            <img src={require('../../assess/party/img_dh.png')} alt="" />
            <div className='tiao'>
              <p>
                <span>浙江省杭州市萧山区通惠南路227号2幢</span>
              </p>
              <p>
                <span>浙江省杭州市萧山区萧山交投集团党支部</span>
              </p>
            </div>
          </div>
        </div>
        <div className='renshu'>
          <div className='title'>
            <h2>党员人数展示</h2>
          </div>
          <div className='num'>
            <p>
              <span>正式党员</span>
              <span>2835</span>
              <span>/人</span>
            </p>
            <p>
              <span>党支部</span>
              <span>4</span>
              <span>/人</span>
            </p>
          </div>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <td>党员姓名</td>
                <td>党龄</td>
                <td>工作单位</td>
                <td>所在党支部</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>何晨</td>
                <td>3年</td>
                <td>萧山交通投资集团</td>
                <td>萧山党支部</td>
              </tr>
              <tr>
                <td>周福元</td>
                <td>12年</td>
                <td>萧山交通投资集团</td>
                <td>萧山党支部</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='fengcai'>
          <div className='title'>
            <h2>党建风采展示</h2>
          </div>
          <div className='tu'>
            <div className='left'>
              <img src={require('../../assess/party/Rectangle1538.png')} alt="" />
              <p>李红秀</p>
            </div>
            <div className='zhong'>
              <img src={require('../../assess/party/Rectangle.png')} alt="" />
              <p>党支部一部</p>
            </div>
            <div className='right'>
              <img src={require('../../assess/party/Rectangle1537.png')} alt="" />
              <p>张海</p>
            </div>
          </div>
        </div>
        <div className='huodong'>
          <div className='title'>
            <h2>党建活动列表</h2>
          </div>
          <ul>
            <li onClick={()=>showClose()}>
              <span>关于同意成立“12588”交通建设项目 临时党支部的批复</span>
              <span>2022-12-01</span>
            </li>
            <li>
              <span>推进“22688”交通项目党建工作</span>
              <span>2022-12-02</span>
            </li>
            <li>
              <span>新代表，新使命，新作为 ——长运公司开展工会换届选举...</span>
              <span>2022-12-03</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='party-right animate__animated animate__fadeInLeft'>
        <div className='yixin'>
          <div className='title2'>
            <h2>e心向党</h2>
          </div>
          <ul>
            <li>
              <span>e心向党 网聚红色力量</span>
              <span>2022-12-01</span>
            </li>
            <li>
              <span>追忆红色历史，筑牢为民情怀</span>
              <span>2022-12-02</span>
            </li>
            <li>
              <span>不忘初心跟党走，党建共建谱新篇</span>
              <span>2022-12-03</span>
            </li>
            <li>
              <span>勤自省，严自律，强党性</span>
              <span>2022-12-03</span>
            </li>

          </ul>
        </div>
        <div className='bangfu'>
          <div className='title2'>
            <h2>党建帮扶</h2>
          </div>
          <ul>
            <li>
              <span>党建、纪检半年度工作总结暨“廉政门诊”现场观...</span>
              <span>2022-12-01</span>
            </li>
            <li>
              <span>2019年度党建工作汇报</span>
              <span>2022-12-02</span>
            </li>
            <li>
              <span>萧山公交聚焦二十大 公交人用心学、深情说</span>
              <span>2022-12-02</span>
            </li>
            <li>
              <span>萧山交投召开学习宣传贯彻党的二十大精神专题会议</span>
              <span>2022-12-03</span>
            </li>
            <li>
              <span>萧山交投召开学习宣传贯彻党的二十大精神专题会议</span>
              <span>2022-12-03</span>
            </li>
          </ul>
        </div>
        <div className='jiankang'>
          <div className='title2'>
            <h2>党性健康</h2>
          </div>
          <ul>
            <li>
              <span>集团公司行政支部开展党员廉政教育示范基地参观活动</span>
              <span>2022-12-03</span>
            </li>
            <li>
              <span>区领导对集团2017年度党风廉政建设责任制落实进行...</span>
              <span>2022-12-02</span>
            </li>
            <li>
              <span>固定主题党日活动 ——2017年度长运党内“双评”...</span>
              <span>2022-12-02</span>
            </li>
            <li>
              <span>交通建管公司召开党支部委员会换届选举党员大会</span>
              <span>2022-12-01</span>
            </li>
            <li>
              <span>固定主题党日活动 ——2017年度长运党内“双评”...</span>
              <span>2022-12-01</span>
            </li>
          </ul>
        </div>
      </div>
      {
        isClose ? <div className='tan'>
        <div className='til'>
          <h3>2022年度党建工作总结</h3>
          <img src={require('../../assess/party/icon_close3.png')} alt="" onClick={()=>panel()}/>
        </div>
        <p>
        来源：杭州萧山交通投资集团有限公司   日期：2022-12-03
        </p>
        <div className='wenzi'>        中共杭州萧山交通建设管理有限公司支部委员会：
          你支部《关于要求成立“12588”交通建设项目临时党支部的请示》（萧交建管党[2018]9号）已收悉。经集团党委会研究，同意成立12588”各交通建设项目临时党支部，具体批复如下：
          同意成立03省道义桥至楼塔段改建工程临时党支部；支部委员会成员由杨卫军、肖臻、吕刚三名同志组成；杨卫军同志任书记，肖臻同志任副书记。
          同意成立时代大道改建工程临时党支部；支部委员会成员由杨涌、马忠玉、豆德存三名同志组成；杨涌同志任书记，马忠玉同志任副书记。
          同意成立03省道东复线高架南延工程临时党支部；支部委员会成员由徐全民、关瑞峰、罗顺平三名同志组成；徐全民同志任书记，关瑞峰同志任副书记。
          同意成立红十五线改建工程临时党支部；支部委员会成员由龚铁峰、章国伟、瞿峰三名同志组成；龚铁峰同志任书记，章国伟同志任副书记。
          各临时党支部要认真宣传贯彻落实党的路线、方针、政策，执行集团党委有关决定和工作部署，紧紧围绕 “12588”交通工程项目建设中心，充分发挥党组织的战斗堡垒作用和党员的先锋模范作用，确保按期完成建设任务，努力将各项目打造成为精品工程、示范工程、廉洁工程。
          特此批复
          中共杭州萧山交通投资集团有限公司委员会
          2022年12月03日</div>
      </div> : null
      }
    </div>
  )
}
