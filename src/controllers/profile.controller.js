import Profile from '../models/profile.model.js';

export const createProfile = async (req, res) => {
    const { weight, height } = req.body;

    const bmi = weight / ((height / 100) ** 2);

    const newProfile = new Profile({ ...req.body, bmi });

    try {
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getProfiles = async (req, res) => {
    const { user_id } = req.body;
    try {
        const profiles = await Profile.find({ user_id });

        res.status(200).json(profiles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};