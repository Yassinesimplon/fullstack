import Place from "../models/PlaceModel.js";

// Crée une nouvelle publication de lieu
export const createPlace = async (req, res) => {
  // const { name, description, rating } = req.body;
  const { description } = req.body;

  const userId = req.user.id; // Supposons que vous avez l'ID de l'utilisateur dans req.user.id

  try {
    const place = new Place({
      // name,
      description,
      // rating,
      userId,
    });

    const newPlace = await place.save();
    res.status(201).json(newPlace);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find().populate("userId"); // Populate permet de remplacer l'ID de l'utilisateur par ses informations de profil
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Récupérer un lieu par son ID
export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate(
      "userId"
    ); // Même principe qu'au-dessus
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Mettre à jour un lieu existant
export const updatePlace = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedPlace = await Place.findOneAndUpdate(
      { _id: req.params.id, creator: req.user._id },
      { name, description },
      { new: true } // Pour renvoyer le document modifié plutôt que l'original
    );
    if (!updatedPlace) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.json(updatedPlace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Supprimer un lieu
export const deletePlace = async (req, res) => {
  try {
    const deletedPlace = await Place.findOneAndDelete({
      _id: req.params.id,
      creator: req.user._id,
    });
    if (!deletedPlace) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.json(deletedPlace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


