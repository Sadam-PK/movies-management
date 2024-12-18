import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: './backend/.env' });
const SECRET = process.env.SECRET;

export const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;

      next();
    });
  } else {
    res.sendStatus(401);
  }
};
