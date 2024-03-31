import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const JWT_SECRET = 'your_jwt_secret_key';

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from request headers
    const token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // Check if user exists
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Add user to request object
    req.user = user;

    // Call next middleware
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authMiddleware;