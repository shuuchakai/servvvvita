import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
    }],
    instructions: {
        type: String
    },
    preparationTime: {
        type: Number
    },
    type: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'snack'],
        required: true
    }
});

const Recipe = model('Recipe', recipeSchema);
export default Recipe;