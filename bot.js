const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const TOKEN = process.env.DISCORD_TOKEN;       // Your bot token
const CLIENT_ID = process.env.CLIENT_ID;       // Your bot's application/client ID
// ──────────────────────────────────────────────────────────────────────────────

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Register the /display slash command
const commands = [
  new SlashCommandBuilder()
    .setName('display')
    .setDescription('Display a formatted embed message')
    .addStringOption(option =>
      option
        .setName('title')
        .setDescription('The bold title shown at the top (e.g. 📋 Server Applications)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('body')
        .setDescription('The main body text. Use \\n for new lines.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('note')
        .setDescription('Optional italic note shown below the body (e.g. ⚠️ Note: Check back later...)')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('footer')
        .setDescription('Footer text shown at the bottom (e.g. My Server • Server Applications)')
        .setRequired(false)
    )
    .addAttachmentOption(option =>
      option
        .setName('image')
        .setDescription('Optional image to display at the top of the embed')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('color')
        .setDescription('Embed sidebar color as a hex code (default: #5865F2). E.g. #FF0000')
        .setRequired(false)
    )
    .toJSON()
];

// Deploy commands on bot startup
client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const rest = new REST({ version: '10' }).setToken(TOKEN);
  try {
    console.log('Registering /display slash command...');
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('✅ /display command registered globally.');
  } catch (err) {
    console.error('❌ Failed to register commands:', err);
  }
});

// Handle the /display command
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== 'display') return;

  await interaction.deferReply(); // gives us time to build the embed

  const title  = interaction.options.getString('title');
  const body   = interaction.options.getString('body').replace(/\\n/g, '\n');
  const note   = interaction.options.getString('note');
  const footer = interaction.options.getString('footer');
  const image  = interaction.options.getAttachment('image');
  const colorInput = interaction.options.getString('color') ?? '#5865F2';

  // Validate hex color
  const colorHex = /^#[0-9A-Fa-f]{6}$/.test(colorInput) ? colorInput : '#5865F2';

  // Build description: body + optional italic note
  let description = body;
  if (note) {
    description += `\n\n*${note}*`;
  }

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(colorHex);

  if (footer) {
    embed.setFooter({ text: footer });
  }

  if (image) {
    embed.setImage(image.url);
  }

  await interaction.editReply({ embeds: [embed] });
});

client.login(TOKEN);
