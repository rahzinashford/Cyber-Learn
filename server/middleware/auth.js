import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function issueAccessToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role, username: user.username },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = auth.slice(7);
  try {
    req.user = jwt.verify(token, env.jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: "Forbidden" });
    }
    return next();
  };
}
