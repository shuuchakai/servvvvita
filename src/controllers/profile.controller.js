import Profile from "../models/profile.model.js";

const calculateBMI = (weight, height) => {
    return (weight / ((height / 100) ** 2)).toFixed(2);
};

const calculateBMR = (weight, height, age, sex) => {
    if (sex === 'Hombre') {
        return (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)).toFixed(2);
    } else {
        return (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)).toFixed(2);
    }
};

const calculateTDEE = (bmr, activityLevel) => {
    const activityMultipliers = {
        'Sedentario': 1.2,
        'Ligera': 1.375,
        'Moderada': 1.55,
        'Alta': 1.725,
        'Atleta Profesional': 1.9
    };
    return (bmr * activityMultipliers[activityLevel]).toFixed(2);
};

const adjustCaloriesForGoal = (tdee, goal, goalSpeed) => {
    let adjustment = 0;
    switch (goal) {
        case 'Perder peso':
            adjustment = -500;  // Déficit calórico estándar
            if (goalSpeed === 'Rápida') adjustment = -750; // Déficit más agresivo
            else if (goalSpeed === 'Lenta') adjustment = -250; // Déficit menos agresivo
            break;
        case 'Ganar músculo':
            adjustment = 500;  // Superávit calórico estándar
            if (goalSpeed === 'Rápida') adjustment = 750; // Superávit más agresivo
            else if (goalSpeed === 'Lenta') adjustment = 250; // Superávit menos agresivo
            break;
        case 'Mantener peso':
        default:
            adjustment = 0;  // No hay ajuste
            break;
    }
    return (parseFloat(tdee) + adjustment).toFixed(2);
};

const calculateMacros = (calories, weight, goal) => {
    let proteinGrams, fatGrams, carbGrams;

    switch (goal) {
        case 'Perder peso':
            proteinGrams = weight * 1.5;
            break;
        case 'Ganar músculo':
            proteinGrams = weight * 2.0;
            break;
        case 'Mantener peso':
        default:
            proteinGrams = weight * 1.0;
            break;
    }

    const proteinCalories = proteinGrams * 4;
    const fatCalories = calories * 0.25;
    fatGrams = fatCalories / 9;
    const remainingCalories = calories - (proteinCalories + fatCalories);
    carbGrams = remainingCalories / 4;

    return {
        proteinGrams: proteinGrams.toFixed(2),
        fatGrams: fatGrams.toFixed(2),
        carbGrams: carbGrams.toFixed(2)
    };
};

const calculateMinerals = (biologicalSex) => {
    const minerals = {
        ca: 1000, // mg
        p: 700, // mg
        fe: biologicalSex === 'Hombre' ? 8 : 18, // mg
        na: 1500, // mg
        k: 4700, // mg
        mg: biologicalSex === 'Hombre' ? 400 : 310, // mg
        cu: 0.9, // mg
        zn: biologicalSex === 'Hombre' ? 11 : 8, // mg
        mn: biologicalSex === 'Hombre' ? 2.3 : 1.8, // mg
        se: 55, // µg
        li: 1 // mg
    };

    return minerals;
};

const calculateVitamins = (biologicalSex) => {
    const vitamins = {
        vitA: biologicalSex === 'Hombre' ? 900 : 700, // µg
        carotenos: 0, // Incluidos en la recomendación de vitA
        bCarotenos: 0, // Incluidos en la recomendación de vitA
        vitB1: biologicalSex === 'Hombre' ? 1.2 : 1.1, // mg
        vitB2: biologicalSex === 'Hombre' ? 1.3 : 1.1, // mg
        niacina: biologicalSex === 'Hombre' ? 16 : 14, // mg
        acAscorbico: biologicalSex === 'Hombre' ? 90 : 75, // mg
        vitB6: 1.3, // mg
        vitB12: 2.4, // µg
        acFolico: 400, // µg
        folato: 400, // µg
        vitD: 600 // IU
    };

    return vitamins;
};

const createProfile = async (req, res) => {
    try {
        const { user_id, goal, goalSpeed, goalWeight, biologicalSex, birthDay, birthMonth, birthYear, height, heightUnit, weight, weightUnit, activityLevel, selectedFoods } = req.body;

        // Convert birth date to age
        const birthDate = new Date(`${birthYear}-${birthMonth}-${birthDay}`);
        const age = new Date().getFullYear() - birthDate.getFullYear();

        // Convert height and weight to numbers
        const numericHeight = parseFloat(height);
        const numericWeight = parseFloat(weight);

        // Calculate BMI
        const bmi = calculateBMI(numericWeight, numericHeight);

        // Calculate BMR
        const bmr = calculateBMR(numericWeight, numericHeight, age, biologicalSex);

        // Calculate TDEE
        const tdee = calculateTDEE(bmr, activityLevel);

        // Adjust TDEE for the goal
        const adjustedCalories = adjustCaloriesForGoal(tdee, goal, goalSpeed);

        // Calculate macronutrients
        const macros = calculateMacros(adjustedCalories, numericWeight, goal);

        // Calculate minerals
        const minerals = calculateMinerals(biologicalSex);

        // Calculate vitamins
        const vitamins = calculateVitamins(biologicalSex);

        // Create new profile object
        const newProfile = {
            user_id,
            goal,
            goalSpeed,
            goalWeight,
            biologicalSex,
            dateOfBirth: birthDate,
            height: numericHeight,
            heightUnit,
            weight: numericWeight,
            weightUnit,
            activityLevel,
            selectedFoods,
            bmi,
            bmr,
            tdee,
            adjustedCalories,
            macros,
            minerals,
            vitamins
        };

        await Profile.create(newProfile);

        res.status(201).json(newProfile);
        console.log(age)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user_id: req.body.user_id });
        res.status(200).json(profile);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { createProfile, getProfile };
