import express  from "express"
// import { validation } from "../middleware/validation.js";
import { addProduct, addimg,deleteProduct,getAllProducts,updateProduct,getProductsByCategory } from "../products/controller/product.controller.js";
// import { addProductSchema } from "./product.validation.js"
import { adminAuth,auth } from "../middleware/auth.js";


const productRoutes = express.Router()


productRoutes.post("/Product",addimg,adminAuth,addProduct)
productRoutes.put('/Product/:productId', updateProduct);
productRoutes.delete('/Product/:id', deleteProduct);
productRoutes.get('/products', getAllProducts);
productRoutes.get('/getProductsByCategory',getProductsByCategory)
// productRoutes.put("/Product/:Id",addimg,updateProduct)
// productRoutes.delete('/product/:Id',deleteProduct);
export default productRoutes;   