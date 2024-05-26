const applyDiseaseRecommendations = (ingredient, diseases) => {
    let modifiedIngredient = { ...ingredient };

    diseases.forEach(disease => {
        if (ingredient.recommendations[disease]) {
            const recommendations = ingredient.recommendations[disease];

            Object.keys(recommendations).forEach(nutrient => {
                if (recommendations[nutrient].max) {
                    modifiedIngredient[nutrient] = Math.min(modifiedIngredient[nutrient], recommendations[nutrient].max.amount);
                }
                if (recommendations[nutrient].min) {
                    modifiedIngredient[nutrient] = Math.max(modifiedIngredient[nutrient], recommendations[nutrient].min.amount);
                }
            });
        }
    });

    return modifiedIngredient;
};

// Example usage:
const exampleIngredient = {
    name: "Example Ingredient",
    nutritional_values: {
        calories: { amount: 100, unit: "kcal" },
        proteins: { amount: 10, unit: "g" },
        carbohydrates: { amount: 20, unit: "g" },
        fats: { amount: 5, unit: "g" }
    },
    recommendations: {
        obesity: {
            carbohydrates: { max: { amount: 15, unit: "g" } },
            fats: { max: { amount: 4, unit: "g" } },
            proteins: { min: { amount: 12, unit: "g" } }
        }
    }
};

const diseases = ['obesity'];
const modifiedIngredient = applyDiseaseRecommendations(exampleIngredient, diseases);
console.log(modifiedIngredient);