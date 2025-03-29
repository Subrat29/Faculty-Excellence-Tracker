export const DB_NAME = "fet";
export const env = process.env.NODE_ENV || "development";

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
export const EXPIRY_TIME = new Date(Date.now() + 24 * 60 * 60 * 1000);
