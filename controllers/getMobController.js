import express from "express";
import mongoose from "mongoose";
import restaurantModel from "../models/restaurantModel.js";
//import menuModel from "../models/menuModel.js";

const router = express.Router();

export const getLocalitiesByCity = async (req, res) => {  
    const city = req.params.city_id;
    var city_id = parseInt(city);

    try {
        const localities = await restaurantModel.aggregate([
            {$match: { "location.city_id" : city_id }},
            {$group: {_id: { "locality_id": "$location.locality_id", "locality": "$location.locality", "city": "$location.city", "city_id": "$location.city_id"}, res_count: {$sum: 1}}},
            {$sort: {"res_count": -1}},
            {$project: {
                "locality_id": "$_id.locality_id",
                "locality_name": "$_id.locality",
                "city_id": "$_id.city_id",
                "city": "$_id.city",
                "res_count": "$res_count",
                "_id": 0
            }}
        ]);

        res.status(200).json({
            localities: localities,
            totalLocalities: localities.length
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getCuisinesByCity = async (req, res) => { 
    const city = req.params.city_id;
    const city_id = parseInt(city);

    try {
        const cuisines = await restaurantModel.aggregate([
            {$match: {"location.city_id": city_id}},
            {$unwind : "$cuisines" },
            //{unwind: "$cuisines.cuisine_id" },
            {$group: {_id: {"cuisine_id":"$cuisines.cuisine_id", "cuisine_name": "$cuisines.cuisine_name"}, res_count: {$sum: 1}}},
            {$sort: {"res_count": -1}},
            {$project: {
                "cuisine_id": "$_id.cuisine_id",
                "cuisine_name": "$_id.cuisine_name",
                "res_count": "$res_count",
                "_id": 0,

            }}
        ])
        res.status(200).json({
            cuisines: cuisines,
            totalCuisines: cuisines.length
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    } 
}

export const getRestaurantsByCity = async (req, res) => {  
    const city = req.params.city_id;
    const city_id = parseInt(city);

    var { page } = req.query
    console.log(req.query, typeof(req.query), page)
    try {
        const LIMIT = 10;
        if(page == null) {page = 1}
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await restaurantModel.countDocuments({"location.city_id": city_id})
        const restaurants = await restaurantModel.find({ "location.city_id": city_id}).sort({id: 1}).limit(LIMIT).skip(startIndex)
            
        res.status(200).
        json({
            data: restaurants,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT),
            total})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getRestaurantById = async (req, res) => {  
    const id = req.params.id;
  
    try {
      const restaurant = await restaurantModel.find({id: id});
      res.status(200).json(restaurant);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
}

export const getRestaurantOffers = async (req, res) => {  
    const id = req.params.id;
  
    try {
      const restaurant = await restaurantModel.find({id: id}).select({"offer_details": 1 });
      res.status(200).json(restaurant);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
}

export const getRestaurantMenu = async (req, res) => {  
    const id = req.params.id;
  
    try {
      const restaurant = await restaurantModel.find({id: id}).select({"menu": 1 });
      res.status(200).json(restaurant);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
}


export const getRestaurantList = async (req, res) => {  
    const locality_id = req.query.loc;
    if (!locality_id) {res.json({err: "Locality is missing"})}
    
    var page
    if(req.query.page) { var page = req.query.page}

    //SORT
    var sortBy, sortObj
    if(req.query.SORT_BY) {sortBy = req.query.SORT_BY}

    if(req.query.SORT_BY && sortBy == "zomato_delivery_rating") {sortObj = {"delivery_rating.z_rating.rating": -1}}
    else if (req.query.SORT_BY && sortBy == "swiggy_delivery_rating") {sortObj = {"delivery_rating.s_rating.rating": -1}}
    else if (req.query.SORT_BY && sortBy == "zomato_dining_rating") {sortObj = {"dining_rating.z_rating.rating": -1}}
    else if (req.query.SORT_BY && sortBy == "dineout_dining_rating") {sortObj = {"dining_rating.d_rating.rating": -1}}
    else if (req.query.SORT_BY && sortBy == "eazydiner_dining_rating") {sortObj = {"dining_rating.e_rating.rating": -1}}
    else if (req.query.SORT_BY && sortBy == "alphabetical") {sortObj = {"name": 1}}
    else {sortObj = {"id": 1}}

    //Filters
    var filter = {"location.locality_id": locality_id}

    if(req.query.isVeg) {filter["res_status.isVeg"] = req.query.isVeg}
    if(req.query.isDining) {filter["res_status.isDineout"] = req.query.isDining}
    if(req.query.isDelivery) {filter["res_status.isDelivery"] = req.query.isDelivery}
    if(req.query.isNightlife) {filter["res_status.isNightlife"] = req.query.isNightlife}
    
    var cuisines = null
    if(req.query.cuisines) {
        var cuisine = req.query.cuisines
        cuisines = cuisine.split(',').filter(element => {
            if (element.trim() === '') {return false;}
            return !isNaN(element);
        }).
        map(element => {
            return Number(element);
        });
    }
      
    if(cuisines != null) {filter["cuisines.cuisine_id"] = {$in: cuisines}}

    try {      
        const LIMIT = 10;
        if(!page) {page = 1}
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await restaurantModel.countDocuments(filter)
        const restaurants = await restaurantModel.find(filter).sort(sortObj).limit(LIMIT).skip(startIndex)
            
        res.
        status(200).
        json({
            data: restaurants,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT),
            total})
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
}

export const searcbRestaurantsInCity = async(req, res) => {
    const city_id = req.params.city_id 
    try {
        const q = req.query.q
        if(!q) { res.status(404).json({error: "Search String is missing"})} 
        //let pattern = new RegExp(`/\\<${q}/`) 
        //console.log(q, pattern)

        const restaurants = await restaurantModel.find({"name": {'$regex' : q , '$options' : 'i'}, "location.city_id": city_id }).select({"id": 1, "name": 1, "location.locality": 1, "_id": 0})
        res.
        status(200).
        json({
            data: restaurants,
            total: restaurants.length
        })
    } catch (error) {
        res.status(404).json({ message: error.message})
    }

}

export default router