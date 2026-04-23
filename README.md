# Zllawi be honest Bot Web

واجهة ويب بسيطة لبوت Discord تحتوي على:

- شروط استخدام باللغة العربية
- زر دعوة مباشر للبوت

## الملفات

- `index.html` الصفحة الرئيسية
- `styles.css` التنسيق
- `app.js` إعداد رابط الدعوة

## التفعيل

1. افتح ملف `app.js`.
2. ضع `Client ID` الحقيقي مكان:

```js
clientId: "PUT_YOUR_DISCORD_CLIENT_ID_HERE";
```

3. ارفع الملفات على GitHub Pages أو أي استضافة static.

## رابط الدعوة

يتم توليده تلقائيًا بصيغة:

`https://discord.com/api/oauth2/authorize?client_id=...&permissions=8&scope=bot%20applications.commands`
