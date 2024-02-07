import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3,'Too short product title'] ,
        maxlength: [100,'Too long product title'],
    }, 
    // title:{
    // type:String,
    // minLength:[3,"this is short message title"]
    // },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    priceAfterDiscount: {
        type: Number,
    },
    finalPrice: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        max: [320000, 'Too long product price']
    },
    productImage: {
        type:String
     },
     discount:{
        type:Number
     },
     
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: [true]
    },

   stock:{
    type:Number
   }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);



const productModel =mongoose.model('Product', productSchema);

export default productModel;