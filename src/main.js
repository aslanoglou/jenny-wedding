import Glide from '@glidejs/glide'
document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const toggleButton = document.querySelector(
        '[data-collapse-toggle="navbar-sticky"]',
    );
    const navbarMenu = document.getElementById("navbar-sticky");

    toggleButton.addEventListener("click", () => {
        navbarMenu.classList.toggle("active");
        toggleButton.classList.toggle("active");
    });

    let timeout;
    window.addEventListener("scroll", () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            body.setAttribute('data-scrolled', window.scrollY > 25);
        }, 100);
    });

    window.addEventListener("resize", () => {
        navbarMenu.classList.remove("active");
        toggleButton.classList.remove("active");
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationClass = element.dataset.animation;
                element.classList.add(animationClass);
                observer.unobserve(element); // Remove observer after animating once
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
    });

    // Observe each section with data-animation attribute
    document.querySelectorAll("[data-animation]").forEach((el) => {
        observer.observe(el);
    });

    new Glide('#brides-carousel', {
        type: 'slider',
        startAt: 0,
        perView: 4,
        loop: false,
        gap:32,
        bound: true,
        breakpoints: {
            1023: {
                perView: 3
            },
            767: {
                perView: 2
            },
            519: {
                perView: 1
            }
        }
    }).mount()
});
