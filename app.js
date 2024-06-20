import express, { json } from 'express';
import fileupload from 'express-fileupload';
import morgan from 'morgan';
import { PORT, PUBLIC_DIR } from './src/constants/constants.js';

// Route imports
import { companionRoutes } from './src/routes/companions/companions.js';
import { parseCurrentUser } from './src/middlewares/parse-current-user.js';
import { travelRoutes } from './src/routes/travels/travels.js';
import { userRoutes } from './src/routes/users/users.js';
import { commentRoutes } from './src/routes/comments/comments.js';
import { reactionRoutes } from './src/routes/reactions/reactions.js';
import { travelImagesRoutes } from './src/routes/travel-images/travel-images.js';
import { authRoutes } from './src/routes/auth/auth.js';

//Controller imports
import { errorController } from './src/controllers/errors/errorController.js';
import { unknownRouteController } from './src/controllers/errors/unknownRouteController.js';

const app = express();
app.listen(PORT, () => {
  console.log(`App iniciada, http://localhost:${PORT}`);
});

app.use(morgan('dev'));

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
