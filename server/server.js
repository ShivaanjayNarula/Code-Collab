import express from "express";
import cors from "cors";
import "dotenv/config";
import { CompletionCopilot } from "monacopilot";
import userRouter from "./api/user_routes.js";
import collabRouter from "./api/collab_routes.js";
import { connectdb } from "./api/models/db.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/collab", collabRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Helllo",
  });
});

const copilot = new CompletionCopilot(process.env.MISTRAL_API_KEY, {
  provider: "mistral",
  model: "codestral",
});

app.post("/complete", async (req, res) => {
  const { completion, error, raw } = await copilot.complete({
    body: req.body,
  });

  if (error) {
    console.error("Completion error:", error);
    return res.status(500).json({ completion: null, error });
  }

  res.status(200).json({ completion });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on ${PORT}`);
  connectdb();
});
