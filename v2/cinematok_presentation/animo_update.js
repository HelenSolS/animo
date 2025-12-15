// Обновление презентации: Замена CINEMATOK на АНИМО

document.addEventListener('DOMContentLoaded', function() {
    // Заменяем все упоминания CINEMATOK на АНИМО
    updateBranding();
    
    // Обновляем логотип в hero секции
    updateLogo();
    
    // Обновляем все текстовые блоки
    updateTextContent();
});

function updateBranding() {
    // Обновляем title страницы
    document.title = 'АНИМО - AI Infrastructure Provider';
    
    // Обновляем meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', 'АНИМО - Революция в ИИ-инфраструктуре. Полная экосистема ИИ-сервисов.');
    }
}

function updateLogo() {
    // Обновляем логотип в hero секции
    const logoText = document.getElementById('logoText');
    if (logoText) {
        logoText.innerHTML = `
            <span class="cinematok">АНИМО</span>
            <span class="media">MEDIA</span>
        `;
        
        // Применяем стиль АНИМО
        logoText.className = 'logo-text animo-logo';
    }
    
    // Обновляем в контактах
    const contactLogo = document.querySelector('.contact-logo');
    if (contactLogo) {
        contactLogo.innerHTML = `
            <span>АНИМО</span>
            <span class="logo-subtitle">MEDIA</span>
        `;
    }
}

function updateTextContent() {
    // Обновляем основной заголовок
    const heroSubtitle = document.getElementById('heroSubtitle');
    if (heroSubtitle) {
        heroSubtitle.innerHTML = `
            <h2>Революция в ИИ-инфраструктуре</h2>
            <p>Полная экосистема ИИ-сервисов</p>
        `;
    }
    
    // Обновляем provider card
    const providerCard = document.querySelector('.comparison-card.provider');
    if (providerCard) {
        const cardHeader = providerCard.querySelector('.card-header h3');
        if (cardHeader) {
            cardHeader.textContent = 'АНИМО ПРОВАЙДЕР';
        }
    }
    
    // Обновляем экосистему
    const coreLogo = document.querySelector('.core-logo');
    if (coreLogo) {
        coreLogo.textContent = 'АНИМО';
    }
    
    // Обновляем timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content h3');
        if (content && content.textContent.includes('СИНЕМАТОК')) {
            content.textContent = content.textContent.replace(/СИНЕМАТОК/gi, 'АНИМО');
        }
    });
    
    // Обновляем контакты
    const contactValue = document.querySelector('.contact-value');
    if (contactValue) {
        const emailElements = document.querySelectorAll('.contact-value');
        emailElements.forEach(el => {
            if (el.textContent.includes('cinematok')) {
                el.textContent = el.textContent.replace(/cinematok/gi, 'animo');
            }
        });
    }
}

// Стили для логотипа АНИМО
function addAnimoStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animo-logo {
            font-family: 'Space Grotesk', sans-serif;
            font-size: clamp(32px, 12vw, 48px);
            font-weight: 700;
            background: linear-gradient(135deg, #2563EB 0%, #7C3AED 50%, #EC4899 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 40px rgba(37, 99, 235, 0.4);
            line-height: 1.1;
            text-align: center;
            margin: 0 auto;
            position: relative;
        }
        
        .animo-logo::after {
            content: '';
            position: absolute;
            top: 50%;
            right: -20px;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            background: linear-gradient(135deg, #EC4899, #F97316);
            clip-path: polygon(0% 0%, 75% 50%, 0% 100%);
            filter: drop-shadow(0 0 8px rgba(236, 72, 153, 0.8));
        }
        
        .animo-logo .media {
            display: block;
            font-size: 0.4em;
            font-weight: 300;
            letter-spacing: 0.2em;
            margin-top: var(--spacing-xs);
            color: var(--color-text-secondary);
            background: none;
            -webkit-text-fill-color: var(--color-text-secondary);
            text-shadow: none;
        }
        
        .animo-logo .media::after {
            display: none;
        }
        
        @media (max-width: 768px) {
            .animo-logo::after {
                width: 12px;
                height: 12px;
                right: -15px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Инициализация стилей АНИМО
addAnimoStyles();

// Функция для демонстрации различных вариантов логотипа
function showLogoVariants() {
    const variants = [
        {
            name: 'Техно-стиль с play',
            class: 'animo-logo-tech',
            description: 'С встроенным play-символом'
        },
        {
            name: 'Анимационный',
            class: 'animo-logo-animated',
            description: 'С пульсирующими эффектами'
        },
        {
            name: 'Минималистичный',
            class: 'animo-logo-minimal',
            description: 'Читаемый и универсальный'
        }
    ];
    
    console.log('Доступные варианты логотипа АНИМО:', variants);
    return variants;
}

// Экспорт для использования в других скриптах
window.AnimoBranding = {
    updateBranding,
    updateLogo,
    updateTextContent,
    addAnimoStyles,
    showLogoVariants
};

console.log('АНИМО брендинг инициализирован');
