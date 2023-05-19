import mongoose from 'mongoose';


const placeSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  // },
  description: {
    type: String,
    required: true,
  },
  // rating: {
  //   type: Number,
  //   default: 0,
  //   required: true,
  // },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Place = mongoose.model('Place', placeSchema);

export default Place;
