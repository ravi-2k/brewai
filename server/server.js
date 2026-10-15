import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./config/db.js";
import creationRoutes from "./routes/creationRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

connectDB();

const app = express();

// Only the deployed frontend may call this API. CLIENT_URL can hold several
// origins separated by commas. When unset (local dev), every origin is allowed.
const allowedOrigins = process.env.CLIENT_URL?.split(",").map((o) => o.trim());
app.use(cors(allowedOrigins ? { origin: allowedOrigins } : undefined));
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Server is up and running"));

app.use("/api/creations", creationRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/ai", aiRoutes);

// Error handler (4 arguments = Express treats it as the error handler).
// Express 5 forwards errors from async controllers here automatically.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Server is running successfully on ${PORT}`),
);
