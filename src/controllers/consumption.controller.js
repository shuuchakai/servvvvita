import Consumption from '../models/consumption.model.js';

// Controlador para actualizar el consumo
export const updateConsumption = async (req, res) => {
    const { user_id, date, meal, food } = req.body;

    try {
        // Crear una nueva entrada de consumo
        const newConsumption = new Consumption({
            user_id,
            date,
            meal,
            food
        });

        // Guardar en la base de datos
        await newConsumption.save();

        res.status(201).json({ message: 'Consumption updated successfully', newConsumption });
    } catch (error) {
        console.error('Error updating consumption:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getConsumption = async (req, res) => {
    const { user_id, date } = req.query;

    try {
        const consumption = await Consumption.find({ user_id, date });

        if (!consumption) {
            return res.status(404).json({ message: 'No consumption data found for this date' });
        }

        res.status(200).json(consumption);
    } catch (error) {
        console.error('Error fetching consumption:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};