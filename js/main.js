 // ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
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
// ============================================
// ===== 3D ROTATING GLOBE =====
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('globeContainer');
    
    // Check if container exists
    if (!container) {
        console.log('❌ Globe container not found!');
        return;
    }
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.log('❌ Three.js not loaded!');
        container.innerHTML = '<p style="color: #64ffda; text-align: center; font-size: 14px;">3D Globe loading...</p>';
        return;
    }
    
    console.log('✅ Three.js loaded, building globe...');
    
    // Create Scene
    const scene = new THREE.Scene();
    
    // Create Camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 3;
    
    // Create Renderer
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    
    // Get container size
    const size = container.clientWidth || 280;
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // --- Create Globe ---
    const geometry = new THREE.SphereGeometry(1.2, 48, 48);
    const material = new THREE.MeshStandardMaterial({
        color: 0x64ffda,
        wireframe: true,
        metalness: 0.6,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    
    // --- Inner Glow ---
    const innerGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
        color: 0x64ffda,
        transparent: true,
        opacity: 0.12,
        emissive: 0x64ffda,
        emissiveIntensity: 0.3
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerSphere);
    
    // --- Particles ---
    const particlesGeo = new THREE.BufferGeometry();
    const count = 400;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        const r = 1.8 + Math.random() * 0.4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
        color: 0x64ffda,
        size: 0.025,
        transparent: true,
        opacity: 0.5
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);
    
    // --- Lights ---
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(5, 5, 5);
    scene.add(light1);
    
    const light2 = new THREE.DirectionalLight(0x64ffda, 0.3);
    light2.position.set(-3, -2, -3);
    scene.add(light2);
    
    const ambient = new THREE.AmbientLight(0x404060);
    scene.add(ambient);
    
    // --- Animation ---
    function animateGlobe() {
        requestAnimationFrame(animateGlobe);
        globe.rotation.x += 0.003;
        globe.rotation.y += 0.006;
        innerSphere.rotation.x += 0.003;
        innerSphere.rotation.y += 0.006;
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animateGlobe();
    
    console.log('✅ Globe animation started!');
    
    // --- Responsive ---
    function resizeGlobe() {
        const newSize = container.clientWidth || 280;
        renderer.setSize(newSize, newSize);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
    }
    
    window.addEventListener('resize', resizeGlobe);
});
console.log('🚀 Portfolio loaded successfully!');
console.log('👋 Built by siay dve');