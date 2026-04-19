export default {
  async fetch(request, env) {
    // Check agar request Telegram se aayi hai (POST request)
    if (request.method === "POST") {
      try {
        const payload = await request.json();
        
        // Agar user ne /start bheja hai
        if (payload.message && payload.message.text === "/start") {
          const chatId = payload.message.chat.id;
          const firstName = payload.message.from.first_name || "User";
          
          const webAppUrl = "https://ffezbot.lovable.app"; 
          const videoLink = "https://t.me/your_channel_link"; // Apna link badal lena

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

          // Telegram API ko message bhejna
          const telegramUrl = `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`;
          
          await fetch(telegramUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(responseBody)
          });
        }
      } catch (error) {
        // Error hone par Telegram ko "OK" bhejte hain taaki wo baar-baar request na bhejta rahe
        return new Response("OK", { status: 200 });
      }
      return new Response("OK", { status: 200 });
    }
    
    // Agar koi link browser mein khole toh ye dikhega
    return new Response("Bot is Running via Cloudflare Workers!");
  }
};
