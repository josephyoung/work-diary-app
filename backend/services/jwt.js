const expressJWT = require('express-jwt');
const config = require('config.json');
const userService = require('services/user.service');

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJWT({ secret, isRevoked }).unless({
    path: [
      '/users/authenticate',
      '/users/register',
      '/users/forget',
    ]
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  return user ? done() : done(null, true);
}
