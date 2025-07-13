function fetchAndRenderNews() {
  fetch("https://exactnews-backend.onrender.com/bbc")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("news-container");
      container.innerHTML = ""; // clear existing news

      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "news-card";

        card.innerHTML = `
          <img src="${item.image || 'fallback.jpg'}" alt="News Image">
          <div class="news-details">
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <a href="${item.link}" target="_blank">Read more</a>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Failed to fetch news:", error);
    });
}

// Fetch immediately on page load
fetchAndRenderNews();

// Then every 60 seconds
setInterval(fetchAndRenderNews, 60000);