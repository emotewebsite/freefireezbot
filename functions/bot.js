export async function onRequestPost(context) {
  const { env, request } = context;

  // Check karein ki Token setup hai ya nahi
  if (!env.BOT_TOKEN) {
    return new Response("Error: BOT_TOKEN is missing in Cloudflare Settings", { status: 200 });
  }

  try {
    const payload = await request.json();
    
    // Check if it's a message and has text
    if (payload.message && payload.message.text) {
      const text = payload.message.text;
      const chatId = payload.message.chat.id;
      const firstName = payload.message.from.first_name || "User";

      if (text === "/start") {
        const webAppUrl = "https://ffezbot.lovable.app"; 
        const videoLink = "https://t.me/your_channel_link"; 

        const welcomeMessage = `🔥 **Hello ${firstName}! Swagat hai FF EZ Bot mein!** 🔥\n\n` +
                               `Duniya ka sabse fast Free Fire Emote Unlocker tool yahan hai.\n\n` +
                               `📌 **Details:**\n` +
                               `• 380+ Rare Emotes available\n` +
                               `• Direct UID & Team Code System\n` +
                               `• 100% Anti-Ban & Policy Safe\n\n` +
                               `Niche diye gaye button par click karein! 👇`;

        const responseBody = {
          chat_id: chatId,
          text: welcomeMessage,
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [{ text: "🎮 Open Emote Unlocker", web_app: { url: webAppUrl } }],
              [{ text: "❓ How to Get Password (Video)", url: videoLink }]
            ]
          }
        };

        // Telegram API call
        const telegramUrl = `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`;
        
        await fetch(telegramUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(responseBody)
        });
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    // Error log check karne ke liye (Optional)
    return new Response("OK", { status: 200 });
  }
}
