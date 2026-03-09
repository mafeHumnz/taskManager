import bcrypt from bcrypt;
import { User } from "../models/user.js";

export const registerUser = async (req, res) => {
    try {
        const {nombre, email, apodo, password} = req.body;

        if (!nombre || !email || !password) {
      return res.status(400).json({
        mensaje: "Campos obligatorios faltantes",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        mensaje: "El email ya está registrado",
      });
    }

    // Hashear password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            nombre,
            email,
            apodo,
            password: hashedPassword
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
            return res.status(400).json({mensaje: "Email o password incorrectos"});
        }

      const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        mensaje: "Email o password incorrectos",
      });
    }

    // Aquí generamos el token
    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );


        res.status(200).json({mensaje: "Login exitoso",
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                apodo: user.apodo
            }, token,
        });
    } catch (error) {
        res.status(500).json({mensaje: "Error al hacer login"});
    }
};