      // Header scroll effect
      const header = document.getElementById("header");

      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      });

      // Mobile menu toggle
      const mobileMenuBtn = document.getElementById("mobileMenuBtn");
      const mobileNav = document.getElementById("mobileNav");

      mobileMenuBtn.addEventListener("click", () => {
        mobileNav.classList.toggle("active");
      });

      mobileNavDropdownItem = document.querySelector('#mobileNav .dropdown .nav-link');
      mobileNavDropdownContent = document.querySelector('#mobileNav .dropdown .dropdown-content');
      
      mobileNavDropdownItem.addEventListener('click', (e) => {
        e.preventDefault();
        mobileNavDropdownContent.classList.toggle('active');
      });

      // Handle Training submenu in mobile view
      const trainingWrapper = document.querySelector('#mobileNav .training-wrapper');
      const trainingLink = trainingWrapper.querySelector('a');
      const trainingSubmenu = trainingWrapper.querySelector('.sub-dropdown');

      trainingLink.addEventListener('click', (e) => {
        e.preventDefault();
        trainingSubmenu.classList.toggle('active');
      });

      // Scroll animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      }, observerOptions);

      // Observe all fade-in elements
      document.querySelectorAll(".fade-in").forEach((el) => {
        observer.observe(el);
      });

      // Animated counters
      const statNumbers = document.querySelectorAll(".stat-number");
      let hasAnimated = false;

      const statsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              hasAnimated = true;
              animateCounters();
            }
          });
        },
        { threshold: 0.5 }
      );

      if (document.getElementById("stats")) {
        statsObserver.observe(document.getElementById("stats"));
      }

      function animateCounters() {
        statNumbers.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-target"));
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = formatNumber(target);
              clearInterval(timer);
            } else {
              counter.textContent = formatNumber(Math.floor(current));
            }
          }, 16);
        });
      }

      function formatNumber(num) {
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1) + "M+";
        } else if (num >= 1000) {
          return Math.floor(num / 1000) * 1000 + "+";
        } else if (num === 99.9) {
          return "99.9";
        } else {
          return num.toString();
        }
      }
