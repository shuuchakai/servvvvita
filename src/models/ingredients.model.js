import { Schema, model } from 'mongoose';


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
        type: {
            calories: {
                amount: Number,
                unit: String
            },
            proteins: {
                amount: Number,
                unit: String
            },
            carbohydrates: {
                amount: Number,
                unit: String
            },
            fats: {
                amount: Number,
                unit: String
            }
        }
    },
    minerals: {
        type: {
            calcium: {
                amount: Number,
                unit: String
            },
            iron: {
                amount: Number,
                unit: String
            },
            magnesium: {
                amount: Number,
                unit: String
            },
            phosphorus: {
                amount: Number,
                unit: String
            },
            potassium: {
                amount: Number,
                unit: String
            },
            sodium: {
                amount: Number,
                unit: String
            },
            zinc: {
                amount: Number,
                unit: String
            },
            copper: {
                amount: Number,
                unit: String
            },
            manganese: {
                amount: Number,
                unit: String
            },
            selenium: {
                amount: Number,
                unit: String
            }
        }
    },
    vitamins: {
        type: {
            thiamin: {
                amount: Number,
                unit: String
            },
            niacin: {
                amount: Number,
                unit: String
            },
            vitaminb6: {
                amount: Number,
                unit: String
            },
            biotine: {
                amount: Number,
                unit: String
            },
            folate: {
                amount: Number,
                unit: String
            },
            vitamine: {
                amount: Number,
                unit: String
            },
            vitaminb12: {
                amount: Number,
                unit: String
            },
            vitamink: {
                amount: Number,
                unit: String
            }
        }
    },
    aminoacids: {
        type: {
            tryptophan: {
                amount: Number,
                unit: String
            },
            threonine: {
                amount: Number,
                unit: String
            },
            isoleucine: {
                amount: Number,
                unit: String
            },
            leucine: {
                amount: Number,
                unit: String
            },
            lysine: {
                amount: Number,
                unit: String
            },
            methionine: {
                amount: Number,
                unit: String
            },
            cystine: {
                amount: Number,
                unit: String
            },
            phenylalanine: {
                amount: Number,
                unit: String
            },
            tyrosine: {
                amount: Number,
                unit: String
            },
            valine: {
                amount: Number,
                unit: String
            },
            arginine: {
                amount: Number,
                unit: String
            },
            histidine: {
                amount: Number,
                unit: String
            },
            alanine: {
                amount: Number,
                unit: String
            },
            asparticacid: {
                amount: Number,
                unit: String
            },
            glutamicacid: {
                amount: Number,
                unit: String
            },
            glycine: {
                amount: Number,
                unit: String
            },
            proline: {
                amount: Number,
                unit: String
            },
            serine: {
                amount: Number,
                unit: String
            },
            hydroxyproline: {
                amount: Number,
                unit: String
            },
            hydroxylysine: {
                amount: Number,
                unit: String
            }
        }
    },
    image: {
        type: String
    }
})