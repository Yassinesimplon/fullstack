import express from 'express';
import { createPlace } from '../controllers/PlaceController.js';
import { protect } from '../Middleware/authMiddleware.js';
import { deletePlace, getAllPlaces, getPlaceById, updatePlace } from '../controllers/PlaceController.js';
import { login } from '../controllers/UserControler.js';

const placeRouter = express.Router();

// Crée une nouvelle publication de lieu (authentification requise)
placeRouter.post('/addPlace', protect, createPlace).get('/all', protect, getAllPlaces).get('/:id',protect, getPlaceById).put('/:id', protect, updatePlace).delete('/:id',protect, deletePlace).post("/login",login)






export default placeRouter;
