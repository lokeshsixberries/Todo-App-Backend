import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    todos: [
        {
            type: Object,
            default: []
        }
    ],
    isVerified: {
        type: Boolean,
        default: false
    },
    emailVerifyToken: {
        type: String,
        select: false
    },
    emailVerifyTokenExpiry: {
        type: Date,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {
    timestamps: true
});

UserSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model("User", UserSchema);