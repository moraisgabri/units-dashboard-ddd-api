import express from "express";
import { unitRouter } from "./unit.router";
import { locationRouter } from "./location.router";
import { assetRouter } from "./asset.router";

const router = express.Router();

unitRouter(router);
locationRouter(router);
assetRouter(router);

export default router;
