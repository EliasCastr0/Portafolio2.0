document.addEventListener('DOMContentLoaded', () => {
    // ---- DOM Elements ----
    const heroImage = document.getElementById('heroImage');
    const backgroundText = document.getElementById('backgroundText');
    const modeToggle = document.getElementById('modeToggle');
    const btnVerMas = document.getElementById('btn-ver-mas');
    const btnIrAtras = document.getElementById('btn-ir-atras');
    const tagsContainer = document.getElementById('tagsContainer');
    const body = document.body;
    const reveals = document.querySelectorAll('.reveal');

    // ---- Hero Parallax Effect ----
    window.addEventListener('mousemove', (e) => {
        // Only run parallax on desktop
        if (window.innerWidth < 768) return;

        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        // Subtle movements
        if (heroImage) {
            heroImage.style.transform = `translate(${mouseX * 15}px, ${mouseY * 10}px) scale(1.02)`;
        }
        if (backgroundText) {
            backgroundText.style.transform = `translate(${mouseX * -20}px, ${mouseY * -10}px)`;
        }
    });

    // Reset transform on mouse leave to prevent getting stuck
    document.addEventListener('mouseleave', () => {
        if (heroImage) heroImage.style.transform = 'translate(0, 0) scale(1)';
        if (backgroundText) backgroundText.style.transform = 'translate(0, 0)';
    });

    // ---- Dark Mode Toggle ----
    // Check saved preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        modeToggle.textContent = 'MODO CLARO';
    } else {
        modeToggle.textContent = 'MODO OSCURO';
    }

    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            modeToggle.textContent = 'MODO CLARO';
            localStorage.setItem('theme', 'dark');
        } else {
            modeToggle.textContent = 'MODO OSCURO';
            localStorage.setItem('theme', 'light');
        }
    });

    // ---- "Ver Más" Services Toggle ----
    if (btnVerMas && btnIrAtras && tagsContainer) {
        const primaryTagsHTML = tagsContainer.innerHTML;
        const secondaryTagsHTML = `
            <div class="tag"><i class="ph ph-code"></i>C# .NET</div>
            <div class="tag"><i class="ph ph-database"></i>SQL Server</div>
            <div class="tag"><i class="ph ph-plugs"></i>APIs REST</div>
            <div class="tag"><i class="ph ph-monitor"></i>Admin de VMs y Conexión Remota</div>
        `;

        btnVerMas.addEventListener('click', () => {
            // Fade out current tags
            tagsContainer.style.opacity = '0';
            
            setTimeout(() => {
                tagsContainer.innerHTML = secondaryTagsHTML;
                tagsContainer.style.opacity = '1';
                btnVerMas.style.display = 'none';
                btnIrAtras.style.display = 'inline-block';
            }, 300);
        });

        btnIrAtras.addEventListener('click', () => {
            tagsContainer.style.opacity = '0';
            
            setTimeout(() => {
                tagsContainer.innerHTML = primaryTagsHTML;
                tagsContainer.style.opacity = '1';
                btnIrAtras.style.display = 'none';
                btnVerMas.style.display = 'inline-block';
            }, 300);
        });
        
        // Add a simple transition style to the container
        tagsContainer.style.transition = 'opacity 0.3s ease';
    }

    // ---- Scroll Reveal Animation ----
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Trigger point

        reveals.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Run on scroll and load
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check immediately on load
});

// TRANSLATION LOGIC
const translations = {
    es: {
        navLang: "ES / EN",
        navModeDark: "MODO OSCURO",
        navModeLight: "MODO CLARO",
        heroTop: "<span>I'm</span><span class='serif-italic'>Elias Castro</span>",
        heroBg: "<span>CIBER</span><span>SEGURIDAD</span>",
        heroPill: "CIBERSEGURIDAD  SOPORTE IT  SISTEMAS",
        heroDesc: "Técnico Analista en Sistemas con foco en ciberseguridad, soporte técnico y soluciones digitales reales.",
        servTitle1: "TODAS TUS<br><span class='serif-italic'>necesidades</span>",
        servDesc: "Seguridad, soporte y desarrollo en un solo lugar. Soluciones reales para entornos corporativos y independientes.",
        btnVerMas: "VER MÁS",
        btnIrAtras: "IR ATRÁS",
        aboutLabel: "PERFIL",
        aboutTitle: "Hola, soy <span class='serif-italic'>Elias</span> <i class='ph-fill ph-hand-waving' style='color: #FFB300;'></i>",
        aboutP1: "Técnico Analista en Sistemas Informáticos con experiencia en <strong>soporte técnico, implementación de sistemas y administración de usuarios</strong>. Mi trayectoria combina atención a clientes, gestión de accesos y documentación, siempre con foco en seguridad y continuidad operativa.",
        aboutP2: "Actualmente profundizando en <strong>ciberseguridad, forense digital y Soporte IT y Redes</strong>, con el objetivo de aportar soluciones completas en entornos empresariales.",
        chip1: "<i class='ph ph-map-pin'></i>Oliva, Córdoba",
        chip2: "<i class='ph ph-check-circle'></i>Disponible remoto",
        chip3: "<i class='ph ph-rocket-launch'></i>Open to work",
        btnDownload: "DESCARGAR CV ↓",
        expTitle: "EXPERIENCIA",
        expActualidad: "2023  Actualidad",
        exp1Li1: "Soporte de primer nivel presencial y remoto (AnyDesk)",
        exp1Li2: "Análisis de registros e identificación de patrones de falla",
        exp1Li3: "ABM de usuarios en Microsoft 365 y Google Workspace",
        exp1Li4: "Scripts en PowerShell y Bash para auditorías y reportes",
        exp1Li5: "Ticketing en Jira y GitHub",
        exp1Li6: "Gestión de hosting, dominios y correo corporativo",
        exp1Li7: "Detección y prevención de ataques de phishing",
        exp2Li1: "Integración de APIs REST y herramientas de IA",
        exp2Li2: "Fortalecimiento de seguridad en servidores y entornos web",
        exp2Li3: "Programación con C# .NET y SQL Server",
        exp2Li4: "Documentación de integraciones para continuidad operativa",
        topTitle: "TOP<br><span class='serif-italic'>content</span>",
        skillsTitle: "SKILLS &<br><span class='serif-italic'>tools</span>",
        certTitle: "CERTIFICACIONES",
        certBtn: "Ver certificado →",
        projTitle: "PROYECTOS",
        proj1Title: "Automatización de Auditorías",
        proj1Desc: "Herramientas internas para exportación masiva de datos y control de drivers en estaciones de trabajo.",
        proj2Title: "Despliegue de Aplicaciones",
        proj2Desc: "Landing pages con integración de bases de datos, aplicando buenas prácticas de seguridad desde el código.",
        proj3Title: "Entornos de Pruebas Forenses",
        proj3Desc: "Laboratorios virtuales para análisis de malware y recuperación de datos en entornos controlados.",
        contactTitle: "HABLE<br><span class='serif-italic'>mos</span>",
        contactSub: "¿Necesitás soporte, consultoría en seguridad o un desarrollador confiable? Escribime a través de cualquiera de mis canales.",
        footer: "© 2026 Elias Castro · Oliva, Córdoba, Argentina"
    },
    en: {
        navLang: "EN / ES",
        navModeDark: "DARK MODE",
        navModeLight: "LIGHT MODE",
        heroTop: "<span>I'm</span><span class='serif-italic'>Elias Castro</span>",
        heroBg: "<span>CYBER</span><span>SECURITY</span>",
        heroPill: "CYBERSECURITY  IT SUPPORT  SYSTEMS",
        heroDesc: "Systems Analyst Technician focused on cybersecurity, technical support, and real digital solutions.",
        servTitle1: "ALL YOUR<br><span class='serif-italic'>needs</span>",
        servDesc: "Security, support, and development in one place. Real solutions for corporate and independent environments.",
        btnVerMas: "SEE MORE",
        btnIrAtras: "GO BACK",
        aboutLabel: "PROFILE",
        aboutTitle: "Hi, I'm <span class='serif-italic'>Elias</span> <i class='ph-fill ph-hand-waving' style='color: #FFB300;'></i>",
        aboutP1: "Systems Analyst Technician with experience in <strong>technical support, system implementation, and user administration</strong>. My background combines customer service, access management, and documentation, always focused on security and operational continuity.",
        aboutP2: "Currently deepening in <strong>cybersecurity, digital forensics, IT Support, and Networks</strong>, with the goal of providing complete solutions in corporate environments.",
        chip1: "<i class='ph ph-map-pin'></i>Oliva, Córdoba (AR)",
        chip2: "<i class='ph ph-check-circle'></i>Remote available",
        chip3: "<i class='ph ph-rocket-launch'></i>Open to work",
        btnDownload: "DOWNLOAD CV ↓",
        expTitle: "EXPERIENCE",
        expActualidad: "2023  Present",
        exp1Li1: "Level 1 presencial and remote support (AnyDesk)",
        exp1Li2: "Log analysis and failure pattern identification",
        exp1Li3: "User ABM in Microsoft 365 and Google Workspace",
        exp1Li4: "Scripts in PowerShell and Bash for audits and reports",
        exp1Li5: "Ticketing in Jira and GitHub",
        exp1Li6: "Hosting, domain, and corporate email management",
        exp1Li7: "Detection and prevention of phishing attacks",
        exp2Li1: "Integration of REST APIs and AI tools",
        exp2Li2: "Security hardening in servers and web environments",
        exp2Li3: "Programming with C# .NET and SQL Server",
        exp2Li4: "Integration documentation for operational continuity",
        topTitle: "TOP<br><span class='serif-italic'>content</span>",
        skillsTitle: "SKILLS &<br><span class='serif-italic'>tools</span>",
        certTitle: "CERTIFICATIONS",
        certBtn: "View Certificate →",
        projTitle: "PROJECTS",
        proj1Title: "Audit Automation",
        proj1Desc: "Internal tools for massive data export and driver control in workstations.",
        proj2Title: "Application Deployment",
        proj2Desc: "Landing pages with database integration, applying security best practices from code.",
        proj3Title: "Forensic Testing Environments",
        proj3Desc: "Virtual labs for malware analysis and data recovery in controlled environments.",
        contactTitle: "LET'S<br><span class='serif-italic'>talk</span>",
        contactSub: "Need support, security consulting, or a reliable developer? Write me through any of my channels.",
        footer: "© 2026 Elias Castro · Oliva, Córdoba, Argentina"
    }
};

let currentLang = localStorage.getItem('lang') || 'es';

function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Handle mode toggle button text specifically due to mode state
    const modeBtn = document.getElementById('modeToggle');
    if (document.body.classList.contains('dark-mode')) {
        modeBtn.textContent = translations[lang]['navModeLight'];
    } else {
        modeBtn.textContent = translations[lang]['navModeDark'];
    }
}

// Initial setup
updateLanguage(currentLang);

// Language Switch Event Listener
document.addEventListener('DOMContentLoaded', () => {
    // btnLang should be mapped now (or we can fallback to querySelector)
    const btnLang = document.querySelector('.btn-lang');
    if(btnLang) {
        btnLang.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            localStorage.setItem('lang', currentLang);
            updateLanguage(currentLang);
        });
    }

    // Override mode toggle listener to use translations for button text
    const modeToggleOverridden = document.getElementById('modeToggle');
    if(modeToggleOverridden) {
        // Re-add listener logic that respects language
        modeToggleOverridden.addEventListener('click', () => {
            if (document.body.classList.contains('dark-mode')) {
                modeToggleOverridden.textContent = translations[currentLang]['navModeLight'];
            } else {
                modeToggleOverridden.textContent = translations[currentLang]['navModeDark'];
            }
        });
    }
});
