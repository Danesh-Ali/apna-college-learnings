const Joi = require("joi")

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().optional(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5).messages({
            'any.required': ' "rating" is required',
            'number.base': ' "rating" must be a number'
        }),
        comment: Joi.string().required().messages({
            'any.required': ' "comment" is required',
            'string.empty': ' "comment" cannot be empty'
        })
    }).required()
});




