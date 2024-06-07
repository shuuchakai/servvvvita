import Exercise from '../models/exercise.model.js';

export const createExercises = async (req, res) => {
    try {
        const { exercises, totalCalories } = req.body;

        if (!Array.isArray(exercises) || exercises.length === 0) {
            return res.status(400).json({ error: 'No exercises provided' });
        }

        const savedExercises = await Exercise.insertMany(exercises);

        res.status(201).json({
            message: 'Exercises created successfully',
            exercises: savedExercises,
            totalCalories,
        });
    } catch (error) {
        if (error.code === 11000) { // Código de error de MongoDB para duplicados
            res.status(400).json({ error: 'An exercise with this name already exists' });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};

// Obtener todos los ejercicios
export const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json(exercises);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener un ejercicio por ID
export const getExerciseById = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }
        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un ejercicio
export const updateExercise = async (req, res) => {
    try {
        const { name, duration, calories, date } = req.body;

        const updatedExercise = await Exercise.findByIdAndUpdate(
            req.params.id,
            { name, duration, calories, date },
            { new: true }
        );

        if (!updatedExercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        res.status(200).json(updatedExercise);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un ejercicio
export const deleteExercise = async (req, res) => {
    try {
        const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
        if (!deletedExercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }
        res.status(200).json({ message: 'Exercise deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
