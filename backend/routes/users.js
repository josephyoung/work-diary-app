var express = require('express');
var router = express.Router();
const userService = require('services/user.service');

router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/forget', forget);
router.post('/restore', changePW);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

function forget(req, res, next) {
  userService.forgetPassword(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({
      message: 'Username or question or answer is incorrect'
    }))
    .catch(err => next(err));
}

function changePW(req, res, next) {
  userService.changePassword(req.body)
    .then(result => res.json(result))
    .catch(err => next(err));
}

function authenticate(req, res, next) {
  userService.authenticate(req.body)
      .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
      .catch(err => next(err));
}

function register(req, res, next) {
  userService.create(req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
}

function getAll(req, res, next) {
  userService.getAll()
      .then(users => res.json(users))
      .catch(err => next(err));
}

function getCurrent(req, res, next) {
  userService.getById(req.user.sub)
      .then(user => user ? res.json(user) : res.sendStatus(404))
      .catch(err => next(err));
}

function getById(req, res, next) {
  userService.getById(req.params.id)
      .then(user => user ? res.json(user) : res.sendStatus(404))
      .catch(err => next(err));
}

function update(req, res, next) {
  userService.update(req.params.id, req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
}

function _delete(req, res, next) {
  userService.delete(req.params.id)
      .then(() => res.json({}))
      .catch(err => next(err));
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
