chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    gateway: {
      enabled: true,
      mode: "mvp",
      transport: "runtime-message"
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || typeof message !== "object") {
    sendResponse({ ok: false, error: "invalid_message" });
    return;
  }

  if (message.type === "mcp.ping") {
    sendResponse({ ok: true, gateway: "taskbari-mcp", mode: "mvp" });
    return;
  }

  if (message.type === "mcp.invoke") {
    const skill = typeof message.skill === "string" ? message.skill : "unknown";
    sendResponse({
      ok: true,
      routed: true,
      skill,
      note: "Scaffold gateway route. Implement shared skill library binding in Q2."
    });
    return;
  }

  sendResponse({ ok: false, error: "unsupported_message_type" });
});
