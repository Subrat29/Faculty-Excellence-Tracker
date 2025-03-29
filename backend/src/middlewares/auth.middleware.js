import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import consoleTerminal from "../utils/consoleTerminal.js";

export const VerifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request :: Token Unavailable");
    }
    if (token.split(".").length !== 3) {
      throw new ApiError(401, "Invalid token format");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "User not found for the provided access token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying JWT:", error);
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, "Access Token has expired");
    }
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const ValidateToken = asyncHandler(async (req, _, next) => {
  try {
    // Retrieve token from either cookies or Authorization header
    let token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "").trim(); // Ensure no leading/trailing spaces

    // Check if the token exists
    if (!token) {
      throw new ApiError(401, "Unauthorized request: Token Unavailable");
    }
    // Check if token is valid (JWT format check: it should have 3 parts separated by a dot)
    if (token.split(".").length !== 3) {
      throw new ApiError(401, "Invalid token format");
    }

    // Sanitize and validate the token using the ACCESS_TOKEN_SECRET from environment
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Optionally store the decoded token's details in the request object for later use
    req.decodedToken = decodedToken;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error validating JWT:", error.message || error); // Log error message for debugging

    // Check if the error is related to the expiration of the token
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, "Access Token has expired");
    }

    // For other errors, throw a general API error
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
