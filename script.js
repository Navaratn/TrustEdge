// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const dropdowns = document.querySelectorAll('.mobile-nav .dropdown');

    if (mobileMenuBtn && mobileNav) {
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileNav.classList.toggle('active');
            mobileMenuBtn.textContent = mobileNav.classList.contains('active') ? '×' : '☰';
            
            // Close all dropdowns when closing the menu
            if (!mobileNav.classList.contains('active')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        // Handle dropdown toggles in mobile menu
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            if (link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown) {
                            d.classList.remove('active');
                        }
                    });
                    
                    dropdown.classList.toggle('active');
                });
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileNav.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        // Prevent closing when clicking inside mobile nav
        mobileNav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Handle header background on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});

// Add additional styles for mobile nav when active
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .mobile-nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: #fff;
            padding: 1rem;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .mobile-nav.active {
            display: flex;
            flex-direction: column;
        }

        .mobile-nav .nav-link {
            padding: 0.5rem 0;
        }

        @media (min-width: 769px) {
            .mobile-nav {
                display: none !important;
            }
        }
    </style>
`); 