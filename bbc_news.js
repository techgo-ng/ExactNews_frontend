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
container.className = "news-grid";  // 👈 Add this line
      container.innerHTML = ""; // Clear previous content

      data.forEach(item => {
        const card = document.createElement("div")        card.className = "news-card";

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
    })
    .catch(error => {
      logDiv.textContent = "❌ Failed to fetch news: " + error.message;
    });
}

// Call on page load
fetchAndRenderNews();

// Auto-refresh every 60 seconds
setInterval(fetchAndRenderNews, 60000);
