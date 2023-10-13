import OpenAI from "openai";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});

app.post("/getResponse", async (req, res) => {
  const messages = req.body.messages;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  return res.status(200).json(response.choices[0].message.content);
});

app.listen(port, () => {
  console.log(`Super cool server is running on port: ${port}`);
});
