import { User } from "../models/user";

export const registerUser = async (req, res) => {
    try {
        const {nombre, email, apodo, password} = req.body;

        const newUser = await User.create({
            nombre,
            email,
            apodo,
            password
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({mensaje: "Error al registrar usuario" })
    }
};