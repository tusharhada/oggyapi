import fs from 'fs'
import cityModel from "../models/cityModel.js";
import mongoose from "mongoose";

const CONNECTION_URL = "mongodb+srv://oggy:oggy123@cluster0.w7mvm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const mapLocality = async () => {
    try {
        const file = fs.readFileSync('./data.json')
        const data = JSON.parse(file)
        
        for(let restaurant of data.restaurantData) {
            //const sourceType = restaurant.location.locality_source
            var tempLocality = restaurant.location.locality_id
            
            let resultLocality

            if(restaurant.location.locality_source == "dineout") {tempLocality = restaurant.location.locality}
            resultLocality =  await cityModel.findOne({ $or: [ {'z_locality_name': tempLocality}, {'s_locality_name': tempLocality}, {'d_locality_name': tempLocality}, {'e_locality_name': tempLocality}, {'locality_name': tempLocality}]}, {locality_name: 1, locality_code: 1, _id: 0, city_name: 1, city_id: 1})
            
            if(resultLocality) {            
            restaurant.location.locality = resultLocality.locality_name
            restaurant.location.locality_id = resultLocality.locality_code
            restaurant.location.city = resultLocality.city_name
            restaurant.location.city_id = resultLocality.city_id
            //console.log(restaurant.id)
            } else {
                console.log("Locality doesn't exist for restaurant id: " + restaurant.id)
            }
            
        }

        console.log("done")
        fs.writeFileSync('./data.json', JSON.stringify(data), function writeJSON(err) {
            if (err) return console.log(err);
        })
    } catch (error) {
        console.log(error)
    }

}

mapLocality()


