import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../db/prisma.js";
import { issueAccessToken, requireAuth } from "../middleware/auth.js";

const router = Router();

const registerSchema = z.object({
  username: z.string().min(3).max(32),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(8),
});

router.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { username, email, password } = parsed.data;
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: { username, email, passwordHash },
      select: { id: true, username: true, role: true },
    });

    const token = issueAccessToken(user);
    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(409).json({ error: "Username or email already exists" });
  }
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { identifier, password } = parsed.data;
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: identifier }, { email: identifier }],
    },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = issueAccessToken(user);
  return res.json({
    token,
    user: { id: user.id, username: user.username, role: user.role },
  });
});

router.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.sub },
    select: { id: true, username: true, email: true, role: true, createdAt: true },
  });

  return res.json({ user });
});

export default router;
