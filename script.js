// ANIMO Dark Glass Presentation Controller
class AnimoPresentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 12;
        this.isScrolling = false;
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.minSwipeDistance = 50;
        this.animationObserver = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupAnimationObserver();
        this.generateDynamicContent();
        this.updateProgress();
        
        // Initialize first slide animations
        setTimeout(() => {
            this.animateSlideElements(1);
        }, 200);
        
        // Start atmospheric animations
        this.startAtmosphericAnimations();
    }
    
    setupEventListeners() {
        // Scroll navigation
        const container = document.getElementById('presentation');
        container.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 100));
        
        // Touch/swipe navigation
        container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        container.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // CTA button
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', this.handleCTAClick.bind(this));
        }
        
        // Copy code button
        const copyBtn = document.querySelector('.copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', this.handleCopyCode.bind(this));
        }
        
        // Window resize
        window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250));
        
        // Visibility change for performance
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const slideNumber = parseInt(entry.target.dataset.slide);
                    if (slideNumber !== this.currentSlide) {
                        this.currentSlide = slideNumber;
                        this.updateProgress();
                    }
                    this.animateSlideElements(slideNumber);
                }
            });
        }, observerOptions);
        
        // Observe all slides
        document.querySelectorAll('.slide').forEach(slide => {
            observer.observe(slide);
        });
    }
    
    setupAnimationObserver() {
        // Intersection Observer for complex animations
        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements that need animation
        document.querySelectorAll('.glass-card, .metric-card, .segment-card, .tier-card').forEach(el => {
            this.animationObserver.observe(el);
        });
    }
    
    handleScroll(event) {
        if (this.isScrolling) return;
        
        const container = event.target;
        const slideHeight = container.clientHeight;
        const newSlide = Math.round(container.scrollTop / slideHeight) + 1;
        
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
        
        if (Math.abs(distance) > this.minSwipeDistance) {
            if (distance > 0 && this.currentSlide < this.totalSlides) {
                // Swipe up - next slide
                this.goToSlide(this.currentSlide + 1);
            } else if (distance < 0 && this.currentSlide > 1) {
                // Swipe down - previous slide
                this.goToSlide(this.currentSlide - 1);
            }
        }
    }
    
    handleKeyboard(event) {
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowLeft':
                if (this.currentSlide > 1) {
                    this.goToSlide(this.currentSlide - 1);
                }
                break;
            case 'ArrowDown':
            case 'ArrowRight':
            case ' ':
                if (this.currentSlide < this.totalSlides) {
                    this.goToSlide(this.currentSlide + 1);
                }
                break;
            case 'Home':
                this.goToSlide(1);
                break;
            case 'End':
                this.goToSlide(this.totalSlides);
                break;
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides || this.isScrolling) return;
        
        this.isScrolling = true;
        this.currentSlide = slideNumber;
        
        const container = document.getElementById('presentation');
        const targetPosition = (slideNumber - 1) * container.clientHeight;
        
        container.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        this.updateProgress();
        this.animateSlideElements(slideNumber);
        
        // Reset scrolling flag
        setTimeout(() => {
            this.isScrolling = false;
        }, 800);
    }
    
    updateProgress() {
        const segments = document.querySelectorAll('.progress-segment');
        segments.forEach((segment, index) => {
            if (index + 1 === this.currentSlide) {
                segment.classList.add('active');
            } else {
                segment.classList.remove('active');
            }
        });
    }
    
    animateSlideElements(slideNumber) {
        const slide = document.querySelector(`[data-slide="${slideNumber}"]`);
        if (!slide) return;
        
        // Reset animations
        slide.querySelectorAll('.animate-in').forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = null;
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
                this.animateIndividualSlide(slide);
                break;
            case 9:
                this.animateStudioSlide(slide);
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
        }
    }
    
    animateHeroSlide(slide) {
        const logo = slide.querySelector('.animo-logo-hero');
        const title = slide.querySelector('.hero-title');
        const subtitle = slide.querySelector('.hero-subtitle');
        const description = slide.querySelector('.hero-description');
        const indicator = slide.querySelector('.swipe-indicator');
        
        if (logo) {
            logo.style.animation = 'hero-logo-appear 2s var(--transition-bounce)';
        }
        
        [title, subtitle, description, indicator].forEach((el, index) => {
            if (el) {
                setTimeout(() => {
                    el.style.animation = `hero-title-slide 1s var(--transition-bounce) forwards`;
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
        
        // Animate pyramid levels
        const pyramidLevels = slide.querySelectorAll('.pyramid-level');
        pyramidLevels.forEach((level, index) => {
            setTimeout(() => {
                level.style.animation = 'slideInUp 0.6s var(--transition-bounce) forwards';
            }, index * 100 + 800);
        });
    }
    
    animateSolutionSlide(slide) {
        const hub = slide.querySelector('.central-hub');
        const connections = slide.querySelectorAll('.connection-line');
        const services = slide.querySelectorAll('.service-badge');
        const benefits = slide.querySelectorAll('.benefit-item');
        
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
        
        benefits.forEach((benefit, index) => {
            setTimeout(() => {
                benefit.style.animation = 'slideInRight 0.6s var(--transition-bounce) forwards';
            }, index * 150 + 1500);
        });
    }
    
    animateReliabilitySlide(slide) {
        const metrics = slide.querySelectorAll('.metric-card');
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                metric.style.animation = 'metric-appear 0.8s var(--transition-bounce) forwards';
            }, index * 200);
        });
        
        const blocks = slide.querySelectorAll('.block-layer');
        blocks.forEach((block, index) => {
            setTimeout(() => {
                if (block.classList.contains('active')) {
                    block.style.animation = 'block-pulse 2s ease-in-out infinite';
                } else {
                    block.style.animation = 'block-appear 0.6s var(--transition-smooth) forwards';
                }
            }, index * 200 + 600);
        });
    }
    
    animateIntelligenceSlide(slide) {
        const nodes = slide.querySelectorAll('.network-node');
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.animation = `node-pulse 3s ease-in-out infinite`;
            }, index * 200);
        });
        
        const connections = slide.querySelectorAll('.connection');
        connections.forEach((connection, index) => {
            setTimeout(() => {
                connection.style.animation = `connection-flow 4s ease-in-out infinite`;
            }, index * 150 + 500);
        });
        
        const capabilities = slide.querySelectorAll('.capability');
        capabilities.forEach((capability, index) => {
            setTimeout(() => {
                const progress = capability.querySelector('.capability-progress');
                if (progress) {
                    const progressValue = progress.dataset.progress || '80';
                    progress.style.animation = `progress-fill 2s ease-out ${index * 0.5}s forwards`;
                    progress.style.width = `${progressValue}%`;
                }
            }, index * 400 + 1000);
        });
    }
    
    animateOverviewSlide(slide) {
        const header = slide.querySelector('.dashboard-header');
        const tiles = slide.querySelectorAll('.metric-tile');
        const bars = slide.querySelectorAll('.chart-bar');
        
        if (header) {
            header.style.animation = 'slideInDown 0.6s var(--transition-bounce)';
        }
        
        tiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.style.animation = 'tile-appear 0.6s var(--transition-bounce) forwards';
            }, index * 100 + 300);
        });
        
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.animation = 'chart-bar-grow 1s ease-out forwards';
            }, index * 100 + 600);
        });
    }
    
    animateScalingSlide(slide) {
        const stages = slide.querySelectorAll('.pipeline-stage');
        const arrow = slide.querySelector('.pipeline-arrow');
        const features = slide.querySelectorAll('.feature');
        
        stages.forEach((stage, index) => {
            setTimeout(() => {
                stage.style.animation = 'stage-appear 0.8s var(--transition-bounce) forwards';
            }, index * 200);
        });
        
        if (arrow) {
            arrow.style.animation = 'arrow-bounce 2s ease-in-out infinite 600ms';
        }
        
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.animation = 'feature-slide 0.6s var(--transition-bounce) forwards';
            }, index * 150 + 800);
        });
    }
    
    animateIndividualSlide(slide) {
        const segments = slide.querySelectorAll('.segment-card');
        segments.forEach((segment, index) => {
            setTimeout(() => {
                segment.style.animation = 'segment-slide 0.8s var(--transition-bounce) forwards';
            }, index * 300);
        });
        
        // Animate need levels
        const needLevels = slide.querySelectorAll('.need-level');
        needLevels.forEach((level, index) => {
            setTimeout(() => {
                level.style.animation = 'level-pulse 2s ease-in-out infinite';
            }, index * 100 + 1000);
        });
    }
    
    animateStudioSlide(slide) {
        const pyramidLevels = slide.querySelectorAll('.pyramid-level');
        pyramidLevels.forEach((level, index) => {
            setTimeout(() => {
                level.style.animation = 'pyramid-build 0.6s var(--transition-bounce) forwards';
            }, index * 150);
        });
        
        const tierCards = slide.querySelectorAll('.tier-card');
        tierCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'tier-appear 0.8s var(--transition-bounce) forwards';
            }, index * 200 + 1000);
        });
    }
    
    animateConnectionSlide(slide) {
        const steps = slide.querySelectorAll('.flow-step');
        const arrows = slide.querySelectorAll('.flow-arrow');
        const codePreview = slide.querySelector('.code-preview');
        
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.animation = 'step-appear 0.6s var(--transition-bounce) forwards';
            }, index * 200);
        });
        
        arrows.forEach((arrow, index) => {
            setTimeout(() => {
                arrow.style.animation = 'arrow-bounce 2s ease-in-out infinite';
            }, index * 300 + 400);
        });
        
        if (codePreview) {
            setTimeout(() => {
                codePreview.style.animation = 'code-appear 0.8s var(--transition-bounce) forwards';
            }, 1000);
        }
    }
    
    animateImplementationSlide(slide) {
        const scenarios = slide.querySelectorAll('.time-scenario');
        const arrow = slide.querySelector('.time-arrow');
        const improvements = slide.querySelectorAll('.metric-improvement');
        
        scenarios.forEach((scenario, index) => {
            setTimeout(() => {
                scenario.style.animation = 'scenario-appear 0.8s var(--transition-bounce) forwards';
            }, index * 300);
        });
        
        if (arrow) {
            arrow.style.animation = 'time-arrow-pulse 2s ease-in-out infinite 600ms';
        }
        
        improvements.forEach((improvement, index) => {
            setTimeout(() => {
                improvement.style.animation = 'improvement-appear 0.6s var(--transition-bounce) forwards';
            }, index * 200 + 1200);
        });
    }
    
    animateBrandSlide(slide) {
        const logo = slide.querySelector('.animo-logo-final');
        const title = slide.querySelector('.brand-title');
        const stats = slide.querySelectorAll('.brand-stat');
        const cta = slide.querySelector('.cta-section');
        
        if (logo) {
            logo.style.animation = 'final-logo-appear 2.5s var(--transition-bounce)';
        }
        
        if (title) {
            setTimeout(() => {
                title.style.animation = 'brand-title-fade 1.5s var(--transition-smooth) forwards';
            }, 2000);
        }
        
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.animation = 'brand-stats-slide 1s var(--transition-bounce) forwards';
            }, index * 200 + 3000);
        });
        
        if (cta) {
            setTimeout(() => {
                cta.style.animation = 'cta-appear 1s var(--transition-bounce) forwards';
            }, 4500);
        }
    }
    
    generateDynamicContent() {
        // Generate additional atmospheric elements if needed
        this.addParallaxEffect();
        this.addInteractiveElements();
    }
    
    addParallaxEffect() {
        const slides = document.querySelectorAll('.slide');
        
        slides.forEach(slide => {
            const background = slide.querySelector('.slide-background');
            if (background) {
                slide.addEventListener('scroll', () => {
                    const rect = slide.getBoundingClientRect();
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * -0.5;
                    
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        background.style.transform = `translateY(${rate}px)`;
                    }
                });
            }
        });
    }
    
    addInteractiveElements() {
        // Add hover effects for cards
        const cards = document.querySelectorAll('.glass-card, .metric-card, .segment-card, .tier-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }
    
    startAtmosphericAnimations() {
        // Random glow positioning
        const glows = document.querySelectorAll('.atmospheric-glow');
        glows.forEach((glow, index) => {
            setTimeout(() => {
                this.animateGlow(glow, index);
            }, index * 2000);
        });
    }
    
    animateGlow(glow, index) {
        const positions = [
            { top: '20%', right: '10%' },
            { top: '60%', left: '10%' },
            { bottom: '20%', right: '20%' },
            { top: '40%', left: '50%' }
        ];
        
        const position = positions[index % positions.length];
        Object.assign(glow.style, position);
        
        // Randomize animation timing
        glow.style.animationDelay = `${Math.random() * 2}s`;
        glow.style.animationDuration = `${8 + Math.random() * 4}s`;
    }
    
    handleCTAClick() {
        const button = document.querySelector('.cta-button');
        if (button) {
            button.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                button.style.transform = '';
                // Here you could add actual CTA functionality
                console.log('CTA clicked - starting free trial!');
                this.showNotification('Спасибо! Мы свяжемся с вами в ближайшее время.');
            }, 150);
        }
    }
    
    handleCopyCode() {
        const codeContent = document.querySelector('.code-content');
        const copyBtn = document.querySelector('.copy-btn');
        
        if (codeContent && copyBtn) {
            const text = codeContent.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                copyBtn.style.color = 'var(--success)';
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.color = 'var(--primary-violet)';
                }, 2000);
            });
        }
    }
    
    showNotification(message) {
        // Simple notification system
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--primary-gradient);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            animation: notification-appear 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'notification-disappear 0.3s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    handleResize() {
        this.updateCurrentSlideFromScroll();
        this.adjustLayoutForOrientation();
    }
    
    handleVisibilityChange() {
        const animations = document.querySelectorAll('[style*="animation"]');
        if (document.hidden) {
            animations.forEach(el => el.style.animationPlayState = 'paused');
        } else {
            animations.forEach(el => el.style.animationPlayState = 'running');
        }
    }
    
    updateCurrentSlideFromScroll() {
        const container = document.getElementById('presentation');
        const slideHeight = container.clientHeight;
        const newSlide = Math.round(container.scrollTop / slideHeight) + 1;
        
        if (newSlide !== this.currentSlide) {
            this.currentSlide = newSlide;
            this.updateProgress();
        }
    }
    
    adjustLayoutForOrientation() {
        // Handle orientation changes
        if (window.innerHeight < window.innerWidth) {
            document.body.classList.add('landscape');
        } else {
            document.body.classList.remove('landscape');
        }
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

// Additional CSS animations via JavaScript
function addDynamicStyles() {
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
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes metric-appear {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes block-appear {
            from {
                opacity: 0;
                transform: scaleX(0);
                transform-origin: left;
            }
            to {
                opacity: 1;
                transform: scaleX(1);
                transform-origin: left;
            }
        }
        
        @keyframes tile-appear {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes stage-appear {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes feature-slide {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes segment-slide {
            from {
                opacity: 0;
                transform: translateX(-40px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes level-pulse {
            0%, 100% { 
                transform: scale(1);
                opacity: 1;
            }
            50% { 
                transform: scale(1.2);
                opacity: 0.8;
            }
        }
        
        @keyframes pyramid-build {
            from {
                opacity: 0;
                transform: translateY(20px) scaleY(0);
                transform-origin: bottom;
            }
            to {
                opacity: 1;
                transform: translateY(0) scaleY(1);
                transform-origin: bottom;
            }
        }
        
        @keyframes tier-appear {
            from {
                opacity: 0;
                transform: translateY(40px) rotateX(-15deg);
            }
            to {
                opacity: 1;
                transform: translateY(0) rotateX(0deg);
            }
        }
        
        @keyframes step-appear {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes code-appear {
            from {
                opacity: 0;
                transform: translateY(20px);
                box-shadow: 0 0 0 rgba(0,0,0,0);
            }
            to {
                opacity: 1;
                transform: translateY(0);
                box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            }
        }
        
        @keyframes scenario-appear {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes improvement-appear {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
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
        
        .animate-in {
            animation-fill-mode: forwards;
        }
        
        .landscape .glass-card {
            min-height: 400px;
        }
        
        .landscape .slide {
            padding: 20px;
        }
    `;
    document.head.appendChild(style);
}

// Performance optimization
function optimizePerformance() {
    // Reduce animations on slower devices
    if (navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--transition-smooth', '0.3s');
        document.documentElement.style.setProperty('--transition-bounce', '0.4s');
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        const animations = document.querySelectorAll('[style*="animation"]');
        if (document.hidden) {
            animations.forEach(el => el.style.animationPlayState = 'paused');
        } else {
            animations.forEach(el => el.style.animationPlayState = 'running');
        }
    });
}

// Accessibility enhancements
function enhanceAccessibility() {
    // Add ARIA labels
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.setAttribute('aria-label', `Слайд ${index + 1} из ${slides.length}`);
        slide.setAttribute('role', 'region');
    });
    
    // Add keyboard navigation hints
    const presentation = document.getElementById('presentation');
    presentation.setAttribute('tabindex', '0');
    presentation.setAttribute('aria-label', 'Презентация ANIMO. Используйте стрелки вверх/вниз для навигации');
    
    // Add focus management
    presentation.addEventListener('focus', () => {
        presentation.style.outline = '2px solid var(--primary-indigo)';
        presentation.style.outlineOffset = '2px';
    });
    
    presentation.addEventListener('blur', () => {
        presentation.style.outline = '';
        presentation.style.outlineOffset = '';
    });
    
    // Add skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#presentation';
    skipLink.textContent = 'Перейти к презентации';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-gradient);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Error handling
function setupErrorHandling() {
    window.addEventListener('error', (event) => {
        console.warn('Presentation error:', event.error);
        // Could send error to analytics service
    });
    
    window.addEventListener('unhandledrejection', (event) => {
        console.warn('Unhandled promise rejection:', event.reason);
        event.preventDefault();
    });
}

// Loading management
function setupLoadingManagement() {
    // Add loading states
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--bg-deep);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease-out;
    `;
    
    const loadingSpinner = document.createElement('div');
    loadingSpinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 3px solid rgba(255,255,255,0.1);
        border-top: 3px solid var(--primary-indigo);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    loadingOverlay.appendChild(loadingSpinner);
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loadingOverlay);
            }, 500);
        }, 1000);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    optimizePerformance();
    enhanceAccessibility();
    setupErrorHandling();
    setupLoadingManagement();
    
    // Initialize presentation
    const presentation = new AnimoPresentation();
    
    // Preload next few slides for smoother experience
    setTimeout(() => {
        const nextSlides = document.querySelectorAll('.slide:nth-child(n+2):nth-child(-n+4)');
        nextSlides.forEach(slide => {
            // Force browser to render slides
            slide.offsetHeight;
        });
    }, 2000);
});

// Export for potential external use
window.AnimoPresentation = AnimoPresentation;