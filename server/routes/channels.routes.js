import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { containsRestrictedContent } from "../services/moderation.js";

const router = Router();

router.get("/", requireAuth, async (_req, res) => {
  const channels = await prisma.channel.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, slug: true, name: true, description: true },
  });
  return res.json({ channels });
});

router.get("/:channelId/messages", requireAuth, async (req, res) => {
  const { channelId } = req.params;
  const limit = Math.min(Number(req.query.limit || 30), 100);

  const messages = await prisma.message.findMany({
    where: { channelId },
    include: {
      author: { select: { id: true, username: true } },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return res.json({ messages: messages.reverse() });
});

const messageSchema = z.object({
  body: z.string().min(1).max(2000),
});

router.post("/:channelId/messages", requireAuth, async (req, res) => {
  const parsed = messageSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  if (containsRestrictedContent(parsed.data.body)) {
    return res.status(422).json({ error: "Message contains restricted content" });
  }

  const message = await prisma.message.create({
    data: {
      body: parsed.data.body,
      channelId: req.params.channelId,
      authorId: req.user.sub,
    },
    include: {
      author: { select: { id: true, username: true } },
    },
  });

  req.app.get("io").to(`channel:${req.params.channelId}`).emit("message:new", {
    id: message.id,
    body: message.body,
    createdAt: message.createdAt,
    channelId: message.channelId,
    author: message.author,
  });

  return res.status(201).json({ message });
});

export default router;
