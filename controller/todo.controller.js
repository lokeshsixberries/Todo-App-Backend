import { Todo } from "../models/todo.model.js";
import { User } from "../models/user.model.js";

//when we are creating to todo it should added in the user todo list

export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user._id;
        const todo = await Todo.create({ title, description, userId });
        // add todo in user todo list complete todo should be added in user todo list
        const user = await User.findByIdAndUpdate(userId, { $push: { todos: todo } }, { new: true });
        return res.status(201).json({ todo, message: "Todo created successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json({ todos });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        return res.status(200).json({ todo });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const todo = await Todo.findByIdAndUpdate(id, { title, description, status }, { new: true });
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        return res.status(200).json({ todo });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id, { new: true });
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        return res.status(200).json({ todo });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAllTodosByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const todos = await Todo.find({ userId: id });
        if (!todos) {
            return res.status(404).json({ error: "Todos not found" });
        }
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch todos" });
    }
}