// scripts/main.js - Miyume Dev with Theme Picker & Custom Discord Status

document.addEventListener('DOMContentLoaded', function() {
    console.log('Miyume Dev - Loading...');

    // ========== THEME PICKER WITH 10 THEMES ==========
    const themes = [
        { name: 'Default Purple', class: '', color: '#c084fc', bg: 'purple' },
        { name: 'Light', class: 'theme-light', color: '#7c3aed', bg: '#f5f0ff' },
        { name: 'Dark', class: 'theme-dark', color: '#d8b4fe', bg: '#050010' },
        { name: 'Midnight Blue', class: 'theme-midnight', color: '#60a5fa', bg: '#0a0f2a' },
        { name: 'Cherry Blossom', class: 'theme-cherry', color: '#f472b6', bg: '#2d1a2b' },
        { name: 'Ocean Teal', class: 'theme-ocean', color: '#2dd4bf', bg: '#0f2a2a' },
        { name: 'Sunset Orange', class: 'theme-sunset', color: '#fb923c', bg: '#2d1a0f' },
        { name: 'Forest Green', class: 'theme-forest', color: '#4ade80', bg: '#0f2a1a' },
        { name: 'Royal Gold', class: 'theme-royal', color: '#facc15', bg: '#2a1f0f' },
        { name: 'Cyberpunk', class: 'theme-cyber', color: '#0ff', bg: '#1a0f2a' },
        { name: 'Lavender Dream', class: 'theme-lavender', color: '#c084fc', bg: '#2a1a3a' }
    ];

    function applyTheme(themeClass) {
        themes.forEach(t => {
            if (t.class) document.body.classList.remove(t.class);
        });
        if (themeClass && themeClass !== '') {
            document.body.classList.add(themeClass);
        }
        localStorage.setItem('miyume_theme', themeClass || 'default');
        
        // Update DND dot color based on theme
        updateDNDColor();
    }

    function loadSavedTheme() {
        const saved = localStorage.getItem('miyume_theme');
        if (saved && saved !== 'default') {
            applyTheme(saved);
        } else {
            applyTheme('');
        }
    }

    function updateDNDColor() {
        const statusDot = document.getElementById('discordStatusDot');
        if (statusDot && statusDot.classList.contains('status-dnd')) {
            // Get theme color
            const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary').trim();
            if (primaryColor) {
                statusDot.style.backgroundColor = primaryColor;
                statusDot.style.boxShadow = `0 0 8px ${primaryColor}`;
            }
        }
    }

    function createThemePicker() {
        const modal = document.createElement('div');
        modal.className = 'theme-picker-modal';
        modal.id = 'themePickerModal';
        modal.innerHTML = `
            <div class="theme-picker-content">
                <h3><i class="fas fa-palette"></i> Choose Your Theme</h3>
                <div class="theme-grid" id="themeGrid"></div>
                <button class="close-theme-picker" id="closeThemePicker">Close</button>
            </div>
        `;
        document.body.appendChild(modal);

        const themeGrid = document.getElementById('themeGrid');
        themes.forEach(theme => {
            const option = document.createElement('div');
            option.className = 'theme-option';
            if (theme.bg === 'purple') {
                option.style.background = 'linear-gradient(135deg, #c084fc, #a855f7)';
            } else if (theme.bg === '#f5f0ff') {
                option.style.background = 'linear-gradient(135deg, #e9e2ff, #d9c9ff)';
            } else {
                option.style.background = `linear-gradient(135deg, ${theme.color}, ${theme.color}cc)`;
            }
            option.style.color = (theme.class.includes('dark') || theme.class === '') ? 'white' : '#1e1a2f';
            option.innerHTML = `<i class="fas fa-palette"></i> ${theme.name}`;
            option.addEventListener('click', () => {
                applyTheme(theme.class);
                modal.classList.remove('active');
            });
            themeGrid.appendChild(option);
        });

        const closeBtn = document.getElementById('closeThemePicker');
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
        return modal;
    }

    const themeModal = createThemePicker();
    const themeBtn = document.getElementById('themeSwitcher');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            themeModal.classList.add('active');
        });
    }
    loadSavedTheme();

    // ========== CUSTOM DISCORD STATUS ==========
    const avatarImg = document.getElementById('discordAvatar');
    const usernameSpan = document.getElementById('discordUsername');
    const statusDot = document.getElementById('discordStatusDot');
    const statusTextSpan = document.getElementById('discordStatusText');
    const activitySpan = document.getElementById('discordActivity');
    const userIdSpan = document.getElementById('discordUserId');

    // Set custom avatar
    if (avatarImg) {
        avatarImg.src = 'https://upload-os-bbs.hoyolab.com/upload/2025/02/04/40904765/9bdca6c7658816bc4db8c72f6656861d_6958034220176550142.jpg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70';
        avatarImg.alt = 'Miyume Avatar';
    }

    // Set username
    if (usernameSpan) {
        usernameSpan.textContent = 'Miyume';
    }

    // Set DND status with theme-aware purple color
    if (statusDot) {
        statusDot.className = 'status-dot status-dnd';
        const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary').trim();
        if (primaryColor) {
            statusDot.style.backgroundColor = primaryColor;
            statusDot.style.boxShadow = `0 0 8px ${primaryColor}`;
        }
    }

    // Set status text
    if (statusTextSpan) {
        statusTextSpan.textContent = '🔴 Do Not Disturb';
    }

    // Set custom activity with emoji
    if (activitySpan) {
        const emojiUrl = 'https://images-ext-1.discordapp.net/external/xtzxVSCqsuGxCp-VIzdPEpFbqh9Gdc5LRxSzaL7QE1A/https/cdn.discordapp.com/emojis/1477917988446273702.png?format=webp&quality=lossless&width=24&height=24';
        activitySpan.innerHTML = `<img src="${emojiUrl}" style="width: 18px; height: 18px; display: inline-block; vertical-align: middle; margin-right: 8px;"> Reality and the virtual world cannot fully serve as markers of existence.`;
    }

    // Set user ID display
    if (userIdSpan) {
        userIdSpan.textContent = 'miu_dreemurr';
    }

    // Copy Discord tag
    const copyBtn = document.getElementById('copyDiscordBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText('miu_dreemurr');
                const original = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = original;
                }, 2000);
            } catch (err) {
                copyBtn.innerHTML = '<i class="fas fa-times"></i> failed!';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="far fa-copy"></i> copy tag';
                }, 2000);
            }
        });
    }

    // Listen for theme changes to update DND dot color
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                const statusDot = document.getElementById('discordStatusDot');
                if (statusDot && statusDot.classList.contains('status-dnd')) {
                    const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary').trim();
                    if (primaryColor) {
                        statusDot.style.backgroundColor = primaryColor;
                        statusDot.style.boxShadow = `0 0 8px ${primaryColor}`;
                    }
                }
            }
        });
    });

    observer.observe(document.body, {
        attributes: true
    });

    // Active navigation highlight
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    console.log('Miyume Dev - Ready with custom Discord status!');
});
    // ========== VISITOR VIEW COUNTER ==========
const BIN_ID = '69cdae5636566621a86ef47d';
const API_KEY = '$2a$10$Lm70n4XiSLFnhJJY5UVqV.P/DnDAPEGMxI.k8EsW5t3KzWzX4voNi';

// Function to update the view counter display
function updateDisplay(count) {
    const counterElement = document.getElementById('viewCountDisplay');
    if (counterElement) {
        counterElement.textContent = count;
        console.log(`Updated views to: ${count}`);
    }
}

// Main function to increment global counter
async function incrementGlobalCounter() {
    try {
        // Get current count
        const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': API_KEY
            }
        });
        const data = await getResponse.json();
        let currentCount = data.record.views || 0;
        
        // Increment count
        const newCount = currentCount + 1;
        
        // Update the bin
        await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify({ views: newCount })
        });
        
        // Update display
        updateDisplay(newCount);
        
    } catch (error) {
        console.error('Counter error:', error);
        // Fallback to localStorage if API fails
        let fallback = parseInt(localStorage.getItem('fallback_views') || 0) + 1;
        localStorage.setItem('fallback_views', fallback);
        updateDisplay(fallback);
    }
}

// Function to just fetch and display current count (without incrementing)
async function displayCurrentCount() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: { 'X-Master-Key': API_KEY }
        });
        const data = await response.json();
        updateDisplay(data.record.views || 0);
    } catch (error) {
        console.error('Failed to fetch count:', error);
        const fallback = localStorage.getItem('fallback_views') || 0;
        updateDisplay(fallback);
    }
}

// Wait for page to load then run counter
window.addEventListener('load', function() {
    const hasVisited = sessionStorage.getItem('global_visited');
    if (!hasVisited) {
        incrementGlobalCounter();
        sessionStorage.setItem('global_visited', 'true');
    } else {
        displayCurrentCount();
    }
});
