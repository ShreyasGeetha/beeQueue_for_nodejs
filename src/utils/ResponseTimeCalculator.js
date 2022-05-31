var axios = require('axios');
var ttime = ''

function totalTime(ttime) {  
  return ttime
}

async function startTime() {
  await axios.interceptors.request.use(x => {
    // to avoid overwriting if another interceptor
    // already defined the same object (meta)
    x.meta = x.meta || {}
    x.meta.requestStartedAt = new Date().getTime();
    return x;
  })
}
  

async function endTime() {  
  axios.interceptors.response.use(x => {
    console.log(`Execution time for: ${x.config.url} - ${new Date().getTime() - x.config.meta.requestStartedAt} ms`)
    ttime =  new Date().getTime() - x.config.meta.requestStartedAt;
    totalTime(ttime)
    return x
  }) 
}

module.exports = {
  startTime,
  endTime,
  ttime,
  totalTime
}