
  alert("🟢 news.js is running");
  document.addEventListener("DOMContentLoaded", () => {
  const logDiv = document.getElementById("log") || createLogDiv();
  const newsContainer = document.getElementById("news");

  log("📡 Starting fetch for Nigerian news...");

  fetch("https://exactnews-backend.onrender.com/news/africa/nigeria")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      log("✅ News data fetched successfully.");
      log("📰 Rendering top 5 headlines:");

      const limitedNews = data.slice(0, 5);
      limitedNews.forEach(article => {
        const box = document.createElement("div");
        box.className = "news-box";

        const title = document.createElement("h3");
        title.textContent = article.title;

        const link = document.createElement("a");
        link.href = article.link;
        link.textContent = "Read more";
        link.target = "_blank";

        box.appendChild(title);
        box.appendChild(link);
        newsContainer.appendChild(box);

        log(`• ${article.title}`);
      });
    })
    .catch(error => {
      log(`❌ Fetch error: ${error.message}`);
    });

  function log(message) {
    const p = document.createElement("p");
    p.textContent = message;
    logDiv.appendChild(p);
  }

  function createLogDiv() {
    const div = document.createElement("div");
    div.id = "log";
    div.style.background = "#fffbe6";
    div.style.border = "1px solid #ccc";
    div.style.padding = "10px";
    div.style.margin = "10px 0";
    div.style.fontFamily = "monospace";
    div.style.fontSize = "0.9em";
    document.body.insertBefore(div, document.body.firstChild);
    return div;
  }
});
