import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import crypto from 'node:crypto';
import path from 'node:path';
import { API_HOST, PUBLIC_DIR } from '../../constants.js';
import {
  assertTravelExists,
  assertUserIsTravelOwner,
} from '../../database/structure/travels.js';
import { parseTravelImage } from '../../validations/images.js';
import { convertTravelImageToWebp } from '../../utils/convert-to-webp.js';
import { authGuard } from '../../middlewares/auth-guard.js';
import fs from 'node:fs/promises';
import { saveTravelImage } from '../../database/structure/travel-images.js';

export const addTravelPhotoRoutes = Router();

addTravelPhotoRoutes.post(
  '/travels/:travelId/photos',
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