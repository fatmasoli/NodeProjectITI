import mongoose from "mongoose";

const initConnection=()=>{

     return mongoose.connect('mongodb://127.0.0.1:27017/Lab3Node')
    .then(()=>console.log("connect on DB"))
    .catch((err)=>console.log("error",err))
     
}

export default initConnection;
