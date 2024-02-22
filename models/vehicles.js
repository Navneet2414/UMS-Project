const mongoose = require('mongoose');
const VehicaleSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      typeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VehicleType",
      },
      makeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VehicleMake",
      },
      modelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VehicleModel",
      },
      yearId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VehicleYear",
      },
      trimId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VehicleTrim",
      },
      color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VehicleColor",
      },
      catalogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VehicleCatalog",
      },
  
      type: {
        type: String,
        required: true,
      },
      make: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      trim: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      image: {
        type: [],
        default: [],
      },
      document: {
        type: [],
        default: [],
      },
      isImageApproved: {
        type: Boolean,
        default: false,
      },
  
      regionalSpace: {
        type: String,
        required: true,
      },
  
      location: {
        type: String,
        required: true,
      },
      latitude: {
        type: Number,
        default: 0,
      },
      longitude: {
        type: Number,
        default: 0,
      },
      rangeMin: {
        type: Number,
        required: true,
      },
      rangeMax: {
        type: Number,
        required: true,
      },
  
      doors: {
        type: Number,
        required: true,
      },
      seat: {
        type: Number,
        required: true,
      },
      bettrySize: {
        type: Number,
        required: true,
      },
      horsepower: {
        type: Number,
        required: true,
      },
      accerelation: {
        type: Number,
        required: true,
      },
      chargingTime: {
        type: Number,
        required: true,
      },
      dcCharging: {
        type: Boolean,
        default: false,
      },
      checkbox: {
        type: Boolean,
        default: false,
      },
      dailyRate: {
        type: String,
        required: true,
      },
      adddurationdiscount: [
        {
          days: Number,
          price: Number,
        },
      ],
      drivingmilagelimit: {
        type: Boolean,
        default: false,
      },
      dailylimit: {
        type: Number,
        required: true,
      },
      weeklylimit: {
        type: Number,
        required: true,
      },
      monthlimit: {
        type: Number,
        required: true,
      },
      costforextrakm: {
        type: Number,
        required: true,
      },
      delivaryavailiable: {
        type: Boolean,
        default: false,
      },
      city: {
        type: String,
        required: true,
      },
      cityDeliveryFee: [
        {
          cityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City",
          },
          cityName: String,
          deliveryPrice: Number,
        },
      ],
      isDeleted: {
        type: Boolean,
        default: false,
      },
      isApproved: {
        type: Boolean,
        default: false,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
      status: {
        type: String,
        default: "REQUESTED",
        enum: ["REQUESTED", "APPROVED", "REJECTED", "MODIFIED"],
      },
      remark: {
        type: String,
        default: "",
      },
      countBooking: {
        type: Number,
        default: 0,
      },
      lastBookingDate: {
        type: Date,
      },
      bookingStatus: {
        type: String,
        default: " ",
      },
      againBookedDays: {
        type: Number,
        default: 0,
      },
      createdBy: {
        type: String,
        default: "user",
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
      // category :{
      //     type: String,
      //     required: true
      // }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("vehical", VehicaleSchema);
  