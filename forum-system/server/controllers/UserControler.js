import User from '../models/UserModel.js';

import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { email, password, username } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user
      const newUser = await User.create({ email, password, username });
   
      // Generate authentication token for the new user
      const token = jwt.sign({ _id: newUser._id }, "secret");
  
      res.json({ message: 'Registration successful', token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
// Fonction de connexion (login)
export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Vérification des informations d'identification
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Génération du jeton d'authentification
      const token = jwt.sign({ _id: user._id }, "secret");
  
      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };