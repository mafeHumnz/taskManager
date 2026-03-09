import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  try {

    // Obtener token del header
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        mensaje: "No hay token, acceso denegado",
      });
    }

    // Formato esperado: Bearer token_aqui
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        mensaje: "Token inválido",
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar usuario
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        mensaje: "Usuario no válido",
      });
    }

    // Guardar usuario en request
    req.user = user;

    // Continuar
    next();

  } catch (error) {
    return res.status(401).json({
      mensaje: "Token inválido o expirado",
    });
  }
};