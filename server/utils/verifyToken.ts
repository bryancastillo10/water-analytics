import jwt from "jsonwebtoken";

interface DecodedToken {
    userId: string;
}

export const verifyToken = (token: string):DecodedToken => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    return decoded;
}

