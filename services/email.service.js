import Mailer from "../config/sendmail.js";

export const sendVerificationEmail = async (email, token, userId) => {
    const verifyLink = `http://localhost:4000/api/v1/auth/verify-email?userId=${userId}&token=${token}`;

    await Mailer.sendMail({
        from: `"My App Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your email address",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
        <h2 style="color:#333;">Welcome to My App 👋</h2>
        <p style="color:#555;">
          Thanks for signing up! Please confirm your email address by clicking the button below.
        </p>

        <div style="text-align:center; margin: 30px 0;">
          <a href="${verifyLink}" 
             style="background:#4f46e5; color:#fff; padding:12px 20px; text-decoration:none; border-radius:6px; font-weight:bold;">
            Verify Email
          </a>
        </div>

        <p style="font-size:14px; color:#777;">
          If you didn’t create this account, you can safely ignore this email.
        </p>

        <hr />
        <p style="font-size:12px; color:#aaa;">
          © ${new Date().getFullYear()} My App. All rights reserved.
        </p>
      </div>
    `,
    });
};


export const resetPasswordEmail = async (email, token, userId) => {
    const resetLink = `http://localhost:4000/api/v1/auth/reset-password?userId=${userId}&token=${token}`;

    await Mailer.sendMail({
        from: `"My App Security" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset your password",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
        <h2 style="color:#333;">Password Reset Request 🔐</h2>
        <p style="color:#555;">
          We received a request to reset your password. Click the button below to proceed.
        </p>

        <div style="text-align:center; margin: 30px 0;">
          <a href="${resetLink}" 
             style="background:#dc2626; color:#fff; padding:12px 20px; text-decoration:none; border-radius:6px; font-weight:bold;">
            Reset Password
          </a>
        </div>

        <p style="font-size:14px; color:#777;">
          This link will expire soon for security reasons.
        </p>

        <p style="font-size:14px; color:#777;">
          If you didn’t request a password reset, please ignore this email.
        </p>

        <hr />
        <p style="font-size:12px; color:#aaa;">
          © ${new Date().getFullYear()} My App. All rights reserved.
        </p>
      </div>
    `,
    });
};

