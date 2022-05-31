const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {

  // console.log('Hey who is the user ', err, 'info ', info, 'user ',user, 'required rights ', requiredRights)

  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    // console.log('userRights ', userRights)
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    console.log('hasRequiredRights ', hasRequiredRights)

    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }
  resolve();
};

const auth = (...requiredRights) => async (req, res, next) => {
  // console.log(' we are checking what the req is ', req)
  // console.log('HEY')

  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
