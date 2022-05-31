const Queue = require('bee-queue');
var qObjects = require('../Queue')
const Twitter = require('../QUEUE/Twitter')

let TO_BE_QUEUED = new Set()

/**
 * CreateQ creates an instance for every queue, there can be  only
 * one queue instance for each type.
 * For all Q creation, worker should be set as false - it also helps in
 * redis optimization
 * 
 * @param {boolean} [worker=false] 
 * @returns 
 */

function createQ(worker=false) {
  var queueName = Twitter.qName + 'Queue'
  console.log('queue name ', queueName)
    queueName = new Queue(Twitter.qName, {
      redis: {
      host: process.env.REDIS_IP,
      port: process.env.REDIS_PORT,
      db: 0,
      options: {},
    },
    isWorker: worker
    });
  Twitter.setObject(queueName)
  return queueName
}

module.exports = {
  TO_BE_QUEUED,
  createQ
}