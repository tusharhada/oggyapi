import fs from 'fs'
import mongoose from "mongoose";
import cuisineModel from '../models/cuisineModel.js';

const CONNECTION_URL = "mongodb+srv://oggy:oggy123@cluster0.w7mvm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const mapCuisines = async () => {
    try {
        const file = fs.readFileSync('./data.json')
        const data = JSON.parse(file)
        
        for(let restaurant of data.restaurantData) {
            const tempCuisineList = restaurant.cuisines
            let cuisineList = []

            for(let cuisineName of tempCuisineList) {
                let resultCuisine =  await cuisineModel.findOne({ $or: [ {'cuisine_name': cuisineName.cuisine_name}, {'mapped_cuisines': cuisineName.cuisine_name}]}, {cuisine_name: 1, cuisine_id: 1, _id: 0})

                if(resultCuisine) {
                    //console.log(resultCuisine)
                    var cuisine_name = resultCuisine.cuisine_name
                    var cuisine_id = resultCuisine.cuisine_id
                    cuisineList.push( {cuisine_name, cuisine_id})
                } else {
                    console.log("Cuisine doesn't exist for restaurant id: " + restaurant.id)
                }
            }
            
            const key = "cuisine_id"

            const tempArr = [...new Map(cuisineList.map(item =>
            [item[key], item])).values()];

            restaurant.cuisines = tempArr
        }

        console.log("done")
        fs.writeFileSync('./data.json', JSON.stringify(data), function writeJSON(err) {
            if (err) return console.log(err);
        })
    } catch (error) {
        console.log(error)
    }

}

mapCuisines()