const { optional } = require("joi");

const Joi = require("joi").defaults((schema) => {
  switch (schema.type) {
    case "string":
      return schema.replace(/\s+/, " ");
    default:
      return schema;
  }
});

module.exports.login = Joi.object({
  name: Joi.string().min(5).max(15).required(),
  email: Joi.string().email().required(),
  pasword: Joi.string().min(5).required(),
  mobile: Joi.string().min(10).required(),
  Language:Joi.array().optional(),
  deviceType: Joi.string().optional(),
});

module.exports.loginUser = Joi.object({
  email: Joi.string().email().required(),
  pasword: Joi.string().required(),
});
module.exports.registerUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().required(),
  pasword: Joi.string().optional(),
});
// .or("email","mobile");

module.exports.changePassword = Joi.object({
  pasword: Joi.string().required(),
  email: Joi.string().required(),
  newPasword: Joi.string().required(),
});
// module.exports.sendOtp = Joi.object({
//   email: Joi.string().email().optional(),
//   mobile: Joi.string()
//     .regex(/^[0-9]{5,}$/)
//     .optional(),
// //   dialCode: Joi.string()
//     // .regex(/^+?[0-9]{1,}$/)
//     // .optional(),
// });
module.exports.verifyOtp = Joi.object({
    email: Joi.string().email().optional(),
    secretCode: Joi.string().required(),
});
module.exports.updateProfile = Joi.object({
  email:Joi.string().email().optional().allow(""),
  phoneNo:Joi.string().email().optional(),
  countryCode: Joi.string().optional().allow(""),
  lastName: Joi.string().allow("").optional(),
  image:Joi.string().allow("").optional(),
  document:Joi.array().optional(),
  birthDate:Joi.string().optional(),
  nationality:Joi.string().optional(),
  address:Joi.string().optional(),
  longitude:Joi.string().optional(),
  deviceToken:Joi.string().optional().allow(""),
  deviceType: Joi.string().optional().allow(),
  countryCodephoneNo:  Joi.number().optional(),

});
