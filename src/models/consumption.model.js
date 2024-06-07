import mongoose from 'mongoose';

const consumptionSchema = new mongoose.Schema({
    user_id: { type: String},
    date: { type: String, required: true }, // Formato: YYYY-MM-DD
    meal: { type: String, required: true },
    food: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        kcal: { type: Number, required: true },
        protein: { type: Number, required: true },
        carbs: { type: Number, required: true },
        fat: { type: Number, required: true }
    }
}, { timestamps: true });

const Consumption = mongoose.model('Consumption', consumptionSchema);

export default Consumption;
