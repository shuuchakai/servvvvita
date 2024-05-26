import { Schema, model } from 'mongoose';

const NutrientSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
});

const IngredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    portion: {
        type: String,
        required: true
    },
    nutritional_values: {
        calories: NutrientSchema,
        proteins: NutrientSchema,
        carbohydrates: NutrientSchema,
        fats: NutrientSchema
    },
    minerals: {
        calcium: NutrientSchema,
        iron: NutrientSchema,
        magnesium: NutrientSchema,
        phosphorus: NutrientSchema,
        potassium: NutrientSchema,
        sodium: NutrientSchema,
        zinc: NutrientSchema,
        copper: NutrientSchema,
        manganese: NutrientSchema,
        selenium: NutrientSchema
    },
    vitamins: {
        thiamin: NutrientSchema,
        niacin: NutrientSchema,
        vitaminb6: NutrientSchema,
        biotine: NutrientSchema,
        folate: NutrientSchema,
        vitamine: NutrientSchema,
        vitaminb12: NutrientSchema,
        vitamink: NutrientSchema
    },
    aminoacids: {
        tryptophan: NutrientSchema,
        threonine: NutrientSchema,
        isoleucine: NutrientSchema,
        leucine: NutrientSchema,
        lysine: NutrientSchema,
        methionine: NutrientSchema,
        cystine: NutrientSchema,
        phenylalanine: NutrientSchema,
        tyrosine: NutrientSchema,
        valine: NutrientSchema,
        arginine: NutrientSchema,
        histidine: NutrientSchema,
        alanine: NutrientSchema,
        asparticacid: NutrientSchema,
        glutamicacid: NutrientSchema,
        glycine: NutrientSchema,
        proline: NutrientSchema,
        serine: NutrientSchema,
        hydroxyproline: NutrientSchema,
        hydroxylysine: NutrientSchema
    },
    image: {
        type: String
    }
}, { timestamps: true });

const Ingredient = model('Ingredient', IngredientSchema);

export default Ingredient;
