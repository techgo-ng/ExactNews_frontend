document.addEventListener("DOMContentLoaded", () => {
  const logDiv = document.getElementById("log");
  const newsContainer = document.getElementById("news-container");

  // 🚨 Hard fail warning if required DOM elements are missing
  if (!logDiv || !newsContainer) {
    console.error("❌ Critical DOM elements missing. Check #log and #news-container in your HTML.");
    alert("❌ Page error: Missing #log or #news-container. Check your index.html structure.");
    return;
  }

  // Log the fetch start
  logDiv.textContent = "📡 Fetching news...";

  const startTime = performance.now();

  // ✅ Updated route (removed `/news`)
  fetch("https://exactnews-backend.onrender.com/africa/nigeria/general")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const fetchTime = ((performance.now() - startTime) / 1000).toFixed(2);

      if (!Array.isArray(data) || data.length === 0) {
        logDiv.textContent = "⚠️ No news items found.";
        return;
      }

      logDiv.textContent = `✅ Topmost exactnews fetched successfully.  ✅ Rendered ${data.length} items in ${fetchTime}s`;

      const grouped = {};
      const others = [];

      data.forEach(item => {
        const source = item.source || "Other";
        if (!grouped[source]) grouped[source] = [];
        if (grouped[source].length < 2) {
          grouped[source].push(item);
        } else {
          others.push(item);
        }
      });

      // Show top 2 items per source
      Object.keys(grouped).forEach(source => {
        grouped[source].forEach(news => {
          renderNewsCard(newsContainer, news, source, true);
        });
      });

      // Shuffle and render the rest
      shuffleArray(others);
      others.forEach(news => {
        renderNewsCard(newsContainer, news, news.source || "Other", false);
      });
    })
    .catch(error => {
      logDiv.textContent = `❌ Failed to fetch news: ${error}`;
    });
});

function renderNewsCard(container, item, source, highlight) {
  if (!container) return;

  const card = document.createElement("div");
  card.className = `news-card ${highlight ? "highlight" : ""}`;

  card.innerHTML = `
    <h3>${item.title || "Untitled"}</h3>
    <p class="source">${source}</p>
    ${item.image ? `<img src="${item.image}" alt="News Image">` : ""}
    <p>${item.summary || ""}</p>
    <a href="${item.link}" target="_blank">Read more →</a>
    <p class="date">${item.published || ""}</p>
  `;

  container.appendChild(card);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
