import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { resetPasswordEmail, sendVerificationEmail } from "../services/email.service.js";
import JWT from "jsonwebtoken";
import { env } from "../config/env.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const emailVerifyToken = JWT.sign({ email }, env.JWT_SECRET, { expiresIn: "1h" });
        const emailVerifyTokenExpiry = Date.now() + 3600000;
        const user = await User.create({ name, email, password: hashedPassword, emailVerifyToken, emailVerifyTokenExpiry });
        await sendVerificationEmail(email, emailVerifyToken, user._id);
        res.status(201).json({ user, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (user?.isVerified === false) {
            return res.status(401).json({ error: "User is not verified" });
        }
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        res.status(200).json({ user, message: "User logged in successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const { userId, emailVerifyToken } = req.query;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.emailVerifyToken !== emailVerifyToken) {
            return res.status(401).json({ error: "Invalid email verify token" });
        }
        if (user.emailVerifyTokenExpiry < Date.now()) {
            return res.status(401).json({ error: "Email verify token expired" });
        }
        user.isVerified = true;
        user.emailVerifyToken = undefined;
        user.emailVerifyTokenExpiry = undefined;
        await user.save();
        res.status(200).json({ user, message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const resetPasswordToken = JWT.sign({ email }, env.JWT_SECRET, { expiresIn: "1h" });
        const resetPasswordTokenExpiry = Date.now() + 3600000;
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordTokenExpiry = resetPasswordTokenExpiry;
        await user.save();
        await resetPasswordEmail(email, resetPasswordToken, user._id);
        res.status(200).json({ user, message: "Reset password email sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { userId, resetPasswordToken } = req?.query;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.resetPasswordToken !== resetPasswordToken) {
            return res.status(401).json({ error: "Invalid reset password token" });
        }
        if (user.resetPasswordTokenExpiry < Date.now()) {
            return res.status(401).json({ error: "Reset password token expired" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiry = undefined;
        await user.save();
        res.status(200).json({ user, message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}