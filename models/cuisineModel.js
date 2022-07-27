import mongoose from 'mongoose'

const cuisineSchema = new mongoose.Schema({
    cuisine_id: {
        //Propreitary
        type: Number,
        required: true
    },
    cuisine_name: {
        type: String,
        required: "Cuisine name can't be empty",
        trim: true
    },
    mapped_cuisines: [{
        type: String,
        trim: true
    }]
}, { timestamps: true})

const cuisineModel = mongoose.model('cuisineModel', cuisineSchema)

export default cuisineModel