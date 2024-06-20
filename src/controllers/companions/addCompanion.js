import {
  assertTravelExists,
  assertUserIsTravelOwner,
} from '../../database/structure/travels.js';
import {
  addCompanion,
  assertCompanionNotAdded,
} from '../../database/structure/companions.js';
import { assertUserExists } from '../../database/structure/users.js';

export const addCompanionController = async (req, res) => {
  const { userId } = req.body;
  await assertTravelExists(req.params.travelId);
  await assertUserIsTravelOwner(req.currentUser.id, req.params.travelId);
  await assertUserExists(userId);

  await assertCompanionNotAdded(req.params.travelId, userId);

  await addCompanion(req.params.travelId, userId);

  res.status(201).send();
};
