function initInvite() {
  const inviteBtn = document.getElementById("inviteBtn");
  const inviteHint = document.getElementById("inviteHint");

  if (!inviteBtn || !inviteHint) {
    return;
  }

  const inviteUrl =
    "https://discord.com/oauth2/authorize?client_id=1496608248814374923&permission";

  inviteBtn.href = inviteUrl;
  inviteHint.textContent = "تم ضبط زر الدعوة بالرابط المحدد.";
}

initInvite();
