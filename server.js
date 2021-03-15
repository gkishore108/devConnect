const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Define Routes
app.use("/api", require("./routes/api/videoCard"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
