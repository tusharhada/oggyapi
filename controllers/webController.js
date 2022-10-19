import express from "express";
import restaurantModel from "../models/restaurantModel.js";

const router = express.Router();

//Get All localities - Homepage
export const getLocalitiesByCity = async (req, res) => {
  const city = req.params.city_id;
  var city_id = parseInt(city);

  try {
    const localities = await restaurantModel.aggregate([
      { $match: { "location.city_id": city_id } },
      {
        $group: {
          _id: {
            locality_id: "$location.locality_id",
            locality: "$location.locality",
            city: "$location.city",
            city_id: "$location.city_id",
          },
          res_count: { $sum: 1 },
        },
      },
      { $sort: { res_count: -1 } },
      {
        $project: {
          locality_id: "$_id.locality_id",
          locality_name: "$_id.locality",
          city_id: "$_id.city_id",
          city: "$_id.city",
          res_count: "$res_count",
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      localities: localities,
      totalLocalities: localities.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get All Cuisines
export const getCuisinesByCity = async (req, res) => {
  const city = req.params.city_id;
  const city_id = parseInt(city);

  try {
    const cuisines = await restaurantModel.aggregate([
      { $match: { "location.city_id": city_id } },
      { $unwind: "$cuisines" },
      //{unwind: "$cuisines.cuisine_id" },
      {
        $group: {
          _id: {
            cuisine_id: "$cuisines.cuisine_id",
            cuisine_name: "$cuisines.cuisine_name",
          },
          res_count: { $sum: 1 },
        },
      },
      { $sort: { res_count: -1 } },
      {
        $project: {
          cuisine_id: "$_id.cuisine_id",
          cuisine_name: "$_id.cuisine_name",
          res_count: "$res_count",
          _id: 0,
        },
      },
    ]);
    res.status(200).json({
      cuisines: cuisines,
      totalCuisines: cuisines.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Restaurant Search/List Page
export const getRestaurantsList = async (req, res) => {
  const location_id = req.query.loc;
  const type = req.query.type;
  const q = req.query.q;

  if (!location_id || !type) {
    res.status(404).json({ error: "Input query is Invalid or Missing" });
    return;
  }

  var page;
  if (req.query.page) {
    var page = req.query.page;
  }

  //SORT
  var sortBy, sortObj;
  if (req.query.SORT_BY) {
    sortBy = req.query.SORT_BY;
  }

  if (req.query.SORT_BY && sortBy == "zomato_delivery_rating") {
    sortObj = { "delivery_rating.z_rating.rating": -1 };
  } else if (req.query.SORT_BY && sortBy == "swiggy_delivery_rating") {
    sortObj = { "delivery_rating.s_rating.rating": -1 };
  } else if (req.query.SORT_BY && sortBy == "zomato_dining_rating") {
    sortObj = { "dining_rating.z_rating.rating": -1 };
  } else if (req.query.SORT_BY && sortBy == "dineout_dining_rating") {
    sortObj = { "dining_rating.d_rating.rating": -1 };
  } else if (req.query.SORT_BY && sortBy == "eazydiner_dining_rating") {
    sortObj = { "dining_rating.e_rating.rating": -1 };
  } else if (req.query.SORT_BY && sortBy == "alphabetical") {
    sortObj = { name: 1 };
  } else {
    sortObj = { "delivery_rating.z_rating.rating": -1 };
  }

  const search = "^" + q;
  //Filters
  var filter;
  if (type == "City") {
    filter = { "location.city_id": location_id };
  } else if (type == "Locality") {
    filter = { "location.locality_id": location_id };
  } else {
    res.status(404).json({ error: "Location Type is Invalid" });
    return;
  }

  if (req.query.isVeg) {
    filter["res_status.isVeg"] = req.query.isVeg;
  }
  if (req.query.isDining) {
    filter["res_status.isDineout"] = req.query.isDining;
  }
  if (req.query.isDelivery) {
    filter["res_status.isDelivery"] = req.query.isDelivery;
  }
  if (req.query.isNightlife) {
    filter["res_status.isNightlife"] = req.query.isNightlife;
  }

  var cuisines = null;
  if (req.query.cuisines) {
    var cuisine = req.query.cuisines;
    cuisines = cuisine
      .split(",")
      .filter((element) => {
        if (element.trim() === "") {
          return false;
        }
        return !isNaN(element);
      })
      .map((element) => {
        return Number(element);
      });
  }

  if (cuisines != null) {
    filter["cuisines.cuisine_id"] = { $in: cuisines };
  }

  filter["name"] = { $regex: search, $options: "i" };

  try {
    const LIMIT = 12;
    if (!page) {
      page = 1;
    }
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await restaurantModel.countDocuments(filter);
    const restaurants = await restaurantModel
      .find(filter)
      .sort(sortObj)
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: restaurants,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Restaurant Overview Page
export const getRestaurantById = async (req, res) => {
  const id = req.params.id;

  try {
    const restaurant = await restaurantModel.find({ id: id });
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Restaurant Offers
export const getRestaurantOffers = async (req, res) => {
  const id = req.params.id;

  try {
    const restaurant = await restaurantModel
      .find({ id: id })
      .select({ offer_details: 1 });
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Restaurant Menu
export const getRestaurantMenu = async (req, res) => {
  const id = req.params.id;

  try {
    const restaurant = await restaurantModel
      .find({ id: id })
      .select({ menu: 1 });
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Autosuggestion Search Location
export const searchLocation = async (req, res) => {
  try {
    const location = req.query.loc;
    // if (!location) {
    //   res.status(404).json({ error: "Search String is missing" });
    //   return;
    // }

    const location_search = "^" + location;

    const localities = await restaurantModel
      .aggregate([
        {
          $match: {
            "location.locality": { $regex: location_search, $options: "i" },
          },
        },
        { $addFields: { "location.type": "Locality" } },
        {
          $group: {
            _id: {
              loc_id: "$location.locality_id",
              loc_name: "$location.locality",
              loc_city: "$location.city",
              loc_type: "$location.type",
              //city_id: "$location.city_id",
            },
          res_count: { $sum: 1 },
          },
        },
        { $sort: { res_count: -1 } },
        {
          $project: {
            _id: 0,
            loc_id: "$_id.loc_id",
            loc_name: "$_id.loc_name",
            loc_city: "$_id.loc_city",
            loc_type: "$_id.loc_type",
            // res_count: "$res_count",
          },
        },
      ])
      // .limit(12);

    const cities = await restaurantModel
      .aggregate([
        {
          $match: {
            "location.city": { $regex: location_search, $options: "i" },
          },
        },
        { $addFields: { "location.type": "City" } },
        {
          $group: {
            _id: {
              loc_id: "$location.city_id",
              loc_name: "$location.city",
              loc_city: "$location.city",
              loc_type: "$location.type",
              //city_id: "$location.city_id",
            },
          res_count: { $sum: 1 },
          },
        },
        { $sort: { res_count: -1 } },
        {
          $project: {
            _id: 0,
            loc_id: "$_id.loc_id",
            loc_name: "$_id.loc_name",
            loc_city: "$_id.loc_city",
            loc_type: "$_id.loc_type",
            // res_count: "$res_count",
          },
        },
      ])
      
      // .limit(12);

    const locations = [...localities, ...cities];
    //console.log(localities, cities)
    //const localities1 = await restaurantModel.find({"location.locality": {'$regex' : location, '$options' : 'i'}}).select({"location.locality_id": 1, "location.locality": 1, "_id": 0})
    res.status(200).json({
      location: locations,
      total: locations.length,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//AutoSuggestion Restaurant Search
export const searchRestaurantsByLocation = async (req, res) => {
  try {
    const location = req.query.loc;
    const type = req.query.type;
    const q = req.query.q;

    if (!location || !type) {
      res.status(404).json({ error: "Input query is Invalid or Missing" });
      return;
    }

    const search = "^" + q;
    var sortObj = { "delivery_rating.z_rating.rating": -1 };

    let restaurants;
    if (type == "City") {
      restaurants = await restaurantModel
        .find({
          name: { $regex: search, $options: "i" },
          "location.city_id": location,
        })
        .select({
          id: 1,
          name: 1,
          "location.locality": 1,
          "location.city": 1,
          "images.indexImage": 1,
          _id: 0,
        })
        .sort(sortObj)
        .limit(12);
    } else if (type == "Locality") {
      restaurants = await restaurantModel
        .find({
          name: { $regex: search, $options: "i" },
          "location.locality_id": location,
        })
        .select({
          id: 1,
          name: 1,
          "location.locality": 1,
          "location.city": 1,
          "images.indexImage": 1,
          _id: 0,
        })
        .sort(sortObj)
        .limit(12);
    } else {
      res.status(404).json({ error: "Location Type is Invalid" });
      return;
    }

    res.status(200).json({
      data: restaurants,
      total: restaurants.length,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRestaurantChains = async (req, res) => {};

export default router;
