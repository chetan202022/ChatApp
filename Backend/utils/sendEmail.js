import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verifyUrl = `${process.env.BACKEND_URL}/api/user/verify/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Your ChatApp Account",
    html: `
      <h2>Verify Email</h2>
      <p>Click below to verify your account</p>
      <a href="${verifyUrl}">Verify Now</a>
    `,
  });
};