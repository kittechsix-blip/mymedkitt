// myMedKitt — Stage-1 skill distribution page logic.
// CSP-clean: external script, no inline handlers, no eval, fetches same-origin only.

(function () {
  "use strict";

  // --- Disclaimer gate: reuse the app's acceptance (same origin → shared localStorage) ---
  var accepted = false;
  try {
    accepted = window.localStorage.getItem("medkitt-legal-acknowledged") === "true";
  } catch (e) {
    accepted = false;
  }
  var gate = document.getElementById("gate");
  var content = document.getElementById("content");
  if (accepted) {
    if (gate) gate.classList.add("hidden");
    if (content) content.style.display = "block";
  } else {
    // Not accepted → leave the gate visible, hide the download UI. Nothing else runs.
    if (content) content.style.display = "none";
    return;
  }

  // --- Version stamp from skill-meta.json ---
  fetch("skill/skill-meta.json", { cache: "no-store" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (m) {
      var el = document.getElementById("stamp");
      if (!el) return;
      if (!m) { el.textContent = "Version unavailable"; return; }
      var parts = [];
      if (m.skillVersion) parts.push("Skill " + m.skillVersion);
      if (m.consultCount) parts.push(m.consultCount + " consults");
      if (m.disclaimerVersion) parts.push("Disclaimer " + m.disclaimerVersion + (m.disclaimerEffectiveDate ? " (" + m.disclaimerEffectiveDate + ")" : ""));
      el.textContent = parts.join(" · ");
    })
    .catch(function () {
      var el = document.getElementById("stamp");
      if (el) el.textContent = "Version unavailable";
    });

  // --- SKILL.md copy-paste fallback ---
  var mdEl = document.getElementById("skillmd");
  var skillMdText = "";
  fetch("skill/SKILL.md", { cache: "no-store" })
    .then(function (r) { return r.ok ? r.text() : ""; })
    .then(function (t) {
      skillMdText = t || "";
      if (mdEl) mdEl.textContent = skillMdText || "SKILL.md unavailable — install the .skill file instead.";
    })
    .catch(function () { if (mdEl) mdEl.textContent = "SKILL.md unavailable — install the .skill file instead."; });

  var copyBtn = document.getElementById("copy");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var text = skillMdText || (mdEl ? mdEl.textContent : "");
      if (!text) return;
      var done = function () {
        copyBtn.textContent = "Copied ✓";
        setTimeout(function () { copyBtn.textContent = "Copy SKILL.md"; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { /* fall back to manual select */ });
      }
    });
  }

  // --- Install instruction tabs ---
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".panel"));
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var name = tab.getAttribute("data-tab");
      tabs.forEach(function (t) { t.setAttribute("aria-selected", t === tab ? "true" : "false"); });
      panels.forEach(function (p) { p.classList.toggle("on", p.getAttribute("data-panel") === name); });
    });
  });
})();
