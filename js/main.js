 // ============================================================
// ===== MOBILE MENU — RIGHT SIDEBAR =====
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    if (!hamburger || !mobileMenu || !overlay) {
        console.log('❌ Menu elements not found');
        return;
    }

    function openMenu() {
        mobileMenu.classList.add('open');
        overlay.classList.add('show');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        overlay.classList.remove('show');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Toggle on hamburger click
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        if (mobileMenu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close on overlay click
    overlay.addEventListener('click', closeMenu);

    // Close on link click
    document.querySelectorAll('.mobile-menu ul li a').forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
     
    // ============================================================
    // ===== MOBILE THEME TOGGLE — WORKING =====
    // ============================================================
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggleMobile && themeToggle) {
        themeToggleMobile.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('🔄 Mobile theme toggle clicked!');
            // Click the desktop toggle
            themeToggle.click();
            // Close menu after toggle
            setTimeout(closeMenu, 300);
        });
    }

    // ============================================================
    // ===== MOBILE LANGUAGE TOGGLE — WORKING =====
    // ============================================================
    const langToggleMobile = document.getElementById('langToggleMobile');
    const langToggle = document.getElementById('langToggle');

    if (langToggleMobile && langToggle) {
        langToggleMobile.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('🔄 Mobile language toggle clicked!');
            // Click the desktop toggle
            langToggle.click();
            // Close menu after toggle
            setTimeout(closeMenu, 300);
        });
    }

    console.log('✅ Mobile menu fully initialized with working toggles!');
});

// ===== DARK/LIGHT MODE (SIMPLE VERSION) =====
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('themeToggle');
    
    if (toggle) {
        // Check saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update icon
        const icon = toggle.querySelector('i');
        if (savedTheme === 'light') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
        
        // Toggle on click
        toggle.addEventListener('click', function() {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            const icon = this.querySelector('i');
            if (newTheme === 'light') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
    }
});
// ===== HERO VIDEO FIX — Force Play on Mobile =====
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    
    if (video) {
        // Try to play video
        video.play().catch(function(error) {
            console.log('Video autoplay failed:', error);
            // Show fallback image instead
            video.style.display = 'none';
            const fallback = document.createElement('img');
            fallback.src = 'images/best.jpg';
            fallback.alt = 'Background';
            fallback.style.cssText = 'width:100%;height:100%;object-fit:cover;';
            video.parentNode.appendChild(fallback);
        });
        
        // For iOS/Safari — Force play on user interaction
        document.addEventListener('touchstart', function() {
            if (video.paused) {
                video.play().catch(function() {});
            }
        }, { once: true });
        
        // Also on click/tap anywhere
        document.addEventListener('click', function() {
            if (video.paused) {
                video.play().catch(function() {});
            }
        }, { once: true });
    }
});
// ===== TESTIMONIALS SLIDER =====
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
let testimonialInterval;

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));

    testimonialCards[index].classList.add('active');
    testimonialDots[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function goToTestimonial(index) {
    clearInterval(testimonialInterval);
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
    startTestimonialAutoSlide();
}

function startTestimonialAutoSlide() {
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

// Click dots
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToTestimonial(index));
});

// Start auto-slide
if (testimonialCards.length > 0) {
    startTestimonialAutoSlide();
}

// Close menu on link click
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
    });
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


 // ===== STATISTICS COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = Math.ceil(target / 60);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = current + '+';
            }
        }, 30);
    });
};

// Trigger animation when stats section is visible
const statsSection = document.querySelector('.section-bg-stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            animateStats();
        }
    });
}, { threshold: 0.3 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== AUTO UPDATE YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== SCROLL ANIMATION =====
const cards = document.querySelectorAll('.skill-card, .project-card, .service-card, .stat-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 80);
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});
// ===== MULTI-LANGUAGE SYSTEM =====
const translations = {
    en: {
        // Navigation
        'nav-about': 'About',
        'nav-skills': 'Skills',
        'nav-projects': 'Projects',
        'nav-services': 'Services',
        'nav-contact': 'Contact',

        // Hero
        'hero-greeting': '👋 Hello, I\'m',
        'hero-name': 'Sisay Abebayew',
        'hero-title': 'Full-Stack Developer & Digital Solutions Architect',
        'hero-description': 'I build complete, modern systems that solve real-world problems.',
        'hero-btn-work': 'View My Work',
        'hero-btn-contact': 'Contact Me',
 
        // About
        'about-title': 'About Me',
        'about-subtitle': 'Hi There! I\'m Sisay Abebayew',
        'about-role': 'Full-Stack Developer & Digital Solutions Architect',
        'about-text1': 'I am a passionate developer with a strong focus on building complete digital solutions. I chose Computer Science because I enjoy technology, problem-solving, and turning ideas into real, functional applications.',
        'about-text2': 'I focus on building complete, practical, and user-friendly systems rather than just creating attractive interfaces. I enjoy solving real-world problems, learning new technologies, and turning ideas into functional websites and applications.',
        'about-text3': 'My goal is to become a highly skilled full-stack developer, work on challenging real-world projects, gain professional experience, and eventually build and lead my own software development agency.',
        'about-experience': 'Experience',
        'about-phone': 'Phone',
        'about-email': 'Email',
        'about-location': 'From',
        'about-language': 'Language',
        'about-freelance': 'Freelance',
        'about-cv': 'Download CV',

        // Statistics
        'stats-projects': 'Projects Completed',
        'stats-websites': 'Websites Built',
        'stats-systems': 'Management Systems',
        'stats-years': 'Years Experience',

        // Skills
        'skills-title': 'My Skills',
        'skills-subtitle': 'Technologies and tools I work with.',

        // Projects
        'projects-title': 'My Projects',
        'projects-subtitle': 'Here are some of the projects I\'ve built. Each one represents a complete solution to a real-world problem.',
        // Weather
          'weather-loading': 'Loading weather...',
          'weather-unavailable': 'Weather unavailable',
          'weather-humidity': 'Humidity',
          'weather-wind': 'Wind',
        // Services
        'services-title': 'My Services',
        'services-subtitle': 'All the services that I offer in my field of work are mentioned below.',
        'services-quote': 'Get a Quote',

        // Testimonials
        'testimonials-title': 'What Clients Say',
        'testimonials-subtitle': 'Testimonials from clients I\'ve worked with.',

        // Contact
        'contact-title': 'Get In Touch',
        'contact-subtitle': 'Have a project in mind? Let\'s work together. Fill out the form below and I\'ll get back to you.',
        'contact-name': 'Name',
        'contact-email': 'Email',
        'contact-subject': 'Subject',
        'contact-project': 'Project Type',
        'contact-phone': 'Phone',
        'contact-message': 'Message',
        'contact-send': 'Send Message',
        'contact-info': 'Contact Info',
        'contact-email-label': 'Email',
        'contact-phone-label': 'Phone / WhatsApp',
        'contact-location-label': 'Location',
        'contact-follow': 'Follow Me',

        // Footer
        'footer-rights': 'All rights reserved.',
        'footer-built': 'Built with  by sisay dev',

        // Language toggle
        'lang-en': '🇬🇧 EN',
        'lang-am': '🇪🇹 አማ',
    },
    am: {
        // Navigation
        'nav-about': 'ስለ እኔ',
        'nav-skills': 'ክህሎቶች',
        'nav-projects': 'ፕሮጀክቶች',
        'nav-services': 'አገልግሎቶች',
        'nav-contact': 'አግኙኝ',

        // Hero
        'hero-greeting': '👋 ሰላም፣ እኔ',
        'hero-name': 'ሲሳይ አበበየው',
        'hero-title': 'ሙሉ-ደረጃ ገንቢ እና ዲጂታል ሶሉሽን አርክቴክት',
        'hero-description': 'ችግሮችን የሚፈቱ ሙሉ እና ዘመናዊ ስርዓቶችን እገነባለሁ።',
        'hero-btn-work': 'ስራዎቼን ይመልከቱ',
        'hero-btn-contact': 'ያግኙኝ',
        // About
        'about-title': 'ስለ እኔ',
        'about-subtitle': 'ሰላም! እኔ ሲሳይ አበበየው ነኝ',
        'about-role': 'ሙሉ-ደረጃ ገንቢ እና ዲጂታል ሶሉሽን አርክቴክት',
        'about-text1': 'በኮምፒዩተር ሳይንስ የተማርኩት ቴክኖሎጂን፣ ችግር ፈቺን እና ሃሳቦችን ወደ ተግባራዊ አፕሊኬሽኖች መቀየር ስለምወድ ነው።',
        'about-text2': 'ውብ በይነገጾችን ከመስራት በተጨማሪ ሙሉ፣ ተግባራዊ እና ለተጠቃሚ ምቹ የሆኑ ስርዓቶችን በመገንባት ላይ አተኩራለሁ። የእውነተኛ ዓለም ችግሮችን መፍታት እና ሃሳቦችን ወደ ተግባራዊ ድረ-ገጾች መቀየር ያስደስተኛል።',
        'about-text3': 'ግቤ ከፍተኛ ችሎታ ያለው ሙሉ-ደረጃ ገንቢ መሆን፣ በተግዳሮቶች የበለጸጉ እውነተኛ ፕሮጀክቶች ላይ መስራት፣ ሙያዊ እውቀት ማግኘት እና በመጨረሻም የራሴን የሶፍትዌር ልማት ኤጀንሲ መመስረት ነው።',
        'about-experience': 'ልምድ',
        'about-phone': 'ስልክ',
        'about-email': 'ኢሜይል',
        'about-location': 'መኖሪያ',
        'about-language': 'ቋንቋ',
        'about-freelance': 'ፍሪላንስ',
        'about-cv': 'ሲቪ አውርድ',

        // Statistics
        'stats-projects': 'ፕሮጀክቶች ተጠናቀዋል',
        'stats-websites': 'ድረ-ገጾች ተሰርተዋል',
        'stats-systems': 'የአስተዳደር ስርዓቶች',
        'stats-years': 'የልምድ ዓመታት',

        // Skills
        'skills-title': 'ክህሎቶቼ',
        'skills-subtitle': 'የምሰራባቸው ቴክኖሎጂዎች እና መሳሪያዎች',

        // Projects
        'projects-title': 'ፕሮጀክቶቼ',
        'projects-subtitle': 'ከገነባኋቸው ፕሮጀክቶች ውስጥ ጥቂቶቹ። እያንዳንዱ ለእውነተኛ ችግር የተሟላ መፍትሄ ነው።',
        // Weather
         'weather-loading': 'የአየር ሁኔታ እየተጫነ ነው...',
         'weather-unavailable': 'የአየር ሁኔታ አይገኝም',
         'weather-humidity': 'እርጥበት',
         'weather-wind': 'ንፋስ',
        // Services
        'services-title': 'አገልግሎቶቼ',
        'services-subtitle': 'በሙያዬ መስክ የማቀርባቸው አገልግሎቶች ከዚህ በታች ተዘርዝረዋል።',
        'services-quote': 'ዋጋ ለማግኘት',

        // Testimonials
        'testimonials-title': 'ደንበኞች የሚሉት',
        'testimonials-subtitle': 'ከሰራሁባቸው ደንበኞች የተገኙ ምስክርነቶች',

        // Contact
        'contact-title': 'አግኙኝ',
        'contact-subtitle': 'ፕሮጀክት አለህ? አንድ ላይ እንስራ። ከታች ያለውን ቅጽ ሙላ እና በቅርቡ እመልስልሃለሁ።',
        'contact-name': 'ስም',
        'contact-email': 'ኢሜይል',
        'contact-subject': 'ርዕስ',
        'contact-project': 'የፕሮጀክት አይነት',
        'contact-phone': 'ስልክ',
        'contact-message': 'መልእክት',
        'contact-send': 'መልእክት ላክ',
        'contact-info': 'የመገናኛ መረጃ',
        'contact-email-label': 'ኢሜይል',
        'contact-phone-label': 'ስልክ / ዋትስአፕ',
        'contact-location-label': 'አድራሻ',
        'contact-follow': 'ተከታተሉኝ',

        // Footer
        'footer-rights': 'መብቶች በህግ የተጠበቁ ናቸው።',
        'footer-built': 'በ  የተሰራው በሲሳይ አበበየው',

        // Language toggle
        'lang-en': '🇬🇧 EN',
        'lang-am': '🇪🇹 አማ',
    }
};

// ===== LANGUAGE TOGGLE FUNCTIONALITY =====
let currentLang = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);

    // Update all elements with data-key attribute
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update language toggle button text
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        const span = langToggle.querySelector('.lang-text');
        if (span) {
            span.textContent = translations[lang]['lang-am'];
        }
    }

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Toggle language on button click
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'am' : 'en';
        setLanguage(newLang);
    });
}

// Apply saved language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
});
// ===== SKILL PROGRESS BARS ANIMATION =====
const progressBars = document.querySelectorAll('.skill-progress-fill');

const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
};

// Trigger when skills section is visible
const skillsSection = document.querySelector('#skills');
let progressAnimated = false;

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !progressAnimated) {
            progressAnimated = true;
            animateProgressBars();
        }
    });
}, { threshold: 0.2 });

if (skillsSection) {
    progressObserver.observe(skillsSection);
}
// ===== WEATHER WIDGET =====
const API_KEY = 'f10e4b821ff05dd9addce240bb1ad055';
const CITY = 'Addis Ababa';
const COUNTRY = 'ET';

async function fetchWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.log('Weather error:', error);
        document.getElementById('weatherTemp').textContent = '--°C';
        document.getElementById('weatherDesc').textContent = 'Weather unavailable';
    }
}

function updateWeatherUI(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = Math.round(data.wind.speed * 3.6);
    const icon = data.weather[0].icon;

    // Update temperature
    document.getElementById('weatherTemp').textContent = `${temp}°C`;
    
    // Update description
    document.getElementById('weatherDesc').textContent = description;
    
    // Update humidity
    document.getElementById('weatherHumidity').textContent = `${humidity}%`;
    
    // Update wind speed
    document.getElementById('weatherWind').textContent = `${windSpeed} km/h`;
    
    // Update icon
    const iconElement = document.querySelector('.weather-icon i');
    const iconMap = {
        '01d': 'fa-sun',
        '01n': 'fa-moon',
        '02d': 'fa-cloud-sun',
        '02n': 'fa-cloud-moon',
        '03d': 'fa-cloud',
        '03n': 'fa-cloud',
        '04d': 'fa-cloud',
        '04n': 'fa-cloud',
        '09d': 'fa-cloud-rain',
        '09n': 'fa-cloud-rain',
        '10d': 'fa-cloud-showers-heavy',
        '10n': 'fa-cloud-showers-heavy',
        '11d': 'fa-bolt',
        '11n': 'fa-bolt',
        '13d': 'fa-snowflake',
        '13n': 'fa-snowflake',
        '50d': 'fa-smog',
        '50n': 'fa-smog'
    };
    
    const iconClass = iconMap[icon] || 'fa-cloud-sun';
    iconElement.className = `fas ${iconClass}`;
}

// Fetch weather on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchWeather();
});
// ===== SNOW EFFECT =====
let snowActive = localStorage.getItem('snow') === 'true';
const snowContainer = document.getElementById('snowContainer');
const snowToggle = document.getElementById('snowToggle');

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = ['❄', '❅', '❆', '✦'][Math.floor(Math.random() * 4)];
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.fontSize = (Math.random() * 10 + 8) + 'px';
    snowflake.style.animationDuration = (Math.random() * 6 + 4) + 's';
    snowflake.style.animationDelay = (Math.random() * 5) + 's';
    snowflake.style.opacity = Math.random() * 0.6 + 0.3;
    return snowflake;
}

function startSnow() {
    snowActive = true;
    localStorage.setItem('snow', 'true');
    snowToggle.classList.add('active');
    snowContainer.style.display = 'block';
    
    // Clear existing snowflakes
    snowContainer.innerHTML = '';
    
    // Create 50 snowflakes
    for (let i = 0; i < 50; i++) {
        const snowflake = createSnowflake();
        snowContainer.appendChild(snowflake);
    }
}

function stopSnow() {
    snowActive = false;
    localStorage.setItem('snow', 'false');
    snowToggle.classList.remove('active');
    snowContainer.style.display = 'none';
    snowContainer.innerHTML = '';
}

// Toggle snow
if (snowToggle) {
    snowToggle.addEventListener('click', function() {
        if (snowActive) {
            stopSnow();
        } else {
            startSnow();
        }
    });
}

// Apply saved state on load
document.addEventListener('DOMContentLoaded', function() {
    if (snowActive) {
        startSnow();
    } else {
        stopSnow();
    }
});
document.addEventListener('mousemove', function(e) {
    const glow = document.getElementById('mouseGlow');
    if (glow) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    }
});
// Welcome Toast
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = '👋 Welcome to my portfolio am sisay!';
        document.body.appendChild(toast);
        setTimeout(function() {
            toast.classList.add('show');
        }, 500);
        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() { toast.remove(); }, 500);
        }, 5000);
    }, 2000);
});
// ===== STAR RATING SYSTEM =====
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star-rating i');
    const ratingMessage = document.getElementById('ratingMessage');
    const averageSpan = document.getElementById('averageRating');
    const totalVotesSpan = document.getElementById('totalVotes');
    
    let currentRating = 0;
    
    // Load saved rating from localStorage
    const savedRating = localStorage.getItem('userRating');
    const savedAverage = localStorage.getItem('averageRating');
    const savedVotes = localStorage.getItem('totalVotes');
    
    let averageRating = parseFloat(savedAverage) || 0;
    let totalVotes = parseInt(savedVotes) || 0;
    
    // Display saved average
    if (totalVotes > 0) {
        averageSpan.textContent = averageRating.toFixed(1);
        totalVotesSpan.textContent = totalVotes;
    }
    
    // If user already rated
    if (savedRating) {
        currentRating = parseInt(savedRating);
        highlightStars(currentRating);
        ratingMessage.textContent = `⭐ You rated ${currentRating} out of 5 stars! Thank you! ❤️`;
        ratingMessage.style.color = '#64ffda';
    }
    
    // Star hover effect
    stars.forEach(function(star) {
        star.addEventListener('mouseenter', function() {
            const value = parseInt(this.getAttribute('data-value'));
            highlightStars(value, true);
            ratingMessage.textContent = `${value} out of 5 stars`;
        });
        
        star.addEventListener('mouseleave', function() {
            if (currentRating > 0) {
                highlightStars(currentRating, false);
                ratingMessage.textContent =`⭐ You rated ${currentRating} out of 5 stars!`;
            } else {
                highlightStars(0, false);
                ratingMessage.textContent = '⭐ Click a star to rate!';
            }
        });
        
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            currentRating = value;
            
            // Save user rating
            localStorage.setItem('userRating', value);
            
            // Update average
            totalVotes++;
            averageRating = ((averageRating * (totalVotes - 1)) + value) / totalVotes;
            
            localStorage.setItem('averageRating', averageRating);
            localStorage.setItem('totalVotes', totalVotes);
            
            // Update display
            highlightStars(value);
            averageSpan.textContent = averageRating.toFixed(1);
            totalVotesSpan.textContent = totalVotes;
            
            ratingMessage.textContent = `⭐ You rated ${value} out of 5 stars! Thank you! ❤️`;
            ratingMessage.style.color = '#64ffda';
            
            // Add confetti effect
            createConfetti();
        });
    });
    
    function highlightStars(count, isHover = false) {
        stars.forEach(function(star, index) {
            const value = parseInt(star.getAttribute('data-value'));
            if (value <= count) {
                star.classList.add('active');
                if (isHover) {
                    star.classList.add('hover');
                }
            } else {
                star.classList.remove('active');
                star.classList.remove('hover');
            }
        });
    }
    
    // ===== CONFETTI EFFECT =====
    function createConfetti() {
        const colors = ['#64ffda', '#f4a261', '#ff6b6b', '#4a6cf7', '#f8f9fa'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -10px;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                z-index: 9999;
                pointer-events: none;
                animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
                animation-delay: ${Math.random() * 0.5}s;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(function() {
                confetti.remove();
            }, 4000);
        }
    }
    
    // Add confetti keyframe if not exists
    if (!document.getElementById('confettiStyle')) {
        const style = document.createElement('style');
        style.id = 'confettiStyle';
        style.textContent = `
            @keyframes confettiFall {
                0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
                100% { transform: translateY(110vh) rotate(720deg) scale(0.2); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('✅ Star rating system initialized!');
});
// ============================================================
// ===== MOUSE GLOW EFFECT =====
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const glow = document.getElementById('mouseGlow');
    
    if (!glow) {
        console.log('❌ Mouse glow element not found');
        return;
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth animation
    function animateGlow() {
        // Smooth follow with easing
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';
        
        requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
    
    // ===== CHANGE GLOW COLOR ON DIFFERENT SECTIONS =====
    const sections = document.querySelectorAll('section, .hero');
    
    sections.forEach(function(section) {
        section.addEventListener('mouseenter', function() {
            const id = this.id || this.className;
            
            // Remove all glow classes
            glow.classList.remove('about-glow', 'projects-glow', 'services-glow');
            
            // Add specific glow based on section
            if (id === 'about' || id.includes('about')) {
                glow.classList.add('about-glow');
            } else if (id === 'projects' || id.includes('project')) {
                glow.classList.add('projects-glow');
            } else if (id === 'services' || id.includes('service')) {
                glow.classList.add('services-glow');
            } else {
                // Default glow (already set in CSS)
            }
        });
    });
    
    // Reset glow on hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', function() {
            glow.classList.remove('about-glow', 'projects-glow', 'services-glow');
        });
    }
    
    console.log('✅ Mouse glow effect initialized!');
});
console.log('🚀 Portfolio loaded successfully!');
console.log('👋 Built by siay dve');