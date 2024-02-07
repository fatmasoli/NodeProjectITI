// import jwt from "jsonwebtoken";
// export const auth = (req, res, next) => {
//   let { token } = req.headers;
//   jwt.verify(token, "ITI", (err, decoded) => {
//     if (err) return res.json({ message: "token err", err });
//     req.userID = decoded.id;
//     next();
//   });
// };
// ///////////////////////////////////////////////
import userModel from "../../../db/Models/user.js";
import Jwt  from "jsonwebtoken"
export const auth =(req, res, next)=>{
    let {authorization} = req.headers;
    console.log(authorization)
    let token = authorization.split(" ")[1]
    Jwt.verify(token, "menna",async (err,decoded)=>{
        if (err) return res.json({message: "token error", err});
        const user = await userModel.findById(decoded.id)
        console.log(user)
        req.userRole= user.role
        req.userid=decoded.id
        next()
    })
}

export const adminAuth = async (req, res, next) => {
    auth(req, res, () => {
      if (req.userRole === "admin") {
        next();
      } else {
        return res.json({ message: "this is admin authority only" });
      }
    });
  };




////////////////////////////////////////////////////////////////////////

// import Jwt from "jsonwebtoken";
// import userModel from "../../../db/Models/user.js";

// export const auth = (req, res, next) => {
//   let { Authorization } = req.headers;

//   if (!Authorization) {
//     return res.status(401).json({ message: "Unauthorized. Missing Authorization header" });
//   }

//   console.log(Authorization);

//   let token = Authorization.split(" ")[1];
//   Jwt.verify(token, "Menna", async (err, decoded) => {
//     if (err) return res.json({ message: "Token error", err });
//     const user = await userModel.findById(decoded.id);
//     req.role = user.role;
//     req.userid = decoded.id;
//     next();
//   });
// };

// export const adminAuth = async (req, res, next) => {
//   auth(req, res, () => {
//     if (req.role === "admin") {
//       next();
//     } else {
//       return res.json({ message: "Not Have Permission" });
//     }
//   });
// };

// **************************************************************
