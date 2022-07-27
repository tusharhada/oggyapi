import express from "express";
import mongoose from "mongoose";
import cityModel from "../models/cityModel.js";
import cuisineModel from "../models/cuisineModel.js";

const router = express.Router();

export const createLocality = async (req, res) => {
    const data = req.body
    const newLocality = new cityModel({
    ...data,
    createdAt: new Date().toISOString(),
    })
    try {
        await newLocality.save();
        res.status(201).json(newLocality);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const createCuisine = async (req, res) => {
    const data = req.body
    const newCuisine = new cuisineModel({
    ...data,
    createdAt: new Date().toISOString(),
    })
    try {
        await newCuisine.save();
        res.status(201).json(newCuisine);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export default router