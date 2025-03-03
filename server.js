const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// ✅ Allow requests from your frontend domain explicitly
app.use(cors({
    origin: "http://marina.etfos.hr/public", // Change to your frontend URL
    methods: "GET",
    allowedHeaders: "Content-Type"
}));

// ✅ Force CORS headers manually (backup fix)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://marina.etfos.hr/public");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(express.static("public")); // Serve static files (HTML, CSS, JS, images)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/get-images", (req, res) => {
    const dirPath = path.join(__dirname, "public/foto");
    // Debug: Log the directory being read
    console.log("Looking for images in:", dirPath);

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err); // Log actual error
            return res.status(500).json({ error: "Error reading directory" });
        }
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(images);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
