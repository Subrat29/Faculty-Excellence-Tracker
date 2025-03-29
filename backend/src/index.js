import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // Load environment variables from .env file

import connectDB from "./db/index.js"; // MongoDB connection logic
import { app } from "./app.js"; // Express app setup

// Connect to the database and start the server
connectDB()
  .then(() => {
    const port = process.env.PORT || 6000; // Use the PORT from .env or default to 8000
    app.listen(port, () => {
      console.log(`⚙️  Server is running at port : ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!!", err);
  });
