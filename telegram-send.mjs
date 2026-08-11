/**
 * إرسال رسالة عبر بوت تيلغرام إلى محادثة محددة.
 *
 * الاستخدام:
 *   1) انسخ .env.example إلى .env وضع TELEGRAM_BOT_TOKEN (والـ CHAT_ID إن لزم).
 *   2) npm run send -- "نص الرسالة"
 *
 * أو بدون npm:
 *   node --env-file=.env telegram-send.mjs "نص الرسالة"
 *
 * ملاحظة: المستخدم 8110062911 يجب أن يضغط /start للبوت مرة واحدة على الأقل
 * حتى يصله الإرسال من البوت.
 */

const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
const chatId = (process.env.TELEGRAM_CHAT_ID || "8897955121").trim();
const text = process.argv.slice(2).join(" ").trim() || "اختبار: البوت يعمل.";

if (!token) {
  console.error(
    "Missing TELEGRAM_BOT_TOKEN. Create .env from .env.example or export the variable.",
  );
  process.exit(1);
}

const url = `https://api.telegram.org/bot${token}/sendMessage`;

const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: chatId,
    text,
    disable_web_page_preview: true,
  }),
});

let data;
try {
  data = await res.json();
} catch {
  console.error("Invalid JSON response from Telegram");
  process.exit(1);
}

console.log(JSON.stringify(data, null, 2));

if (!data.ok) {
  console.error("Telegram API error:", data.description || res.status);
  process.exit(1);
}
