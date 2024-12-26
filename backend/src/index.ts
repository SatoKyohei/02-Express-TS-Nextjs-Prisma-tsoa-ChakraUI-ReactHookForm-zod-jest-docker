/* eslint no-console: "off" */
import express, {
  json,
  Request as ExRequest,
  Response as ExResponse,
  urlencoded,
  NextFunction,
} from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";
import { ValidateError } from "tsoa";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

// リクエストログミドルウェア
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// フロントエンドからのリクエストを許可
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  const swaggerDocument = await import("../build/swagger.json");
  res.send(swaggerUi.generateHTML(swaggerDocument));
});

// エラーハンドリングミドルウェア
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  },
);

RegisterRoutes(app);

app.use(
  (err: unknown, _: ExRequest, res: ExResponse, next: NextFunction): any => {
    if (err instanceof ValidateError) {
      return res.status(422).json({
        message: "Validation Failed",
        details: err?.fields,
      });
    }
    if (err instanceof Error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    next();
  },
);

app.listen(port);

export { app };
