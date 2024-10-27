import connectToDB from "@/database/database";

const db = await connectToDB();

//Check the user in database
export async function retriveUser(username, email, userId) {
  const [user] = await db.execute(
    `SELECT * FROM users WHERE username=? OR email=?`,
    [username, email]
  );
  return user[0];
}

//Create new User in the database
export async function createUser(
  username,
  name,
  email,
  password,
  gender,
  emailVerifyToken
) {
  const [newUser] = await db.execute(
    `INSERT INTO users (username, name, email, password, gender, verification_token) VALUES(?, ?, ?, ?, ?, ?)`,
    [username, name, email, password, gender, emailVerifyToken]
  );
  return newUser;
}

//Get the user by userId in database
export async function retriveUserById(userId) {
  const [user] = await db.execute(`SELECT * FROM users WHERE id=?`, [userId]);
  return user[0];
}

//
export async function updateVerifyStatus(userId) {
  const [updateUser] = await db.execute(
    `UPDATE users SET is_verified = true WHERE id=?`,
    [userId]
  );
  return updateUser[0];
}
