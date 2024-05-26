import { Schema, model } from 'mongoose';

const dietSchema = Schema({
    name: {
        type: String,
        required: true
    },
    days: [
        {
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            },
            foods: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Recipe',
                    required: true
                }
            ]
        }
    ]
}, { timestamps: true });

const Diet = model('Diet', dietSchema);

export default Diet;