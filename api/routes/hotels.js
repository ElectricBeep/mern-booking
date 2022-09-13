import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/:id", getHotel);

//GET ALL
router.get("/", getAllHotels);

//GET CITIES OF HOTELS
router.get("/hotelCount/countByCity", countByCity);

//GET TYPES OF PROPERTIES
router.get("/hotelCount/countByType", countByType);

//GET ROOMS
router.get("/room/:id", getHotelRooms);

export default router;