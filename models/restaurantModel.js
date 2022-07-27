import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema({
    id: {
        //Proprietary //Generated while persisting restaurant
        type: Number,
        required: "Restaurant ID is required",
        unique: true,
        index: true
    },
   name: {
        //Proprietary
        type: String, //Assign it through z_restaurantName or s_restaurantName etc. 
        required: "Restaurant name is required",
        trim: true
    },/*
    url: {
        //Proprietary
        type: String, //Assign it through /jaipur/restaurants/id
        default: true,
        unique: true,
        trim: true
    },
    */

    restaurant_mapped_id: {
        z_id: {type: String, default: null, index: true},
        s_id: {type: String, default: null, index: true},
        d_id: {type: String, default: null, index: true},
        e_id: {type: String, default: null, index: true}
    },
    restaurant_mapped_name: {
        z_name: {type: String, default: null, index: true},
        s_name: {type: String, default: null, index: true},
        d_name: {type: String, default: null, index: true},
        e_name: {type: String, default: null, index: true}
    },
    restaurant_mapped_url: {
        z_url: {type: String, default: null, index: true},
        s_url: {type: String, default: null, index: true},
        d_url: {type: String, default: null, index: true},
        e_url: {type: String, default: null, index: true},
    },


    cft: {
        type: String,
        default: null
    },
    /*
    cftString: {
        //Proprietary
        type: String, //Assign it through cft 
        default: "",
        trim: true
    },
    */
    contact_details: [], //phone numbers string

    location: {
        address: {
            type: String, //full address
            default: "",
            trim: true
        },
        locality: {
            //to be mapped //Proprietary
            type: String,
            default: "",
            trim: true,
            required: true
        },
        city: {
            //set as jaipur for now
            type: String,
            default: "",
            required: true,
            trim: true
        },
        locality_source: {
            //need the source of locality either Zomato, Swiggy, Dienout, EazyDiner
            type: String,
            required: true, 
            trim: true
        },
        locality_id: {
            //to be mapped //Proprietary
            type: String,
            default: null,
            index: true
            //required: true
        },
        city_id: {
            type: Number,
            default: null,
            required: true,
            index: true
        },
        zipcode: {
            type: String,
            default: null,
        },
        latitude: {
            type: String,
            default: null
        },
        longtitude: {
            type: String,
            default: null
        }
        /*
        googleMapUrl: {
            //Proprietary
            type: String, // construct through lat, long
            default: null, 
            trim: true
        }*/
    },

    timings: [{
        days: {
            type: String,
            trim: true
        },
        timings: {
            type: String,
            trim: true
        }
    }],

    cuisines: [{
        cuisine_name: {
            //to be mapped //Proprietary
            type: String,
            trim: true
        },
        cuisine_id: {
            type: Number,
            default: null,
            index: true
        }
    }],

    delivery_rating: {
        z_rating: {
            rating: {
                type: Number,
                default: null
            },
            reviewCount: {
                type: Number,
                default: null
            }
        },
        s_rating:{
            rating: {
                type: Number,
                default: null
            },
            reviewCount: {
                type: Number,
                default: null
            }
        }
    },
    dining_rating: {
        z_rating: {
            rating: {
                type: Number,
                default: null
            },
            reviewCount: {
                type: Number,
                default: null
            }
        },
        d_rating: {
            rating: {
                type: Number,
                default: null
            },
            reviewCount: {
                type: Number,
                default: null
            }
        },
        e_rating: {
            rating: {
                type: Number,
                default: null
            },
            reviewCount: {
                type: Number,
                default: null
            }
        }
    },

    about: {
    features: [{
        //include features from all or prioritize features from one 
        type: String,
        trim: true
    }],
    top_tags: [{
        type: String,
        trim: true
    }],
    top_dishes: [{
        type: String,
        trim: true
    }],
    feature_rail: [{
        title: {type: String, default: null},
        subtitle: {type: String, default: null}
    }],
    people_liked: [{
        type: String,
        trim: true
    }]
    },

    chain_details: {
        chain_id: {type: Number, index: true, default: null},
        chain_res_url: {type: String, index: true, default: null},
        s_chain: {},
        z_chain: {},
        d_chain: {}
    },

    res_status: {
        z_isNew: {type: Boolean, default: null},
        s_isNew: {type: Boolean, default: null},
        d_isNew: {type: Boolean, default: null},
        e_isNew: {type: Boolean, default: null},
        z_opened: {type: Boolean, default: null}, //zomato isServicable
        s_opened: {type: Boolean, default: null}, //swiggy opened
        d_opened: {type: Boolean, default: null},
        e_opened: {type: Boolean, default: null}, //dineout current //dineout current
        isVeg: {type: Boolean, default: null}, //swiggy isVeg
        isCafe: {type: Boolean, default: null},//Swiggy cafe flag
        isNightlife: {type: Boolean, default: null}, //zomato flag,
        isDineout: {type: Boolean, default: null}, //either from Dineout, Eazydiner or Zomato
        isDelivery: {type: Boolean, default: null}, //either from Swiggy or Zomato // same as hasOnline Ordering
        // we are skipping tempClosed, PermClosed, isShelled, is OpeningSoon, current
    },

    offer_details: {
        zomato_offer: [{code: String, title: String, subtitle: String
        }],
        swiggy_offer: [{
            code: String, title: String, subtitle: String
        }],
        dineout_offer: [{
            code: String, title: String, subtitle: String
        }],
        eazydiner_offer: [{
            code: String, title: String, subtitle: String
        }]
    },

    images: {
        indexImage: {},
        all: []
    },

    menu: {
        type: String,
        default: null
    },
    /*
    menuId: {
        //menu type (Zomato, Swiggy), full menu, menuImages required to persist in Menu Model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menuModel'
    },*/
    resLicenses: [{
        type: {
            type: String,
            default: null
        },
        text: {
            type: String,
            default: null
        }
    }]
}, {timestamps: true})

const restaurantModel = mongoose.model('restaurantModel', restaurantSchema)

export default restaurantModel