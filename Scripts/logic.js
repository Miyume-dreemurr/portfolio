// Gallery-specific data and functionality
const projects = [
    {
        id: 1, title: "BlueLabs", category: "website",
        description: "Open source tools that help people. (sadly got shutted down)",
        tech: ["HTML-5", "JavaScript", "CSS-4"], youtubeId: "DzDefKtV0dU", demoUrl: "https://youtu.be/DzDefKtV0dU"
    },
    {
        id: 2, title: "Cooming Soon", category: "bot",
        description: "Cooming Soon",
        tech: ["Cooming Soon"], youtubeId: "jfKfPfyJRdk", demoUrl: "https://youtu.be/jfKfPfyJRdk"
    },
    {
        id: 3, title: "Genso Wanderer (GWR)", category: "server",
        description: "Fully configured tsb clan community server: roles, automod, ticket system, boost perks & anti nuke.",
        tech: ["Fully Set-Up", "Anti Nuke", "TSB Clan"], youtubeId: "Ul7ogEQOWeo", demoUrl: "https://youtu.be/Ul7ogEQOWeo"
    },
    {
        id: 4, title: "Portfolio 3D", category: "website",
        description: "Immersive 3D portfolio for a modeler named: Saf. (helped a lot long time ago)",
        tech: ["HTML-5", "JavaScript", "CSS-4"], youtubeId: "Swv9ZrZFjXI", demoUrl: "https://youtu.be/Swv9ZrZFjXI"
    },
    {
        id: 5, title: "Cooming Soon", category: "bot",
        description: "Cooming Soon",
        tech: ["Cooming Soon"], youtubeId: "jfKfPfyJRdk", demoUrl: "https://youtu.be/jfKfPfyJRdk"
    },
    {
        id: 6, title: "Gensokyo!", category: "server",
        description: "My Current server when you can chat and purchase stuff.",
        tech: ["Streaming", "Main Hub", "Custom Webhooks"], youtubeId: "K9DHI7kQYjo", demoUrl: "https://youtu.be/K9DHI7kQYjo"
    },
    {
        id: 7, title: "Miyabi fan-website RU", category: "website",
        description: "Russian fan hub for Miyabi with high-quality galleries, and information about her.",
        tech: ["HTML-5", "JavaScript", "CSS-4"], youtubeId: "0XABABHbR6c", demoUrl: "https://youtu.be/0XABABHbR6c"
    },
    {
        id: 8, title: "Cooming Soon", category: "bot",
        description: "Cooming Soon",
        tech: ["Cooming Soon"], youtubeId: "jfKfPfyJRdk", demoUrl: "https://youtu.be/jfKfPfyJRdk"
    },
    {
        id: 9, title: "Girl's Garden", category: "server",
        description: "Server Tag community server: mostly people join for tag, not to talk.",
        tech: ["Tag Server", "3K+ Members", "Easy set-up"], youtubeId: "MUDnFX8wnMs", demoUrl: "https://youtu.be/MUDnFX8wnMs"
    },
    {
        id: 10, title: "Simple Portfolio", category: "website",
        description: "Simple Portfolio for an artist SoupySoull",
        tech: ["HTML-5", "JavaScript", "CSS-4"], youtubeId: "NpVLFfbAC64", demoUrl: "https://youtu.be/NpVLFfbAC64"
    },
    {
        id: 11, title: "Tsundere Test", category: "lua",
        description: "A test that helps you find out what percentage tsundere you are.",
        tech: ["Luau", "Test", "DataStore"],
        robloxGameUrl: "https://www.roblox.com/games/129188551130231/Tsundere-Test",
        imgFile: "tsundere.png"
    },
    {      
        id: 12, title: "Undertale Character Test", category: "lua",       
        description: "A test that helps you find out which Undertale character you are.",       
        tech: ["Luau", "Test", "DataStore"],
        robloxGameUrl: "https://www.roblox.com/games/89692299507101/Undertale-Character-Test",
        imgFile: "undertale.png"
    },
    {
        id: 13, title: "Items Buying", category: "lua",
        description: "A game where buying items returns 30% of the price back to you. Must own group or have a game on the alt.",
        tech: ["Luau", "Items Buying", "30% Robux Returning"],
        robloxGameUrl: "https://www.roblox.com/games/103453983120755/Items-Buying",
        imgFile: "items.png" 
    },
    {      
        id: 14, title: "Femboy Test", category: "lua",       
        description: "A test that helps you find out what percentage femboy you are.",       
        tech: ["Luau", "Test", "DataStore"],
        robloxGameUrl: "https://www.roblox.com/games/71970631225789/Femboy-Test",
        imgFile: "femboy.png"
    },
    {      
        id: 15, title: "Tomboy Test", category: "lua",       
        description: "A test that helps you find out what percentage tomboy you are.",       
        tech: ["Luau", "Test", "DataStore"],
        robloxGameUrl: "https://www.roblox.com/games/107010079658369/Tomboy-Test",
        imgFile: "tomboy.png"
    },
    {      
        id: 16, title: "Neko Test", category: "lua",       
        description: "A test that helps you find out what percentage neko you are.",       
        tech: ["Luau", "Test", "DataStore"],
        robloxGameUrl: "https://www.roblox.com/games/70733746170955/Neko-Test",
        imgFile: "neko.png"
    },
    {      
        id: 17, title: "Furry Test", category: "lua",       
        description: "A test that helps you find out what percentage furry you are.",       
        tech: ["Luau", "Test", "DataStore"],
        robloxGameUrl: "https://www.roblox.com/games/72559245507974/Furry-Test",
        imgFile: "furry.png"
    }
];

let currentFilter = "all";

function renderGallery() {
    const container = document.getElementById("galleryGrid");
    if (!container) return;
    
    const filtered = currentFilter === "all" ? projects : projects.filter(p => p.category === currentFilter);
    
    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding: 60px;"><i class="fas fa-folder-open fa-3x" style="opacity:0.5;"></i><p>No projects in this category yet</p></div>`;
        return;
    }
    
    container.innerHTML = filtered.map(proj => {
        let categoryIcon = '';
        let categoryLabel = '';
        if (proj.category === 'website') {
            categoryIcon = 'fa-globe';
            categoryLabel = 'Website';
        } else if (proj.category === 'bot') {
            categoryIcon = 'fa-robot';
            categoryLabel = 'Discord Bot';
        } else if (proj.category === 'server') {
            categoryIcon = 'fa-users';
            categoryLabel = 'Discord Server';
        } else if (proj.category === 'lua') {
            categoryIcon = 'fa-gamepad';
            categoryLabel = 'Roblox Game';
        }
        
        // For Lua/Roblox projects: show image from /images folder
        if (proj.category === 'lua') {
            const imagePath = proj.imgFile ? `images/${proj.imgFile}` : 'images/placeholder.png';
            const placeholderImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15h-2v-2h2v2zm0-4h-2V7h2v6z'/%3E%3C/svg%3E";
            
            return `
                <div class="project-card">
                    <div class="roblox-icon-container">
                        <img class="roblox-game-icon" src="${imagePath}" 
                             style="width:100%; height:200px; object-fit:cover; border-radius:12px; background:#1a1c2a;"
                             onerror="this.src='${placeholderImg}'">
                    </div>
                    <div class="card-content">
                        <h3><i class="fas ${categoryIcon}"></i> ${proj.title}</h3>
                        <p>${proj.description}</p>
                        <div class="tech-stack">
                            ${proj.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                        </div>
                        <div class="card-footer">
                            <span class="project-type"><i class="fas ${categoryIcon}"></i> ${categoryLabel}</span>
                            <a href="${proj.robloxGameUrl}" target="_blank" class="roblox-btn" rel="noopener noreferrer">
                                <i class="fas fa-play"></i> Play on Roblox
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // For non-Roblox projects: show YouTube video
        return `
            <div class="project-card">
                <div class="video-wrapper">
                    <iframe src="https://www.youtube.com/embed/${proj.youtubeId}?autoplay=0&modestbranding=1&rel=0" title="${proj.title} preview" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="card-content">
                    <h3><i class="fas ${categoryIcon}"></i> ${proj.title}</h3>
                    <p>${proj.description}</p>
                    <div class="tech-stack">
                        ${proj.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                    </div>
                    <div class="card-footer">
                        <span class="project-type"><i class="fas ${categoryIcon}"></i> ${categoryLabel}</span>
                        <a href="${proj.demoUrl}" target="_blank" class="yt-link"><i class="fab fa-youtube"></i> Watch on YouTube</a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function setupFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.getAttribute("data-filter");
            renderGallery();
        });
    });
}

// Initialize when DOM ready
document.addEventListener("DOMContentLoaded", () => {
    renderGallery();
    setupFilters();
});
