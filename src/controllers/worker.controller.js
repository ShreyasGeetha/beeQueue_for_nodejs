const {createQ} = require('../beequeue/web/createQ')
var axios = require('axios');
const { startTimer } = require('../config/logger');
const time = require('../utils/ResponseTimeCalculator')
const { isQueueReady } = require('../beequeue/worker/isQueueReady');
const { onJobSucced } = require('../beequeue/worker/onJobSucced');

var jobData = []

// creates a new queue for the worker to start processing the job
var que = createQ(true)

// before processing ensure the queue is ready, else thrown an error
isQueueReady(que)

// process the job in the queue
processJob(que) 

// once job is processed, mark it successful and move to completed jobs
onJobSucced(que, jobData)

/**
 * que is the instance of the current queue to process the jobs
 * 
 * @param {any} que 
 */
function processJob(que) {

  // we are recording the start time of processing 
  time.startTime()
  
  // process the job - since my twitter account is suspended, I am using spacexdata to make api call
  que.process(async (job) => {     
    var data = await axios.get('https://api.spacexdata.com/v3/capsules')
      .then((res) => res.data) 
    return JSON.stringify(data.length)     
  })

  // here we are recording the end time of processing and calculating, how much time it took to process this job request
   axios.interceptors.response.use(x => {   
     var time = new Date().getTime() - x.config.meta.requestStartedAt;
     jobData.push({time})
    return x
   }) 
  
}
  

