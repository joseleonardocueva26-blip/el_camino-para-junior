document.addEventListener("DOMContentLoaded", () => {
    // Reveal animations on scroll
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });

    // Rating Logic
    const stars = document.querySelectorAll('.stars span');
    const submitBtn = document.getElementById('submitBtn');
    const thankYouMsg = document.getElementById('thankYouMsg');
    
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            clearHover();
            const value = this.getAttribute('data-value');
            highlightStars(value, 'hovered');
        });

        star.addEventListener('mouseout', function() {
            clearHover();
        });

        star.addEventListener('click', function() {
            selectedRating = this.getAttribute('data-value');
            clearSelected();
            highlightStars(selectedRating, 'selected');
            
            submitBtn.classList.add('active');
            submitBtn.disabled = false;
        });
    });

    function highlightStars(value, className) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= value) {
                star.classList.add(className);
            }
        });
    }

    function clearHover() {
        stars.forEach(star => star.classList.remove('hovered'));
    }

    function clearSelected() {
        stars.forEach(star => star.classList.remove('selected'));
    }

    submitBtn.addEventListener('click', () => {
        if (selectedRating > 0) {
            // Simulated saving data / interacting with backend
            console.log(`El usuario calificó la experiencia con: ${selectedRating} estrellas`);
            
            submitBtn.style.display = 'none';
            document.querySelector('.stars').style.pointerEvents = 'none';
            
            thankYouMsg.style.display = 'block';
            
            // Sin animaciones de luz
        }
    });
});
