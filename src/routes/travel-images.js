import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import crypto from "node:crypto";
import path from "node:path";
import { API_HOST, PUBLIC_DIR } from "../constants.js";
import {
  assertTravelExists,
  assertUserIsTravelOwner,
} from "../database/travels.js";
import { parseTravelImage } from "../validations/images.js";
import { convertTravelImageToWebp } from "../utils/convert-to-webp.js";
import { authGuard } from "../middlewares/auth-guard.js";
import fs from "node:fs/promises";
import {
  deleteTravelImage,
  getTravelImageById,
  getTravelImageByTravelId,
  saveTravelImage,
} from "../database/travel-images.js";

export const travelImagesRoutes = Router();

travelImagesRoutes.post(
  "/travels/:travelId/photos",
  authGuard,
  asyncHandler(async (req, res) => {
    await assertTravelExists(req.params.travelId);
    await assertUserIsTravelOwner(req.currentUser.id, req.params.travelId);

    const imageFile = parseTravelImage(req.files.file);

    const imageBuffer = await convertTravelImageToWebp(imageFile.data);

    const imageId = crypto.randomUUID();
    const url = `/post-images/${imageId}.webp`;
    const filePath = path.join(PUBLIC_DIR, url);

    await fs.writeFile(filePath, imageBuffer);

    const id = await saveTravelImage(req.params.travelId, API_HOST + url);

    res.status(200).json({ id });
  })
);

travelImagesRoutes.delete(
  "/travels/:travelId/photos/:photoId",
  authGuard,
  asyncHandler(async (req, res) => {
    await assertTravelExists(req.params.travelId);
    await assertUserIsTravelOwner(req.currentUser.id, req.params.travelId);

    const travelImage = await getTravelImageById(req.params.photoId);
    if (!travelImage) {
      throw {
        status: 404,
        name: "TRAVEL_IMAGE_NOT_FOUND",
        message: "Travel image not found",
      };
    }

    const filePath = path.join(
      PUBLIC_DIR,
      `/post-images/${path.basename(travelImage.url)}`
    );
    await fs.unlink(filePath);

    await deleteTravelImage(req.params.photoId);

    res.status(200).send();
  })
);

travelImagesRoutes.get(
  "/travels/:travelId/photos",
  asyncHandler(async (req, res) => {
    const images = await getTravelImageByTravelId(req.params.travelId);

    res.status(200).json(images);
  })
);
