(() => {
	'use strict';

	// Year stamp
	const y = document.getElementById('year');
	if (y) y.textContent = String(new Date().getFullYear());

	// Scroll-spy for sticky nav
	const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
	if (!navLinks.length) return;

	const byId = new Map(
		navLinks
			.map(a => [a.getAttribute('href').slice(1), a])
			.filter(([id]) => id && document.getElementById(id))
	);

	const setActive = id => {
		navLinks.forEach(a => a.classList.remove('is-active'));
		const a = byId.get(id);
		if (a) a.classList.add('is-active');
	};

	const sections = Array.from(byId.keys())
		.map(id => document.getElementById(id))
		.filter(Boolean);

	if ('IntersectionObserver' in window) {
		const io = new IntersectionObserver(
			entries => {
				const visible = entries
					.filter(e => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
				if (visible) setActive(visible.target.id);
			},
			{ rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
		);
		sections.forEach(s => io.observe(s));
	}

	// Update active on hash click without relying on scroll event firing
	navLinks.forEach(a => {
		a.addEventListener('click', () => {
			const id = a.getAttribute('href').slice(1);
			if (byId.has(id)) setActive(id);
		});
	});
})();
