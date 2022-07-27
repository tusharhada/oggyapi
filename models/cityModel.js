import mongoose from 'mongoose'

const citySchema = new mongoose.Schema({
        locality_code: {
            //Proprietary
            type: String,
            required: true
        },
        locality_name: {
            //Proprietary
            type: String,
            required: true
        },
        locality_url: {
            //assigned through locality_name and city_name
            type: String
        },
        restaurant_locality_count: {
            //assigned through another query
            type: Number,
            //required: true,
            default: 0
        },
        z_locality_name: [{
            type: String,
            index: true
        }],
        s_locality_name: [{
            type: String,
            index: true
        }],
        d_locality_name:  [{
            type: String,
            index: true
        }],
        e_locality_name:  [{
            type: String,
            index: true
        }],
        city_id: {
            //Proprietary
            type: Number,
            required: "City ID can't be empty",
            trim: true,
            index: true
        },
        city_name: {
            //Proprietary
            type: String,
            required: "City name can't be empty",
            trim: true,
            index: true
        },
        country_id: {
            //Proprietary
            type: Number,
            required: "Country ID can't be empty",
            trim: true,
        },
        country_name: {
            //Proprietary
            type: String,
            required: "Country name can't be empty",
            trim: true,
        },
        restaurant_city_count: {
            //assigned through another query
            type: Number,
            //required: true,
            default: 0
        }
},{timestamps: true})

//skipped locality_url, city_url

const cityModel = mongoose.model('cityModel', citySchema)

export default cityModel