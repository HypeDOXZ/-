# Display Bot — Setup Guide

A Discord bot that lets you post formatted embed messages with `/display`.

---

## 1. Create Your Bot

1. Go to https://discord.com/developers/applications
2. Click **New Application** → give it a name → **Create**
3. Go to **Bot** tab → click **Add Bot**
4. Under **Token**, click **Reset Token** and copy it — this is your `DISCORD_TOKEN`
5. Copy your **Application ID** from the **General Information** tab — this is your `CLIENT_ID`
6. Under **Bot → Privileged Gateway Intents**, no extras needed for this bot
7. Go to **OAuth2 → URL Generator**:
   - Scopes: `bot`, `applications.commands`
   - Bot Permissions: `Send Messages`, `Embed Links`, `Attach Files`
   - Copy the generated URL and open it to invite the bot to your server

---

## 2. Install & Run

```bash
# Install dependencies
npm install

# Set your tokens (Linux/Mac)
export DISCORD_TOKEN="your-token-here"
export CLIENT_ID="your-client-id-here"

# On Windows CMD:
set DISCORD_TOKEN=your-token-here
set CLIENT_ID=your-client-id-here

# Start the bot
npm start
```

> The bot will auto-register the `/display` command on startup. Wait ~1 minute for it to appear in Discord.

---

## 3. Using /display

| Option   | Required | Description |
|----------|----------|-------------|
| `title`  | ✅ Yes   | Bold title at the top (supports emoji) |
| `body`   | ✅ Yes   | Main text. Use `\n` to add new lines. |
| `note`   | ❌ No    | Italic note shown below the body |
| `footer` | ❌ No    | Small footer text at the bottom |
| `image`  | ❌ No    | Upload an image to show in the embed |
| `color`  | ❌ No    | Hex color for the sidebar (e.g. `#FF0000`) |

### Example

```
/display
  title: 📋 Server Applications
  body: At **American Plains Roleplay**, players can join various departments.\nChoose from: State Patrol, Sheriff's Office, Fire Department, or DOT.
  note: ⚠️ Note: Application openings will be posted here. Check back later for new opportunities.
  footer: American Plains Roleplay • Server Applications
  image: [attach your image file]
  color: #2ecc71
```

This will produce an embed that looks exactly like the one in your screenshot.

---

## 4. Tips

- **Bold text** in body/note: wrap with `**like this**`
- **New lines** in body: type `\n` (the bot converts it automatically)
- The command registers **globally** — it may take up to 1 hour to appear in all servers
- To register instantly to one server only, replace `Routes.applicationCommands(CLIENT_ID)` with `Routes.applicationGuildCommands(CLIENT_ID, 'YOUR_GUILD_ID')` in bot.js
