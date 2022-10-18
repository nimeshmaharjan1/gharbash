import mongoose from "mongoose";

const productModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description cannot be empty"],
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
    maxLength: [12, "Price cannot exceed more than 12 characters."],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter the product's category."],
  },
  stock: {
    type: Number,
    required: [true, "Please enter the product's stock"],
    maxLength: [4, "Stock cannot exceed more than 4 characters!"],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  // reviews: [
  //   {
  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     rating: {
  //       type: Number,
  //       required: true,
  //     },
  //     comment: {
  //       type: String,
  //       required: true,
  //     },
  //     user: {
  //       type: mongoose.SchemaTypes.ObjectId,
  //       ref: "users",
  //       required: true,
  //     },
  //   },
  // ],
  // user: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: "users",
  //   required: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.models.products ||
  mongoose.model("products", productModel);
