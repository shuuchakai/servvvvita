import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        trim: true,
    },
    goal: {
        type: String,
        required: true,
    },
    goalSpeed: {
        type: String,
        required: true,
    },
    goalWeight: {
        type: String,
        required: true,
    },
    biologicalSex: {
        type: String,
        required: true,
    },
    
    height: {
        type: String,
        required: true
    },
    heightUnit: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    weightUnit: {
        type: String,
        required: true
    },
    activityLevel: {
        type: String,
        required: true
    },
    selectedFoods: {
        type: Array,
        required: true
    },
    bmi: {
        type: String,
        required: true
    },
    bmr: {
        type: String,
        required: true
    },
    tdee: {
        type: String,
        required: true
    },
    adjustedCalories: {
        type: String,
        required: true
    },
    macros: {
        type: Object,
        required: true
    },
    minerals: {
        type: Object,
        required: true
    },
    vitamins: {
        type: Object,
        required: true
    },
    waterLiters: {
        type: String,
        required: true
    },
    waterGlasses: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Profile = model('Profile', profileSchema);

export default Profile;