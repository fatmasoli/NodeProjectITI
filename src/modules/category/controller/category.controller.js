
import categoryModel from "../../../../db/Models/category.js";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid'; 
import userModel from "../../../../db/Models/user.js";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() +"_"+ file.originalname);
    }
  })
  
const upload = multer({ storage: storage })
export const addimg=upload.single('categoryImage')
// ************************************* addCategory
export const addCategory = async (req, res) => {
    const { categoryName, categoryImage } = req.body;
    const createdBy = await userModel.findById(req.body.createdBy)
    const foundedCategory = await categoryModel.findOne({
      categoryName: categoryName,
      
    });
    if (foundedCategory) return res.send({ message: "category already exists" });
    const newCategory = await categoryModel.insertMany({
      categoryName,
      categoryImage:"http://localhost:5000/uploads/"+req.file.filename,
      createdBy,
    });
    res.send({ message: "category created", category: newCategory });
  };

// ************************************* updateCategory


export const updateCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const User = await userModel.findById(req.userId);
    const foundedCategory = await categoryModel.findById(id);

    if (!foundedCategory) {
      return res.json({ message: "Category not found" });
    }

    if (User && (User._id.equals(foundedCategory.createdBy) || User.role === "admin")) {
      const { categoryName, categoryImage } = req.body;
      
      await categoryModel.findByIdAndUpdate(id, {
        categoryName,
        categoryImage,
      });

      const updatedCategory = await categoryModel.findById(id);
      return res.json({ message: "Updated", category: updatedCategory });
    } else {
      return res.json({ message: "Cannot update" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// ************************************ deleteCategory

export const deleteCategory = async (req, res) => {
  try {
      const categoryId = req.params.id;

      const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);

      if (deletedCategory) {
          res.json({ message: 'category deleted successfully', category: deletedCategory });
      } else {
          res.status(404).json({ message: 'category not found' });
      }
  } catch (error) {
      res.status(500).json({ message: error.message, data: null });
  }
};

//  ************************************** GetALlCategory

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.json({ message: 'Categories retrieved successfully', categories });
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
};


// *********************************** get specific category by id

export const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryModel.findById(categoryId);

    if (category) {
      res.json({ message: 'Category retrieved successfully', category });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};