import mongoose from "mongoose";

const menuSchema =  new mongoose.Schema({
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: "restaurant ID can't be empty",
      ref: 'restaurantModel'
    },
    vendorMenuType: {
      type: String,
      default: null,
      trim: true 
    },
    vendorMenu: [],
    restaurantMenuImages: [{
      image_type: String, imageUrl: String
    }]
  },
  { timestamps: true });

const menuModel = mongoose.model("menuModel", menuSchema);

export default menuModel;

