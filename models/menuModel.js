import mongoose from "mongoose";

const menuSchema =  new mongoose.Schema({
    _id: String,
    menuType: String,
    menu: [{}],
    zomatoMenuImages: [{ type: String, imageUrl: String }],
    dineoutMenuImages: [{ type: String, imageUrl: String }],
    eazydinerMenuImages: [{ type: String, imageUrl: String }],
  },
  { timestamps: true });

const menuModel = mongoose.model("menuModel", menuSchema);

export default menuModel;
