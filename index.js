export default {
  async fetch(request, env) {
    if (request.method === "POST") {
      try {
        const payload = await request.json();
        if (payload.message && payload.message.text === "/start") {
          const chatId = payload.message.chat.id;
          
          // Seedha fetch request
          await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: "🔥 **Bot Active Ho Gaya Hai!** 🔥\n\nNiche button se app kholein 👇",
              parse_mode: "Markdown",
              reply_markup: {
                inline_keyboard: [[{ text: "🎮 Open App", web_app: { url: "https://ffezbot.lovable.app" } }]]
              }
            })
          });
        }
      } catch (e) {}
      return new Response("OK", { status: 200 });
    }
    return new Response("Working!");
  }
};
