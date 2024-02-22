const Joi = require("joi").defaults((schema) => {
    switch (schema.type) {
      case "string":
        return schema.replace(/\s+/, " ");
      default:
        return schema;
    }
  });
  Joi.objectId = () => Joi.string().pattern(/^[0-9a-f]{24}$/, "valid ObjectId");
module.exports.register = Joi.object({
    firstName: Joi.string().required(),
    countryCodephoneNo:Joi.number().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    deviceType: Joi.string().allow("WEB", "IOS", "ANDROID").optional(),
    deviceToken: Joi.string().optional(),
  }).or("phoneNo", "email","countryCodephoneNo");
  
  module.exports.vehicle = Joi.object({
    typeId: Joi.objectId().optional(),
    makeId:Joi.objectId().optional(),
    modelId:Joi.objectId().optional(),
    yearId:Joi.objectId().optional(),
    color:Joi.objectId().optional(),
    catalogId: Joi.string().required(),
    type:Joi.string().required(),
    category:Joi.objectId().optional(),
    model: Joi.string().optional(),
    regionalSpace: Joi.string().required(),
    year: Joi.number().required(),
    location: Joi.string().required(),
    rangeMax:Joi.number().required(),
    rangeMin:Joi.number().optional(),
    color: Joi.string().required(),
    doors:Joi.number().required(),
    seat:Joi.number().required(),
    batterySize:Joi.number().required(),
    horsepower:Joi.number().required(),
    acceleration: Joi.number().required(),
    chargingtime: Joi.number().required(),
    trim: Joi.string().required(),
    city:Joi.string().required(),
    cityDeliveryFee:Joi.array().items(Joi.optional()),
    costforextrakm: Joi.number().required(),
    monthlimit: Joi.number().required(),
   weeklylimit: Joi.number().required(),
   dailylimit:Joi.number() .required(),
   days:Joi.number().optional(),
   adddurationdiscount:Joi.array().items(Joi.optional()),
   dailyrate: Joi.boolean().required(),
   dcCharging:Joi.boolean().required(),
   isActive: Joi.boolean().optional(),
   document: Joi.boolean().optional,
   image: Joi.boolean().optional,


  });