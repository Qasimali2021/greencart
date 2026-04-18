// import { v2 as cloudinary } from "cloudinary";
// import Product from "../models/Product.js";
// import dotenv from "dotenv";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME.trim(),
//   api_key: process.env.CLOUDINARY_API_KEY.trim(),
//   api_secret: process.env.CLOUDINARY_API_SECRET.trim(),
// });

// //add product   /api/product/add

// export const addProduct = async (req, res) => {
//   try {
//     let productData = JSON.parse(req.body.productData);

//     const images = req.files;

//     let imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         let result = await cloudinary.uploader.upload(item.path, {
//           resource_type: "image",
//         });
//         return result.secure_url;
//       }),
//     );

//     await Product.create({ ...productData, image: imagesUrl });
//     res.json({ success: true, message: "Product Added" });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

// //Get product   /api/product/list

// export const productList = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.json({ success: true, products });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

// //Get single product   /api/product/id

// export const productById = async (req, res) => {
//   try {
//     const { id } = req.body;
//     const product = await Product.findById(id);
//     res.json({ success: true, product });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

// //Change product inStock  /api/product/stock

// export const changeStock = async (req, res) => {
//   try {
//     const { id, inStock } = req.body;
//     await Product.findByIdAndUpdate(id, { inStock });
//     res.josn({ success: true, message: "Stock Updated" });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";
import dotenv from "dotenv";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME.trim(),
  api_key: process.env.CLOUDINARY_API_KEY.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET.trim(),
});

//add product   /api/product/add

export const addProduct = async (req, res) => {
  try {
    console.log("controller Started");
    let productData = JSON.parse(req.body.productData);

    const images = req.files;
    console.log("promise started");
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME.trim(),
      api_key: process.env.CLOUDINARY_API_KEY.trim(),
      api_secret: process.env.CLOUDINARY_API_SECRET.trim(),
    });
    console.log("check: ", cloudinary.config().api_secret);
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );
    console.log("promise ended");
    await Product.create({ ...productData, image: imagesUrl });
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log("Error caught at controller: ", error.message);
    return res.json({ success: false, message: error.message });
  }
};

//Get product   /api/product/list

export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

//Get single product   /api/product/id

export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

//Change product inStock  /api/product/stock

export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
