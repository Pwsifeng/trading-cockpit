import React, { useEffect, useState } from 'react'
import { useAtom } from "jotai";
import { alarmList_atom } from "../../jotai/store";
import './index.scss'
import * as echarts from 'echarts'
import { getViewer } from '../../components/mapViewer'
import { Common } from '../../utils/mapMethods';
import PubSub from 'pubsub-js'
import { Select } from 'antd';


const onSearch = (value) => {
  console.log('search:', value);
};

export default function Smart() {

  const [alarmList] = useAtom(alarmList_atom)
  const [isClose, setClose] = useState(false)
  const [viedo, setViedo] = useState(false)
  const tianqi = useState(true)
  const [qu, setQu] = useState([])
  const [jian, setJian] = useState(["一单元西侧监控", "休闲健身区北门监控", "六单元北侧监控", "西大门2号高空监控", "一单元西侧监控", "东大门1号高空监控", "东大门2号高空监控"])

  const onChange = (value) => {
    console.log(`selected ${value}`);
    if (value === "北干街道城北村尚博苑小区") {
      var pos = {
        x: "120.04740815490837",
        y: "28.871361801904253",
        z: "421.2813391197838",
        pitch: "62.2325325012207",
        yaw: "81.93594360351562",
        roll: "0.00023457124189008027"
      }
      Common.initializationPosition(getViewer(), pos)
      setClose(true)
      setJian(["六单元北侧监控", "西大门2号高空监控", "一单元西侧监控", "东大门1号高空监控", "东大门2号高空监控", "尚博苑小区西侧监控", "休闲健身区北门监控"])
      setQu([{ name: "北干街道城北村尚博苑小区", num: "730000.8平方米", time: "2019年12月04日" }])
    }
    if (value === "北干街道塘湾村城中村改造安置小区") {
      var pos = {
        x: "120.04931990051678",
        y: "28.87366199436026",
        z: "399.1913403589818",
        pitch: "52.57296371459961",
        yaw: "90.18561553955078",
        roll: "0.00023881754896137863"
      }
      Common.initializationPosition(getViewer(), pos)
      setClose(true)
      setJian(["一单元西北侧监控", "西大门2号高空监控", "塘湾村西侧监控", "东大门1号高空监控", "东大门2号高空监控", "一单元西侧监控", "塘湾村北门监控"])
      setQu([{ name: "北干街道塘湾村城中村改造安置小区", num: "563259.1平方米", time: "2022年06月17日" }])
    }
    if (value === "高田社区城中村安置房") {
      var pos = {
        x: "120.05215117970408",
        y: "28.871621035015963",
        z: "370.91844068634776",
        pitch: "69.84806823730469",
        yaw: "91.30973815917969",
        roll: "0.0005699911271221936"
      }
      Common.initializationPosition(getViewer(), pos)
      setClose(true)
      setQu([{ name: "高田社区城中村安置房", num: "100079.7平方米", time: "2023年01月" }])
    }
    if (value === "永久社区城中村安置房") {
      var pos = {
        x: "120.05127476979062",
        y: "28.872707587177036",
        z: "355.74282001851907",
        pitch: "51.82918167114258",
        yaw: "81.93450164794922",
        roll: "0.0003066914505325258"
      }
      Common.initializationPosition(getViewer(), pos)
      setJian(["永久社区北侧监控", "西大门2号高空监控", "永久社区西侧监控", "东大门2号高空监控", "一单元西侧监控", "永久社区北门监控", "东大门1号高空监控"])
      setQu([{ name: "永久社区城中村安置房", num: "127989.9平方米", time: "2023年01月" }])
      setClose(true)
    }
    if (value === "新塘街道和平桥村城中村") {
      var pos = {
        x: "120.05040452893999", 
        y: "28.87116094453654",
        z: "350.1169128589938",
        pitch: "49.785797119140625",
        yaw: "80.62055206298828",
        roll: "0.00026711542159318924"
      }
      Common.initializationPosition(getViewer(), pos)
      setQu([{ name: "新塘街道和平桥村城中村", num: "413983.38平方米", time: "2023年03月" }])
      setClose(true)
    }
  };

  useEffect(() => {
    PubSub.publish("state", tianqi);
  }, [])

  const panel = () => {
    setClose(false)
  }

  const panelimg = () => {
    setViedo(false)
  }

  const showClose = () => {
    setClose(true)
  }

  const showviedo = () => {
    setViedo(true)
  }

  useEffect(() => {
    var mychart = echarts.init(document.querySelector('#ech'))
    option && mychart.setOption(option)
  }, [])

  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      top: '28%',  //
      left: '70%',
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
        let arr = [name + tarValue]
        return arr.join('\n');
      }
    },
    tooltip: {
      trigger: 'item',
      borderColor: 'rgba(255,255,255,.3)',
      backgroundColor: 'rgba(13,5,30,.6)',
      borderWidth: 1,
      padding: 5,
      formatter: function (parms) {
        var str = parms.marker + "" + parms.data.name + "</br>" +
          "数量：" + parms.data.value + "</br>" +
          "占比：" + parms.percent + "%";
        return str;
      }
    },
    series: [
      {
        type: 'pie',
        z: 3,
        clockwise: true,
        avoidLabelOverlap: true,
        hoverOffset: 15,
        center: ["40%", "50%"],
        radius: ['50%', '65%'],
        data: [
          { value: 9450, name: '湿垃圾' },
          { value: 8820, name: '干垃圾' },
          { value: 8505, name: '厨房垃圾' },
          { value: 4725, name: '有害垃圾' },
        ],
        label: {
          show: true,
          position: 'outside',
          formatter: '{a|{b}：{d}%}\n{hr|}',
          rich: {
            hr: {
              backgroundColor: 't',
              borderRadius: 3,
              width: 3,
              height: 3,
              padding: [3, 3, 0, -12]
            },
            a: {
              padding: [-10, 15, -10, 10]
            }
          }
        },
        labelLine: {
          normal: {
            length: 10,
            length2: 20,
            lineStyle: {
              width: 1
            }
          }
        },
      },
    ],
    color: ["#45B2E0 ", "#D6AE4A", "#2CD146", "#E36868"],
  };

  return (
    <div id='smart'>
      <div className='smart-left animate__animated animate__fadeInLeft'>
        <div className='xiaoqu'>
          <div className='title'>
            <h2>智慧小区概况</h2>
          </div>
          <div className='xiang'>
            <div className='shu'>
              <span>小区数量</span>
              <p>5</p>
            </div>
            <div className='mian'>
              <span>总户数</span>
              <p>10343户</p>
            </div>
            <div className='shi'>
              <span>占地面积</span>
              <p>194.53万平方米</p>
            </div>
          </div>
        </div>
        <div className='jiankong'>
          <div className='title'>
            <h2>重点监控</h2>
          </div>
          <div className='sel'>
            {/* <span>北干街道塘湾村城中村改造安置小区</span> */}
            <Select
              showSearch
              placeholder="请选择"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  value: '北干街道塘湾村城中村改造安置小区',
                  label: '北干街道塘湾村城中村改造安置小区',
                },
                {
                  value: '北干街道城北村尚博苑小区',
                  label: '北干街道城北村尚博苑小区',
                },
                {
                  value: '高田社区城中村安置房',
                  label: '高田社区城中村安置房',
                },
                {
                  value: '永久社区城中村安置房',
                  label: '永久社区城中村安置房',
                },
                {
                  value: '新塘街道和平桥村城中村',
                  label: '新塘街道和平桥村城中村',
                },
              ]}
            />
          </div>
          {/* <ul>
            <li className='li'>
              <span></span>
              <p>一单元西侧监控</p>
              <img src={require('../../assess/images/icon_play.png')} alt="" onClick={() => showviedo()} />
            </li>
            <li className='li'>
              <span></span>
              <p>休闲健身区北门监控</p>
              <img src={require('../../assess/images/icon_play.png')} alt="" onClick={() => showviedo()} />
            </li>
            <li className='li'>
              <span></span>
              <p>二单元北侧监控</p>
              <img src={require('../../assess/images/icon_play.png')} alt="" onClick={() => showviedo()} />
            </li>
            <li className='li'>
              <span></span>
              <p>大门高空监控</p>
              <img src={require('../../assess/images/icon_play.png')} alt="" onClick={() => showviedo()} />
            </li>
            <li className='li'>
              <span></span>
              <p>大门高空监控</p>
              <img src={require('../../assess/images/icon_play.png')} alt="" onClick={() => showviedo()} />
            </li>
            <li className='li'>
              <span></span>
              <p>大门高空监控</p>
              <img src={require('../../assess/images/icon_play.png')} alt="" onClick={() => showviedo()} />
            </li>
            <li className='li'>
              <span></span>
              <p>大门高空监控</p>
              <img src={require('../../assess/images/icon_play.png')} alt="" onClick={() => showviedo()} />
            </li>
          </ul> */}
          <ul>
            {
              jian.map((item, index) => {
                return (
                  <li className='li'>
                    <span></span>
                    <p>{item}</p>
                    <img src={require('../../assess/images/icon_play.png')} alt="" onClick={() => showviedo()} />
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className='jing'>
          <div className='title'>
            <h2>事件告警</h2>
          </div>
          <ul>
            <li>
              <img src={require('../../assess/images/img_gj_1.1.png')} alt="" />
              <div>
                <p><span>生人入侵</span><span>待处理</span></p>
                <p><span></span><span>2022-12-02 13:54:16</span></p>
                <p><span></span><span>浙江省杭州市萧山区北干银河实验小学东南(博学路南)</span></p>
              </div>
            </li>
            <li>
              <img src={require('../../assess/images/img_gj_1.2.png')} alt="" />
              <div>
                <p><span>生人入侵</span><span>待处理</span></p>
                <p><span></span><span>2022-11-27 21:54:16</span></p>
                <p><span></span><span>浙江省杭州市萧山区永久路与博学路交叉口东北120米</span></p>
              </div>
            </li>
            <li>
              <img src={require('../../assess/images/img_gj_1.3.png')} alt="" />
              <div>
                <p><span>生人入侵</span><span>待处理</span></p>
                <p><span></span><span>2022-11-26 21:54:16</span></p>
                <p><span></span><span>浙江省杭州市萧山区</span></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className='smart-right animate__animated animate__fadeInLeft'>
        <div className='laji'>
          <div className='title2'>
            <h2>垃圾分类统计</h2>
          </div>
          <div className='ech' >
            {/* <img src={require('../../assess/images/img_1_garbage.png')} alt="" /> */}
            <div id='ech'>

            </div>
            <p></p>
          </div>
        </div>
        <div className='fangyi'>
          <div className='title2'>
            <h2>防疫数据</h2>
          </div>
          <div className='ti1'>
            <p>在园人员健康码数据</p>
          </div>
          <div className='yi'>
            <div className='lu'>
              <span className='name'>绿码</span>
              <p><span>46533</span>
                <span>/人</span></p>
            </div>
            <div className='huang'>
              <span className='name'>黄码</span>
              <p><span>26</span>
                <span>/人</span></p>
            </div>
            <div className='hong'>
              <span className='name'>红码</span>
              <p><span>1</span>
                <span>/人</span></p>
            </div>
          </div>
          <div className='ti1 ti2'>
            <p>内部人员异常健康码情况</p>
          </div>
          <div className='yi'>
            <div className='lu'>
              <span className='name'>绿码</span>
              <p><span>8200</span>
                <span>/人</span></p>
            </div>
            <div className='huang'>
              <span className='name'>黄码</span>
              <p><span>18</span>
                <span>/人</span></p>
            </div>
            <div className='hong'>
              <span className='name'>红码</span>
              <p><span>4</span>
                <span>/人</span></p>
            </div>
          </div>
        </div>
        <div className='zong'>
          <div className='title2'>
            <h2>设备管理</h2>
          </div>
          <ul>
            <li>
              <img src={require('../../assess/images/icon_jk_2.png')} alt="" />
              <div>
                <p><span>监控总数</span></p>
                <p>
                  <span>63200</span>
                  <span>/个</span>
                  <span>在线:</span>
                  <span>62983</span>
                  <span>离线:</span>
                  <span>217</span>
                </p>
              </div>
            </li>
            <li>
              <img src={require('../../assess/images/icon_zhuji.png')} alt="" />
              <div>
                <p><span>主机总数</span></p>
                <p>
                  <span>12033</span>
                  <span>/个</span>
                  <span>在线:</span>
                  <span>11896</span>
                  <span>离线:</span>
                  <span>137</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {
        viedo ? <div className='viedo'>
          <div className='tl'>
            <h3>视频预览</h3>
            <img src={require('../../assess/images/icon_close.png')} alt="" onClick={() => panelimg()} />
          </div>
          <video controls src={require('../../assess/shipin/zjjj.mp4')} preload autoplay muted loop id="video">

          </video>
        </div> : null
      }

      {
        isClose ?
          <div className='qu'>
            {
              qu.map((item, index) => {
                return (
                  <>
                    <div className='top'>
                      <p>{item.name}</p>
                      <img src={require('../../assess/images/icon_close.png')} alt="" onClick={() => panel()} />
                    </div>
                    <div className='til1' >
                      <p>面积</p>
                    </div>
                    <div className='m'>
                      {item.num}
                    </div>
                    <div className='til2'>
                      <p>建成年月</p>
                    </div>
                    <div className='m1'>
                      {item.time}
                    </div>
                  </>
                )
              })
            }
          </div> : null
      }
    </div>
  )
}
