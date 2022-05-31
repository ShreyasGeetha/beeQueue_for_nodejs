
const fs = require('fs');

var succededJob = []

function save(succededJob) {
  var stream = fs.createWriteStream("C://test.txt", {flags:'a'});
    stream.write(JSON.stringify(succededJob) + ",\n");
}

/**
 * post processing, the job to be marked as successful in the que
 * que - hold the que instance
 * info - hold the time stamp of how many milliseconds/seconds the job took to run
 * 
 * @param {any} que 
 * @param {any} info 
 */
function onJobSucced(que, info) {

 que.on('succeeded', (job, result) => {
   var {time} = info.pop()
  //  console.log('sdfds',time)
  //  console.log(`Job ${job.id} succeeded with result: ${result}`);
  //  succededJob.push({id:job.id, status:job.status, totalExecutionTime:`${time}ms`, result:result})
  save({id:job.id, status:job.status, totalExecutionTime:`${time}ms`, result:result})
})
  
}

module.exports = {onJobSucced}