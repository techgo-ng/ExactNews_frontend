// ✅ Final bbc_news.js — Includes <h3>, no "Read more", with source + timestamp

function fetchAndRenderNews() {
  const logDiv = document.getElementById("log");
  logDiv.textContent = "📡 Fetching BBC news...";

  fetch("https://exactnews-backend.onrender.com/bbc")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      const container = document.getElementById("news-container");
      container.className = "news-grid";
      container.innerHTML = ""; // Clear old news

      data.forEach(item => {
        const card = document.createElement("a");
        card.className = "news-card";
        card.href = item.link;
        card.target = "_blank";
        card.rel = "noopener noreferrer";

        const publishedAgo = timeAgo(item.published);
        const source = "BBC News";

        card.innerHTML = `
          <img src="${item.image || 'fallback.jpg'}" alt="News Image">
          <div class="news-card-content">
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <small class="meta">${source} • ${publishedAgo}</small>
          </div>
        `;

        container.appendChild(card);
      });

      logDiv.textContent = "✅ News successfully loaded.";
    })
    .catch(error => {
      logDiv.textContent = "❌ Failed to fetch news: " + error.message;
    });
}

// ⏱️ Utility: Converts time into “x minutes ago”
function timeAgo(published) {
  const now = new Date();
  const pubTime = new Date(published);
  const diffMs = now - pubTime;
  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(mins / 60);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min${mins !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  return pubTime.toLocaleDateString();
}

// Run on page load
fetchAndRenderNews();

// Auto-refresh every 60 seconds
setInterval(fetchAndRenderNews, 60000);

// Manual refresh on button click
document.getElementById("refreshBtn").addEventListener("click", fetchAndRenderNews);

