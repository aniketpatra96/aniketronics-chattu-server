import cors from "cors";
import "dotenv/config";
import express from "express";
import cloudinary from "./lib/cloudinary.js";
const PORT = process.env.PORT || 9090;
const app = express();

app.use(cors());
app.use(express.json());

app.post("/profile/upload", async (req, res) => {
  try {
    const { imageDataUrl } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(imageDataUrl);
    const imageURl = uploadResponse.secure_url;
    return res.status(201).json({ imageURl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
