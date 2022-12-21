import React, { useEffect, useState } from 'react'
import './index.scss'
import * as echarts from 'echarts'

export default function AssetManagement() {

  const [xiang,setXiang] = useState(false)
  const [xi,setXi] = useState(false)
  const [sty,setSty] = useState(false)
  const [css, setCss] = useState()

  const panelXiang = () => {
    console.log(111);
    setXiang(false)
  }

  const panelXi = () => {
    setXi(false)
  }

  const showXiang = () => {
    setXiang(true)
    setSty(true)
    setCss("shi1")
  }
  
  const showXi = () => {
    setXi(true)
  }

  useEffect(() => {
    var mychart = echarts.init(document.querySelector('.ech'))
    option && mychart.setOption(option)
  }, [])

  useEffect(() => {
    var leidachart = echarts.init(document.querySelector('.leida'))
    optionleida && leidachart.setOption(optionleida)
  }, [])

  const option = {
    title: {
      text: "201",
      subtext: "项目总数",
      left: '23%',
      top: '25%',
      textStyle: {
        fontSize: 18,
        color: "rgba(255, 255, 255, 1)"

      },
      subtextStyle: {
        fontSize: 18,
        color: "rgba(255, 255, 255, 1)"

      }

    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      top: '20%',  //
      left: '50%',
      // x: 'center',  //
      // x: 'right',      //可设定图例在左、右、居中
      y: 'center',
      textStyle: { color: "#fff" },
      formatter: function (name) {
        let data = option.series[0].data;
        let tarValue = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === name) {
            tarValue = data[i].value;
          }
        }
        // let arr = ['{a|'+name+'}{b|'+tarValue+'}'];
        let arr = [name + tarValue]
        return arr.join('\n');
      }
    },
    series: [
      {
        type: 'pie',
        center: ["30%", "50%"],
        radius: ['50%', '65%'],
        data: [
          { value: 67, name: '百万资金以下' },
          { value: 80, name: '百万资金' },
          { value: 42, name: '千万资金' },
          { value: 12, name: '上亿资金' },
        ],
        label: {
          normal: {
            show: false,
            color: '#fff',
            padding: [0, -90, 50, -90],
          },
        },
        labelLine: {
          show: false,
          //引导线颜色渐变
          lineStyle: {
            color: {
              type: 'linear',
              colorStops: [
                {
                  offset: 0,
                  color: '#45B2E0',
                },
                {
                  offset: 0.33,
                  color: '#D6AE4A',
                },
                {
                  offset: 0.67,
                  color: '#2CD146',
                },
                {
                  offset: 1,
                  color: '#E36868',
                },
              ],
            },
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10,
            width: 2,
          },
          smooth: 0,
          //第一条引导线长度
          length: 10,
          //第二条引导线长度
          length2: 20,
        },
        itemStyle: {
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
        emphasis: {
          label: {
            //hover时显示引导线
            show: true,
          },
          labelLine: {
            //hover时显示引导线
            show: true,
          },
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay(idx) {
          return Math.random() * 200;
        },
      },
      {
        type: 'pie',
        //内边框
        radius: ['54.2%', '55%'],
        center: ['30%', '50%'],
        // 鼠标移入变大
        hoverAnimation: false,
        //整圆
        data: [100],
        label: {
          show: false,
        },
      },
    ],
    color: ["#45B2E0 ", "#D6AE4A", "#2CD146", "#E36868"],
  };

  const optionleida = {
    title: {},
    legend: {
      data: ['Allocated Budget', 'Actual Spending']
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '创新型人才', max: 500 },
        { name: '新能源型人才', max: 500 },
        { name: '建设型人才', max: 500 },
        { name: '投资性人才', max: 500 },
        { name: '科研型人才', max: 500 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [451, 489, 400, 387, 345]
          }
        ],
        areaStyle: {
          color: '#22AFFF',
          opacity: 0.5
        }
      }
    ]
  };

  return (
    <div id='assetManagement'>
      <div className='party_bg'>
      </div>
      <div className='assetManagement-left animate__animated animate__fadeInLeft'>
        <div className='xiangmu'>
          <div className='title'>
            <h2>园区发展情况</h2>
          </div>
          <div className='intro'>

            <img src={require('../../assess/assetManagement/img_zcgl_1.png')} alt="" className='introimg' />
            {/* <div className='introduce'>
              <p>杭州萧山交通投资集团有限公司，作为我区交通基础设施投资建设、营运管理，以及交通国有资产经营、开发、管理主力军，一直以“壮大交通主业、
                赋能城市发展”为宗旨，形成了涵盖道路建设、公共交通（轨道交通）、安置房建设、 城市更新、土地开发、港口货运、交通能源、公路收费、
                矿山治理以及其他交通有关资源经营的业务布局。
              </p>
              <p>

                集团所属企业共26家（其中全资11家，参股15家），共有职工4300余人。其中，全资子公司12家。分别为：杭州萧山地铁投资开发有限公司...</p>
            </div> */}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;杭州萧山交通投资集团有限公司，作为我区交通基础设施投资建设、营运管理，以及交通国有资产经营、开发、管理主力军，一直以“壮大交通主业、
                赋能城市发展”为宗旨，形成了涵盖道路建设、公共交通（轨道交通）、安置房建设、 城市更新、土地开发、港口货运、交通能源、公路收费、
                矿山治理以及其他交通有关资源经营的业务布局。<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;集团所属企业共26家（其中全资11家，参股15家），共有职工4300余人。其中，全资子公司12家。分别为：杭州萧山地铁投资开发有限公司...
          </div>


        </div>

        <div className='zhuyewu'>
          <div className='title'>
            <h2>集团主营业务</h2>
          </div>
          <div className='xiang'>
            <div className='shi'>
              <p>交通工程</p>
            </div>
            <div className="shi" onClick={()=>showXiang()}>
              <p>浦阳江综合治理</p>
            </div>
            <div className='shi'>
              <p>资产运行</p>
            </div>
          </div>
          <div className='xiang'>
            <div className='shi'>
              <p>长途运输</p>
            </div>
            <div className='shi'>
              <p>公共交通</p>
            </div>
            <div className='shi'>
              <p>公里收费</p>
            </div>
          </div>
          <div className='xiang'>
            <div className='shi'>
              <p>加油加气</p>
            </div>
            <div className='shi'>
              <p>新能源汽车</p>
            </div>
            <div className='shi'>
              <p>交投养护</p>
            </div>
          </div>
          <div className='xiang'>
            <div className='shi'>
              <p>出租汽车服务管理</p>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className='other'>
          <div className='title'>
            <h2>其他资产</h2>
          </div>

          <ul>
            <li className='li'>
              <p>大型设备</p>
              <span>3045台</span>
            </li>
            <li className='li'>
              <p>代售小区</p>
              <span>8个</span>
            </li>
            <li className='li'>
              <p>集团下属安置房</p>
              <span>5600套</span>
            </li>
            <li className='li'>
              <p>投入资金</p>
              <span>2.05亿</span>
            </li>
            <li className='li'>
              <p>重型机械设备</p>
              <span>1500台</span>
            </li>
            <li className='li'>
              <p>车辆数量</p>
              <span>8900辆</span>
            </li>
          </ul>

        </div>
      </div>
      <div className='engin-right animate__animated animate__fadeInLeft'>
        <div className='jituan'>
          <div className='title2'>
            <h2>集团子公司</h2>
          </div>
          <div className='xiang'>
            {/* <div className='shu'>
              <p>杭州萧山地铁投资开发有限公司</p>
            </div>
            <div className='shu'>
            <p>杭州萧山长途汽车运输有限公司</p>
            </div>
            <div className='shu'>
            <p>杭州萧山路桥工程有限公司</p>
            </div>
            <div className='shu'>
            <p>杭州萧山交通建设管理有限公司</p>
            </div>
            <div className='shu'>
            <p>杭州萧山浦阳江建设开发有限公司</p>
            </div>
            <div className='shu'>
            <p>杭州萧山公路开发有限公司</p>
            </div>
            <div >
              <span>租售状态    58%</span>
            </div>
            <div className='shu2'>
            <p>杭州萧山交投出租汽车服务管理有限公司</p>
            </div> */}
            <ul>
              <li>
                <p>杭州萧山地铁投资开发有限公司</p>
              </li>
              <li>
                <p>杭州萧山路桥工程有限公司</p>
              </li>
              <li>
                <p>杭州萧山浦阳江建设开发有限公司</p>
              </li>
              <li className='li'>
                <p>杭州萧山交通建设管理有限公司</p>
              </li>
              <li>
                <p>杭州萧山长途汽车运输有限公司</p>
              </li>
              <li>
                <p>杭州萧山交投港区建设开发有限公司</p>
              </li>
            </ul>
            <div className='suo'>
              杭州萧山地铁投资开发有限公司
              <span></span>
            </div>

            <div className='gaikuang'>
              <p className='gtitle'>资产概况</p>
              <div className='gcontent'>
                <p>
                  <span>房源类型：商品房</span>
                  <span>出售比例：64%</span>
                </p>
                <p>
                  <span>投入资金：1.26亿</span>
                  <span>出租比例：23%</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='zhaoshang'>
          <div className='title2'>
            <h2>招商引资</h2>
          </div>
          <div className='ech' id='ech'>

          </div>
        </div>

        <div className='zhaocai'>

          <div className='title2'>
            <h2>招才引资</h2>
          </div>
          {/* <div className='zccontent'> */}

          <div>
            <ul>
              <li>
                <div className='leida' id='leida'>

                </div>

                <table className="table " border="0" >
                  <thead className='tabelhead'>
                    <tr>
                      <th>人才类型</th>
                      <th>总数</th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr>
                      <td>创新型人才</td>
                      <td>451</td>
                    </tr>
                    <tr>
                      <td>科研型人才</td>
                      <td>345</td>
                    </tr>
                    <tr>
                      <td>投资型人才</td>
                      <td>400</td>
                    </tr>
                    <tr>
                      <td>建设型人才</td>
                      <td>387</td>
                    </tr>
                    <tr>
                      <td>新能源人才</td>
                      <td>489</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>



        </div>

      </div>
      {
        xiang ? <div className='_xiang'>
          <div className='til'>
            <p>浦阳江综合治理</p>
            <img src={require('../../assess/assetManagement/icon_close.png')} onClick={()=>panelXiang()} alt=""/>
          </div>
          <ul>
            <li onClick={()=>showXi()}>1、浦阳江景观提升工程第三阶段顺利通过完工验收</li>
            <li>2、市委副书记、区委书记佟桂莉调研红湖矿治理项目</li>
            <li>3、市委副书记、区委书记佟桂莉调研红湖矿治理项目</li>
            <li>4、钱塘江沿江绿道项目第一次工地例会召开</li>
            <li>5、浦阳江开发公司组织开展安全生产管理培训</li>
            <li>6、钱塘江沿江绿道项目召开设计交底会议</li>
            <li>7、浦阳江开发公司对矿山生态治理项目进行调研检查</li>
            <li>8、集团党委书记、董事长祝关翔带队，对戴村镇南三...</li>
            <li>9、区委常委、常务副区长吴炜炜带队检查督导矿山生...</li>
            <li>10、市规划和自然资源局调研我区矿山生态治理项目</li>
            <li>11、浦阳江景观提升项目工地例会召开</li>
            <li>12、义桥区域所属矿山生态治理项目推进会召开</li>
          </ul>
        </div> :null
      }
      {
        xi ? <div className='_xi'>
          <div className='tl'>
            <p>浦阳江景观提升工程第三阶段顺利通过完工验收</p>
            <img src={require('../../assess/assetManagement/icon_close.png')} alt="" onClick={()=>panelXi()}/>
          </div>
          <div className='nei'>
            <p>来源：杭州萧山交通投资集团有限公司   日期：2021-12-23</p>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12月23日下午，浦阳江景观提升工程第三阶段组织召开完工验收会议。会议邀请了区农业农村局、区浦阳江流域管理中心、
              义桥镇等相关单位负责人参加。会议成立验收工作组，验收工作组通过现场查看，听取工程参建各方的工作报告，查阅工程档案资料等方式，
              充分了解工程建设情况。经认真讨论，一致认为浦阳江景观提升工程第三阶段已按设计要求建设完成，工程质量合格，符合相关规范要求，
              同意浦阳江景观提升工程第三阶段通过验收。该工程通过导视系统、城市家具、人文小品的设计，将浦阳江与沿线各镇的历史人文资源呈现出来，
              生态、环保和人文理念贯穿其中，山清水秀、生态宜居，形成浦阳江最靓丽的色彩。</div>
            <img src={require('../../assess/assetManagement/hui.png')} alt=""/>
          </div>

        </div> :null
      }
    </div>
  )
}
