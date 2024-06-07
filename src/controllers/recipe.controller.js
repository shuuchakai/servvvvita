import Recipe from '../models/recipe.model.js';

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateRecipe = async (req, res) => {
    const { foods } = req.body;

    const foodNames = foods.map(food => food.name).join(', ');

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    "role": "system",
                    "content": [
                        {
                            "type": "text",
                            "text": `Genera una receta dados los siguientes ingredientes ${foodNames}. Formatéalo todo como un JSON, sin ningún espacio ni nada, TAMPOCO AÑADAS NINGÚN INGREDIENTE MÁS, SOLAMENTE EL JSON. title: {type: String, required: true, }, instructions: { type: String, required: true, }, recommendations: { type: String, required: false, },`
                        }
                    ]
                }
            ],
            temperature: 1,
            max_tokens: 4095,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        console.log(response.choices[0].message);
        const recipeText = response.choices[0].message.content.trim();
        const recipeData = JSON.parse(recipeText);

        const newRecipe = new Recipe({
            foods,
            title: recipeData.title,
            instructions: recipeData.instructions,
            recommendations: recipeData.recommendations || null,
        });

        await newRecipe.save();

        res.status(201).json(newRecipe);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to generate recipe', error: error.message });
    }
};
