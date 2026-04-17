import re

html_content = open('C:/Users/Admin/.gemini/antigravity/scratch/portafolio-elias/index.html', 'r', encoding='utf-8').read()

replacements = [
    ('<button class="btn-lang">ES / EN</button>', '<button class="btn-lang" id="btnLang" data-i18n="navLang">ES / EN</button>'),
    ('<p class="small-label">CIBERSEGURIDAD · SOPORTE IT · SISTEMAS</p>', '<p class="small-label" data-i18n="heroPill">CIBERSEGURIDAD · SOPORTE IT · SISTEMAS</p>'),
    ('<p class="description">Técnico Analista en Sistemas con foco en ciberseguridad, soporte técnico y soluciones digitales reales.</p>', '<p class="description" data-i18n="heroDesc">Técnico Analista en Sistemas con foco en ciberseguridad, soporte técnico y soluciones digitales reales.</p>'),
    ('<h2 class="section-title">TODAS TUS<br><span class="serif-italic">necesidades</span></h2>', '<h2 class="section-title" data-i18n="servTitle1">TODAS TUS<br><span class="serif-italic">necesidades</span></h2>'),
    ('<p>Seguridad, soporte y desarrollo en un solo lugar. Soluciones reales para entornos corporativos y independientes.</p>', '<p data-i18n="servDesc">Seguridad, soporte y desarrollo en un solo lugar. Soluciones reales para entornos corporativos y independientes.</p>'),
    ('<button class="btn-outline" id="btn-ver-mas">VER MÁS</button>', '<button class="btn-outline" id="btn-ver-mas" data-i18n="btnVerMas">VER MÁS</button>'),
    ('<button class="btn-outline" id="btn-ir-atras" style="display:none;">IR ATRÁS</button>', '<button class="btn-outline" id="btn-ir-atras" style="display:none;" data-i18n="btnIrAtras">IR ATRÁS</button>'),
    ('<span class="label-tag">PERFIL</span>', '<span class="label-tag" data-i18n="aboutLabel">PERFIL</span>'),
    ('<h2 class="about-title">Hola, soy <span class="serif-italic">Elias</span> <i class="ph-fill ph-hand-waving" style="color: #FFB300;"></i></h2>', '<h2 class="about-title" data-i18n="aboutTitle">Hola, soy <span class="serif-italic">Elias</span> <i class="ph-fill ph-hand-waving" style="color: #FFB300;"></i></h2>'),
    ('<p class="about-text">Técnico Analista en Sistemas Informáticos con experiencia en <strong>soporte técnico, implementación de sistemas y administración de usuarios</strong>. Mi trayectoria combina atención a clientes, gestión de accesos y documentación, siempre con foco en seguridad y continuidad operativa.</p>', '<p class="about-text" data-i18n="aboutP1">Técnico Analista en Sistemas Informáticos con experiencia en <strong>soporte técnico, implementación de sistemas y administración de usuarios</strong>. Mi trayectoria combina atención a clientes, gestión de accesos y documentación, siempre con foco en seguridad y continuidad operativa.</p>'),
    ('<p class="about-text">Actualmente profundizando en <strong>ciberseguridad, forense digital y Soporte IT y Redes</strong>, con el objetivo de aportar soluciones completas en entornos empresariales.</p>', '<p class="about-text" data-i18n="aboutP2">Actualmente profundizando en <strong>ciberseguridad, forense digital y Soporte IT y Redes</strong>, con el objetivo de aportar soluciones completas en entornos empresariales.</p>'),
    ('<span class="chip"><i class="ph ph-map-pin"></i>Oliva, Córdoba</span>', '<span class="chip" data-i18n="chip1"><i class="ph ph-map-pin"></i>Oliva, Córdoba</span>'),
    ('<span class="chip"><i class="ph ph-check-circle"></i>Disponible remoto</span>', '<span class="chip" data-i18n="chip2"><i class="ph ph-check-circle"></i>Disponible remoto</span>'),
    ('<span class="chip"><i class="ph ph-rocket-launch"></i>Open to work</span>', '<span class="chip" data-i18n="chip3"><i class="ph ph-rocket-launch"></i>Open to work</span>'),
    ('DESCARGAR CV ↓</a>', '<span data-i18n="btnDownload">DESCARGAR CV ↓</span></a>'), 
    ('<h2 class="section-title-dark">EXPERIENCIA</h2>', '<h2 class="section-title-dark" data-i18n="expTitle">EXPERIENCIA</h2>'),
    ('<span class="timeline-date">2023 – Actualidad</span>', '<span class="timeline-date" data-i18n="expActualidad">2023 – Actualidad</span>'),
    ('<li>Soporte de primer nivel presencial y remoto (AnyDesk)</li>', '<li data-i18n="exp1Li1">Soporte de primer nivel presencial y remoto (AnyDesk)</li>'),
    ('<li>Análisis de registros e identificación de patrones de falla</li>', '<li data-i18n="exp1Li2">Análisis de registros e identificación de patrones de falla</li>'),
    ('<li>ABM de usuarios en Microsoft 365 y Google Workspace</li>', '<li data-i18n="exp1Li3">ABM de usuarios en Microsoft 365 y Google Workspace</li>'),
    ('<li>Scripts en PowerShell y Bash para auditorías y reportes</li>', '<li data-i18n="exp1Li4">Scripts en PowerShell y Bash para auditorías y reportes</li>'),
    ('<li>Ticketing en Jira y GitHub</li>', '<li data-i18n="exp1Li5">Ticketing en Jira y GitHub</li>'),
    ('<li>Gestión de hosting, dominios y correo corporativo</li>', '<li data-i18n="exp1Li6">Gestión de hosting, dominios y correo corporativo</li>'),
    ('<li>Detección y prevención de ataques de phishing</li>', '<li data-i18n="exp1Li7">Detección y prevención de ataques de phishing</li>'),
    ('<li>Integración de APIs REST y herramientas de IA</li>', '<li data-i18n="exp2Li1">Integración de APIs REST y herramientas de IA</li>'),
    ('<li>Fortalecimiento de seguridad en servidores y entornos web</li>', '<li data-i18n="exp2Li2">Fortalecimiento de seguridad en servidores y entornos web</li>'),
    ('<li>Programación con C# .NET y SQL Server</li>', '<li data-i18n="exp2Li3">Programación con C# .NET y SQL Server</li>'),
    ('<li>Documentación de integraciones para continuidad operativa</li>', '<li data-i18n="exp2Li4">Documentación de integraciones para continuidad operativa</li>'),
    ('<h2 class="section-title">TOP<br><span class="serif-italic">content</span></h2>', '<h2 class="section-title" data-i18n="topTitle">TOP<br><span class="serif-italic">content</span></h2>'),
    ('<h2 class="section-title-dark">SKILLS &<br><span class="serif-italic">tools</span></h2>', '<h2 class="section-title-dark" data-i18n="skillsTitle">SKILLS &<br><span class="serif-italic">tools</span></h2>'),
    ('<h2 class="section-title">CERTIFICACIONES</h2>', '<h2 class="section-title" data-i18n="certTitle">CERTIFICACIONES</h2>'),
    ('<span class="btn-cert">Ver certificado →</span>', '<span class="btn-cert" data-i18n="certBtn">Ver certificado →</span>'),
    ('<h2 class="section-title-dark">PROYECTOS</h2>', '<h2 class="section-title-dark" data-i18n="projTitle">PROYECTOS</h2>'),
    ('<h3 class="project-title">Automatización de Auditorías</h3>', '<h3 class="project-title" data-i18n="proj1Title">Automatización de Auditorías</h3>'),
    ('<p class="project-desc">Herramientas internas para exportación masiva de datos y control de drivers en estaciones de trabajo.</p>', '<p class="project-desc" data-i18n="proj1Desc">Herramientas internas para exportación masiva de datos y control de drivers en estaciones de trabajo.</p>'),
    ('<h3 class="project-title">Despliegue de Aplicaciones</h3>', '<h3 class="project-title" data-i18n="proj2Title">Despliegue de Aplicaciones</h3>'),
    ('<p class="project-desc">Landing pages con integración de bases de datos, aplicando buenas prácticas de seguridad desde el código.</p>', '<p class="project-desc" data-i18n="proj2Desc">Landing pages con integración de bases de datos, aplicando buenas prácticas de seguridad desde el código.</p>'),
    ('<h3 class="project-title">Entornos de Pruebas Forenses</h3>', '<h3 class="project-title" data-i18n="proj3Title">Entornos de Pruebas Forenses</h3>'),
    ('<p class="project-desc">Laboratorios virtuales para análisis de malware y recuperación de datos en entornos controlados.</p>', '<p class="project-desc" data-i18n="proj3Desc">Laboratorios virtuales para análisis de malware y recuperación de datos en entornos controlados.</p>'),
    ('<h2 class="section-title">HABLE<br><span class="serif-italic">mos</span></h2>', '<h2 class="section-title" data-i18n="contactTitle">HABLE<br><span class="serif-italic">mos</span></h2>'),
    ('<p class="contact-sub">¿Necesitás soporte, consultoría en seguridad o un desarrollador confiable? Escribime a través de cualquiera de mis canales.</p>', '<p class="contact-sub" data-i18n="contactSub">¿Necesitás soporte, consultoría en seguridad o un desarrollador confiable? Escribime a través de cualquiera de mis canales.</p>'),
    ('<p>© 2026 Elias Castro · Oliva, Córdoba, Argentina</p>', '<p data-i18n="footer">© 2026 Elias Castro · Oliva, Córdoba, Argentina</p>')
]

for src, dst in replacements:
    html_content = html_content.replace(src, dst)
    
html_content = html_content.replace('<div class="hero-text-top">', '<div class="hero-text-top" data-i18n="heroTop">')
html_content = html_content.replace('<div class="background-text" id="backgroundText">', '<div class="background-text" id="backgroundText" data-i18n="heroBg">')

open('C:/Users/Admin/.gemini/antigravity/scratch/portafolio-elias/index.html', 'w', encoding='utf-8').write(html_content)
