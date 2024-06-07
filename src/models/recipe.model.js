import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    foods: [
        {
            id: String,
            name: String,
            kcal: Number,
            protein: Number,
            carbs: Number,
            fat: Number,
        },
    ],
    title: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    recommendations: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;