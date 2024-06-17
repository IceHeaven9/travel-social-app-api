import { hashPassword } from '../../utils/hash-password.js';
import { db } from '../structure/db.js';
import { createUser } from '../structure/users.js';

export const adminId = await createUser({
  name: 'ADMIN',
  email: 'admin@travel-journal.com',
  hashedPassword: await hashPassword('user1234'),
  username: 'admin',
  role: 'ADMIN',
});

await db.end();
