import { hashPassword } from "../../utils/hash-password.js";
import { addComment } from "../comments.js";
import { addCompanion } from "../companions.js";
import { db } from "../db.js";
import { setReaction } from "../reactions.js";
import { saveTravelImage } from "../travel-images.js";
import { createTravel } from "../travels.js";
import { createUser } from "../users.js";
import { faker } from "@faker-js/faker";
import crypto from "node:crypto";

const demoUserCount = 10;
const demoTravelPostPerUser = 20;
const demoCommentsPerPost = 10;
const demoReactionsPerPost = 10;

const globalPassword = "user1234";

const userIdList = [];

await createUser({
  name: "Pablo Baleztena",
  email: "pablo@ultharsoftware.com",
  hashedPassword: await hashPassword("user1234"),
  username: "piarrot",
  role: "USER",
});

for (let i = 0; i < demoUserCount; i++) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();
  const username = faker.internet.userName();

  const id = await createUser({
    name: `${firstName} ${lastName}`,
    email: email,
    username: username,
    role: "USER",
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

        const imageCount = faker.number.int({ min: 1, max: 5 });

        for (let j = 0; j < imageCount; j++) {
          const randomSeed = crypto.randomBytes(8).toString("hex");
          await saveTravelImage(
            postId,
            `https://picsum.photos/seed/${randomSeed}/200/300`
          );
        }

        postIdList.push(postId);

        const randomReactions = Math.floor(Math.random() * demoUserCount);

        for (let j = 0; j < randomReactions; j++) {
          await setReaction(
            postId,
            faker.helpers.arrayElement(userIdList),
            faker.helpers.arrayElement([-1, 1])
          );
        }

        const randomComments = Math.floor(5 + Math.random() * 15);

        for (let j = 0; j < randomComments; j++) {
          await addComment(
            postId,
            faker.helpers.arrayElement(userIdList),
            faker.lorem.sentences({ min: 1, max: 3 })
          );
        }
      }

      return postIdList;
    })
  )
).flat();

await db.end();
