// news.js — Clean & tested version
const API_URL = "https://exactnews-backend.onrender.com/nigeria"; // Change to match your backend route
const refreshBtn = document.getElementById("refreshBtn");
const newsContainer = document.getElementById("news-container");
const logDiv = document.getElementById("log");

function log(msg, success = false) {
  const prefix = success ? "✅" : "📡";
  logDiv.textContent += `\n${prefix} ${msg}`;
}

function showError(error) {
  logDiv.textContent += `\n❌ Fetch error: ${error.message || error}`;
}

function clearNews() {
  if (newsContainer) {
    newsContainer.innerHTML = "";
  }
}

function renderNews(newsArray) {
  if (!newsContainer) {
    showError("Missing #news-container");
    return;
  }

  clearNews();
  log(`Rendering top ${newsArray.length} headlines...`, true);

  newsArray.slice(0, 5).forEach(item => {
    const newsCard = document.createElement("div");
    newsCard.className = "news-card";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const summary = document.createElement("p");
    summary.innerHTML = item.summary;

    const link = document.createElement("a");
    link.href = item.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "🔗 Read more";

    const meta = document.createElement("p");
    meta.innerHTML = `<em>🗞️ ${item.source}</em> — <time>${item.published}</time>`;

    newsCard.appendChild(title);
    newsCard.appendChild(summary);
    newsCard.appendChild(link);
    newsCard.appendChild(meta);

    newsContainer.appendChild(newsCard);
  });
}

function fetchNews() {
  logDiv.textContent = "📡 Starting fetch for Nigerian news...";

  fetch(API_URL)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not OK");
      return response.json();
    })
    .then(data => {
      log("News data fetched successfully.", true);
      renderNews(data);
    })
    .catch(showError);
}

// Allow manual refresh
if (refreshBtn) {
  refreshBtn.addEventListener("click", fetchNews);
}

// Auto fetch on page load
window.addEventListener("DOMContentLoaded", fetchNews);
