// models/Exercise.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

export default Exercise;
