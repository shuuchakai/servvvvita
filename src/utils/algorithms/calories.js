const calculateCaloriesAndMacros = (age, height, weight, sex, activityLevel, diseases = []) => {
    // Harris-Benedict TMB calculation
    let BMR;
    if (sex === 'male') {
        BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (sex === 'female') {
        BMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
        throw new Error("Invalid sex provided");
    }

    // Activity factor adjustment
    let activityFactor;
    switch (activityLevel) {
        case 'sedentary':
            activityFactor = 1.2;
            break;
        case 'light':
            activityFactor = 1.375;
            break;
        case 'moderate':
            activityFactor = 1.55;
            break;
        case 'active':
            activityFactor = 1.725;
            break;
        case 'very active':
            activityFactor = 1.9;
            break;
        default:
            throw new Error("Invalid activity level provided");
    }

    const TDEE = BMR * activityFactor;

    // Calculate BMI
    const BMI = weight / ((height / 100) ** 2);

    // Base macronutrient percentages
    let proteinPercent = 0.2;
    let carbPercent = 0.5;
    let fatPercent = 0.3;

    // Adjustments for obesity (BMI >= 30)
    if (BMI >= 30) {
        carbPercent = 0.4;
        fatPercent = 0.2;
        proteinPercent = 0.4;
    }

    // Adjustments for diabetes
    if (diseases.includes('diabetes')) {
        carbPercent = Math.min(carbPercent, 0.4); // Ensure carbs are not more than 40%
        proteinPercent = Math.max(proteinPercent, 0.3); // Ensure protein is at least 30%
        fatPercent = 1 - (carbPercent + proteinPercent); // Adjust fat to keep total 100%
    }

    // Macronutrient calculations
    const proteinCalories = TDEE * proteinPercent;
    const carbCalories = TDEE * carbPercent;
    const fatCalories = TDEE * fatPercent;

    const proteinGrams = proteinCalories / 4; // 1g protein = 4 calories
    const carbGrams = carbCalories / 4;       // 1g carbs = 4 calories
    const fatGrams = fatCalories / 9;         // 1g fat = 9 calories

    // Return the results
    return {
        calories: TDEE,
        protein: proteinGrams,
        carbs: carbGrams,
        fats: fatGrams
    };
};

// Example usage
const age = 30;
const height = 175; // cm
const weight = 90; // kg
const sex = 'male';
const activityLevel = 'moderate';
const diseases = ['diabetes', 'obesity'];

const results = calculateCaloriesAndMacros(age, height, weight, sex, activityLevel, diseases);

console.log(`Daily Calories: ${results.calories}`);
console.log(`Protein (grams): ${results.protein}`);
console.log(`Carbohydrates (grams): ${results.carbs}`);
console.log(`Fats (grams): ${results.fats}`);

export default calculateCaloriesAndMacros;
