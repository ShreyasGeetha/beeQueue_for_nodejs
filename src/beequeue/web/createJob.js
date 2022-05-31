
/**
 * Here the jobs are created and to be scheduled for queuing 
 * @param {*} que 
 * @param {*} jobName 
 * @returns 
 */
module.exports =  function createJob(que, jobName) {
  var job = jobName + 'Job'
  job =  que.createJob({x: 2, y: 3});
  return job
}