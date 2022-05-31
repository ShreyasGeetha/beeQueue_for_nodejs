/**
 * 
 * Queue should be ready and basic health check to be maintained 
 * before the jobs are sent for processing
 * 
 * @param {any} que 
 */
function isQueueReady(que) {
  que
  .ready()
  .then(async (queue) => {
    console.log('isRunning:', queue.isRunning());
    const checkHealth = await queue.checkHealth();
    console.log('checkHealth:', checkHealth);
  })
  .catch((err) => console.log('unreadyable', err));
}

module.exports = {
  isQueueReady
}