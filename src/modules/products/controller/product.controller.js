import productModel from "../../../../db/Models/product.js";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid'; 
import categoryModel from "../../../../db/Models/category.js";

// Configure multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() +"_"+ file.originalname);
  }
})

// Initialize multer upload middleware
const upload = multer({ storage: storage })

// Middleware to handle single file upload for product images
export const addimg = upload.single('productImage');

// Function to add a new product
export const addProduct = async (req, res) => {
  try {
    const {
      productName,
      slug,
      priceAfterDiscount,
      finalPrice,
      stock,
    } = req.body;

    // Find category by ID
    const category = await categoryModel.findById(req.body.category)
    if (!category) {
      return res.send({ message: "This category does not exist" });
    }

    // Create a new product with uploaded image URL
    const newProduct = new productModel({
      productName,
      slug,
      priceAfterDiscount,
      finalPrice,
      category: category._id,
      stock,
      productImage: "http://localhost:5000/uploads/" + req.file.filename,
    });

    // Save the new product
    const addedProduct = await newProduct.save();

    res.json({ message: 'Product added successfully', addedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update an existing product
export const updateProduct = async (req, res) => {
  try {
      const productId = req.params.productId;
      const updateData = req.body;

      console.log("Product ID:", productId);
      console.log("Update Data:", updateData);

      // Update the product
      const updatedProduct = await productModel.findByIdAndUpdate(productId, updateData, { new: true });

      console.log("Updated Product:", updatedProduct);

      if (updatedProduct) {
          res.json({ message: 'Product updated successfully', product: updatedProduct });
      } else {
          res.status(404).json({ message: 'Product not found' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find and delete the product by ID
    const deletedProduct = await productModel.findByIdAndDelete(productId);

    if (deletedProduct) {
      res.json({ message: 'Product deleted successfully', product: deletedProduct });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
};

// Function to get all products with pagination
export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const skip = (page - 1) * pageSize;

    // Fetch products with pagination
    const products = await productModel
      .find()
      .skip(skip)
      .limit(parseInt(pageSize))
      .exec();

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get all products in a specific category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.body;

    // Find the category by name
    const theCategory = await categoryModel.findOne({ categoryName: category });
    if (!theCategory) {
      return res.send({ message: "This category does not exist" });
    } else {
      // Find all products in the category and populate the category field
      const products = await productModel.find({ category: theCategory._id }).populate("category");
      res.send({ category: category, data: products });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
