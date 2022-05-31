const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const fetchTweets = require('../beequeue/web/queue')
const {getObject} = require('../beequeue/QUEUE/Twitter')
const fs = require('fs');

var succededJobData = []

function showCompletedTask() {
   fs.readFile('C://test.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
     }
    succededJobData = data
    return data
   });
}

/**
 * A new request is made to fetch the data by creating a new job
 */
const createTask = catchAsync(async (req, res) => {
  fetchTweets()
  res.status(httpStatus.CREATED).send({message:'task created sucessfully'})
});

/**
 * listTask - shows the tasks which are scheduled to queue and completed.
 */
const listTask = catchAsync(async (req, res) => {
  const q = getObject()
  var waiting = []

   waiting = await q.getJobs('waiting', { start: 0, end: 25 })
     .then((jobs) => {
       const jobIds = jobs.map((job) => {
       return {id:job.id,status:job.status, result: job.result}
       })
       return jobIds
      });
      
  showCompletedTask()
  res.send({waiting:waiting, succeded:succededJobData})
  
});

/**
 * completedTask shows all the jobs that were processed since the 
 * beginning of the system
 */
const completedTask = catchAsync(async (req, res) => {
  showCompletedTask()
  console.log(succededJobData) 
  res.send(succededJobData)
});

module.exports = {
  createTask,
  listTask,  
  completedTask
};
