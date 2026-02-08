// ===== SystemMaker EXPERIENCE — GitHub-Style Interactive Blog =====

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

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    generateContribGraph();
    animateStats();
    initTeamCardEffects();
    initKeyboardNav();
    initBadgeEffects();
});
