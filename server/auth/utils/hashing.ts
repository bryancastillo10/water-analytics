import bcrypt from "bcryptjs";

export const toHashPassword = async (password: string):Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
}