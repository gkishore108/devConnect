const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Define Routes
app.use("/api", require("./routes/api/videoCard"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
