// CINEMATOK MEDIA Presentation JavaScript - Mobile Portrait Optimized

document.addEventListener('DOMContentLoaded', function() {
    // Initialize presentation
    initializePresentation();
    setupMobileOptimizations();
    setupScrollEffects();
    setupInteractiveElements();
    setupROI();
});

// Presentation Initialization
function initializePresentation() {
    // Create progress dots
    createProgressDots();
    
    // Setup mobile navigation
    setupMobileNavigation();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Initialize animations
    initializeAnimations();
    
    // Setup orientation handling
    setupOrientationHandling();
}

// Mobile Optimizations
function setupMobileOptimizations() {
    // Force portrait orientation hints
    if (screen.orientation && screen.orientation.lock) {
        try {
            screen.orientation.lock('portrait-primary');
        } catch (e) {
            console.log('Orientation lock not supported');
        }
    }
    
    // Prevent zoom on mobile
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    document.addEventListener('touchmove', function(e) {
        if (e.scale !== 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Optimize performance for mobile
    if (isMobile()) {
        // Disable heavy animations on mobile
        document.body.classList.add('mobile-optimized');
        
        // Reduce floating elements
        const floatingElements = document.querySelectorAll('.floating-shape');
        floatingElements.forEach((el, index) => {
            if (index > 1) el.style.display = 'none';
        });
    }
}

// Create progress navigation dots
function createProgressDots() {
    const slides = document.querySelectorAll('.slide');
    const progressDotsContainer = document.getElementById('progressDots');
    const mobileMenuItems = document.getElementById('mobileMenuItems');
    
    slides.forEach((slide, index) => {
        const title = slide.querySelector('.slide-title, h1, h2')?.textContent || `Слайд ${index + 1}`;
        
        // Desktop progress dot
        const dot = document.createElement('div');
        dot.className = 'progress-dot';
        dot.setAttribute('data-title', title);
        dot.setAttribute('data-slide', index);
        dot.addEventListener('click', () => scrollToSlide(index));
        progressDotsContainer.appendChild(dot);
        
        // Mobile menu item
        const menuItem = document.createElement('div');
        menuItem.className = 'mobile-menu-item';
        menuItem.textContent = title;
        menuItem.setAttribute('data-slide', index);
        menuItem.addEventListener('click', () => {
            scrollToSlide(index);
            closeMobileMenu();
        });
        mobileMenuItems.appendChild(menuItem);
    });
}

// Mobile Navigation Setup
function setupMobileNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', openMobileMenu);
        closeMobileMenu.addEventListener('click', closeMobileMenu);
        
        // Close on outside click
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }
}

function openMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Smooth Scrolling Setup
function setupSmoothScrolling() {
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach((slide, index) => {
        slide.addEventListener('scroll', () => {
            updateProgressDots(index);
            triggerSlideAnimations(slide, index);
        });
    });
    
    // Setup scroll snap
    document.body.style.scrollBehavior = 'smooth';
}

// Update progress indicators
function updateProgressDots(currentSlide) {
    const dots = document.querySelectorAll('.progress-dot');
    const menuItems = document.querySelectorAll('.mobile-menu-item');
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    menuItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentSlide);
    });
}

// Scroll to specific slide
function scrollToSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    if (slides[slideIndex]) {
        slides[slideIndex].scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Interactive Elements Setup
function setupInteractiveElements() {
    // Start presentation button
    const startButton = document.getElementById('startPresentation');
    if (startButton) {
        startButton.addEventListener('click', () => {
            scrollToSlide(1);
        });
    }
    
    // Ecosystem interactions
    setupEcosystemInteractions();
    
    // Automation workflow interactions
    setupAutomationInteractions();
    
    // Asset gallery interactions
    setupAssetInteractions();
}

// Ecosystem interactions
function setupEcosystemInteractions() {
    const orbitItems = document.querySelectorAll('.orbit-item');
    
    orbitItems.forEach(item => {
        item.addEventListener('click', () => {
            const service = item.getAttribute('data-service');
            showServiceInfo(service);
        });
        
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.15)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });
}

function showServiceInfo(service) {
    const info = {
        'bot': 'Telegram бот с полным функционалом AI-инструментов',
        'web': 'Веб-платформа для профессиональной работы',
        'mobile': 'Мобильное приложение для работы в любом месте',
        'api': 'API для интеграции в ваши проекты',
        'automation': 'Контентзавод для автоматизации процессов',
        'avatars': 'База аватаров и локаций'
    };
    
    // Show toast notification or modal
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

// ROI Calculator Setup
function setupROI() {
    const tasksRange = document.getElementById('tasksPerDay');
    const timeRange = document.getElementById('timePerTask');
    const daysRange = document.getElementById('workDays');
    
    if (tasksRange && timeRange && daysRange) {
        const updateROI = () => {
            const tasks = parseInt(tasksRange.value);
            const time = parseInt(timeRange.value);
            const days = parseInt(daysRange.value);
            
            // Update range displays
            document.getElementById('tasksValue').textContent = tasks;
            document.getElementById('timeValue').textContent = time;
            document.getElementById('daysValue').textContent = days;
            
            // Calculate ROI
            const traditionalTime = tasks * time * days; // minutes per week
            const cinematokTime = Math.round(traditionalTime * 0.35); // 65% time savings
            const savedTime = traditionalTime - cinematokTime;
            const savings = Math.round((savedTime / traditionalTime) * 100);
            
            // Update results
            animateCounter('traditionalTime', traditionalTime);
            animateCounter('syntxTime', cinematokTime);
            animateCounter('savings', savedTime);
            
            // Update percentage
            const percentageElement = document.getElementById('timePercentage');
            if (percentageElement) {
                animatePercentage(percentageElement, savings);
            }
            
            // Update progress ring
            updateProgressRing(savings);
        };
        
        tasksRange.addEventListener('input', updateROI);
        timeRange.addEventListener('input', updateROI);
        daysRange.addEventListener('input', updateROI);
        
        // Initialize ROI
        updateROI();
    }
}

// Animate counters
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const currentValue = parseInt(element.textContent) || 0;
    const increment = (targetValue - currentValue) / 30;
    let current = currentValue;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= targetValue) || (increment < 0 && current <= targetValue)) {
            element.textContent = targetValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Animate percentage
function animatePercentage(element, targetPercentage) {
    const currentPercentage = parseInt(element.textContent) || 0;
    const increment = (targetPercentage - currentPercentage) / 30;
    let current = currentPercentage;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= targetPercentage) || (increment < 0 && current <= targetPercentage)) {
            element.textContent = targetPercentage + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current) + '%';
        }
    }, 16);
}

// Update progress ring
function updateProgressRing(percentage) {
    const progressRing = document.querySelector('.progress-ring-progress');
    if (progressRing) {
        const radius = 90;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        
        progressRing.style.strokeDashoffset = offset;
    }
}

// Countdown Timer
function setupCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) return;
    
    // Set target time (24 hours from now)
    const targetTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetTime - now;
        
        if (distance > 0) {
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }
    }
    
    // Update every second
    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// Animation triggers on scroll
function triggerSlideAnimations(slide, index) {
    if (!slide.classList.contains('animated')) {
        slide.classList.add('animated');
        
        // Trigger specific slide animations
        switch(index) {
            case 1: // Problem vs Solution
                animateCounters();
                break;
            case 3: // Multi-threading
                animateStats();
                break;
            case 7: // ROI
                animateChartBars();
                break;
            case 8: // Roadmap
                animateTimeline();
                break;
        }
    }
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for slide visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.slide').forEach(slide => {
        observer.observe(slide);
    });
}

// Animate counters in problem slide
function animateCounters() {
    const counter = document.querySelector('.counter-number[data-target]');
    if (counter && !counter.classList.contains('animated')) {
        counter.classList.add('animated');
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounterElement(counter, target);
    }
}

function animateCounterElement(element, target) {
    const current = parseInt(element.textContent) || 0;
    const increment = (target - current) / 60;
    let value = current;
    
    const timer = setInterval(() => {
        value += increment;
        if ((increment > 0 && value >= target) || (increment < 0 && value <= target)) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(value);
        }
    }, 33);
}

// Animate statistics
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    statNumbers.forEach(stat => {
        if (!stat.classList.contains('animated')) {
            stat.classList.add('animated');
            const target = parseInt(stat.getAttribute('data-target'));
            animateCounterElement(stat, target);
        }
    });
}

// Animate chart bars
function animateChartBars() {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        if (!bar.classList.contains('animated')) {
            bar.classList.add('animated');
            setTimeout(() => {
                const value = bar.getAttribute('data-value');
                bar.style.setProperty('--height', value + '%');
            }, index * 200);
        }
    });
}

// Animate timeline
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        if (!item.classList.contains('animated')) {
            item.classList.add('animated');
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 300);
        }
    });
}

// Setup scroll effects
function setupScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for background elements
        document.querySelectorAll('.floating-shape').forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Setup automation workflow interactions
function setupAutomationInteractions() {
    const workflowSteps = document.querySelectorAll('.workflow-step');
    
    workflowSteps.forEach((step, index) => {
        step.addEventListener('click', () => {
            // Highlight current step
            workflowSteps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
            
            // Show step details
            showWorkflowStepInfo(index);
        });
    });
}

// Show workflow step information
function showWorkflowStepInfo(stepIndex) {
    const info = [
        'Зафиксируйте повторяющийся процесс в вашей работе',
        'Запишите точные шаги и параметры',
        'Настройте автоматизацию в контентзаводе',
        'Запустите и масштабируйте процесс'
    ];
    
    // Simple notification
    if (window.Notification && Notification.permission === 'granted') {
        new Notification('Контентзавод', {
            body: info[stepIndex],
            icon: '/favicon.ico'
        });
    }
}

// Setup asset gallery interactions
function setupAssetInteractions() {
    const assetItems = document.querySelectorAll('.asset-item');
    
    assetItems.forEach(item => {
        item.addEventListener('click', () => {
            const type = item.querySelector('span').textContent;
            showAssetPreview(type);
        });
    });
}

// Show asset preview
function showAssetPreview(type) {
    // Create modal or overlay for asset preview
    const modal = document.createElement('div');
    modal.className = 'asset-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${type}</h3>
            <p>Здесь будет предпросмотр аватаров типа: ${type}</p>
            <button onclick="this.closest('.asset-modal').remove()">Закрыть</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 3000);
}

// Handle orientation changes
function setupOrientationHandling() {
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Recalculate layouts after orientation change
            window.scrollTo(0, 0);
            
            // Update progress indicators
            const currentSlide = Math.round(window.pageYOffset / window.innerHeight);
            updateProgressDots(currentSlide);
        }, 100);
    });
}

// Utility functions
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isPortrait() {
    return window.innerHeight > window.innerWidth;
}

// Performance optimizations
function optimizeForMobile() {
    if (isMobile()) {
        // Reduce animation complexity
        document.documentElement.style.setProperty('--transition-smooth', 'all 0.2s ease-out');
        
        // Disable heavy effects
        const elements = document.querySelectorAll('.floating-shape, .provider-core, .ecosystem-orbit');
        elements.forEach(el => {
            el.style.animation = 'none';
        });
    }
}

// Initialize performance optimizations
optimizeForMobile();

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Touch gestures for mobile navigation
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        const slides = document.querySelectorAll('.slide');
        const currentSlide = Math.round(window.pageYOffset / window.innerHeight);
        
        if (diff > 0 && currentSlide < slides.length - 1) {
            // Swipe up - next slide
            scrollToSlide(currentSlide + 1);
        } else if (diff < 0 && currentSlide > 0) {
            // Swipe down - previous slide
            scrollToSlide(currentSlide - 1);
        }
    }
}

// Keyboard navigation (desktop)
document.addEventListener('keydown', (e) => {
    const slides = document.querySelectorAll('.slide');
    const currentSlide = Math.round(window.pageYOffset / window.innerHeight);
    
    switch(e.key) {
        case 'ArrowDown':
        case 'PageDown':
            if (currentSlide < slides.length - 1) {
                scrollToSlide(currentSlide + 1);
            }
            break;
        case 'ArrowUp':
        case 'PageUp':
            if (currentSlide > 0) {
                scrollToSlide(currentSlide - 1);
            }
            break;
        case 'Home':
            scrollToSlide(0);
            break;
        case 'End':
            scrollToSlide(slides.length - 1);
            break;
    }
});

// Initialize countdown timer when CTA slide is visible
document.addEventListener('scroll', () => {
    const ctaSlide = document.querySelector('.slide-cta');
    if (ctaSlide && isInViewport(ctaSlide)) {
        setupCountdown();
    }
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Console message for developers
console.log(`
🎬 CINEMATOK MEDIA Presentation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mobile-optimized • Portrait 9:16 • Interactive
Created by MiniMax Agent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
