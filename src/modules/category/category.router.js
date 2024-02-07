import express  from "express"
import { addCategory, addimg ,deleteCategory,updateCategory,getAllCategories,getCategoryById} from "../category/controller/category.controller.js";
import { validation } from "../middleware/validation.js";
// import {auth ,adminAuth} from "../middleware/auth.js";
import { updateCategorySchema } from "./category.validation.js";


const categoryRoutes = express.Router()


categoryRoutes.post("/category",addimg,addCategory)
categoryRoutes.put("/category/:id",validation(updateCategorySchema),updateCategory);

categoryRoutes.delete('/category/:id', deleteCategory);
categoryRoutes.get('/getAllCategory',getAllCategories)
categoryRoutes.get('/getCategoryById/:id',getCategoryById)

export default categoryRoutes;