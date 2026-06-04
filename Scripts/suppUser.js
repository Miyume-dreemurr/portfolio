 // Discord invite link
        const DISCORD_INVITE = "https://discord.gg/c2NwCjwAgM";
        
        // Order button functionality
        const orderBtns = document.querySelectorAll('.price-order-btn:not(.disabled)');
        
        orderBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const service = this.getAttribute('data-service');
                let serviceName = '';
                let servicePrice = '';
                
                switch(service) {
                    case 'website':
                        serviceName = 'Website Development (Portfolio/Company/Server Info)';
                        servicePrice = '$50 - $100';
                        break;
                    case 'server':
                        serviceName = 'Discord Server Setup';
                        servicePrice = '$10 + add-ons';
                        break;
                    case 'roblox':
                        serviceName = 'Roblox Game Development';
                        servicePrice = '$15 - $150+ depending on complexity';
                        break;
                }
                
                const message = `Hi! I'm interested in your ${serviceName} service (${servicePrice}). Can we discuss the details?`;
                
                // Copy to clipboard and show notification
                navigator.clipboard.writeText(message).then(() => {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i> Copied! Join Discord';
                    btn.style.background = '#5865F2';
                    btn.style.borderColor = '#5865F2';
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.style.borderColor = '';
                    }, 3000);
                    
                    // Open Discord invite
                    window.open(DISCORD_INVITE, '_blank');
                }).catch(() => {
                    btn.innerHTML = '<i class="fas fa-times"></i> Failed!';
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                    }, 2000);
                });
            });
        });
        
        // Notify me button for coming soon
        const notifyBtn = document.querySelector('.price-order-btn.disabled');
        if (notifyBtn) {
            notifyBtn.addEventListener('click', function() {
                const message = `Hey! I'm interested in your Discord Bot service when it becomes available. Please notify me!`;
                
                navigator.clipboard.writeText(message).then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Copied! Join Discord';
                    this.style.background = '#5865F2';
                    this.style.borderColor = '#5865F2';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.background = '';
                        this.style.borderColor = '';
                    }, 2000);
                    
                    window.open(DISCORD_INVITE, '_blank');
                });
            });
        }