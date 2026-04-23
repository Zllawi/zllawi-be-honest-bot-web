# Zllawi be honest Bot Web

واجهة عربية حديثة (RTL) لتسجيل الدخول ومعاينة لوحة تحكم البوت.

## المميزات

- تصميم Full-width متجاوب للديسكتوب/تابلت/موبايل
- تسجيل دخول Discord OAuth
- تبديل ثيم Light / Dark
- معاينة Dashboard بإحصائيات البوت
- API مدمج يسحب القيم الحقيقية من Discord API

## القيم الحقيقية من Discord

المشروع يوفر endpoint:

- `GET /api/stats`

واجهة الويب تقرأ القيم من نفس الدومين تلقائيًا. إذا كانت الواجهة على دومين مختلف،
يمكنك ضبطه عبر:

```html
<script>window.ZLLAWI_STATS_ENDPOINT = "https://your-api-domain.com/api/stats";</script>
```

ويرجع:

- `guilds` عدد السيرفرات الحقيقي للبوت
- `users` مجموع الأعضاء عبر السيرفرات
- `messagesSent` قيمة قابلة للتخصيص من `.env`
- `botStatus` حالة البوت (`متصل` / `غير متصل`)

## الإعداد

1. تثبيت الحزم:

```bash
npm install
```

2. إنشاء ملف البيئة:

```bash
cp .env.example .env
```

على PowerShell:

```powershell
Copy-Item .env.example .env
```

3. عدّل `.env`:

- `DISCORD_TOKEN` توكن البوت
- `PORT` منفذ السيرفر
- `CORS_ORIGIN` الدومين المسموح له بطلب `/api/stats` (أو `*`)
- `DEFAULT_MESSAGES_SENT` قيمة افتراضية لعدد الرسائل

4. تشغيل المشروع:

```bash
npm start
```

ثم افتح:

- `http://localhost:3000`
- صحة السيرفر: `http://localhost:3000/health`

## الملفات المهمة

- `server.js` سيرفر Express + Discord API stats
- `index.html` واجهة الصفحة
- `styles.css` التصميم
- `app.js` منطق الواجهة وجلب الإحصائيات
