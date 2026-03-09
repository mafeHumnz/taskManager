import { Task } from "../models/task.js";

export const createTask = async (req, res) => {
    try {
        const {titulo, descripcion, dueDate} = req.body;

        const newTask = await Task.create({
            titulo,
            descripcion,
            dueDate,
            user: req.user._id
        });

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({mensaje: "Error al crear tarea"});
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user._id}).populate("user", "nombre email");
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({mensaje:"Error al obtener tareas"});
    }
};

export const getTask = async (req, res) => {
    try {
        const {id} = req.params;

        const task = await Task.findOne({_id: id, user: req.user._id}).populate("user", "nombre email");

        if (!task){
            return res.status(404).json({mensaje: "La tarea no fue encontrada"});
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({mensaje:"Error al obtener tarea"});
    }
};

export const updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const {titulo, descripcion, estado, dueDate} = req.body;

        const actualizar = await Task.findOneAndUpdate(
                { _id: id, user: req.user._id },
                { titulo, descripcion, estado, dueDate },
                { new: true }
        );

        if (!actualizar){
            return res.status(404).json({mensaje:"Tarea no entcoontrada"});
        }

        res.status(200).json(actualizar);
    } catch (error) {
        res.status(500).json({mensaje:"Error al actualizar tarea"});
    }
};

export const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;

        const eliminar = await Task.findOneAndDelete({_id: id, user: req.user._id});

        if (!eliminar){
           return res.status(404).json({mensaje:"Tarea no encontrada"});
        }

        res.status(200).json({mensaje:"La tarea fue eliminada exitosamente!"});
    } catch (error) {
        res.status(500).json({mensaje:"Error al eliminar tarea"});
    }
};
