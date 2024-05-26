import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        trim: true,
    },
    weight: {
        type: Number,
        required: true,
        trim: true,
    },
    height: {
        type: Number,
        required: true,
        trim: true,
    },
    biologicalSex: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
    },
    exerciseFrequency: {
        type: String,
        required: true,
        trim: true,
    },
    allergy: {
        type: Array,
        required: true,
        trim: true,
    },
    disease: {
        type: Array,
        required: true,
        trim: true,
    },
    medication: {
        type: Array,
        required: true,
        trim: true,
    },
    sleepHours: {
        type: Number,
        required: true,
        trim: true,
    },
    occupation: {
        type: String,
        required: true,
        trim: true,
    },
    goals: {
        type: Array,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    bmi: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Profile = model('Profile', profileSchema);

export default Profile;