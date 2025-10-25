import { Router } from "express";
import userRoute from "../modules/user/user.routes";

import blogRoute from "../modules/blog/blog.routes";
import projectRoute from "../modules/project/project.routes";
import { authRouter } from "../modules/auth/auth.routes";

const routes = Router();

routes.use("/users", userRoute);
routes.use("/auth", authRouter);
routes.use("/blog", blogRoute);
routes.use("/project", projectRoute);

export default routes;
