const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');
const User = db.User;

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  forgetPassword,
  changePassword
}

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if(user && bcrypt.compareSync(password, user.hash)) {
    const { hash, answerHash, question, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, config.secret);
    return {...userWithoutHash, token};
  }
}

async function forgetPassword({ username, question, answer }) {
  const user = await User.findOne({ username });
  if(user &&
    question === user.question &&
    bcrypt.compareSync(answer, user.answerHash)) {
    const { hash, answerHash, question, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, config.secret);
    return {...userWithoutHash, token};
  }
}

async function changePassword ({ username, password }) {
  const user = await User.findOne({ username });
  if(user && password) {
    user.hash = bcrypt.hashSync(password, 10);
    await user.save();
  } else {
    throw 'Username doesn\'t exist or password is missing.';
  }
}

async function getAll() {
  return await User.find().select('-hash');
}

async function getById(id) {
  return await User.findById(id).select('-hash -answerHash -question');
}

async function create(userParam) {
  if(await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }
  const user = new User(userParam);

  if(userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  if(userParam.answer) {
    user.answerHash = bcrypt.hashSync(userParam.answer, 11);
  }

  await user.save((err, doc) => {
    if(err) {
      console.log(err);
    }
  });
}

async function update(id, userParam) {
  const user = await User.findById(id);

  if(!user) {
    throw 'User not found';
  } else if(user.username !== userParam.username &&
      await User.findOne({ username: userParam.username })) {
      throw 'Username "' + userParam.username + '" is already taken';
  }

  if(userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
