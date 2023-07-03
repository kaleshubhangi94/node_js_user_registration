const User = require('../models/user.model');
const utils = require('../utils/utils');
require('dotenv').config();

class userController {
  constructor() {}

  async register(req, resp) {
    try {
      const userData = await User.findOne({
        email: req.body.email,
      });

      if (userData) {
        utils.sendResponse(403, [], 'User already exists', resp);
      } else {
        const user = await new User(req.body).save();
        user
          ? utils.sendResponse(200, user, 'User registration successful', resp)
          : utils.sendResponse(500, user, 'Internal Server Error', resp);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, resp) {
    try {
      const userData = await User.findOne({
        email: req.body.email,
      });
      if (userData) {
        userData.password !== req.body.password
          ? utils.sendResponse(403, [], 'Invalid password', resp)
          : utils.sendUserData(userData, resp);
      } else {
        utils.sendResponse(400, [], 'No data found', resp);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new userController();
