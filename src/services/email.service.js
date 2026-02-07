import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, token, userId) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const verifyLink = `http://localhost:4000/api/v1/auth/verify-email?userId=${userId}&token=${token}`;

    await transporter.sendMail({
        from: `"My App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your email",
        html: `
      <h2>Email Verification</h2>
      <p>Click below to verify your email</p>
      <a href="${verifyLink}">Verify Email</a>
    `
    });
};

export const resetPasswordEmail = async (email, token, userId) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const forgotPasswordLink = `http://localhost:4000/api/v1/auth/reset-password?userId=${userId}&token=${token}`;

    await transporter.sendMail({
        from: `"My App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Forgot Password",
        html: `
      <h2>Forgot Password</h2>
      <p>Click below to reset your password</p>
      <a href="${forgotPasswordLink}">Reset Password</a>
    `
    });
};

