import Ingredient from "../models/ingredients.model.js";

export const createIngredient = async (req, res, next) => {
    try {
        const ingredient = new Ingredient(req.body);
        await ingredient.save();
        res.status(201).json({ ingredient });
    } catch (error) {
        next(error);
    }
};

export const getIngredients = async (_req, res, next) => {
    try {
        const ingredients = await Ingredient.find();
        res.status(200).json({ ingredients });
    } catch (error) {
        next(error);
        console.log(error)
    }
};

export const getIngredient = async (req, res, next) => {
    try {
        const ingredient = await Ingredient.findOne(req.body.name);
        if (!ingredient) {
            throw new Error("Ingredient not found");
        }
        res.status(200).json({ ingredient });
    } catch (error) {
        next(error);
    }
};

export const updateIngredient = async (req, res, next) => {
    try {
        const ingredient = await Ingredient.findOneAndUpdate(req.body.name);
        if (!ingredient) {
            throw new Error("Ingredient not found");
        }
        res.status(200).json({ ingredient });
    } catch (error) {
        next(error);
    }
};

export const deleteIngredient = async (req, res, next) => {
    try {
        const ingredient = await Ingredient.findOneAndDelete(req.body.name);
        if (!ingredient) {
            throw new Error("Ingredient not found");
        }
        res.status(200).json({ ingredient });
    } catch (error) {
        next(error);
    }
};