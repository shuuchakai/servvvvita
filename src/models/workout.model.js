import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    exercises: [{
        name: {
            type: String,
            required: true
        },
        sets: {
            type: Number,
            required: true
        },
        timePerSet: {
            type: Number,
            required: true
        },
        repetitions: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        }
    }],
    restTime: {
        type: Number,
        required: true
    }
});

const Workout = model('Workout', workoutSchema);

export default Workout;