import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import routes from "./routes/routes";
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.set("trust proxy", 1);

//routes
app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Welcome to the My Portfolio Server",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
