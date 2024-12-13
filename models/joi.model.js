const Joi = require("joi");

const userJoiSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    "string.min": "Username must be at least 3 characters long",
    "any.required": "Username is required",
  }),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.length": "Phone number must be exactly 11 digits long",
      "string.pattern.base": "Phone number must contain only digits",
      "any.required": "Phone number is required",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email":
        "Invalid email format. Please provide a valid email address.",
      "any.required": "Email is required.",
    }),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~-]).{6,}$/)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "string.pattern.base":
        "Password must contain at least one special character",
      "any.required": "Password is required",
    }),
  address: Joi.string().optional(),
});

const logJoiSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

const updateProfileJoiSchema = Joi.object({
  username: Joi.string().min(3).optional().messages({
    "string.min": "Username must be at least 3 characters long",
    "any.required": "Username is required",
  }),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .optional()
    .messages({
      "string.length": "Phone number must be exactly 11 digits long",
      "string.pattern.base": "Phone number must contain only digits",
      "any.required": "Phone number is required",
    }),
  address: Joi.string().optional(),
});

const menuSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Name is required",
  }),
  description: Joi.string().min(5).required().messages({
    "string.min": "Description must be at least 5 characters long",
    "any.required": "Description is required",
  }),
  price: Joi.array().required().messages({
    "any.required": "Price is required",
  }),
  category: Joi.string().min(3).required().messages({
    "string.min": "Category must be at least 3 characters long",
    "any.required": "Category is required",
  }),
});

const updateMenuSchema = Joi.object({
  name: Joi.string().min(3).optional().messages({
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Name is required",
  }),
  description: Joi.string().min(5).optional().messages({
    "string.min": "Description must be at least 5 characters long",
    "any.required": "Description is required",
  }),
  price: Joi.array().optional().messages({
    "any.required": "Price is required",
  }),
  category: Joi.string().min(3).optional().messages({
    "string.min": "Category must be at least 3 characters long",
    "any.required": "Category is required",
  }),
});

const categorySchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Name is required",
  }),
});

const orderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        menuItemId: Joi.string()
          .required()
          .pattern(/^[0-9a-fA-F]{24}$/)
          .messages({ "string.pattern.base": "Invalid menu item ID format" }),
        quantity: Joi.number().required().integer().min(1).messages({
          "number.min": "Quantity must be at least 1",
        }),
        size: Joi.string().valid("Small", "Medium", "Large").default("Small"),
      })
    )
    .required()
    .messages({ "array.base": "Items must be an array of objects" }),
});

const orderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("Pending", "Preparing", "Completed", "Cancelled")
    .required(),
});

const reservationSchema = Joi.object({
  date: Joi.string().required(),
  time: Joi.string().required(),
  guests: Joi.number().required(),
});

const updateReservationSchema = Joi.object({
  date: Joi.string().optional(),
  time: Joi.string().optional(),
  guests: Joi.number().optional(),
});

const reviewSchema = Joi.object({
  menuItemId: Joi.string().required(),
  rating: Joi.number().valid(1, 2, 3, 4, 5).required(),
  comment: Joi.string().required(),
});

const updateReviewSchema = Joi.object({
  rating: Joi.number().valid(1, 2, 3, 4, 5).optional(),
  comment: Joi.string().optional(),
});

module.exports = {
  userJoiSchema,
  logJoiSchema,
  updateProfileJoiSchema,
  menuSchema,
  updateMenuSchema,
  categorySchema,
  orderSchema,
  orderStatusSchema,
  reservationSchema,
  updateReservationSchema,
  reviewSchema,
  updateReviewSchema,
};
