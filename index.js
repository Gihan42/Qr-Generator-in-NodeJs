import express from "express";
import qr from "qr-image";
import fs from "fs";
import { URL } from "url";

const app = express();
const PORT = 3000; 

app.use(express.json());

app.post("/generateQR", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }


  const parsedUrl = new URL(url);
  const hostname = parsedUrl.hostname;

  const qr_png = qr.imageSync(url, { type: "png" });

  const domain = hostname.replace("www.", "").split(".")[0];

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;


  const fileName = `${domain}_${formattedDate}_qr_code.png`;

  fs.writeFileSync(fileName, qr_png);

  res.json({ success: true, fileName });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
