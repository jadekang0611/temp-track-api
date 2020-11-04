const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
  } catch (e) {
    res.status(400).send('Invalid Token');
  }
};

// This middleware is used to make specific routes protected.
