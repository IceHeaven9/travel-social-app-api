import { hashPassword } from '../../utils/hash-password.js';
import { addCompanion } from '../structure/companions.js';
import { db } from '../structure/db.js';
import { createTravel } from '../structure/travels.js';
import { createUser } from '../structure/users.js';
import { faker } from '@faker-js/faker';

const demoUserCount = 10;
const demoTravelPostPerUser = 20;
const demoCommentsPerPost = 10;
const demoReactionsPerPost = 10;

const globalPassword = 'user1234';

const userIdList = [];

for (let i = 0; i < demoUserCount; i++) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();
  const username = faker.internet.userName();

  const id = await createUser({
    name: `${firstName} ${lastName}`,
    email: email,
    username: username,
    role: 'USER',
    hashedPassword: await hashPassword(globalPassword),
    avatar: `https://i.pravatar.cc/150?u=${username}`,
  });

  userIdList.push(id);
}

const postIdList = (
  await Promise.all(
    userIdList.map(async (userId) => {
      const postIdList = [];
      const possibleCompanions = userIdList.filter((u) => u != userId);

      for (let i = 0; i < demoTravelPostPerUser; i++) {
        const postId = await createTravel({
          title: faker.lorem.words({ min: 3, max: 15 }),
          description: faker.lorem.paragraphs(3),
          rating: faker.number.int({ min: 1, max: 5 }),
          userId,
        });

        const selectedCompanions = faker.helpers.arrayElements(
          possibleCompanions,
          {
            min: 0,
            max: 3,
          }
        );

        for (const companionId of selectedCompanions) {
          await addCompanion(postId, companionId);
        }

        postIdList.push(postId);
      }

      return postIdList;
    })
  )
).flat();

await db.end();
