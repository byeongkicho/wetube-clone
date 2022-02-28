import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.get("/upload", getUpload);

export default videoRouter;
