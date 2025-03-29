import Admin, { ROLES } from "../../models/Admin/admin.model.js";
import { RegistrationToken } from "../../models/Faculty/registrationToken.model.js";
import { User } from "../../models/user.model.js";
import { formattedResponse } from "../../utils/ApiResponse.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../utils/cloudinary.js";
import consoleTerminal from "../../utils/consoleTerminal.js";
import { registerUserLogic } from "../user.controller.js";
import { EXPIRY_TIME, FRONTEND_URL } from "../../contants.js";
import { sendEmail } from "../../utils/emailServices.js";
import jwt from "jsonwebtoken";

const updateAdminAvatar = async (userId, newAvatarLocalPath) => {
  try {
    // Upload the new avatar to Cloudinary
    const newAvatar = await uploadOnCloudinary(newAvatarLocalPath);
    if (!newAvatar.url) {
      return formattedResponse(
        400,
        null,
        "Error uploading avatar to Cloudinary"
      );
    }

    // Check if the logged-in user is an admin
    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      return formattedResponse(
        403,
        null,
        "Unauthorized to update admin avatar"
      );
    }

    // Find the admin details in the Admin table
    const admin = await Admin.findOne({ user: userId });
    if (!admin) {
      return formattedResponse(404, null, "Admin details not found");
    }

    // If admin already has an avatar, delete it from Cloudinary
    let responseOfDelete = "ok";
    if (admin.avatar) {
      const avatarPublicId = admin.avatar.split("/").pop()?.split(".")[0];
      // responseOfDelete = await deleteFromCloudinary(avatarPublicId);
    }

    // If deletion failed, return an error
    if (responseOfDelete !== "ok") {
      return formattedResponse(
        400,
        null,
        "Error deleting avatar from Cloudinary"
      );
    }

    // Update the admin's avatar in the Admin table
    const updatedAdmin = await Admin.findOneAndUpdate(
      { user: userId },
      { $set: { avatar: newAvatar.url } },
      { new: true }
    ).select("-password");

    if (!updatedAdmin) {
      return formattedResponse(400, null, "Error updating admin avatar");
    }

    return formattedResponse(200, null, "Admin avatar updated successfully");
  } catch (error) {
    consoleTerminal("Error updating admin avatar:", error);
    return formattedResponse(500, null, "Error updating admin avatar");
  }
};

const fetchAdminProfile = async (userId) => {
  try {
    // Find the admin details based on the userId
    const admin = await Admin.findOne({ user: userId }).select("-password");

    if (!admin) {
      return formattedResponse(404, null, "Admin details not found");
    }

    return formattedResponse(200, admin, "Admin details fetched successfully");
  } catch (error) {
    consoleTerminal("Error fetching admin details:", error);
    return formattedResponse(500, null, "Error fetching admin details");
  }
};

const updateAdminProfile = async (userId, { name, email, avatar }) => {
  try {
    // Find the admin details for the logged-in user
    const admin = await Admin.findOne({ user: userId }).select("-password");
    if (!admin) {
      return formattedResponse(404, null, "Admin details not found");
    }

    // Prepare the fields to update
    const updateFields = {};

    // If a new name is provided, update the name
    if (name) {
      updateFields.name = name;
    }

    // If a new email is provided, update the email
    if (email) {
      updateFields.email = email;
    }

    // If a new avatar is provided, handle the avatar update process
    if (avatar) {
      consoleTerminal("Avatar path:", avatar);
      // Step 1: Delete the existing avatar (if any) from Cloudinary
      if (admin.avatar) {
        consoleTerminal("Existing avatar:", admin.avatar);
        const avatarPublicId = admin.avatar
          .split("/")
          .slice(7)
          .join("/")
          .split(".")[0];
        consoleTerminal("Avatar public ID:", avatarPublicId);
        const deleteResponse = await deleteFromCloudinary(avatarPublicId);
        consoleTerminal("Delete response:", deleteResponse);
        if (deleteResponse && deleteResponse.result !== "ok") {
          if (deleteResponse.result === "not found") {
            consoleTerminal(
              "Avatar not found in Cloudinary. Skipping deletion."
            );
          } else {
            return formattedResponse(
              400,
              null,
              "Error deleting avatar from Cloudinary"
            );
          }
        }
      }

      // Step 2: Upload the new avatar to Cloudinary
      const uploadedAvatar = await uploadOnCloudinary(avatar);
      updateFields.avatar = uploadedAvatar.url; // Update the avatar URL in the database
    }

    // Step 3: Update the admin profile with the new details
    const updatedAdmin = await Admin.findOneAndUpdate(
      { user: userId },
      { $set: updateFields },
      { new: true }
    ).select("-password");

    if (!updatedAdmin) {
      return formattedResponse(400, null, "Error updating admin details");
    }

    return formattedResponse(
      200,
      updatedAdmin,
      "Admin details updated successfully"
    );
  } catch (error) {
    consoleTerminal("Error updating admin profile:", error);
    return formattedResponse(500, null, "Error updating admin profile");
  }
};

const addCollegeAdminDetails = async (data) => {
  const { token, name, email, password } = data;
  try {
    // Step 1: Validate the token
    const registrationToken = await RegistrationToken.findOne({ token });
    consoleTerminal("Registration Token :: ", registrationToken);

    if (
      !registrationToken ||
      registrationToken.expiry < Date.now() ||
      registrationToken.used
    ) {
      return formattedResponse(
        400,
        null,
        "Invalid or expired registration link"
      );
    }

    // Step 2: Create a new college admin account
    const dataToSend = {
      fullName: name,
      email,
      password,
      role: "admin",
      roleType: ROLES.COLLEGE_ADMIN,
    };

    const registerCollegeAdmin = await registerUserLogic(dataToSend);
    consoleTerminal("Register College Admin :: ", registerCollegeAdmin);

    if (registerCollegeAdmin.status !== 201) {
      return formattedResponse(400, null, "Error adding college admin details");
    }

    // Step 3: Mark the token as used to prevent re-registration
    await RegistrationToken.updateOne({ token }, { $set: { used: true } });

    return formattedResponse(
      201,
      null,
      "College Admin details added successfully"
    );
  } catch (error) {
    consoleTerminal("Error adding college admin details:", error);
    return formattedResponse(500, null, "Error adding college admin details");
  }
};

const addDepartmentAdminDetails = async (data) => {
  const { token, name, email, password } = data;
  try {
    // Step 1: Validate the token
    const registrationToken = await RegistrationToken.findOne({ token });
    consoleTerminal("Registration Token :: ", registrationToken);

    if (
      !registrationToken ||
      registrationToken.expiry < Date.now() ||
      registrationToken.used
    ) {
      return formattedResponse(
        400,
        null,
        "Invalid or expired registration link"
      );
    }

    // Step 2: Create a new department admin account
    const dataToSend = {
      fullName: name,
      email,
      password,
      role: "admin",
      roleType: ROLES.DEPARTMENT_ADMIN,
    };

    const registerDepartmentAdmin = await registerUserLogic(dataToSend);
    consoleTerminal("Register Department Admin :: ", registerDepartmentAdmin);

    if (registerDepartmentAdmin.status !== 201) {
      return formattedResponse(
        400,
        null,
        "Error adding department admin details"
      );
    }

    // Step 3: Mark the token as used to prevent re-registration
    await RegistrationToken.updateOne({ token }, { $set: { used: true } });

    return formattedResponse(
      201,
      null,
      "Department Admin details added successfully"
    );
  } catch (error) {
    consoleTerminal("Error adding department admin details:", error);
    return formattedResponse(
      500,
      null,
      "Error adding department admin details"
    );
  }
};

const generateRegistrationLink = async (email, role) => {
  consoleTerminal(
    `${role.charAt(0).toUpperCase() + role.slice(1)} Email :: `,
    email
  );
  try {
    // Generate a unique token for the registration link
    const token = jwt.sign(
      { email, role },
      process.env.REGISTRATION_TOKEN_SECRET,
      {
        expiresIn: "24h", // Token expires in 24 hours
      }
    );
    consoleTerminal("Token :: ", token);

    // Store the token in the database
    const registrationToken = new RegistrationToken({
      facultyEmail: email,
      // role,    need to send in future
      token,
      expiry: EXPIRY_TIME, // Expires after 24 hours
    });
    await registrationToken.save();

    // Construct the registration link
    const registrationLink = `${FRONTEND_URL}/register/${role}?token=${token}`;
    consoleTerminal("Registration Link :: ", registrationLink);

    // Prepare the email content dynamically based on the role
    const roleNames = {
      faculty: "Faculty",
      college_admin: "College Admin",
      department_admin: "Department Admin",
    };
    const roleName = roleNames[role] || "User";

    const emailContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              font-size: 24px;
              color: #2c3e50;
              margin-bottom: 20px;
            }
            p {
              font-size: 16px;
              color: #555;
              line-height: 1.5;
            }
            .btn {
              display: inline-block;
              background-color: #3498db;
              color: #fff;
              font-size: 16px;
              padding: 12px 20px;
              text-align: center;
              border-radius: 5px;
              text-decoration: none;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              font-size: 14px;
              color: #888;
              margin-top: 40px;
            }
            .footer a {
              color: #3498db;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to ${roleName} Registration</h1>
            <p>Hello,</p>
            <p>Thank you for being part of our institution! To complete your registration, please click the button below to verify your email address and finalize your account setup.</p>
            <a href="${registrationLink}" class="btn">Complete Your Registration</a>
            <p>If you did not request this registration, please ignore this email.</p>
            <div class="footer">
              <p>Best regards,</p>
              <p>The Registration Team</p>
              <p><a href="${process.env.FRONTEND_URL}">Visit our website</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Use the sendEmail function to send the email
    const emailResponse = await sendEmail(
      email,
      `${roleName} Registration Link`,
      emailContent
    );
    consoleTerminal("Email Response :: ", emailResponse);

    if (emailResponse) {
      return formattedResponse(
        200,
        null,
        `Registration link sent to ${email} successfully`
      );
    } else {
      return formattedResponse(400, null, "Error sending registration link");
    }
  } catch (error) {
    consoleTerminal("Error generating registration link:", error);
    return formattedResponse(500, null, "Error generating registration link");
  }
};

const generateRandomPassword = (length = 12) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const registerUniversityAdmin = async (email) => {
  try {
    // Generate a random password
    const password = generateRandomPassword();
    consoleTerminal("Generated Password :: ", password);

    const dataToSend = {
      fullName: "University Admin",
      email,
      password,
      role: "admin",
      roleType: ROLES.UNIVERSITY_ADMIN,
    };

    const response = await registerUserLogic(dataToSend);

    if (response.status !== 201) {
      return formattedResponse(400, null, "Error in registering the User");
    }

    // Send the credentials to the user via email
    const subject = "Access Granted: Your FET Portal Credentials";
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your University Admin Account</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                padding: 30px;
            }
            .header {
                background-color: #0066cc;
                color: white;
                text-align: center;
                padding: 15px;
                border-radius: 8px 8px 0 0;
                margin-bottom: 20px;
            }
            .credentials {
                background-color: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 5px;
                padding: 15px;
                margin: 20px 0;
            }
            .login-button {
                display: inline-block;
                background-color: #0066cc;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
                font-weight: bold;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #6c757d;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>University Admin Account Created</h1>
            </div>
            
            <p>Dear University Administrator,</p>
            
            <p>Your administrative account for our faculty excellence tracker has been successfully created. Please find your login credentials below:</p>
            
            <div class="credentials">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Temporary Password:</strong> ${password}</p>
            </div>
            
            <p>For security reasons, we recommend changing your password immediately after your first login.</p>
            
            <div style="text-align: center;">
                <a href="${FRONTEND_URL}/login" class="login-button">Login to Portal</a>
            </div>
            
            <p>If you did not request this account or believe this is an error, please contact our support team immediately.</p>
            
            <div class="footer">
                <p>© ${new Date().getFullYear()} Faculty Excellence Tracker. All rights reserved.</p>
                <p>This is an automated email. Please do not reply.</p>
            </div>
        </div>
    </body>
    </html>`;

    const emailResponse = await sendEmail(email, subject, htmlContent);

    if (!emailResponse) {
      return formattedResponse(400, null, "Error sending email");
    }
    return formattedResponse(
      201,
      null,
      "University Admin registered successfully and credentials sent via email"
    );
  } catch (error) {
    console.error("Error registering University Admin:", error);
    return formattedResponse(500, null, "Error registering University Admin");
  }
};

export {
  updateAdminAvatar,
  fetchAdminProfile,
  updateAdminProfile,
  addCollegeAdminDetails,
  addDepartmentAdminDetails,
  generateRegistrationLink,
  registerUniversityAdmin,
};
