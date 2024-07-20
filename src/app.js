import express, { json } from "express";
import { FRONTEND_HOST, PORT, PUBLIC_DIR } from "./constants.js";
import cors from "cors";
import { travelRoutes } from "./routes/travels.js";
import { userRoutes } from "./routes/users.js";
import { commentRoutes } from "./routes/comments.js";
import { reactionRoutes } from "./routes/reactions.js";
import { travelImagesRoutes } from "./routes/travel-images.js";
import { authRoutes } from "./routes/auth.js";
import { companionRoutes } from "./routes/companions.js";
import morgan from "morgan";
import { parseCurrentUser } from "./middlewares/parse-current-user.js";
import fileupload from "express-fileupload";
import { unknownRoute } from "./controllers/errors/unknownRouteController.js";
import { errorController } from "./controllers/errors/errorController.js";

const app = express();
app.listen(PORT, () => {
	console.log(`App iniciada, http://localhost:${PORT}`);
});

app.use(morgan("dev"));

app.use(
	cors({
		origin: FRONTEND_HOST,
	})
);

app.use(express.static(PUBLIC_DIR));

app.use(parseCurrentUser);
app.use(json());
app.use(
	fileupload({
		limits: { fileSize: 50 * 1024 * 1024 },
	})
);

app.use(authRoutes);
app.use(travelRoutes);
app.use(commentRoutes);
app.use(reactionRoutes);
app.use(companionRoutes);
app.use(travelImagesRoutes);
app.use(userRoutes);

app.use(unknownRoute);

app.use(errorController);
