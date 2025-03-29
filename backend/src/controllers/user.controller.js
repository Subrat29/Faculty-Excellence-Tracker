import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { formattedResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import Admin, { ROLES } from "../models/Admin/admin.model.js";
import Faculty from "../models/Faculty/faculty.model.js";

import StudentProfile from "../models/student/StudentProfile.js";
import consoleTerminal from "../utils/consoleTerminal.js";

const options = {
  httpOnly: true,
  secure: true,
};

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    return formattedResponse(500, null, "Error generating tokens");
  }
};

const registerUserLogic = async (data) => {
  const { fullName, email, password, role, roleType } = data;
  console.log("data: ", data);

  try {
    // Validate if the user already exists
    const existedUser = await User.findOne({ email: email.toLowerCase() });
    if (existedUser) {
      return formattedResponse(400, null, "User already exists");
    }

    // Create the user
    const user = await User.create({
      email: email.toLowerCase(),
      password, // Password hashing is handled in middleware
      role,
    });
    console.log("user: ", user);

    // Save role-specific data
    try {
      await saveRoleSpecificData(role, user, fullName, email, roleType);
    } catch (error) {
      return formattedResponse(400, null, "Error saving role-specific data");
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );
    // Return user details along with tokens (excluding sensitive data)
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      return formattedResponse(400, null, "User registration failed");
    }

    // Send the response with user data and tokens
    return formattedResponse(
      201,
      {
        user: createdUser,
        roleType,
        accessToken,
        refreshToken,
      },
      "User registered successfully"
    );
  } catch (error) {
    return formattedResponse(500, null, "Error registering user");
  }
};

// Extracted logic to save role-specific data
const saveRoleSpecificData = async (role, user, fullName, email, roleType) => {
  try {
    if (role === "admin") {
      if (roleType === ROLES.COLLEGE_ADMIN) {
        const admin = new Admin({
          user: user._id,
          name: fullName,
          email: email.toLowerCase(),
          role: ROLES.COLLEGE_ADMIN,
        });
        await admin.save();
      } else if (roleType === ROLES.DEPARTMENT_ADMIN) {
        const admin = new Admin({
          user: user._id,
          name: fullName,
          email: email.toLowerCase(),
          role: ROLES.DEPARTMENT_ADMIN,
        });
        await admin.save();
      } else {
        const admin = new Admin({
          user: user._id,
          name: fullName,
          email: email.toLowerCase(),
          role: ROLES.UNIVERSITY_ADMIN,
        });
        await admin.save();
      }
    } else if (role === "faculty") {
      const faculty = new Faculty({
        user: user._id,
        name: fullName,
        email: email.toLowerCase(),
      });
      console.log("faculty: ", faculty);
      await faculty.save();
    } else if (role === "student") {
      const student = new StudentProfile({
        _id: user._id,
        name: fullName,
        email: email.toLowerCase(),
      });
      console.log("student:", student);
      await student.save();
      console.log("saved successfully");
    }
  } catch (error) {
    consoleTerminal("Error saving role-specific data:", error);
  }
};

const loginUserLogic = async (data) => {
  const { email, password, role } = data;

  try {
    // Find the user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return formattedResponse(404, null, "User does not exist");
    }

    // Validate the password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return formattedResponse(401, null, "Invalid password");
    }

    // Verify the user's role
    if (role !== user.role) {
      return formattedResponse(403, null, "Role mismatch");
    }

    let roleType = null;

    // If the role is 'admin', fetch role-specific details from the admin table (or any other related table)
    if (role === "admin") {
      const adminData = await Admin.findOne({ user: user._id });
      if (!adminData) {
        return formattedResponse(404, null, "Admin data not found");
      }
      roleType = adminData.role;
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    // Return user details excluding sensitive data
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken -role -__v -createdAt -updatedAt"
    );

    // Add roleType to the user data if role is admin
    const responseData = {
      user: loggedInUser,
      accessToken,
      refreshToken,
      roleType, // If it's an admin, roleType will be included
    };

    return formattedResponse(200, responseData, "User logged in successfully");
  } catch (error) {
    consoleTerminal("Error logging in user:", error);
    return formattedResponse(500, null, "Error logging in user");
  }
};

const logoutUser = asyncHandler(async (req, res) => {
  // delete refreshToken

  console.log("req:: ", req);

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      status: 200,
      message: "User logged out successfully",
    });
});

const refreshAcessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  // console.log("incomingRefreshToken: ", incomingRefreshToken);

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    // console.log("decodedToken: ", decodedToken);
    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh Token");
    }

    // console.log("incomingRefreshToken: ", incomingRefreshToken);
    // console.log("user.refreshToken: ", user.refreshToken);

    // check non decoded token
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );
    // console.log("refreshAcessToken/ accessToken: ", accessToken);
    // console.log("refreshAcessToken/ newRefreshToken: ", refreshToken);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = async (userId, oldPassword, newPassword) => {
  try {
    // Step 1: Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return formattedResponse(404, null, "User not found");
    }

    // Step 2: Check if the old password matches the stored password
    const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isOldPasswordCorrect) {
      return formattedResponse(400, null, "Old password is incorrect");
    }

    user.password = newPassword;

    await user.save();

    // Step 5: Return success response
    return formattedResponse(200, null, "Password updated successfully");
  } catch (error) {
    // If an error occurs during the process, catch it and return an error response
    console.error("Error updating password:", error);
    return formattedResponse(500, null, "Internal Server Error");
  }
};

// const getCurrentUser = asyncHandler(async (req, res) => {
//   // get the current user
//   // send the response

//   return res
//     .status(200)
//     .json(new ApiResponse(200, req.user, "Current User fetch Succesfully"));
// });

// const updateAccountDetails = asyncHandler(async (req, res) => {
//   const { email, fullName } = req.body;

//   if (!email || !fullName) {
//     throw new ApiError(400, "All fields are required");
//   }

//   const user = await User.findByIdAndUpdate(
//     req.user?._id,
//     {
//       $set: {
//         fullName,
//         email: email,
//       },
//     },
//     {
//       new: true,
//     }
//   ).select("-password");

//   return res
//     .status(200)
//     .json(new ApiResponse(200, user, "Account details updated Successfully"));
// });

// const updateUserCoverImage = asyncHandler(async (req, res) => {
//   const newCoverImageLocalPath = req.file?.path;

//   if (!newCoverImageLocalPath) {
//     throw new ApiError(400, "CoverImage file is required");
//   }

//   const newCoverImage = await uploadOnCloudinary(newCoverImageLocalPath);
//   if (!newCoverImage.url) {
//     throw new ApiError(400, "Error while uploading CoverImage on cloudinary");
//   }

//   //check if user already has coverImage, then delete it from cloudinary
//   let responseOfDelete = null;
//   if (req.user?.coverImage) {
//     const coverImagePublicId = req.user.coverImage
//       .split("/")
//       .pop()
//       ?.split(".")[0];
//     responseOfDelete = await deleteFromCloudinary(coverImagePublicId);
//   }

//   if (responseOfDelete !== "ok") {
//     throw new ApiError(400, "Error while deleting CoverImage from cloudinary");
//   }

//   const user = await User.findByIdAndUpdate(
//     req.user?._id,
//     {
//       $set: {
//         coverImage: newCoverImage.url,
//       },
//     },
//     { new: true }
//   ).select("-password");

//   return res
//     .status(200)
//     .json(new ApiResponse(200, user, "CoverImage updated Successfully"));
// });

// const getUserChannelProfile = asyncHandler(async (req, res) => {
//   const { username } = req.params;

//   if (!username?.trim()) {
//     throw new ApiError(400, "Username is missing!");
//   }

//   const channel = await User.aggregate([
//     {
//       $match: {
//         username: username?.toLowerCase(),
//       },
//     },
//     {
//       $lookup: {
//         from: "subscriptions",
//         localField: "_id",
//         foreignField: "channel",
//         as: "subscribers",
//       },
//     },
//     {
//       $lookup: {
//         from: "subscriptions",
//         localField: "_id",
//         foreignField: "subscriber",
//         as: "subscribedTo",
//       },
//     },
//     {
//       $addFields: {
//         subscribersCount: {
//           $size: "$subscribers",
//         },
//         channelsSubscribedToCount: {
//           $size: "$subscribedTo",
//         },
//         isSubscribed: {
//           $cond: {
//             if: { $in: [req.user?._id, "$subscribers.subscriber"] },
//             then: true,
//             else: false,
//           },
//         },
//       },
//     },
//     {
//       $project: {
//         fullName: 1,
//         subscribersCount: 1,
//         channelsSubscribedToCount: 1,
//         isSubscribed: 1,
//         avatar: 1,
//         coverImage: 1,
//         email: 1,
//       },
//     },
//   ]);

//   console.log("Channel: ", channel);

//   if (!channel?.length) {
//     throw new ApiError(404, "Channel does not exists!");
//   }

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(200, channel[0], "User channel fetched succesfully!")
//     );
// });

export {
  registerUserLogic,
  loginUserLogic,
  logoutUser,
  refreshAcessToken,
  // updateAdminAvatar,
  changeCurrentPassword,
  // getCurrentUser,
  // updateAccountDetails,
  // updateUserAvatar,
  // updateUserCoverImage,
  // getUserChannelProfile,
};