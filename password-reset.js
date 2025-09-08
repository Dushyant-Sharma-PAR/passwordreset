(function() {
  function createAltResetUI() {
    var prompt = config.internalOptions.prompt;
    if (prompt !== "reset-password-request") {
      return false;
    }
    const container = document.querySelector("form");
    if (!container) return; // fallback if page structure changes

    // --- Separator ---
    const separator = document.createElement("div");
    separator.style.textAlign = "center";
    separator.style.margin = "20px 0";
    separator.innerText = "OR";

    // --- Username input ---
    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.placeholder = "Enter username";
    usernameInput.id = "alt-username";
    usernameInput.style.display = "block";
    usernameInput.style.margin = "10px 0";
    usernameInput.style.width = "100%";
    usernameInput.required = true;

    // --- Button ---
    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.innerText = "Create Password Reset Link";
    resetBtn.style.display = "block";
    resetBtn.style.marginTop = "10px";
    resetBtn.style.width = "100%";

    // --- Message box ---
    const msg = document.createElement("div");
    msg.id = "alt-reset-msg";
    msg.style.marginTop = "10px";
    msg.style.fontSize = "14px";

    // --- Handler ---
    resetBtn.addEventListener("click", async () => {
      const username = usernameInput.value.trim();
      if (!username) {
        msg.innerText = "Please enter a username";
        msg.style.color = "red";
        return;
      }

      msg.innerText = "Requesting reset link...";
      msg.style.color = "black";

      try {
        const res = await fetch("https://your-backend.com/api/alt-password-reset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username })
        });

        if (res.ok) {
          msg.innerText = "Reset link has been generated. Check your delivery channel.";
          msg.style.color = "green";
        } else {
          const err = await res.text();
          msg.innerText = "Error: " + err;
          msg.style.color = "red";
        }
      } catch (e) {
        msg.innerText = "Unexpected error: " + e.message;
        msg.style.color = "red";
      }
    });

    // --- Append to DOM ---
    container.parentNode.insertBefore(separator, container.nextSibling);
    container.parentNode.insertBefore(usernameInput, separator.nextSibling);
    container.parentNode.insertBefore(resetBtn, usernameInput.nextSibling);
    container.parentNode.insertBefore(msg, resetBtn.nextSibling);
  }

  // Run after DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createAltResetUI);
  } else {
    createAltResetUI();
  }
})();
