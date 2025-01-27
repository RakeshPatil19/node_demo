const jwt = require('jsonwebtoken');
  const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) return res.status(403).json({ error: 'Token required' });
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY); // Bearer <token>
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: 'Invalid Token' });
    }
  }
module.exports = {
  verifyToken
};
