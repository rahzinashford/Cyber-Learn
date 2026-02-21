import { Router } from "express";
import { prisma } from "../db/prisma.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("ADMIN"));

router.get("/stats", async (_req, res) => {
  const [totalUsers, totalChannels, totalMessages] = await Promise.all([
    prisma.user.count(),
    prisma.channel.count(),
    prisma.message.count(),
  ]);

  return res.json({
    totalUsers,
    totalChannels,
    totalMessages,
  });
});

router.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return res.json({ users });
});

export default router;
