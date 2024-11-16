import bcrypt from "bcryptjs";

export const toHashPassword = async (password: string):Promise<string> => {
    const cryptSalt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, cryptSalt);

    return hashedPassword;
}