import express, { json } from 'express';
import fileupload from 'express-fileupload';
import morgan from 'morgan';
import { PORT, PUBLIC_DIR } from './constants.js';

import { companionRoutes } from './routes/companions/companions.js';
import { parseCurrentUser } from './middlewares/parse-current-user.js';
import { travelRoutes } from './routes/travels/travels.js';
import { userRoutes } from './routes/users/users.js';
import { commentRoutes } from './routes/comments/comments.js';
import { reactionRoutes } from './routes/reactions/reactions.js';
import { travelImagesRoutes } from './routes/travel-images/travel-images.js';
import { authRoutes } from './routes/auth/auth.js';

const app = express();
app.listen(PORT, () => {
  console.log(`App iniciada, http://localhost:${PORT}`);
});

app.use(morgan('dev'));

app.use(express.static(PUBLIC_DIR));

app.use(parseCurrentUser);
app.use(json()); // Content-Type: application/json
app.use(
  fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
); // Content-Type: multipart/form-data

app.use(authRoutes);
app.use(travelRoutes);
app.use(commentRoutes);
app.use(reactionRoutes);
app.use(companionRoutes);
app.use(travelImagesRoutes);
app.use(userRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'UNKNOWN_ROUTE',
    message: 'Wrong route',
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status ?? 500).json({
    error: err.name,
    message: err.message,
  });
});
