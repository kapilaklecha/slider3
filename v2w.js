class Carousel {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      autoplayInterval: 3000,
      showDots: true, // New option to control dot visibility
      ...options,
    };

    this.carousel = this.container.querySelector(".carousel");
    this.navigation = this.container.querySelector(".navigation");
    this.prevButton = this.container.querySelector(".carousel-button.prev");
    this.nextButton = this.container.querySelector(".carousel-button.next");

    this.slides = this.options.slides || [];
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.visibleSlides = Math.min(5, this.slides.length);

    this.init();
  }

  init() {
    this.createSlides();
    this.updateSlides();
    this.addEventListeners();
    this.startAutoplay();
    this.updateDotsVisibility(); // Call this method to set initial visibility
  }

  createSlides() {
    this.slides.forEach((slide, index) => {
      const slideElement = document.createElement("div");
      slideElement.classList.add("slide");
      slideElement.innerHTML = `
                <img src="${slide.image}" alt="${slide.title}">
                <h2>${slide.title}</h2>
                <p>${slide.description}</p>
            `;
      this.carousel.appendChild(slideElement);

      if (this.options.showDots) {
        const dot = document.createElement("div");
        dot.classList.add("nav-dot");
        dot.addEventListener("click", () => this.goToSlide(index));
        this.navigation.appendChild(dot);
      }
    });
  }

  updateSlides() {
    const slideElements = this.carousel.querySelectorAll(".slide");
    const dots = this.navigation.querySelectorAll(".nav-dot");
    const halfVisible = Math.floor(this.visibleSlides / 2);

    slideElements.forEach((slide, index) => {
      slide.classList.remove(
        "active",
        "prev",
        "next",
        "prev-prev",
        "next-next"
      );

      let offset =
        (index - this.currentIndex + this.slides.length) % this.slides.length;
      if (offset > halfVisible) offset -= this.slides.length;
      if (offset < -halfVisible) offset += this.slides.length;

      if (offset === 0) {
        slide.classList.add("active");
      } else if (
        offset === -1 ||
        (offset === halfVisible && this.visibleSlides % 2 === 0)
      ) {
        slide.classList.add("prev");
      } else if (
        offset === 1 ||
        (offset === -halfVisible && this.visibleSlides % 2 === 0)
      ) {
        slide.classList.add("next");
      } else if (offset === -2 && this.visibleSlides > 3) {
        slide.classList.add("prev-prev");
      } else if (offset === 2 && this.visibleSlides > 3) {
        slide.classList.add("next-next");
      }
    });

    if (this.options.showDots) {
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === this.currentIndex);
      });
    }
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateSlides();
    this.resetAutoplay();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlides();
    this.resetAutoplay();
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateSlides();
    this.resetAutoplay();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(
      () => this.nextSlide(),
      this.options.autoplayInterval
    );
  }

  resetAutoplay() {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }

  addEventListeners() {
    this.prevButton.addEventListener("click", () => this.prevSlide());
    this.nextButton.addEventListener("click", () => this.nextSlide());
  }

  // New method to update dots visibility
  updateDotsVisibility() {
    if (this.options.showDots) {
      this.navigation.style.display = "flex";
    } else {
      this.navigation.style.display = "none";
    }
  }

  // New method to toggle dots visibility
  toggleDots(show) {
    this.options.showDots = show;
    this.updateDotsVisibility();
  }
}

// Usage
const carouselContainer = document.querySelector(".carousel-container");
const slides = [
  {
    image: "https://images6.alphacoders.com/462/thumb-1920-462371.jpg",
    title: "Web Development",
    description: "Building the future of the web",
  },
  {
    image: "https://source.unsplash.com/random/800x600?programming",
    title: "Programming",
    description: "Coding the world of tomorrow",
  },
  {
    image: "https://source.unsplash.com/random/800x600?coding",
    title: "Coding",
    description: "Turning ideas into reality",
  },
  {
    image: "https://images6.alphacoders.com/462/thumb-1920-462371.jpg",
    title: "Web Development",
    description: "Building the future of the web",
  },
  // { image: 'https://source.unsplash.com/random/800x600?programming', title: 'Programming', description: 'Coding the world of tomorrow' },
  // { image: 'https://source.unsplash.com/random/800x600?coding', title: 'Coding', description: 'Turning ideas into reality' },
  // // Add more slides as needed
];

const myCarousel = new Carousel(carouselContainer, {
  slides: slides,
  showDots: true,
});

// You can toggle dots visibility after initialization
// myCarousel.toggleDots(false);  // To hide dots
// myCarousel.toggleDots(true);   // To show dots
