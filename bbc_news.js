function fetchAndRenderNews() {
  const logDiv = document.getElementById("log");
  logDiv.textContent = "📡 Fetching BBC news...";
  console.log("📡 Starting fetch...");

  fetch("https://exactnews-backend.onrender.com/bbc")
    .then(response => {
      console.log("📦 Response received:", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log("📨 Data received:", data);

      const container = document.getElementById("news-container");
      container.className = "news-grid";
      container.innerHTML = ""; // Clear previous content

      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "news-card";

        card.innerHTML = `
          <img src="${item.image || 'fallback.jpg'}" alt="News Image">
          <div class="news-card-content">
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <a href="${item.link}" target="_blank" class="read-more">📖 Read more</a>
          </div>
        `;

        container.appendChild(card);
      });

      logDiv.textContent = "✅ News successfully loaded.";
      console.log("✅ News rendered successfully.");
    })
    .catch(error => {
      logDiv.textContent = "❌ Failed to fetch news: " + error.message;
      console.error("🔥 Fetch error:", error);
    });
}

// Call on page load
fetchAndRenderNews();

// Auto-refresh every 60 seconds
setInterval(fetchAndRenderNews, 60000);
