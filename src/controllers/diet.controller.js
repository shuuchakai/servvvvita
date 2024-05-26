import Diet from '../models/diet.model.js';
import Recipe from '../models/recipe.model.js';

import calculateCaloriesAndMacros from '../utils/algorithms/calories.js';

export const createDiet = async (req, res) => {
    try {
        const { name, days } = req.body;

        for (const day of days) {
            if (!['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(day.day)) {
                return res.status(400).json({ message: `Invalid day: ${day.day}` });
            }

            for (const foodId of day.foods) {
                const recipe = await Recipe.findById(foodId);
                if (!recipe) {
                    return res.status(404).json({ message: `Recipe not found: ${foodId}` });
                }
            }
        }

        const diet = new Diet({
            name,
            days
        });

        await diet.save();

        res.status(201).json(diet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const generateDiet = async (req, res) => {
    try {
        const { age, height, weight, sex, activityLevel, diseases } = req.body;

        const results = calculateCaloriesAndMacros(age, height, weight, sex, activityLevel, diseases);

        res.status(201).json(results)
    } catch {

    }
}