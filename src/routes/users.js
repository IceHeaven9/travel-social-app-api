import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { authGuard } from "../middlewares/auth-guard.js";
import { getUserProfile, updateUserProfile } from "../database/users.js";
import { parseUserProfilePayload } from "../validations/users.js";
import { API_HOST, PUBLIC_DIR } from "../constants.js";
import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs/promises";
import { convertAvatarToWebp } from "../utils/convert-to-webp.js";

export const userRoutes = Router();

userRoutes.patch(
  "/profile",
  authGuard,
  asyncHandler(async (req, res) => {
    const { avatarFile, name, username } = parseUserProfilePayload(req.body);

    const userProfile = await getUserProfile(req.currentUser.id);

    let avatarURL;
    if (avatarFile) {
      const originalBuffer = Buffer.from(avatarFile.data, "base64");
      const imageBuffer = await convertAvatarToWebp(originalBuffer);
      const imageId = userProfile.avatar
        ? path.basename(userProfile.avatar, ".webp")
        : crypto.randomUUID();
      avatarURL = `/avatars/${imageId}.webp`;
      const filePath = path.join(PUBLIC_DIR, avatarURL);
      await fs.writeFile(filePath, imageBuffer);
    }

    await updateUserProfile({
      userId: req.currentUser.id,
      name: name ?? userProfile.name,
      username: username ?? userProfile.username,
      avatar: avatarURL ? API_HOST + avatarURL : userProfile.avatar,
    });

    res.status(200).send();
  })
);
