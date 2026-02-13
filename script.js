        document.addEventListener('DOMContentLoaded', () => {
            // Mobile Menu Toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navLinks = document.getElementById('navLinks');

            if (mobileMenuBtn && navLinks) {
                mobileMenuBtn.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
                        ? '<i class="fas fa-times"></i>'
                        : '<i class="fas fa-bars"></i>';
                });

                // Close mobile menu when clicking a link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.addEventListener('click', () => {
                        navLinks.classList.remove('active');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    });
                });
            }

            // Header scroll effect
            window.addEventListener('scroll', () => {
                const header = document.getElementById('header');
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Portfolio Filtering
            const filterButtons = document.querySelectorAll('.filter-btn');
            const portfolioItems = document.querySelectorAll('.portfolio-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    const filterValue = button.getAttribute('data-filter');

                    portfolioItems.forEach(item => {
                        const categories = item.getAttribute('data-category').split(' ');
                        if (filterValue === 'all' || categories.includes(filterValue)) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 10);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });

            // Animated Counter for Stats
            const statNumbers = document.querySelectorAll('.stat-number');

            const animateCounter = (element) => {
                const target = parseInt(element.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target + (element.getAttribute('data-count') === '137' ? '%' : '+');
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current) + (element.getAttribute('data-count') === '137' ? '%' : '+');
                    }
                }, 16);
            };

            // Trigger counter animation when stats come into view
            const observerOptions = {
                threshold: 0.5
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        statNumbers.forEach(number => {
                            if (number.textContent === '0' || number.textContent === '0%' || number.textContent === '0+') {
                                animateCounter(number);
                            }
                        });
                    }
                });
            }, observerOptions);

            const heroEl = document.querySelector('.hero');
            if (heroEl) observer.observe(heroEl);
        });