import nodemailer from "nodemailer";
import consoleTerminal from "./consoleTerminal.js";
import { ApiError } from "./ApiError.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send an email
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: to, // Recipient's email address
      subject: subject, // Subject of the email
      html: htmlContent, // HTML content of the email
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    consoleTerminal("Email sent to:", to);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new ApiError("Email could not be sent"); // Throw the error to handle it in the route handler
  }
};
