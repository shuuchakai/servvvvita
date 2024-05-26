import User from '../models/user.model.js';

const isAdmin = async (req, res, next) => {
    const { email, id } = req.body;
    try {
        const user = await User.findOne(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (email !== 'mlatbc69@gmail.com') {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default isAdmin;