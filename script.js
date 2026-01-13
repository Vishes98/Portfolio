// Smooth scroll animations with zoom effects
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		}
	});
}, observerOptions);

// Scroll-based zoom observer for sections
const scrollZoomObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			const section = entry.target;
			const ratio = entry.intersectionRatio;

			if (ratio > 0.3) {
				const scale = 0.95 + ratio * 0.05;
				const opacity = 0.7 + ratio * 0.3;
				section.style.transform = `scale(${scale})`;
				section.style.opacity = opacity;
			}
		});
	},
	{
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
	}
);

// Counter animation
function animateCounter(element, target) {
	let current = 0;
	const increment = target / 50;
	const timer = setInterval(() => {
		current += increment;
		if (current >= target) {
			element.textContent = target;
			clearInterval(timer);
		} else {
			element.textContent = Math.floor(current);
		}
	}, 30);
}

// 3D tilt effect with magnetic hover
function add3DTiltEffect(element, tiltStrength = 5, scaleAmount = 1.05) {
	let isHovering = false;

	element.addEventListener('mousemove', (e) => {
		isHovering = true;
		const rect = element.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = ((y - centerY) / centerY) * -tiltStrength;
		const rotateY = ((x - centerX) / centerX) * tiltStrength;

		// Magnetic effect
		const moveX = ((x - centerX) / centerX) * 10;
		const moveY = ((y - centerY) / centerY) * 10;

		element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${moveX}px, ${moveY}px) translateY(-15px) scale(${scaleAmount})`;
	});

	element.addEventListener('mouseleave', () => {
		isHovering = false;
		element.style.transform =
			'perspective(1000px) rotateX(0) rotateY(0) translate(0, 0) translateY(0) scale(1)';
	});
}

// Smooth reveal animation with zoom
const revealObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0) scale(1)';
			}
		});
	},
	{ threshold: 0.2 }
);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
	// Add scroll-zoom class to sections
	const sections = document.querySelectorAll('section');
	sections.forEach((section) => {
		section.classList.add('scroll-zoom');
		scrollZoomObserver.observe(section);
	});

	// Section titles
	const sectionTitles = document.querySelectorAll('.section-title');
	sectionTitles.forEach((title) => observer.observe(title));

	// Skill cards with 3D tilt
	const skillCards = document.querySelectorAll('.skill-card');
	skillCards.forEach((card, index) => {
		observer.observe(card);
		revealObserver.observe(card);
		add3DTiltEffect(card, 5, 1.05);

		// Animate skill progress bars when visible
		const progressBar = card.querySelector('.skill-progress');
		if (progressBar) {
			const observerProgress = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const width = progressBar.getAttribute('data-width');
							setTimeout(() => {
								progressBar.style.width = width + '%';
							}, index * 200);
							observerProgress.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.5 }
			);
			observerProgress.observe(progressBar);
		}
	});

	// Project cards with 3D tilt
	const projectCards = document.querySelectorAll('.project-card');
	projectCards.forEach((card, index) => {
		setTimeout(() => {
			observer.observe(card);
			revealObserver.observe(card);
			add3DTiltEffect(card, 3, 1.03);
		}, index * 100);
	});

	// Contact links with 3D tilt
	const contactLinks = document.querySelectorAll('.contact-link');
	contactLinks.forEach((link, index) => {
		setTimeout(() => {
			observer.observe(link);
			add3DTiltEffect(link, 2, 1.02);
		}, index * 150);
	});

	// CTA buttons with magnetic effect
	const ctaButtons = document.querySelectorAll('.cta-button');
	ctaButtons.forEach((button) => {
		add3DTiltEffect(button, 3, 1.05);
	});

	// About section elements
	const aboutElements = document.querySelectorAll(
		'.fade-in-left, .fade-in-right'
	);
	aboutElements.forEach((el) => observer.observe(el));

	// Animate stats counter
	const statNumbers = document.querySelectorAll('.stat-number');
	const statsObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const target = parseInt(
						entry.target.getAttribute('data-target')
					);
					animateCounter(entry.target, target);
					statsObserver.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.5 }
	);
	statNumbers.forEach((stat) => statsObserver.observe(stat));

	// Advanced hover zoom for project images
	const projectImages = document.querySelectorAll('.project-image');
	projectImages.forEach((image) => {
		image.addEventListener('mousemove', (e) => {
			const rect = image.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const centerX = rect.width / 2;
			const centerY = rect.height / 2;

			const rotateX = ((y - centerY) / centerY) * -10;
			const rotateY = ((x - centerX) / centerX) * 10;

			image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.15)`;
		});

		image.addEventListener('mouseleave', () => {
			image.style.transform =
				'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
		});
	});

	// About image placeholder 3D effect
	const aboutImage = document.querySelector('.image-placeholder');
	if (aboutImage) {
		aboutImage.addEventListener('mousemove', (e) => {
			const rect = aboutImage.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const centerX = rect.width / 2;
			const centerY = rect.height / 2;

			const rotateX = ((y - centerY) / centerY) * -8;
			const rotateY = ((x - centerX) / centerX) * 8;

			aboutImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
		});

		aboutImage.addEventListener('mouseleave', () => {
			aboutImage.style.transform =
				'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
		});
	}
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			const headerOffset = 80;
			const elementPosition = target.getBoundingClientRect().top;
			const offsetPosition =
				elementPosition + window.pageYOffset - headerOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});
		}
	});
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
	const currentScroll = window.pageYOffset;

	if (currentScroll > 100) {
		header.style.background = 'rgba(255, 255, 255, 0.98)';
		header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
	} else {
		header.style.background = 'rgba(255, 255, 255, 0.95)';
		header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
	}

	lastScroll = currentScroll;
});

// Advanced scroll-based zoom and parallax
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
	const scrolled = window.pageYOffset;
	const hero = document.querySelector('.hero');

	if (hero) {
		const heroContent = hero.querySelector('.hero-content');
		if (heroContent) {
			const heroHeight = hero.offsetHeight;
			const scrollProgress = Math.min(scrolled / heroHeight, 1);

			// Zoom out effect as you scroll
			const scale = 1 - scrollProgress * 0.3;
			const opacity = 1 - scrollProgress * 0.8;

			heroContent.style.transform = `translateY(${
				scrolled * 0.5
			}px) scale(${scale})`;
			heroContent.style.opacity = opacity;
		}
	}

	lastScrollTop = scrolled;
});

// Advanced mouse move parallax effect with zoom
document.addEventListener('mousemove', (e) => {
	const shapes = document.querySelectorAll('.floating-shape');
	const mouseX = e.clientX / window.innerWidth;
	const mouseY = e.clientY / window.innerHeight;

	shapes.forEach((shape, index) => {
		const speed = (index + 1) * 0.02;
		const x = (window.innerWidth - e.clientX * speed) / 100;
		const y = (window.innerHeight - e.clientY * speed) / 100;
		const scale = 1 + (mouseX + mouseY) * 0.1;
		shape.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
	});

	// Hero background gradient follow mouse
	const heroGradient = document.querySelector('.hero-bg-gradient');
	if (heroGradient) {
		const rect = heroGradient.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;
		heroGradient.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)`;
	}

	// Hero decoration circles follow mouse
	const circles = document.querySelectorAll('.decoration-circle');
	circles.forEach((circle, index) => {
		const rect = circle.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const deltaX = (e.clientX - centerX) * 0.01 * (index + 1);
		const deltaY = (e.clientY - centerY) * 0.01 * (index + 1);
		circle.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
	});
});

// Create dynamic particles
function createParticles() {
	const heroParticles = document.querySelector('.hero-particles');
	if (!heroParticles) return;

	for (let i = 0; i < 15; i++) {
		const particle = document.createElement('div');
		particle.className = 'particle';
		particle.style.cssText = `
			position: absolute;
			width: ${Math.random() * 4 + 2}px;
			height: ${Math.random() * 4 + 2}px;
			background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.3});
			border-radius: 50%;
			left: ${Math.random() * 100}%;
			top: ${Math.random() * 100}%;
			animation: particle-float ${Math.random() * 15 + 10}s infinite;
			animation-delay: ${Math.random() * 5}s;
		`;
		heroParticles.appendChild(particle);
	}
}

// Text reveal effect on scroll
function addTextRevealEffect() {
	const textElements = document.querySelectorAll(
		'.greeting-text, .title-line, .typing-text, .description'
	);

	textElements.forEach((el) => {
		el.addEventListener('mouseenter', () => {
			if (el.dataset.text) {
				const originalText = el.textContent;
				el.textContent = el.dataset.text;
				setTimeout(() => {
					el.textContent = originalText;
				}, 2000);
			}
		});
	});
}

// Enhanced social link interactions
function enhanceSocialLinks() {
	const socialLinks = document.querySelectorAll('.social-link');
	socialLinks.forEach((link) => {
		link.addEventListener('mousemove', (e) => {
			const rect = link.getBoundingClientRect();
			const x = e.clientX - rect.left - rect.width / 2;
			const y = e.clientY - rect.top - rect.height / 2;

			link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1) rotate(${
				(x + y) * 0.1
			}deg)`;
		});

		link.addEventListener('mouseleave', () => {
			link.style.transform = 'translate(0, 0) scale(1) rotate(0deg)';
		});
	});
}

// Make project cards clickable
function makeProjectCardsClickable() {
	const projectCards = document.querySelectorAll('.project-card[data-project-link]');
	projectCards.forEach((card) => {
		card.style.cursor = 'pointer';
		card.addEventListener('click', (e) => {
			// Don't navigate if clicking on overlay links
			if (!e.target.closest('.project-overlay') && !e.target.closest('a')) {
				const link = card.getAttribute('data-project-link');
				if (link) {
					window.location.href = link;
				}
			}
		});
	});
}

// Initialize enhanced interactions
document.addEventListener('DOMContentLoaded', () => {
	createParticles();
	addTextRevealEffect();
	enhanceSocialLinks();
	makeProjectCardsClickable();
});
