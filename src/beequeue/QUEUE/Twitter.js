const qName = 'Twitter'
var TWITTER_OBJECT;

/**
 * gives back the current queue instance
 * 
 * @returns 
 */
function getObject() {
  return TWITTER_OBJECT;
}

function setObject(obj) {  
  TWITTER_OBJECT = obj;
  // console.log(TWITTER_OBJECT)
}

module.exports = {
  qName,
  TWITTER_OBJECT,
  setObject,
  getObject
};