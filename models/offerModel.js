import mongoose from 'mongoose'

const offerSchema = new mongoose.Schema({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'restaurantModel'
    },
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
}, { timestamps: true})

const offerModel = mongoose.model('offerModel', offerSchema)

export default offerModel