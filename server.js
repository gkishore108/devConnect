const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// Connect to MongoDB
connectDB();

// Define Routes
app.use("/api", require("./routes/api/videoCard"));
app.use("/auth", require("./routes/auth/userRoute"));
app.use("/auth", require("./routes/auth/auth"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
