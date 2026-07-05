// ==========================
// Selecting Elements
// ==========================

const filterButtons = document.querySelectorAll(".filter-buttons button");
const galleryItems = document.querySelectorAll(".gallery .image");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");

const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
let visibleImages = [];

// ==========================
// Filter Gallery
// ==========================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class
        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            if (filter === "all") {

                item.classList.remove("hide");

            }
            else {

                if (item.classList.contains(filter)) {
                    item.classList.remove("hide");
                } else {
                    item.classList.add("hide");
                }

            }

        });

    });

});

// ==========================
// Open Lightbox
// ==========================

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        visibleImages = [...document.querySelectorAll(".gallery .image:not(.hide)")];

        currentIndex = visibleImages.indexOf(item);

        showImage();

        lightbox.classList.add("active");

    });

});

// ==========================
// Show Image
// ==========================

function showImage() {

    const img = visibleImages[currentIndex].querySelector("img");

    lightboxImg.src = img.src;

}

// ==========================
// Next Image
// ==========================

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= visibleImages.length) {

        currentIndex = 0;

    }

    showImage();

});

// ==========================
// Previous Image
// ==========================

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = visibleImages.length - 1;

    }

    showImage();

});

// ==========================
// Close Lightbox
// ==========================

closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("active");

});

// ==========================
// Close when clicking outside image
// ==========================

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("active");

    }

});

// ==========================
// Keyboard Controls
// ==========================

document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("active"))
        return;

    if (e.key === "ArrowRight") {

        nextBtn.click();

    }

    else if (e.key === "ArrowLeft") {

        prevBtn.click();

    }

    else if (e.key === "Escape") {

        closeBtn.click();

    }

});