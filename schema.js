const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        location: Joi.string().trim().required(),
        country: Joi.string().trim().required(),
        price: Joi.number().min(0).required(), 
        image: Joi.string().uri().allow("", null),
        category:Joi.string().required(),
}).required()
});

module.exports.reviewSchema = Joi.object({
    Review: Joi.object({
        rating: Joi.number().min(1).max(5),
        comment: Joi.string().trim().required()
    }).required()
});