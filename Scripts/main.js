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

// Configuration
const CONFIG = {
    retryAttempts: 3,
    retryDelay: 2000,
    cacheDuration: 30000, // Cache count for 30 seconds
    sessionKey: 'portfolio_view_counted_v2',
    cacheKey: 'portfolio_view_count_cache'
};

class ViewCounter {
    constructor() {
        this.currentCount = 0;
        this.isUpdating = false;
        this.viewsElement = null;
        this.init();
    }

    async init() {
        // Find the views display element
        this.findViewsElement();
        
        if (!this.viewsElement) {
            console.warn('Views element not found, will retry...');
            setTimeout(() => this.init(), 1000);
            return;
        }

        // Load cached count first for immediate display
        this.loadCachedCount();
        
        // Then fetch and update from server
        await this.updateViewCount();
    }

    findViewsElement() {
        // Try multiple methods to find the views element
        const selectors = [
            () => Array.from(document.querySelectorAll('*')).find(el => 
                el.textContent && el.textContent.trim().match(/total views \d+/)
            ),
            () => document.querySelector('.view-counter'),
            () => {
                // Create element if it doesn't exist
                const container = document.querySelector('footer, .footer, .stats, .info');
                if (container && !document.querySelector('.global-view-count')) {
                    const newElement = document.createElement('div');
                    newElement.className = 'global-view-count';
                    newElement.style.margin = '10px 0';
                    newElement.style.fontSize = '14px';
                    newElement.style.opacity = '0.8';
                    container.appendChild(newElement);
                    return newElement;
                }
                return null;
            }
        ];

        for (const selector of selectors) {
            const element = selector();
            if (element) {
                this.viewsElement = element;
                if (!element.classList.contains('global-view-count')) {
                    element.classList.add('view-counter');
                }
                break;
            }
        }
    }

    loadCachedCount() {
        try {
            const cached = localStorage.getItem(CONFIG.cacheKey);
            if (cached) {
                const { count, timestamp } = JSON.parse(cached);
                const isRecent = (Date.now() - timestamp) < CONFIG.cacheDuration;
                if (isRecent && count !== undefined) {
                    this.currentCount = count;
                    this.updateDisplay();
                }
            }
        } catch (e) {
            console.debug('Cache read error:', e);
        }
    }

    saveToCache(count) {
        try {
            localStorage.setItem(CONFIG.cacheKey, JSON.stringify({
                count: count,
                timestamp: Date.now()
            }));
        } catch (e) {
            console.debug('Cache save error:', e);
        }
    }

    async updateViewCount(retryCount = 0) {
        if (this.isUpdating) return;
        this.isUpdating = true;

        try {
            // Check if this session already counted
            const hasCounted = sessionStorage.getItem(CONFIG.sessionKey);
            
            // Fetch current count with timeout
            const currentCount = await this.fetchCurrentCount();
            
            let newCount = currentCount;
            
            // Only increment if not counted in this session
            if (!hasCounted) {
                newCount = currentCount + 1;
                
                // Update the server
                const updateSuccess = await this.updateServerCount(newCount);
                
                if (updateSuccess) {
                    // Mark this session as counted
                    sessionStorage.setItem(CONFIG.sessionKey, Date.now().toString());
                    
                    // Add to local history to prevent multiple counts from same device
                    this.recordDeviceView();
                }
            }
            
            // Update local state and display
            this.currentCount = newCount;
            this.updateDisplay();
            this.saveToCache(newCount);
            
            // Dispatch event for other components
            window.dispatchEvent(new CustomEvent('viewCountUpdated', {
                detail: { count: newCount }
            }));
            
        } catch (error) {
            console.error('View counter error:', error);
            
            // Retry logic
            if (retryCount < CONFIG.retryAttempts) {
                console.log(`Retrying... (${retryCount + 1}/${CONFIG.retryAttempts})`);
                setTimeout(() => {
                    this.updateViewCount(retryCount + 1);
                }, CONFIG.retryDelay * (retryCount + 1));
            } else {
                // Show fallback
                if (this.viewsElement && !this.viewsElement.textContent.includes('views')) {
                    this.viewsElement.textContent = 'total views ●●●';
                }
            }
        } finally {
            this.isUpdating = false;
        }
    }

    async fetchCurrentCount() {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
                headers: {
                    'X-Master-Key': API_KEY,
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            
            // Handle different response structures
            let views = data.record?.views ?? data.views ?? 0;
            
            // Ensure it's a number
            return parseInt(views, 10) || 0;
            
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    async updateServerCount(newCount) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': API_KEY
                },
                body: JSON.stringify({ views: newCount }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`Update failed: ${response.status}`);
            }
            
            return true;
            
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    recordDeviceView() {
        // Store device info to prevent multiple counts from same device
        const deviceKey = 'device_viewed_' + this.getDeviceId();
        if (!localStorage.getItem(deviceKey)) {
            localStorage.setItem(deviceKey, Date.now().toString());
        }
    }

    getDeviceId() {
        // Create a simple device fingerprint
        const screen = `${screen.width}x${screen.height}`;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const language = navigator.language;
        
        let id = `${screen}_${timezone}_${language}`;
        
        // Simple hash
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = ((hash << 5) - hash) + id.charCodeAt(i);
            hash |= 0;
        }
        
        return Math.abs(hash).toString(36);
    }

    updateDisplay() {
        if (!this.viewsElement) return;
        
        const text = `total views ${this.currentCount.toLocaleString()}`;
        
        // Only update if changed
        if (this.viewsElement.textContent !== text) {
            this.viewsElement.textContent = text;
            
            // Add visual feedback for the update
            this.viewsElement.style.transition = 'opacity 0.3s';
            this.viewsElement.style.opacity = '0.7';
            setTimeout(() => {
                this.viewsElement.style.opacity = '1';
            }, 300);
        }
    }

    // Public method to force refresh
    async refresh() {
        sessionStorage.removeItem(CONFIG.sessionKey);
        await this.updateViewCount();
    }
}

// Initialize when page is ready
let viewCounter;

function initViewCounter() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            viewCounter = new ViewCounter();
        });
    } else {
        viewCounter = new ViewCounter();
    }
}

// Handle page visibility changes (when user returns to tab)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && viewCounter) {
        // Refresh count when user returns to tab
        setTimeout(() => viewCounter.refresh(), 1000);
    }
});

// Start the counter
initViewCounter();

// Expose for debugging (optional)
window.viewCounter = viewCounter;
