import express, { json } from 'express';
import fileupload from 'express-fileupload';
import morgan from 'morgan';
import { FRONTEND_HOST, PORT, PUBLIC_DIR } from './src/constants/constants.js';
import cors from 'cors';
// Route imports
import { companionRoutes } from './src/routes/companions.js';
import { parseCurrentUser } from './src/middlewares/parse-current-user.js';
import { travelRoutes } from './src/routes/travels.js';
import { userRoutes } from './src/routes/users.js';
import { commentRoutes } from './src/routes/comments.js';
import { reactionRoutes } from './src/routes/reactions.js';
import { travelImagesRoutes } from './src/routes/travel-images.js';
import { authRoutes } from './src/routes/auth.js';

//Controller imports
import { errorController } from './src/controllers/errors/errorController.js';
import { unknownRouteController } from './src/controllers/errors/unknownRouteController.js';

const app = express();
app.listen(PORT, () => {
  console.log(`App iniciada, http://localhost:${PORT}`);
});

app.use(morgan('dev'));

app.use(cors({ origin: FRONTEND_HOST }));

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

app.use(unknownRouteController);

app.use(errorController);
