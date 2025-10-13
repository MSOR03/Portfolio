import jwt from "jsonwebtoken";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export const generateGitHubJWT = () => {
  const privateKey = fs.readFileSync(process.env.GITHUB_PRIVATE_KEY_PATH, "utf8");
  
  const now = Math.floor(Date.now() / 1000);
  
  const payload = {
    iat: now,              // Issued at (ahora)
    exp: now + (9 * 60),   // Expira en 9 minutos
    iss: process.env.GITHUB_APP_ID
  };

  return jwt.sign(payload, privateKey, { algorithm: "RS256" });
};