import { v4 as uuidv4 } from 'uuid';
// import Mailgun from 'mailgun.js';
// import formData from 'form-data';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';
import validateEmail from '../utils/auth/validateEmail.util.js';
import validatePassword from '../utils/auth/validatePassword.util.js';

// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
//     username: 'api',
//     key: process.env.MAILGUN_API_KEY,
// });

export const register = async (req, res) => {
    try {
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
            return res.status(400).json({ message: 'Correo electrónico ya registrado' });
        }

        if (!validateEmail(req.body.email)) {
            return res.status(400).json({ message: 'Correo electrónico no válido' });
        }

        if (!validatePassword(req.body.password)) {
            return res.status(400).json({ message: 'Contraseña no válida' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const confirmToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({ ...req.body, id: uuidv4(), password: hashedPassword, emailConfirmToken: confirmToken, isEmailConfirmed: true });
        await user.save();

        // const data = {
        //     from: process.env.EMAIL_USERNAME,
        //     to: user.email,
        //     subject: 'Confirmación de correo electrónico',
        //     text: `Tu código de confirmación es: ${confirmToken}. Por favor, ingresa este código en la aplicación para confirmar tu correo electrónico.`,
        // };

        // await mg.messages.create(process.env.MAILGUN_DOMAIN, data);

        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// export const confirmEmail = async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         if (!user || user.emailConfirmToken !== req.body.token) {
//             return res.status(400).json({ message: 'Token de confirmación inválido' });
//         }

//         user.isEmailConfirmed = true;
//         user.emailConfirmToken = undefined;
//         await user.save();

//         const data = {
//             from: process.env.EMAIL_USERNAME,
//             to: user.email,
//             subject: 'Correo electrónico confirmado',
//             text: 'Tu correo electrónico ha sido confirmado con éxito.',
//         };

//         await mg.messages.create(process.env.MAILGUN_DOMAIN, data);

//         const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.cookie('token', token, { httpOnly: true });
//         res.json({ message: 'Correo electrónico confirmado', user });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await User.findOneAndDelete({ _id: decoded._id });

        res.clearCookie('token');
        res.json({ message: 'Cuenta eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

