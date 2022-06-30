import express from "express";
import mongoose from "mongoose";
import model from "../models/restaurantModel.js";
import  menuModel from "../models/menuModel.js";

const router = express.Router();

export const getRestaurants = async (req, res) => {
    const { page } = req.query
    try {
        const LIMIT = 10;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await model.countDocuments({})
        const restaurants = await model.find().sort({_id: -1}).limit(LIMIT).skip(startIndex)
            
        res.status(200).
        json({
            data: restaurants,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT),
            total})
    } catch (err) {
        res.status(500).json({ message: error.message })
    }
}


export const getRestaurantsById = async (req, res) => {
    const id = req.params.id;
  
    try {
      const restaurant = await model.findById(id);
      //console.log(restaurant)
      res.status(200).json(restaurant);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
}

export const getMenu = async (req, res) => {
    const id = req.params.id;
  
    try {
      const menuRestaurant = await menuModel.findById(id);
      //console.log(restaurant)
      res.status(200).json(menuRestaurant);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export const getOffers = async (req, res) => {
    const id = req.params.id

    try{
        const restaurant = await model.findById(id);
        var offers = {"zomato_offers": [], "swiggy_offers": [], "dineout_offers": [], "eazydiner_offers": []};
        offers.zomato_offers.push(restaurant.zomato_offer);
        offers.swiggy_offers.push(restaurant.swiggy_offer);
        offers.dineout_offers.push(restaurant.dineout_offer);
        offers.eazydiner_offers.push(restaurant.swiggy_offer);
        res.status(200).json(offers);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createRestaurant = async (req, res) => {
    const restaurant = req.body
    const newRestaurant = new model({
    ...restaurant,
    createdAt: new Date().toISOString(),
    })
    try {
        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const deleteRestaurant = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Restaurant with id: ${id}`);
  
    await model.findByIdAndRemove(id);
    res.status(204).json({ message: "Restaurant deleted successfully." });
}

export const updateRestaurant = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No Project with id: ${id}`);
    
        const result = await model.findByIdAndUpdate(id, updatedData, options)
        res.status(204).json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
  
export default router;

