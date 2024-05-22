import { Schema, model } from 'mongoose';

const MealSchema = new Schema({
    time: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    }
});

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DietSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    ...daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [MealSchema] }), {})
});

export default model('Diet', DietSchema);