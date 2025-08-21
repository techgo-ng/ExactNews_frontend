document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("news-container");
    const log = document.getElementById("log");
    const tabButtons = document.querySelectorAll(".tab-button");

    // --- TimeAgo Helper ---
    function timeAgo(dateString) {
        if (!dateString) return "Just now";
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return "Just now";
        if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
        if (seconds < 2592000) return `${Math.floor(seconds / 86400)} day(s) ago`;
        return date.toLocaleDateString();
    }

    // --- Fetch Articles from Backend ---
    async function fetchArticles() {
        log.textContent = "📡 Loading news...";
        try {
            const response = await fetch("http://localhost:8000/all_articles");
            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();
            displayArticles(data.articles);
            log.textContent = `✅ Loaded ${data.articles.length} articles`;
        } catch (error) {
            console.error("Failed to fetch articles:", error);
            log.textContent = "❌ Error loading news articles.";
        }
    }

    // --- Display Articles in the UI ---
    function displayArticles(articles) {
        newsContainer.innerHTML = ""; // Clear existing content

        articles.forEach(article => {
            const newsCard = document.createElement("a");
            newsCard.classList.add("news-card");
            newsCard.href = article.link;
            newsCard.target = "_blank";

            // Clearbit Logo (fallback to text if not found)
            const logoImg = document.createElement("img");
            logoImg.src = `https://logo.clearbit.com/${article.source}`;
            logoImg.alt = article.source;
            logoImg.onerror = () => logoImg.remove(); // Remove broken images

            // Content Container
            const contentDiv = document.createElement("div");
            contentDiv.classList.add("news-card-content");

            // Title
            const title = document.createElement("h3");
            title.textContent = article.title;

            // Description (cleaned & trimmed)
            const description = document.createElement("p");
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = article.description || "";
            let cleanDescription = tempDiv.textContent || tempDiv.innerText || "";
            if (cleanDescription.length > 150) {
                cleanDescription = cleanDescription.substring(0, 150) + "...";
            }
            description.textContent = cleanDescription;

            // Meta Info (source and time ago)
            const meta = document.createElement("small");
            meta.classList.add("meta");
            meta.textContent = `${article.source} • ${timeAgo(article.published)}`;

            // Assemble Card
            contentDiv.appendChild(title);
            contentDiv.appendChild(description);
            contentDiv.appendChild(meta);

            newsCard.appendChild(logoImg);
            newsCard.appendChild(contentDiv);

            newsContainer.appendChild(newsCard);
        });
    }

    // --- Category Filtering (Placeholder for Future Logic) ---
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const category = button.getAttribute("data-category");
            log.textContent = `🔍 Filtered by: ${category} (Feature coming soon)`;
            // Future Implementation: Filter articles by category
        });
    });

    fetchArticles();
});
