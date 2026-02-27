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

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password){
            return res.status(400).json("Email y password son obligatorios!")
        }

        const user = await User.findOne({email});

        if (!user){
            return res.status(400).json({mensaje: "Usuario no encontrado"});
        }

        if (password !== user.password){
           return res.status(400).json("Las contrase;a no coinciden!")
        }

        res.status(200).json({mensaje: "Login exitoso",
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                apodo: user.apodo
            },
        });
    } catch (error) {
        res.status(500).json({mensaje: "Error al hacer login"});
    }
};