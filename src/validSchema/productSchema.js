import Joi from "joi";

export const productSchema = Joi.object({
    title: Joi.string().required().min(6).max(255).messages({
		"string.base": "Title must be a string",
		"string.empty": "Title cannot be empty",
		"string.min": "Title must have at least 6 characters",
		"string.max": "Title must have at most 255 characters",
	}),

    price: Joi.number().required().min(0).messages({
		"string.base": "Title must be a number",
		"string.empty": "Title cannot be empty",
		"string.min": "Price minimum value is 0",
	}),

    description: Joi.string().messages({
        "string.base": "description must be a string",
    }),

    images: Joi.string().messages({
        "string.base": "images must be a string",
    }),

})