require("dotenv").config();

const path = require("node:path");
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const port = Number(process.env.PORT || 3000);
const corsOrigin = process.env.CORS_ORIGIN || "*";
const fallbackMessagesSent = Number(process.env.DEFAULT_MESSAGES_SENT || 532);
const token = process.env.DISCORD_TOKEN;

const botClient = token
  ? new Client({ intents: [GatewayIntentBits.Guilds] })
  : null;

let lastBotError = null;

if (botClient) {
  botClient.once("ready", (client) => {
    console.log(`Discord bot connected as ${client.user.tag}`);
  });

  botClient.on("error", (error) => {
    lastBotError = error.message;
    console.error("Discord client error:", error);
  });

  botClient.login(token).catch((error) => {
    lastBotError = error.message;
    console.error("Failed to login to Discord:", error.message);
  });
} else {
  console.warn("DISCORD_TOKEN is missing. /api/stats will use fallback values.");
}

function getLiveStats() {
  if (!botClient || !botClient.isReady()) {
    return {
      live: false,
      guilds: 12,
      users: 1284,
      messagesSent: fallbackMessagesSent,
      botStatus: "غير متصل",
      updatedAt: new Date().toISOString(),
      error: lastBotError
    };
  }

  const guilds = Array.from(botClient.guilds.cache.values());
  const totalGuilds = guilds.length;
  const totalUsers = guilds.reduce(
    (sum, guild) => sum + (Number(guild.memberCount) || 0),
    0
  );

  return {
    live: true,
    guilds: totalGuilds,
    users: totalUsers,
    messagesSent: fallbackMessagesSent,
    botStatus: "متصل",
    updatedAt: new Date().toISOString(),
    error: null
  };
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", corsOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

app.get("/api/stats", (req, res) => {
  const stats = getLiveStats();

  res.json({
    ok: true,
    source: "discord_api",
    ...stats
  });
});

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    server: "running",
    botReady: Boolean(botClient && botClient.isReady())
  });
});

app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
  console.log(`Web server running on http://localhost:${port}`);
});
