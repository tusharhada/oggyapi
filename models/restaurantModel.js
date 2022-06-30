import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema({
    restaurant_id: String,
    restaurant_name: String,
    restaurant_url: String,
    //restaurant_title: String,
    restaurant_mapped_id: {
        restaurant_zomato_id: String,
        restaurant_swiggy_id: String,
        restaurant_dineout_id: String,
        restaurant_eazydiner_id: String
    },
    restaurant_mapped_name: {
        restaurant_zomato_id: String,
        restaurant_swiggy_id: String,
        restaurant_dineout_id: String,
        restaurant_eazydiner_id: String
    },
    restaurant_mapped_url: {
        restaurant_zomato_url: String,
        restaurant_swiggy_url: String,
        restaurant_dineout_url: String,
        restaurant_eazydiner_url: String
    },
    dining_rating: {
        dining_zomato_rating: {reviewCount: String, rating: String},
        dining_dineout_rating:  {reviewCount: String, rating: String},
        dining_eazydiner_rating:  {reviewCount: String, rating: String},
    },
    delivery_rating: {
        delivery_zomato_rating:  {reviewCount: String, rating: String},
        delivery_swiggy_rating:  {reviewCount: String, rating: String}
    },
    restaurant_address: {
        address: String,
        locality_code: String,
        locality_name: String,
        locality_url: String,
        city_name: String,
        city_id: Number,
        city_url: String
    },
    restaurant_scrap_url: {
        restaurant_zomato_scrap_url: String,
        restaurant_swiggy_scrap_url: String,
        restaurant_dineout_scrap_url: String,
        restaurant_eazydiner_scrap_url: String,
    },
    directions: {
        google_maps_url: String,
        latitude: String,
        longitude: String
    },
    contact_details: {
        phone: [String]
    },
    cuisines: [{
        cuisine_name: String,
        cuisine_url: String
    }],
    timings: [{
        timing: String,
        //days: String
    }],
    images: [String],
    index_image: String,
    zomato_offer: [{
        code: String, title: String, subtitle: String
    }],
    swiggy_offer: [{
        code: String, title: String, subtitle: String
    }],
    dineout_offer: [{
        code: String, title: String, subtitle: String
    }],
    eazydiner_offer: [{
        code: String, title: String, subtitle: String
    }],
    cost_for_two: String,
    features: [String],
    feature_rail: [String],
    people_liked: [String],
    top_dishes:[String],
    top_tags: [String],
    category: String,
    chain: Boolean,
    chain_url: String,
    isNewDineout: Boolean,
    isNewSwiggy: Boolean,
    isNewZomato: Boolean,
    isVeg: Boolean,
    fssaiNo: String,
    menuType: String,
},
{ timestamps: true}
)

const locality_data = ({
    _id: String,
    city_name: String,
    city_id: Number,
    restaurant_city_count: Number,
    city_url: String,
    localties: [{
        locality_code: Number,
        locality_name: String,
        locality_url: String,
        restaurant_locality_count: String,
        zomato_locality: String,
        swiggy_locality: String,
        dineout_locality: String,
        eazydiner_locality: String
    }]
},{timestamps: true})

const cuisine_data = ({
    _id: String,
    cuisine_name: String,
    cuisine_url: String
}, {timestamps: true})

const restaurantModel = mongoose.model('restaurantModel', restaurantSchema)

export default restaurantModel