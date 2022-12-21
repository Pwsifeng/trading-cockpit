import React, { useEffect, useState } from 'react'
import './index.scss'
import moment from 'moment/moment'
import Pubsub from 'pubsub-js'

const Head = (props) => {

  const { cenel } = props
  const [timeNow, setTime] = useState({ date: "", week: "", time: "" })
  const [title, setTitle] = useState('萧山交投集团数字化平台')
  const [tian, setTian] = useState(true)
  const [tianqi,setTianqi] = useState()

  useEffect(()=> {
    Pubsub.subscribe("state",(_,item)=>{
      console.log(item);
      setTianqi(item)
    })
  },[])

  // 给父组件传值
  const showTian = (val) => {
    console.log(val);
    cenel(val)
  }
  
  const Panel = () => {
    // setTian(true)
    console.log(1);
    setTian(false)
  }

  useEffect(() => {
    showtime()
  }, [])

  const getWeek = (date) => { // 参数时间戳
    let week = moment(date).day()
    switch (week) {
      case 1:
        return '星期一'
      case 2:
        return '星期二'
      case 3:
        return '星期三'
      case 4:
        return '星期四'
      case 5:
        return '星期五'
      case 6:
        return '星期六'
      case 0:
        return '星期天'
    }
  }

  //当前时间
  const showtime = () => {
    setTime({ date: moment().format('YYYY-MM-DD'), week: moment().format('dddd'), time: moment().format('HH：mm：ss') })
    setTimeout(showtime, 1000)
  }

  return (
    <div id='head'>
      <div className='title'>
        {title}
      </div>
      <div className='shi'>
        <div className='zuo'>
          {timeNow.time}
        </div>
        <div className='you'>
          <p>{timeNow.date}</p>
          <p>{getWeek()}</p>
        </div>
      </div>
      {
        tianqi ?
        <div className='tian' onClick={()=> showTian(true)}>
        天气模拟
      </div> :null
      }
      
    </div>
  )
}

export default Head;

