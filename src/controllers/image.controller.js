import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "sk-proj-UYwplLAsEuTiUif3ucOwT3BlbkFJioUsVwH9vQLxBeNKUoJz",
});

export const analyzeImage = async (req, res) => {
    const { imageUrl, path } = req.body; // Make sure to receive the path as well

    console.log(imageUrl);

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "system",
                    content: "Regresa solo el JSON que solicitio el usuario. NO REGRESES json.",
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Regresa la informacion del nombre, calorias, carbohidratos, grasas y proteinas en la imagen por cada cien gramos del alimento de forma que se pueda enviar desde un servidor node a la parte del client en forma de JSON.No envies los gramos y las calorias solo envia el nombre como strin y los demas datos como numeros.SOLO ENVIA LA ESTRUCTURA JSON, NO ENVIES /n. NO REGRESES json. Siempre tienes que enviar los valores que se te solicitaron. El JSON debe tener la siguiente estructura: {food: {name: nombre, kcal: calorias, protein: proteinas, carbs: carbohidratos, fat: grasas}}."
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: imageUrl,
                                detail: "low",
                            },
                        },
                    ],
                },
            ],
        });

        console.log(response.choices[0].message.content)
        const result = JSON.parse(response.choices[0].message.content);

        // Include the path in the result object
        result.path = path;

        res.json(result);

    } catch (error) {
        console.error('Error al analizar la imagen:', error);
        res.status(500).json({ error: 'Error al analizar la imagen' });
    }
};
