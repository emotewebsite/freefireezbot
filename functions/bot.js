export async function onRequestPost(context) {
  const { env, request } = context;

  try {
    const payload = await request.json();
    
    // Sirf /start command ko handle karne ke liye
    if (payload.message && payload.message.text === "/start") {
      const chatId = payload.message.chat.id;
      const firstName = payload.message.from.first_name;
      
      // Aapka Purana Website Link aur Video Link
      const webAppUrl = "https://ffezbot.lovable.app"; 
      const videoLink = "https://t.me/your_channel_link"; // Yahan apna video post link dalein

      const welcomeMessage = `🔥 **Hello ${firstName}! Swagat hai ff ez bot mein!** 🔥\n\n` +
                             `Duniya ka sabse fast Free Fire Emote Unlocker tool yahan hai.\n\n` +
                             `📌 **Details:**\n` +
                             `• 380+ Rare Emotes available\n` +
                             `• Direct UID & Team Code System\n` +
                             `• 100% Anti-Ban & Policy Safe\n\n` +
                             `Niche diye gaye button par click karein aur password nikalne ke liye guide video dekhein! 👇`;

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

      // Telegram ko message bhejna
      await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responseBody)
      });
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("OK", { status: 200 }); // Error hone par bhi 200 bhejte hain taaki Telegram baar-baar hit na kare
  }
}
