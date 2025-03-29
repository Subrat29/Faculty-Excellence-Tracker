import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the directory exists or create it
const ensureDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Target upload directory
const UPLOAD_DIR = "./public/temp";
ensureDirectory(UPLOAD_DIR);

// Set up storage options for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Destination:", UPLOAD_DIR);
    cb(null, UPLOAD_DIR); // Save files in the specified directory
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, fileExtension);

    // Generate unique filenames for CSV, use original for images
    if ([".csv"].includes(fileExtension)) {
      cb(null, `${baseName}-${timestamp}${fileExtension}`);
    } else {
      cb(null, file.originalname);
    }
  },
});

// Define a file filter to allow both image and CSV files
const fileFilter = (req, file, cb) => {
  console.log("MIME Type:", file.mimetype);
  console.log("File Extension:", path.extname(file.originalname).toLowerCase());

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "text/csv",
    "application/octet-stream",
  ];
  const allowedExtensions = [".jpeg", ".jpg", ".png", ".gif", ".csv"];

  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (
    allowedTypes.includes(file.mimetype) &&
    allowedExtensions.includes(fileExtension)
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only images and CSV files are allowed."), false);
  }
};

// Initialize multer middleware
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
});

// Helper function to handle errors in routes
export const uploadMiddleware = (fieldName) => (req, res, next) => {
  const uploader = upload.single(fieldName);
  uploader(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log("Multer Error:", err);
      return res.status(400).json({ error: err.message });
    } else if (err) {
      console.log("General Error:", err);
      return res.status(400).json({ error: err.message });
    }

    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    if (!req.file) {
      console.error("No File Uploaded");
      return res.status(400).json({ error: "No file uploaded. Ensure the file is sent in the 'file' field." });
    }

    console.log("File uploaded successfully:", req.file);
    next();
  });
};
