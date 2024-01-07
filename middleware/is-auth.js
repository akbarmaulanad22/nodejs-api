const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const headerToken = req.get('Authorization');
  if (!headerToken) {
    const error = new Error("You're not allowed to access");
    error.statusCode = 401;
    throw error;
  }

  const token = headerToken.split(' ')[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, 'istnotsecretbruh');
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodedToken) {
    const error = new Error("You're not allowed to access");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
