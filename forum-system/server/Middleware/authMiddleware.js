import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export const protect = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, "SECRET");
    const { _id } = decodedToken;
    req.user = await User.findOne({ _id }).select('_id');
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Invalid token' });
  }
};
