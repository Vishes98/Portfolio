// Project Detail Page Interactions

document.addEventListener('DOMContentLoaded', () => {
	// Smooth scroll animations
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -100px 0px',
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, observerOptions);

	// Observe all sections
	const sections = document.querySelectorAll(
		'.project-section, .overview-item, .research-item, .process-step, .feature-card, .showcase-item, .result-item'
	);
	sections.forEach((section) => {
		section.style.opacity = '0';
		section.style.transform = 'translateY(30px)';
		section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
		observer.observe(section);
	});

	// Stagger animation for grid items
	const gridItems = document.querySelectorAll(
		'.overview-item, .research-item, .feature-card, .result-item'
	);
	gridItems.forEach((item, index) => {
		item.style.transitionDelay = `${index * 0.1}s`;
	});

	// Parallax effect for hero image
	window.addEventListener('scroll', () => {
		const scrolled = window.pageYOffset;
		const heroImage = document.querySelector('.hero-image-placeholder');
		if (heroImage && scrolled < 500) {
			heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
		}
	});

	// 3D tilt effect for cards
	const cards = document.querySelectorAll(
		'.overview-item, .research-item, .feature-card, .result-item, .showcase-item'
	);
	cards.forEach((card) => {
		card.addEventListener('mousemove', (e) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const centerX = rect.width / 2;
			const centerY = rect.height / 2;

			const rotateX = ((y - centerY) / centerY) * -3;
			const rotateY = ((x - centerX) / centerX) * 3;

			card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
		});

		card.addEventListener('mouseleave', () => {
			card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
		});
	});

	// Counter animation for results
	const resultNumbers = document.querySelectorAll('.result-number');
	const resultsObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animateResultNumber(entry.target);
					resultsObserver.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.5 }
	);
	resultNumbers.forEach((result) => resultsObserver.observe(result));

	function animateResultNumber(element) {
		const text = element.textContent;
		const number = parseFloat(text);
		if (isNaN(number)) return;

		const isPercentage = text.includes('%');
		const isRating = text.includes('/');

		let current = 0;
		const increment = number / 50;
		const timer = setInterval(() => {
			current += increment;
			if (current >= number) {
				if (isPercentage) {
					element.textContent = number + '%';
				} else if (isRating) {
					element.textContent = number + '/5';
				} else {
					element.textContent = number;
				}
				clearInterval(timer);
			} else {
				if (isPercentage) {
					element.textContent = Math.floor(current) + '%';
				} else if (isRating) {
					element.textContent = (current / number) * number + '/5';
				} else {
					element.textContent = Math.floor(current);
				}
			}
		}, 30);
	}
});
