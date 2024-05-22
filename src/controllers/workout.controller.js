// import Workout from '../models/workout.model.js';

// export const createWorkout = async (req, res, next) => {
//     try {
//         const workout = new Workout(req.body);
//         await workout.save();

//         res.status(201).json({ workout });
//     } catch (error) {
//         next(error);
//     }
// };

// export const getWorkouts = async (req, res, next) => {
//     try {
//         const { user_id } = req.body;

//         const workouts = await Workout.find({ user_id });

//         res.status(200).json({ workouts });
//     } catch (error) {
//         next(error);
//     }
// };