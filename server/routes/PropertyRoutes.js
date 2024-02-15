import { Router } from "express";
import {
  addProperty,
  checkPropertyOrder,
  editProperty,
  getPropertyData,
  getUserAuthProperties,
  searchProperties,
  addReview,
} from "../controllers/PropertyController.js";
import multer from "multer";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const upload = multer({ dest: "uploads/" });

export const propertyRoutes = Router();

propertyRoutes.post("/add", upload.array("images"), addProperty);
propertyRoutes.get("/get-user-properties", verifyToken, getUserAuthProperties);
propertyRoutes.get("/get-property-data/:propertyId", getPropertyData);
propertyRoutes.put("/edit-property/:propertyId", verifyToken, upload.array("images"), editProperty);
propertyRoutes.get("/search-properties", searchProperties);
propertyRoutes.post("/add-review", verifyToken, addReview);
propertyRoutes.get("/check-property-order/:propertyId", verifyToken, checkPropertyOrder);
propertyRoutes.post("/add-review/:propertyId", verifyToken, addReview);
