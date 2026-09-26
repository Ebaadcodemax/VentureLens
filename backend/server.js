const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const ideaRoutes = require("./routes/ideaRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

//these are mount points in express
//eg: "Whenever a request starts with /api/ideas, send the remaining path to ideaRoutes."
app.use("/api/ideas", ideaRoutes);
app.use("/api/ai", aiRoutes);//

connectDB();

app.get("/", (req, res) => {
    res.json({
        message: "AI Idea Validator API is running"
    });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});