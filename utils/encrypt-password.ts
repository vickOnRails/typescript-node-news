import bcrypt from "bcryptjs";

/**
 * encryptPassword - encrypts user password into a hash
 * @param { string } password - user provided password
 * @returns { object } incrementedPassword & passwordSalt
 */

export const encryptPassword = async (password: string) => {
  // throw error if password is not provided
  if (!password) throw new Error("Please provide a password");

  // generate password salt
  let salt: string = await bcrypt.genSalt();

  // hash password
  let hashedPassword: string = await bcrypt.hash(password, salt);

  // return hashed password
  return { hashedPassword, salt };
};
