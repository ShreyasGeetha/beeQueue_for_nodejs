
/**
 * Here the jobs will be pushed onto redis queue for processing
 * 
 * @param {any} job 
 */
async function pushToQ(job, jq) {

  await job.save(function (err) {
    if (err) {
      console.log('job failed to save');
      return res.send('job failed to save');
    }    
  }).then((res) => {
    console.log('job ', res.id, ' has been pushed to Q')
  })

}

module.exports = {
  pushToQ
}
