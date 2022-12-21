import React from 'react'
import './index.scss'

export default function Caryun() {
  return (
    <div id='caryun'>
      <div className='smart-left animate__animated animate__fadeInLeft'>
        <div className='che'>
          <div className='title'>
            <h2>车辆定位</h2>
          </div>
          <div className='sel'>
            <span>请输入车牌号</span>
            <img src={require('../../assess/caryun/icon_resarch2.png')} alt="" />
          </div>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <td>车牌号</td>
                <td>最新位置</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>浙A·66356</td>
                <td>浙江省杭州市萧山区临浦镇蓬山韩村</td>
              </tr>
              <tr>
                <td>浙A·15656</td>
                <td>浙江省杭州市萧山区临萧山党支部</td>
              </tr>
              <tr>
                <td>浙A·77656</td>
                <td>杭州市萧山区来娘线晓轩西北侧约70米</td>
              </tr>
              <tr>
                <td>浙A·35656</td>
                <td>浙江省杭州市萧山区白曹线</td>
              </tr>
              <tr>
                <td>浙A·89656</td>
                <td>浙江省杭州市萧山区所前镇</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='chezai'>
          <div className='title'>
            <h2>车载视频</h2>
          </div>
          <div className='sel'>
            <span>请输入车牌号</span>
            <img src={require('../../assess/caryun/icon_resarch2.png')} alt="" />
          </div>
          <ul>
            <li>
              <span>浙A·66356</span>
              <img src={require('../../assess/images/icon_play.png')} alt="" />
            </li>
            <li>
              <span>浙A·66356</span>
              <img src={require('../../assess/images/icon_play.png')} alt="" />
            </li>
            <li>
              <span>浙A·66356</span>
              <img src={require('../../assess/images/icon_play.png')} alt="" />
            </li>
            <li>
              <span>浙A·66356</span>
              <img src={require('../../assess/images/icon_play.png')} alt="" />
            </li>
            <li>
              <span>浙A·66356</span>
              <img src={require('../../assess/images/icon_play.png')} alt="" />
            </li>
            <li>
              <span>浙A·66356</span>
              <img src={require('../../assess/images/icon_play.png')} alt="" />
            </li>
            <li>
              <span>浙A·66359</span>
              <img src={require('../../assess/images/icon_play.png')} alt="" />
            </li>
            <li>
              <span>浙A·66358</span>
              <img src={require('../../assess/images/icon_play.png')} alt="" />
            </li>
            <li>
              <span>浙A·66356</span>
              <img src={require('../../assess/images/icon_play.png')} alt="" />
            </li>
          </ul>
        </div>
      </div>
      <div className='party-right animate__animated animate__fadeInLeft'>
        <div className='yixin'>
          <div className='title2'>
            <h2>新能源充电桩</h2>
          </div>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <td>充电桩编号</td>
                <td>对接系统</td>
                <td>使用状态</td>
                <td>充电功率</td>
                <td>总用电量</td>
                <td>总收益(元)</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0001</td>
                <td>MSC</td>
                <td className='si'>使用中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0002</td>
                <td>MSC</td>
                <td className='ci'>空闲中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0003</td>
                <td>MSC</td>
                <td className='ci'>空闲中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0004</td>
                <td>MSC</td>
                <td className='ci'>空闲中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0005</td>
                <td>MSC</td>
                <td className='si'>使用中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0006</td>
                <td>MSC</td>
                <td className='si'>使用中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0007</td>
                <td>MSC</td>
                <td className='ci'>空闲中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0008</td>
                <td>MSC</td>
                <td className='si'>使用中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0009</td>
                <td>MSC</td>
                <td className='ci'>空闲中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0010</td>
                <td>MSC</td>
                <td className='ci'>空闲中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0011</td>
                <td>MSC</td>
                <td className='ci'>空闲中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0012</td>
                <td>MSC</td>
                <td className='si'>使用中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0013</td>
                <td>MSC</td>
                <td className='si'>使用中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0014</td>
                <td>MSC</td>
                <td className='si'>使用中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0015</td>
                <td>MSC</td>
                <td className='ci'>空闲中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0016</td>
                <td>MSC</td>
                <td className='si'>使用中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0017</td>
                <td>MSC</td>
                <td className='ci'>空闲中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0018</td>
                <td>MSC</td>
                <td className='si'>使用中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0019</td>
                <td>MSC</td>
                <td className='si'>使用中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
              <tr>
                <td>0020</td>
                <td>MSC</td>
                <td className='si'>使用中</td>
                <td>7kw</td>
                <td>111.5kWh</td>
                <td>6000.04</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
