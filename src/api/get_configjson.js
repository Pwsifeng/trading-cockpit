var config_json,
  xmlhttp = new XMLHttpRequest(),
  sessionStorage_configjson = JSON.parse(sessionStorage.getItem('configjson'))

if (sessionStorage_configjson) {
  config_json = sessionStorage_configjson
} else {
  xmlhttp.open('GET', './config.json', false)
  xmlhttp.send()
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    config_json = JSON.parse(xmlhttp.responseText)
    //缓存配置 防止主页同步刷新页面
    console.log('%c config.json配置:', 'color: red;font-size:13px', config_json)
    sessionStorage.setItem('configjson', JSON.stringify(config_json))
  }
}

export default config_json
