const jwt = require('jsonwebtoken');

const sendResponse = (code, data, message, resp) => {
  resp.status(code).json({
    code,
    data,
    message,
  });
};

const sendUserData = (userData, resp) => {
  try {
    const jwtToken = jwt.sign(
      {
        role: userData.role,
        expiresIn: 60 * 60 * 24,
      },
      'your access token secret',
    );

    const successData = Object.assign({}, userData._doc, { token: jwtToken }, { expiresIn: 60 * 60 * 24 });

    sendResponse(200, successData, 'Data', resp);
  } catch (error) {
    sendResponse(400, [], JSON.stringify(error), resp);
  }
};

module.exports = { sendResponse, sendUserData };
