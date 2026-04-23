const WEB_CONFIG = {
  clientId: "1496608248814374923",
  permissions: "8",
  scope: "bot applications.commands"
};

function isValidClientId(clientId) {
  return /^\d{17,20}$/.test(clientId);
}

function buildInviteUrl(config) {
  const params = new URLSearchParams({
    client_id: config.clientId,
    permissions: config.permissions,
    scope: config.scope
  });

  return `https://discord.com/api/oauth2/authorize?${params.toString()}`;
}

function initInvite() {
  const inviteBtn = document.getElementById("inviteBtn");
  const inviteHint = document.getElementById("inviteHint");

  if (!inviteBtn || !inviteHint) {
    return;
  }

  if (!isValidClientId(WEB_CONFIG.clientId)) {
    inviteBtn.classList.add("disabled");
    inviteHint.textContent =
      "ضع Client ID الحقيقي داخل ملف app.js لتفعيل زر الدعوة.";
    return;
  }

  inviteBtn.href = buildInviteUrl(WEB_CONFIG);
  inviteHint.textContent = "تم تجهيز رابط الدعوة. اضغط الزر لإضافة البوت.";
}

initInvite();
