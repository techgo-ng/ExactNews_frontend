async function fetchAndRenderNews() {
  const logDiv = document.getElementById("log");
  logDiv.textContent = "📡 Fetching Nigerian news...";

  try {
    const response = await fetch("https://exactnews-backend.onrender.com/news/africa/nigeria");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const newsItems = await response.json();

    const container = document.getElementById("news-container");
    container.innerHTML = ""; // Clear any existing content

    newsItems.slice(0, 50).forEach(item => {
      const card = document.createElement("div");
      card.className = "news-card";

      card.innerHTML = `
        <h2>${item.title}</h2>
        <p><em>${item.source} | ${item.published}</em></p>
        ${item.image ? `<img src="${item.image}" alt="News image" />` : ""}
        <p>${item.summary}</p>
        <a href="${item.link}" target="_blank">Read more</a>
      `;

      container.appendChild(card);
    });

    logDiv.textContent = `✅ Fetched ${newsItems.length} articles`;
  } catch (error) {
    logDiv.textContent = `❌ Error: ${error.message}`;
  }
}
