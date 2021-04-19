import bcrypt from "bcryptjs";

// FIXME: Use appropriate types here
export const comparePasswords = async (password: string, user: any) => {
  try {
    const compareResult = await bcrypt.compare(password, user.password);
    return compareResult;
  } catch (err) {
    throw new Error(err.message);
  }
};
