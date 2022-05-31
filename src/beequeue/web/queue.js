const Queue = require('bee-queue');
const createQ = require('./createQ')
const createJob = require('./createJob')
const {pushToQ} = require('./pushToQ')
const Twitter = require('../QUEUE/Twitter')

/**
 * this function creates job for every request made for task,
 * then it will be pushed on to the queue for scheduling to get processed
 * 
 */
 async function fetchTweets() {
   const job = createJob(Twitter.getObject(), Twitter.qName)
   
   await pushToQ(job)
  
}

module.exports = fetchTweets