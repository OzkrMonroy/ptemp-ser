const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');

  if(!token){
    return res.status(401).json({ msg: 'There\'s no token, permission denied' });
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET_WORD);
    req.user = verifiedToken.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'It\'s not a valid token' });
  }
}

module.exports = authMiddleware;