// ===== SystemMaker EXPERIENCE — GitHub-Style Interactive Blog =====

const sectionIds = ['readme', 'filosofia', 'experiencia', 'expertise', 'equipo', 'contacto', 'incubacion'];
const sectionLabels = ['README', 'Filosofía', 'Experiencia', 'Expertise', 'Equipo', 'Contacto', 'Incubación'];
let currentSectionIndex = 0;

// --- Progress Bar ---
function initProgressBar() {
    const dotsContainer = document.getElementById('progressDots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    sectionIds.forEach((id, i) => {
        const dot = document.createElement('div');
        dot.className = 'progress-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('data-label', sectionLabels[i]);
        dot.addEventListener('click', () => showSection(id));
        dotsContainer.appendChild(dot);
    });
    updateProgressBar(0);
}

function updateProgressBar(index) {
    currentSectionIndex = index;
    const total = sectionIds.length;
    const fill = document.getElementById('progressFill');
    const label = document.getElementById('progressLabel');
    const dots = document.querySelectorAll('.progress-dot');

    // Fill percentage
    const pct = total > 1 ? (index / (total - 1)) * 100 : 0;
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = (index + 1) + ' / ' + total;

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.remove('active', 'visited');
        if (i === index) dot.classList.add('active');
        else if (i < index) dot.classList.add('visited');
    });
}

// --- Section Navigation ---
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.dynamic-section');
    sections.forEach(sec => {
        sec.classList.remove('visible');
        sec.style.display = 'none';
    });

    // Show target section
    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block';
        // Trigger reflow for animation
        void target.offsetWidth;
        target.classList.add('visible');
    }

    // Update active tab
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(sectionId)) {
            btn.classList.add('active');
        }
    });

    // Animate stats if README
    if (sectionId === 'readme') {
        animateStats();
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update progress bar
    const idx = sectionIds.indexOf(sectionId);
    if (idx !== -1) updateProgressBar(idx);
}

// --- Animated Number Counter ---
function animateStats() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 1200;
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * eased);
            counter.textContent = current + (target > 9 ? '+' : '');
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target + (target > 9 ? '+' : '');
            }
        }
        requestAnimationFrame(update);
    });
}

// --- Contribution Graph Generator ---
function generateContribGraph() {
    const grid = document.getElementById('contribGrid');
    if (!grid) return;
    grid.innerHTML = '';

    // Generate ~365 cells with random activity levels
    const totalCells = 52 * 7; // 52 weeks × 7 days
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.className = 'contrib-cell';

        // Random activity level (weighted toward lower levels)
        const rand = Math.random();
        if (rand > 0.85) {
            cell.classList.add('level-4');
        } else if (rand > 0.7) {
            cell.classList.add('level-3');
        } else if (rand > 0.5) {
            cell.classList.add('level-2');
        } else if (rand > 0.3) {
            cell.classList.add('level-1');
        }
        // else: empty (level-0, base color)

        // Tooltip-like title
        const daysAgo = totalCells - i;
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        const dateStr = date.toLocaleDateString('es-CL', { year: 'numeric', month: 'short', day: 'numeric' });
        cell.title = `${dateStr}`;

        grid.appendChild(cell);
    }
}

// --- Team Cards Hover Effect (subtle glow) ---
function initTeamCardEffects() {
    const cards = document.querySelectorAll('.team-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 0 20px rgba(88, 166, 255, 0.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });
}

// --- Keyboard Navigation ---
function initKeyboardNav() {
    const sectionIds = ['readme', 'filosofia', 'experiencia', 'expertise', 'equipo', 'contacto', 'incubacion'];
    let currentIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % sectionIds.length;
            showSection(sectionIds[currentIndex]);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + sectionIds.length) % sectionIds.length;
            showSection(sectionIds[currentIndex]);
        }
    });

    // Keep keyboard nav in sync with clicked tabs
    const observer = new MutationObserver(() => {
        const activeBtn = document.querySelector('.tab-btn.active');
        if (activeBtn) {
            const onclick = activeBtn.getAttribute('onclick') || '';
            const match = onclick.match(/showSection\('(\w+)'\)/);
            if (match) {
                currentIndex = sectionIds.indexOf(match[1]);
            }
        }
    });

    const tabNav = document.getElementById('tabNav');
    if (tabNav) {
        observer.observe(tabNav, { subtree: true, attributes: true, attributeFilter: ['class'] });
    }
}

// --- Badge hover ripple effect ---
function initBadgeEffects() {
    const badges = document.querySelectorAll('.tech-badge');
    badges.forEach(badge => {
        badge.addEventListener('click', () => {
            badge.style.transform = 'scale(1.1)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// --- Adjust body padding for fixed header ---
function adjustBodyPadding() {
    const header = document.querySelector('.sticky-header');
    if (header) {
        document.body.style.paddingTop = header.offsetHeight + 'px';
    }
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    initProgressBar();
    adjustBodyPadding();
    generateContribGraph();
    animateStats();
    initTeamCardEffects();
    initKeyboardNav();
    initBadgeEffects();
    initSwipeNav();
});

window.addEventListener('resize', adjustBodyPadding);

// --- Swipe Navigation (mobile) ---
function initSwipeNav() {
    let startX = 0;
    let startY = 0;
    const threshold = 60;

    document.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
        startY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        const diffX = e.changedTouches[0].screenX - startX;
        const diffY = e.changedTouches[0].screenY - startY;
        // Only trigger if horizontal swipe is dominant
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
            if (diffX < 0 && currentSectionIndex < sectionIds.length - 1) {
                showSection(sectionIds[currentSectionIndex + 1]);
            } else if (diffX > 0 && currentSectionIndex > 0) {
                showSection(sectionIds[currentSectionIndex - 1]);
            }
        }
    }, { passive: true });
}
