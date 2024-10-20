const carousel = document.querySelector('.carousel');
        const navigation = document.querySelector('.navigation');
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');
        const slides = [
            { image: 'https://images6.alphacoders.com/462/thumb-1920-462371.jpg', title: 'Web Development', description: 'Building the future of the web' },
            { image: 'https://source.unsplash.com/random/800x600?programming', title: 'Programming', description: 'Coding the world of tomorrow' },
            { image: 'https://source.unsplash.com/random/800x600?coding', title: 'Coding', description: 'Turning ideas into reality' },
            { image: 'https://source.unsplash.com/random/800x600?technology', title: 'Technology', description: 'Innovating for a better world' },
            { image: 'https://source.unsplash.com/random/800x600?computerscience', title: 'Computer Science', description: 'The science of computation' },
            { image: 'https://source.unsplash.com/random/800x600?software', title: 'Software', description: 'Powering the digital age' },
            { image: 'https://source.unsplash.com/random/800x600?javascript', title: 'JavaScript', description: 'The language of the web' },
            { image: 'https://source.unsplash.com/random/800x600?html', title: 'HTML', description: 'Structuring the web' },
            { image: 'https://source.unsplash.com/random/800x600?css', title: 'CSS', description: 'Styling the web' },
            { image: 'https://source.unsplash.com/random/800x600?uidesign', title: 'UI Design', description: 'Crafting user experiences' }
        ];

        let currentIndex = 0;
        let autoplayInterval;

        function createSlides() {
            for (let i = 0; i < slides.length; i++) {
                const slide = document.createElement('div');
                slide.classList.add('slide');
                slide.innerHTML = `
                    <img src="${slides[i].image}" alt="${slides[i].title}">
                    <h2>${slides[i].title}</h2>
                    <p>${slides[i].description}</p>
                `;
                carousel.appendChild(slide);

                const dot = document.createElement('div');
                dot.classList.add('nav-dot');
                dot.addEventListener('click', () => goToSlide(i));
                navigation.appendChild(dot);
            }
            updateSlides();
        }

        function updateSlides() {
            const slideElements = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.nav-dot');
            slideElements.forEach((slide, index) => {
                slide.classList.remove('active', 'prev', 'next', 'prev-prev', 'next-next');
                const offset = (index - currentIndex + slides.length) % slides.length;
                if (offset === 0) slide.classList.add('active');
                if (offset === 1) slide.classList.add('next');
                if (offset === slides.length - 1) slide.classList.add('prev');
                if (offset === 2) slide.classList.add('next-next');
                if (offset === slides.length - 2) slide.classList.add('prev-prev');
            });
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlides();
            resetAutoplay();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlides();
            resetAutoplay();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlides();
            resetAutoplay();
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            autoplayInterval = setInterval(nextSlide, 3000);
        }

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        createSlides();
        resetAutoplay(); // Start autoplay