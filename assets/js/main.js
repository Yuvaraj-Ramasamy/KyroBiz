/**
 * KyroBiz Ultra-Premium Main JavaScript
 * Lenis Smooth Scroll, GSAP Cinematic Reveals, & Advanced Motion
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Core Modules
    initSystemBoot();
    initLenis();
    initHeroReveal();
    initNavbarScroll();
    initCinematicInteractions();
    initGSAPSequences();
    initMobileMenu();
    initSmoothScroll();
    initCelestialWorkflow();
    initHUDReadouts();
    initNeuralCursor();
    initHUDCrosshairs();
    init3DTilt();
    initMagneticButtons();
    initParallaxBackground();
    initKyroCoreKinetic();
    initHyperKineticCards();
    initScrollReveals();
    initScrollInteractions();
});

/**
 * Cinematic System Boot Sequence
 */
function initSystemBoot() {
    const bootOverlay = document.querySelector('#system-boot');
    const progressBar = document.querySelector('#boot-progress');

    if (!bootOverlay) return;

    const tl = gsap.timeline({
        onComplete: () => {
            bootOverlay.style.display = 'none';
        }
    });

    tl.to(progressBar, {
        width: "100%",
        duration: 2.5,
        ease: "power4.inOut"
    })
        .to(bootOverlay, {
            opacity: 0,
            y: -100,
            duration: 1,
            ease: "power4.inOut"
        }, "+=0.2");
}

/**
 * Reactive Background Parallax
 */
function initParallaxBackground() {
    let ticking = false;
    window.addEventListener('mousemove', e => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const x = (e.clientX - window.innerWidth / 2) / 50;
                const y = (e.clientY - window.innerHeight / 2) / 50;

                gsap.to('.bg-grid, .bg-hex', {
                    x: x,
                    y: y,
                    duration: 1,
                    ease: "power2.out"
                });

                gsap.to('.perspective-wrapper', {
                    x: x * 2,
                    y: y * 2,
                    duration: 1.5,
                    ease: "power2.out"
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Neural Cyber-Cursor (GSAP Follow Physics)
 */
function initNeuralCursor() {
    const cursor = document.querySelector('#cyber-cursor');
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');

    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    let ticking = false;
    window.addEventListener('mousemove', e => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                gsap.to(cursor, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.5,
                    ease: "power2.out"
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    const targets = document.querySelectorAll('a, button, .feature-card, .cinematic-social');
    targets.forEach(target => {
        target.addEventListener('mouseenter', () => cursor.classList.add('grow'));
        target.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
    });
}

/**
 * HUD Crosshair Mouse Tracking (Lerp)
 */
function initHUDCrosshairs() {
    const vLine = document.querySelector('#hud-crosshair-v');
    const hLine = document.querySelector('#hud-crosshair-h');

    if (!vLine || !hLine) return;

    let ticking = false;
    window.addEventListener('mousemove', e => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                gsap.to(vLine, { x: e.clientX, duration: 1.5, ease: "slow(0.7, 0.7, false)" });
                gsap.to(hLine, { y: e.clientY, duration: 1.5, ease: "slow(0.7, 0.7, false)" });
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * 3D Parallax Tilt for Cards
 */
function init3DTilt() {
    const cards = document.querySelectorAll('.feature-card');

    cards.forEach(card => {
        let ticking = false;
        card.addEventListener('mousemove', e => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;

                    gsap.to(card, {
                        rotateX: rotateX,
                        rotateY: rotateY,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5 });
        });
    });
}

/**
 * Magnetic Attraction for Buttons & Socials
 */
function initMagneticButtons() {
    const magnets = document.querySelectorAll('.cinematic-social, .btn-magnetic');

    magnets.forEach(m => {
        let ticking = false;
        m.addEventListener('mousemove', e => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = m.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    gsap.to(m, {
                        x: x * 0.3,
                        y: y * 0.3,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });

        m.addEventListener('mouseleave', () => {
            gsap.to(m, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
        });
    });
}

/**
 * HUD Readout Fluid Randomization
 */
function initHUDReadouts() {
    const readouts = document.querySelectorAll('.readout-text');

    function updateReadouts() {
        readouts.forEach(el => {
            if (el.textContent.includes('CORE_COORD')) {
                const lat = (40.7128 + (Math.random() - 0.5) * 0.01).toFixed(4);
                el.textContent = `CORE_COORD: ${lat}° N`;
            } else if (el.textContent.includes('VECTOR_X')) {
                const vec = (Math.random() * 1000).toFixed(3);
                el.textContent = `VECTOR_X: ${vec}`;
            } else if (el.textContent.includes('AXIS_Y')) {
                const ay = (700 + Math.random() * 100).toFixed(2);
                el.textContent = `AXIS_Y: ${ay}`;
            }
        });
        setTimeout(updateReadouts, 2000 + Math.random() * 3000);
    }

    updateReadouts();
}

/**
 * High-End Celestial Workflow Animation (Three.js Starfield)
 */
function initCelestialWorkflow() {
    const canvas = document.getElementById('workflow-celestial-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    camera.position.z = 400;

    // 1. Quantum Starfield - Refined for Spherical Concentration
    const starCount = 4000; // Increased density
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
        // Concentrated Spherical Distribution
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.acos((Math.random() * 2) - 1);
        const radius = Math.pow(Math.random(), 0.5) * 350; // Concentrated towards center

        starPositions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
        starPositions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
        starPositions[i * 3 + 2] = radius * Math.cos(theta);

        starSizes[i] = Math.random() * 3;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMat = new THREE.PointsMaterial({
        color: 0x3a7ebf,
        size: 1.5,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const starfield = new THREE.Points(starGeo, starMat);
    scene.add(starfield);

    // 2. Nebula Pulsars
    const nebulaGeos = [];
    for (let i = 0; i < 4; i++) {
        const geo = new THREE.SphereGeometry(Math.random() * 40 + 20, 32, 32);
        const mat = new THREE.MeshBasicMaterial({
            color: 0x3a7ebf,
            transparent: true,
            opacity: 0.05,
            blending: THREE.AdditiveBlending
        });
        const nebula = new THREE.Mesh(geo, mat);
        nebula.position.set(
            (Math.random() - 0.5) * 400,
            (Math.random() - 0.5) * 400,
            (Math.random() - 0.5) * 200
        );
        scene.add(nebula);
        nebulaGeos.push({ mesh: nebula, pulse: Math.random() * Math.PI * 2 });
    }

    // Interactive Mouse Influence
    let mouseX = 0, mouseY = 0;
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    function animate(time) {
        requestAnimationFrame(animate);

        // Galactic Drift
        starfield.rotation.y += 0.002;
        starfield.rotation.x += 0.001;

        // Mouse Response (Targeted Drift)
        starfield.position.x += (mouseX * 50 - starfield.position.x) * 0.05;
        starfield.position.y += (mouseY * 50 - starfield.position.y) * 0.05;

        // Nebula Pulsing
        nebulaGeos.forEach(n => {
            n.pulse += 0.01;
            n.mesh.scale.setScalar(1 + Math.sin(n.pulse) * 0.1);
        });

        renderer.render(scene, camera);
    }

    function resize() {
        const width = canvas.parentElement.offsetWidth;
        const height = canvas.parentElement.offsetHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', resize);
    resize();
    animate();
}

/**
 * Lenis Ultra-Smooth Scrolling (Liquid Momentum)
 */
function initLenis() {
    window.lenis = new Lenis({
        duration: 1.5,
        lerp: 0.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1,
        smoothTouch: false,
        touchMultiplier: 1.5,
        infinite: false,
    });

    function raf(time) {
        window.lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger
    window.lenis.on('scroll', ScrollTrigger.update);
}

/**
 * Custom GSAP Hero Reveal (Blur & Fade Transition)
 */
function initHeroReveal() {
    const heroContent = document.querySelector('#hero-content');
    const typedTarget = document.getElementById('typed-text');
    if (!heroContent || !typedTarget) return;

    const valueLines = [
        'Autonomous Synthesis System.',
        'Neural Process Automation.',
        'Sovereign Data Intelligence.',
        'High-Trust Enterprise Code.',
        'Engineering Excellence.'
    ];

    let currentLine = 0;

    function cycleValueText() {
        if (!typedTarget) return;

        const tl = gsap.timeline({
            onComplete: () => {
                currentLine = (currentLine + 1) % valueLines.length;
                gsap.delayedCall(2.5, cycleValueText);
            }
        });

        tl.to(typedTarget, {
            opacity: 0,
            y: 8,
            filter: 'blur(12px)',
            duration: 1.0,
            ease: 'power3.inOut'
        })
            .set(typedTarget, {
                text: valueLines[currentLine],
                y: -8,
                filter: 'blur(12px)'
            })
            .to(typedTarget, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1.5,
                ease: 'expo.out'
            });
    }

    // Initial Hero Entrance
    gsap.set('#hero-content', { opacity: 0, y: 30, filter: 'blur(15px)' });

    gsap.to('#hero-content', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 3.5, // Even slower reveal
        delay: 1.0,
        ease: 'power3.out',
        onComplete: cycleValueText
    });
}

/**
 * Liquid Navbar & Scroll Progress
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('nav-progress-bar');
    if (!navbar) return;

    let isScrolled = false;

    window.lenis.on('scroll', ({ scroll, limit, velocity }) => {
        // Debounced Navbar State Switch
        if (scroll > 50 && !isScrolled) {
            isScrolled = true;
            gsap.to(navbar, {
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                backgroundColor: 'rgba(3, 3, 5, 0.85)',
                backdropFilter: 'blur(20px)',
                borderBottomColor: 'rgba(255, 255, 255, 0.1)',
                duration: 0.4,
                ease: "power2.out",
                overwrite: true
            });
        } else if (scroll <= 50 && isScrolled) {
            isScrolled = false;
            gsap.to(navbar, {
                paddingTop: '1.25rem',
                paddingBottom: '1.25rem',
                backgroundColor: 'rgba(3, 3, 5, 0.7)',
                backdropFilter: 'blur(10px)',
                borderBottomColor: 'rgba(255, 255, 255, 0.05)',
                duration: 0.4,
                ease: "power2.out",
                overwrite: true
            });
        }

        // Scroll Progress Line (Slightly throttled)
        if (progressBar) {
            const progress = (scroll / limit) * 100;
            gsap.to(progressBar, { width: `${progress}%`, duration: 0.2, ease: "none" });
        }
    });
}

/**
 * Cinematic Social Icon Interactions
 */
function initCinematicInteractions() {
    const icons = document.querySelectorAll('.cinematic-social');

    icons.forEach(icon => {
        let ticking = false;
        icon.addEventListener('mousemove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = icon.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    gsap.to(icon, {
                        x: x * 0.4,
                        y: y * 0.4,
                        rotationX: -y * 0.1,
                        rotationY: x * 0.1,
                        duration: 0.6,
                        ease: 'expo.out'
                    });

                    const img = icon.querySelector('img');
                    if (img) {
                        gsap.to(img, {
                            x: x * 0.15,
                            y: y * 0.15,
                            duration: 0.6,
                            ease: 'expo.out'
                        });
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });

        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                x: 0,
                y: 0,
                rotationX: 0,
                rotationY: 0,
                duration: 1,
                ease: 'elastic.out(1, 0.5)'
            });

            const img = icon.querySelector('img');
            if (img) {
                gsap.to(img, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: 'expo.out'
                });
            }
        });
    });
}

/**
 * Magnetic Navigation Links
 */
function initMagneticLinks() {
    const links = document.querySelectorAll('#navbar a:not(.bg-white)');

    links.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(link, {
                x: x * 0.4,
                y: y * 0.4,
                duration: 0.6,
                ease: 'expo.out'
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.4)'
            });
        });
    });
}

/**
 * GSAP Scroll Sequencing
 */
function initGSAPSequences() {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Holographic Feature Cards Materialization
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        // Create scanline element
        const scanline = document.createElement('div');
        scanline.className = 'hologram-scanline';
        card.appendChild(scanline);

        // Initial invisible/rotated state
        gsap.set(card, {
            opacity: 0,
            rotateY: -90,
            transformOrigin: "left center",
            clipPath: 'inset(0% 0% 100% 0%)'
        });

        // The ScrollTrigger Animation
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                once: true
            },
            opacity: 1,
            rotateY: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            delay: index * 0.15,
            ease: "expo.out",
            onStart: () => {
                // Animate scanline
                gsap.fromTo(scanline,
                    { top: '0%', opacity: 1 },
                    { top: '100%', opacity: 0, duration: 1.2, ease: "power2.inOut" }
                );
            },
            onComplete: () => {
                // Glitch-Settle Physics
                card.classList.add('glitch-flash');
                setTimeout(() => card.classList.remove('glitch-flash'), 300);

                // Cleanup inline styles for responsiveness/hover states
                gsap.set(card, { clearProps: "transform,clipPath" });
            }
        });
    });

    // 2. Workflow Steps Reveal
    gsap.from('#workflow div[class*="flex gap-8"]', {
        scrollTrigger: {
            trigger: '#workflow',
            start: 'top 85%',
            once: true
        },
        opacity: 0,
        x: -30,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Refresh all triggers after a small delay to handle Lenis calc
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);

    // Safety fallback: ensure feature cards are visible after 3 seconds
    setTimeout(() => {
        document.querySelectorAll('.feature-card').forEach(card => {
            const computedOpacity = window.getComputedStyle(card).opacity;
            if (computedOpacity === '0' || card.style.opacity === '0') {
                gsap.to(card, {
                    opacity: 1,
                    rotateY: 0,
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 0.5,
                    ease: 'power3.out'
                });
            }
        });
    }, 3000);
}

/**
 * Mobile Menu Toggle Engine (GSAP Liquid Animation)
 */
/**
 * Cyber Text Scramble Effect
 */
function scrambleText(element, originalText) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    let iterations = 0;

    // Clear previous interval if any
    if (element.dataset.interval) clearInterval(parseInt(element.dataset.interval));

    const interval = setInterval(() => {
        element.innerText = originalText
            .split('')
            .map((letter, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iterations >= originalText.length) {
            clearInterval(interval);
        }

        iterations += 1 / 2; // Speed of decode
    }, 30);

    element.dataset.interval = interval.toString();
}

/**
 * Mobile Menu Toggle Engine (Robust Logic)
 */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!toggle || !menu || !closeBtn) return;

    // Store original text
    links.forEach(link => link.dataset.originalText = link.innerText);

    // Animation Timeline (Only for menu opacity/state which is mostly CSS now)
    // We will handle links via CSS to ensure visibility

    // OPEN FUNCTION
    const openMenu = () => {
        menu.classList.add('active'); // Immediate visibility
        menu.style.opacity = '1';

        // Force Clear Inline Styles from previous runs/GSAP
        links.forEach(link => {
            link.style.opacity = '1';
            link.style.transform = 'none';
        });
    };

    // CLOSE FUNCTION
    const closeMenu = () => {
        menu.style.opacity = '0'; // CSS Transition handles fade

        // Wait for CSS transition to finish before hiding
        setTimeout(() => {
            menu.classList.remove('active');
        }, 400);
    };

    toggle.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/**
 * High-Precision Smooth Scroll Anchors
 */
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                window.lenis.scrollTo(target, {
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    offset: -80
                });
            }
        });
    });
}

/**
 * Kyro Core Kinetic Overhaul (Physics, Pulse, Holograms)
 */
function initKyroCoreKinetic() {
    const engine = document.querySelector('#kyro-kinetic-engine');
    const layers = [
        document.querySelector('#core-layer-1'),
        document.querySelector('#core-layer-2'),
        document.querySelector('#core-layer-3'),
        document.querySelector('#core-layer-4'),
        document.querySelector('#core-layer-5'),
        document.querySelector('#core-layer-6')
    ];
    const hologramContainer = document.querySelector('#core-hologram-overlay');

    if (!engine || !layers[0]) return;

    // Inject Orbital Micro-Atoms for visual density
    layers.forEach((layer, idx) => {
        if (idx < 1 || idx > 4 || !layer) return; // Only middle rings
        const dotCount = 4 + idx * 2;
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'absolute w-1.5 h-1.5 bg-kyroBlue rounded-full shadow-[0_0_10px_#3a7ebf] opacity-60';
            const angle = (i / dotCount) * Math.PI * 2;
            const radius = 50 + idx * 10; // Percent/approx
            dot.style.left = `calc(50% + ${Math.cos(angle) * 45}%)`;
            dot.style.top = `calc(50% + ${Math.sin(angle) * 45}%)`;
            layer.appendChild(dot);
        }
    });

    // 1. Layer-Specific Physics (Proximity-based rotation scale)
    engine.addEventListener('mousemove', e => {
        const rect = engine.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
        const maxDist = rect.width / 2;

        // Central Core Magnetic Glow
        if (dist < 100) {
            layers[5].classList.add('hot');
        } else {
            layers[5].classList.remove('hot');
        }

        layers.forEach((layer, idx) => {
            if (!layer) return;
            // Proximity scale: closer = faster
            const speedScale = 1 + Math.max(0, (maxDist - dist) / maxDist) * (idx + 1) * 0.5;

            gsap.to(layer, {
                timeScale: speedScale,
                duration: 0.8,
                ease: "power2.out"
            });
        });

        // Holographic Data-Tip Follow
        updateHologram(e.clientX - rect.left, e.clientY - rect.top);
    });

    engine.addEventListener('mouseleave', () => {
        layers.forEach(layer => {
            if (!layer) return;
            gsap.to(layer, { timeScale: 1, duration: 1 });
        });
        layers[5].classList.remove('hot');
        if (hologramContainer) hologramContainer.innerHTML = '';
    });

    // 2. Interactive "Power Pulse" (Click Ripple)
    engine.addEventListener('click', e => {
        const rect = engine.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create ripple element
        const ripple = document.createElement('div');
        ripple.className = 'core-ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        engine.appendChild(ripple);

        // Animate ripple
        gsap.fromTo(ripple,
            { width: 0, height: 0, opacity: 1 },
            { width: 1000, height: 1000, opacity: 0, duration: 1, ease: "expo.out", onComplete: () => ripple.remove() }
        );

        // Intensify layers on pulse
        layers.forEach(layer => {
            if (!layer) return;
            gsap.to(layer, {
                filter: 'brightness(3) contrast(1.2)',
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        });
    });

    // 3. Holographic Data-Tips Logic
    const techLexicon = [
        '0x882_AF', 'SYNC_LOCKED', 'NEURAL_LINK', 'PROTO_V3', 
        'DATA_FLOW_STABLE', 'CORE_TEMP: 44.2C', 'INIT_VECTOR',
        'QUANTUM_SYNC', 'BYPASS_SEC', 'UPTIME: 99.9%', 'NODE_STABLE'
    ];

    function updateHologram(x, y) {
        if (!hologramContainer) return;

        // Only spawn a new tip occasionally
        if (Math.random() > 0.08) return;

        const tip = document.createElement('div');
        tip.className = 'hologram-tip';
        tip.textContent = techLexicon[Math.floor(Math.random() * techLexicon.length)];
        
        // Random offset for more "floating" feel
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;
        
        tip.style.left = `${x + 20 + offsetX}px`;
        tip.style.top = `${y - 10 + offsetY}px`;
        hologramContainer.appendChild(tip);

        gsap.fromTo(tip,
            { opacity: 0, scale: 0.5, x: -20, filter: 'blur(5px)' },
            { opacity: 1, scale: 1, x: 0, filter: 'blur(0px)', duration: 0.3, ease: "power2.out" }
        );

        gsap.to(tip, {
            opacity: 0,
            y: -50 - Math.random() * 50,
            x: (Math.random() - 0.5) * 100,
            duration: 2,
            delay: 0.2,
            ease: "power1.in",
            onComplete: () => tip.remove()
        });
    }

    // 4. Random System "Glitches" (New)
    setInterval(() => {
        if (Math.random() > 0.95) {
            layers.forEach(layer => {
                if (!layer) return;
                gsap.to(layer, {
                    x: (Math.random() - 0.5) * 10,
                    y: (Math.random() - 0.5) * 10,
                    skewX: (Math.random() - 0.5) * 5,
                    duration: 0.05,
                    yoyo: true,
                    repeat: 1
                });
            });
        }
    }, 2000);
}

/**
 * Hyper-Kinetic Feature Card Interactions
 * Handles plasma shimmer tracking and coordinated 3D internal depth
 */
function initHyperKineticCards() {
    const cards = document.querySelectorAll('.feature-card');

    cards.forEach(card => {
        const shimmer = card.querySelector('.plasma-shimmer');
        if (!shimmer) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            // Update CSS variables for the radial-gradient shimmer
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);

            // Subtle dynamic tilt adjustment for internal elements
            const moveX = (x - 50) / 5;
            const moveY = (y - 50) / 5;

            const icon = card.querySelector('.feature-icon');
            const title = card.querySelector('h3');
            const text = card.querySelector('p');

            if (icon) gsap.to(icon, { x: moveX, y: moveY, duration: 0.6, ease: "power2.out" });
            if (title) gsap.to(title, { x: moveX * 0.5, y: moveY * 0.5, duration: 0.7, ease: "power2.out" });
            if (text) gsap.to(text, { x: moveX * 0.3, y: moveY * 0.3, duration: 0.8, ease: "power2.out" });
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.feature-icon');
            const title = card.querySelector('h3');
            const text = card.querySelector('p');

            if (icon) gsap.to(icon, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
            if (title) gsap.to(title, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
            if (text) gsap.to(text, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        });
    });
}

/**
 * Advanced Scroll-Triggered Reveal Animations
 */
function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach((el, index) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            delay: el.classList.contains('reveal-stagger') ? index * 0.1 : 0
        });
    });
}

/**
 * Interactive Scroll Effects & Dynamic Parallax
 */
function initScrollInteractions() {
    // 1. Hero Scroll-Down Hint Fade
    const scrollHint = document.getElementById('scroll-hint');
    if (scrollHint) {
        gsap.to(scrollHint, {
            scrollTrigger: {
                trigger: '#hero',
                start: "top top",
                end: "30% top",
                scrub: true,
            },
            opacity: 0,
            y: 50,
            pointerEvents: 'none'
        });

        scrollHint.addEventListener('click', () => {
            window.lenis.scrollTo('#features', { duration: 1.5, offset: -80 });
        });
    }

    // 2. Section Background Parallax
    const sections = ['#features', '#workflow', '#why-choose', '#kyro-core', '#about'];
    sections.forEach(selector => {
        const section = document.querySelector(selector);
        if (!section) return;

        // Subtle parallax for grid/hex backgrounds inside sections if any
        const bgGrid = section.querySelector('.bg-grid, .bg-hex');
        if (bgGrid) {
            gsap.to(bgGrid, {
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5 // Increased scrub for smoothness
                },
                y: 100,
                ease: "none",
                lazy: true
            });
        }
    });

    // 3. Image & Asset Parallax
    const parallaxAssets = document.querySelectorAll('[data-parallax]');
    parallaxAssets.forEach(asset => {
        const speed = parseFloat(asset.dataset.parallax) || 0.1;
        gsap.to(asset, {
            scrollTrigger: {
                trigger: asset,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5 // Increased scrub for smoothness
            },
            y: (index, target) => -window.innerHeight * speed,
            ease: "none",
            lazy: true
        });
    });

    // 4. Sticky Text Reveal Effect for 'Why Choose' Section
    const whyChooseTexts = document.querySelectorAll('#why-choose .glass p');
    whyChooseTexts.forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: "top 90%",
                end: "top 60%",
                scrub: 1 // Smoother scrub
            },
            opacity: 0.2,
            filter: "blur(10px)",
            y: 20,
            duration: 1,
            lazy: true
        });
    });

    // 5. Kyro Core Kinetic Velocity Increase on Scroll
    const coreEngine = document.getElementById('kyro-kinetic-engine');
    if (coreEngine) {
        gsap.to(coreEngine, {
            scrollTrigger: {
                trigger: coreEngine,
                start: "top bottom",
                end: "bottom top",
                scrub: 2 // High scrub for core engine
            },
            rotation: 360,
            scale: 1.1,
            ease: "none",
            lazy: true
        });
    }
}



