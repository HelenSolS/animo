// ANIMO Dark Glass Presentation - Final Fixed Version
class AnimoPresentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 12;
        this.isScrolling = false;
        this.touchStartY = 0;
        this.touchEndY = 0;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateProgress();
        this.setupBasicAnimations();
        
        // Initialize first slide
        setTimeout(() => {
            this.animateSlideElements(1);
        }, 500);
        
        // Setup scroll event with proper throttling
        this.setupScrollNavigation();
    }
    
    setupEventListeners() {
        // Touch/swipe navigation
        const container = document.getElementById('presentation');
        if (container) {
            container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            container.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Click navigation for progress segments
        document.querySelectorAll('.progress-segment').forEach((segment, index) => {
            segment.addEventListener('click', () => {
                this.goToSlide(index + 1);
            });
        });
        
        // CTA button
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', this.handleCTAClick.bind(this));
        }
        
        // Prevent context menu on mobile
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
    
    setupScrollNavigation() {
        const container = document.getElementById('presentation');
        if (!container) return;
        
        let scrollTimeout;
        container.addEventListener('scroll', () => {
            if (this.isScrolling) return;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 100);
        });
    }
    
    handleScroll() {
        if (this.isScrolling) return;
        
        const container = document.getElementById('presentation');
        const slideHeight = container.clientHeight;
        const scrollTop = container.scrollTop;
        const newSlide = Math.round(scrollTop / slideHeight) + 1;
        
        if (newSlide !== this.currentSlide && newSlide >= 1 && newSlide <= this.totalSlides) {
            this.currentSlide = newSlide;
            this.updateProgress();
            this.animateSlideElements(this.currentSlide);
        }
    }
    
    handleTouchStart(event) {
        this.touchStartY = event.touches[0].clientY;
    }
    
    handleTouchEnd(event) {
        this.touchEndY = event.changedTouches[0].clientY;
        const distance = this.touchStartY - this.touchEndY;
        const minSwipeDistance = 50;
        
        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0 && this.currentSlide < this.totalSlides) {
                // Swipe up - go to next slide
                this.goToSlide(this.currentSlide + 1);
            } else if (distance < 0 && this.currentSlide > 1) {
                // Swipe down - go to previous slide
                this.goToSlide(this.currentSlide - 1);
            }
        }
    }
    
    handleKeyboard(event) {
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowLeft':
                event.preventDefault();
                if (this.currentSlide > 1) {
                    this.goToSlide(this.currentSlide - 1);
                }
                break;
            case 'ArrowDown':
            case 'ArrowRight':
            case ' ':
                event.preventDefault();
                if (this.currentSlide < this.totalSlides) {
                    this.goToSlide(this.currentSlide + 1);
                }
                break;
            case 'Home':
                event.preventDefault();
                this.goToSlide(1);
                break;
            case 'End':
                event.preventDefault();
                this.goToSlide(this.totalSlides);
                break;
            case 'Escape':
                // Could add fullscreen exit or other functionality
                break;
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides || this.isScrolling) return;
        
        this.isScrolling = true;
        this.currentSlide = slideNumber;
        
        const container = document.getElementById('presentation');
        if (container) {
            const targetPosition = (slideNumber - 1) * container.clientHeight;
            
            container.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            this.updateProgress();
            this.animateSlideElements(slideNumber);
            
            setTimeout(() => {
                this.isScrolling = false;
            }, 800);
        }
    }
    
    updateProgress() {
        const segments = document.querySelectorAll('.progress-segment');
        segments.forEach((segment, index) => {
            if (index + 1 === this.currentSlide) {
                segment.classList.add('active');
                segment.style.transform = 'scaleY(1.5)';
            } else {
                segment.classList.remove('active');
                segment.style.transform = 'scaleY(1)';
            }
        });
    }
    
    animateSlideElements(slideNumber) {
        const slide = document.querySelector(`[data-slide="${slideNumber}"]`);
        if (!slide) return;
        
        // Remove any existing animation classes
        slide.querySelectorAll('.animated').forEach(el => {
            el.classList.remove('animated');
        });
        
        // Trigger slide-specific animations
        switch (slideNumber) {
            case 1:
                this.animateHeroSlide(slide);
                break;
            case 2:
                this.animateProblemSlide(slide);
                break;
            case 3:
                this.animateSolutionSlide(slide);
                break;
            case 4:
                this.animateReliabilitySlide(slide);
                break;
            case 5:
                this.animateIntelligenceSlide(slide);
                break;
            case 6:
                this.animateOverviewSlide(slide);
                break;
            case 7:
                this.animateScalingSlide(slide);
                break;
            case 8:
                this.animateIndividualPlansSlide(slide);
                break;
            case 9:
                this.animateStudioPlansSlide(slide);
                break;
            case 10:
                this.animateConnectionSlide(slide);
                break;
            case 11:
                this.animateImplementationSlide(slide);
                break;
            case 12:
                this.animateBrandSlide(slide);
                break;
            default:
                this.animateGenericSlide(slide);
                break;
        }
    }
    
    animateHeroSlide(slide) {
        const logo = slide.querySelector('.animo-logo-hero');
        const title = slide.querySelector('.hero-title');
        const subtitle = slide.querySelector('.hero-subtitle');
        const description = slide.querySelector('.hero-description');
        const indicator = slide.querySelector('.swipe-indicator');
        
        if (logo) {
            logo.style.animation = 'hero-logo-appear 2s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
        
        [title, subtitle, description, indicator].forEach((el, index) => {
            if (el) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 300 + 1000);
            }
        });
    }
    
    animateProblemSlide(slide) {
        const nodes = slide.querySelectorAll('.service-node');
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.animation = `service-chaos 3s ease-in-out infinite`;
            }, index * 200);
        });
        
        const stopSymbol = slide.querySelector('.stop-symbol');
        if (stopSymbol) {
            stopSymbol.style.animation = 'stop-pulse 2s ease-in-out infinite';
        }
    }
    
    animateSolutionSlide(slide) {
        const hub = slide.querySelector('.central-hub');
        const connections = slide.querySelectorAll('.connection-line');
        const services = slide.querySelectorAll('.service-badge');
        
        if (hub) {
            hub.style.animation = 'hub-glow 3s ease-in-out infinite';
        }
        
        connections.forEach((connection, index) => {
            setTimeout(() => {
                connection.style.animation = `connection-pulse 4s ease-in-out infinite`;
            }, index * 300);
        });
        
        services.forEach((service, index) => {
            setTimeout(() => {
                service.style.animation = `service-orbit 8s linear infinite`;
            }, index * 500 + 1000);
        });
    }
    
    animateReliabilitySlide(slide) {
        const metrics = slide.querySelectorAll('.metric-card');
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                metric.style.opacity = '1';
                metric.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        const blocks = slide.querySelectorAll('.block-layer');
        blocks.forEach((block, index) => {
            setTimeout(() => {
                if (block.classList.contains('active')) {
                    block.style.animation = 'block-pulse 2s ease-in-out infinite';
                }
            }, index * 200 + 600);
        });
    }
    
    animateIntelligenceSlide(slide) {
        const brain = slide.querySelector('.brain-pulse');
        if (brain) {
            brain.style.animation = 'brain-glow 3s ease-in-out infinite';
        }
        
        const capabilities = slide.querySelectorAll('.capability');
        capabilities.forEach((capability, index) => {
            setTimeout(() => {
                capability.style.opacity = '1';
                capability.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }
    
    animateOverviewSlide(slide) {
        const dashboard = slide.querySelector('.dashboard-preview');
        if (dashboard) {
            dashboard.style.animation = 'slideInUp 0.6s ease-out';
        }
        
        const tiles = slide.querySelectorAll('.metric-tile');
        tiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.style.opacity = '1';
                tile.style.transform = 'translateY(0)';
            }, index * 100 + 300);
        });
        
        const chartBars = slide.querySelectorAll('.chart-bar');
        chartBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.animation = 'chart-grow 1s ease-out forwards';
            }, index * 100 + 600);
        });
    }
    
    animateScalingSlide(slide) {
        const stages = slide.querySelectorAll('.pipeline-stage');
        stages.forEach((stage, index) => {
            setTimeout(() => {
                stage.style.opacity = '1';
                stage.style.transform = 'translateY(0) scale(1)';
            }, index * 300);
        });
        
        const features = slide.querySelectorAll('.feature');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.opacity = '1';
                feature.style.transform = 'translateX(0)';
            }, index * 200 + 900);
        });
    }
    
    animateIndividualPlansSlide(slide) {
        const segments = slide.querySelectorAll('.segment-card');
        segments.forEach((segment, index) => {
            setTimeout(() => {
                segment.style.opacity = '1';
                segment.style.transform = 'translateY(0)';
            }, index * 400);
        });
    }
    
    animateStudioPlansSlide(slide) {
        const pyramid = slide.querySelector('.pyramid-structure');
        if (pyramid) {
            pyramid.style.animation = 'slideInUp 0.8s ease-out';
        }
        
        const tiers = slide.querySelectorAll('.tier-card');
        tiers.forEach((tier, index) => {
            setTimeout(() => {
                tier.style.opacity = '1';
                tier.style.transform = 'translateY(0)';
            }, index * 200 + 400);
        });
    }
    
    animateConnectionSlide(slide) {
        const steps = slide.querySelectorAll('.flow-step');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'scale(1)';
            }, index * 300);
        });
        
        const codeBlock = slide.querySelector('.code-preview');
        if (codeBlock) {
            setTimeout(() => {
                codeBlock.style.animation = 'slideInUp 0.6s ease-out';
            }, 900);
        }
    }
    
    animateImplementationSlide(slide) {
        const scenarios = slide.querySelectorAll('.time-scenario');
        scenarios.forEach((scenario, index) => {
            setTimeout(() => {
                scenario.style.opacity = '1';
                scenario.style.transform = 'translateX(0)';
            }, index * 400);
        });
        
        const metrics = slide.querySelectorAll('.metric-improvement');
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                metric.style.opacity = '1';
                metric.style.transform = 'translateY(0)';
            }, index * 200 + 800);
        });
    }
    
    animateBrandSlide(slide) {
        const logo = slide.querySelector('.animo-logo-final');
        const title = slide.querySelector('.brand-title');
        const stats = slide.querySelectorAll('.brand-stat');
        const cta = slide.querySelector('.cta-button');
        
        if (logo) {
            logo.style.animation = 'hero-logo-appear 2s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
        
        setTimeout(() => {
            if (title) {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }
        }, 500);
        
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, index * 200 + 800);
        });
        
        setTimeout(() => {
            if (cta) {
                cta.style.opacity = '1';
                cta.style.transform = 'translateY(0)';
            }
        }, 1400);
    }
    
    animateGenericSlide(slide) {
        // Simple fade-in animation for other slides
        const cards = slide.querySelectorAll('.glass-card, .metric-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    setupBasicAnimations() {
        // Set initial states for animated elements
        const animatedElements = document.querySelectorAll('.glass-card, .metric-card, .segment-card, .tier-card, .flow-step, .brand-stat');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
        });
        
        // Service nodes initial state
        const serviceNodes = document.querySelectorAll('.service-node');
        serviceNodes.forEach(node => {
            node.style.opacity = '0.6';
        });
        
        // Capability items initial state
        const capabilities = document.querySelectorAll('.capability');
        capabilities.forEach(capability => {
            capability.style.opacity = '0';
            capability.style.transform = 'translateX(-20px)';
            capability.style.transition = 'all 0.4s ease';
        });
        
        // Pipeline stages initial state
        const pipelineStages = document.querySelectorAll('.pipeline-stage');
        pipelineStages.forEach(stage => {
            stage.style.opacity = '0';
            stage.style.transform = 'translateY(20px) scale(0.95)';
            stage.style.transition = 'all 0.6s ease';
        });
        
        // Time scenarios initial state
        const timeScenarios = document.querySelectorAll('.time-scenario');
        timeScenarios.forEach(scenario => {
            scenario.style.opacity = '0';
            scenario.style.transform = 'translateX(-20px)';
            scenario.style.transition = 'all 0.6s ease';
        });
        
        // Brand elements initial state
        const brandTitle = document.querySelector('.brand-title');
        const brandCta = document.querySelector('.cta-button');
        if (brandTitle) {
            brandTitle.style.opacity = '0';
            brandTitle.style.transform = 'translateY(20px)';
            brandTitle.style.transition = 'all 0.6s ease';
        }
        if (brandCta) {
            brandCta.style.opacity = '0';
            brandCta.style.transform = 'translateY(20px)';
            brandCta.style.transition = 'all 0.6s ease';
        }
        
        // Add additional animations
        this.addAnimationKeyframes();
    }
    
    addAnimationKeyframes() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    handleCTAClick() {
        const button = document.querySelector('.cta-button');
        if (button) {
            button.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                button.style.transform = '';
                this.showNotification('Спасибо! Мы свяжемся с вами в ближайшее время.');
            }, 150);
        }
    }
    
    showNotification(message) {
        // Create notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
            animation: notification-appear 0.3s ease-out;
            max-width: 320px;
            text-align: center;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 14px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'notification-disappear 0.3s ease-in forwards';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    // Utility function for throttling
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Error handling and fallbacks
function setupErrorHandling() {
    window.addEventListener('error', (event) => {
        console.warn('Presentation error:', event.error);
    });
    
    window.addEventListener('unhandledrejection', (event) => {
        console.warn('Unhandled promise rejection:', event.reason);
    });
}

// Performance monitoring
function setupPerformanceMonitoring() {
    // Monitor scroll performance
    let scrollStartTime = 0;
    
    document.addEventListener('scroll', () => {
        if (scrollStartTime === 0) {
            scrollStartTime = performance.now();
        }
    }, { passive: true });
    
    document.addEventListener('scrollend', () => {
        if (scrollStartTime > 0) {
            const scrollDuration = performance.now() - scrollStartTime;
            console.log(`Scroll completed in ${scrollDuration.toFixed(2)}ms`);
            scrollStartTime = 0;
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add notification styles
    addNotificationStyles();
    
    // Setup error handling
    setupErrorHandling();
    
    // Setup performance monitoring (only in development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setupPerformanceMonitoring();
    }
    
    // Initialize presentation
    try {
        const presentation = new AnimoPresentation();
        console.log('✅ ANIMO Presentation initialized successfully');
        
        // Expose to global scope for debugging
        window.animoPresentation = presentation;
    } catch (error) {
        console.error('❌ Failed to initialize presentation:', error);
        
        // Fallback: basic slide navigation if main script fails
        setTimeout(() => {
            setupFallbackNavigation();
        }, 2000);
    }
});

function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes notification-appear {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        @keyframes notification-disappear {
            from {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
    `;
    document.head.appendChild(style);
}

function setupFallbackNavigation() {
    console.log('🔄 Setting up fallback navigation...');
    
    const container = document.getElementById('presentation');
    if (!container) {
        console.error('❌ Presentation container not found');
        return;
    }
    
    // Basic wheel navigation
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const slides = document.querySelectorAll('.slide');
        const currentScroll = container.scrollTop;
        const slideHeight = container.clientHeight;
        const currentSlide = Math.round(currentScroll / slideHeight);
        
        if (e.deltaY > 0 && currentSlide < slides.length - 1) {
            container.scrollTo({
                top: (currentSlide + 1) * slideHeight,
                behavior: 'smooth'
            });
        } else if (e.deltaY < 0 && currentSlide > 0) {
            container.scrollTo({
                top: (currentSlide - 1) * slideHeight,
                behavior: 'smooth'
            });
        }
    });
    
    // Basic keyboard navigation
    document.addEventListener('keydown', (e) => {
        const slides = document.querySelectorAll('.slide');
        const currentScroll = container.scrollTop;
        const slideHeight = container.clientHeight;
        const currentSlide = Math.round(currentScroll / slideHeight);
        
        switch (e.key) {
            case 'ArrowDown':
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                if (currentSlide < slides.length - 1) {
                    container.scrollTo({
                        top: (currentSlide + 1) * slideHeight,
                        behavior: 'smooth'
                    });
                }
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
                e.preventDefault();
                if (currentSlide > 0) {
                    container.scrollTo({
                        top: (currentSlide - 1) * slideHeight,
                        behavior: 'smooth'
                    });
                }
                break;
        }
    });
    
    console.log('✅ Fallback navigation setup complete');
}

// Export for debugging
window.AnimoPresentation = AnimoPresentation;