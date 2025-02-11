'use strict'

// For Opening and Closing Aside Profile Container
const showProfileBtn = document.querySelector(".show-profile-btn");
const showProfileBtnIcon = document.getElementById("show-profile-btn-icon");
const profileElements = [
    document.querySelector(".aside-profile"),
    document.querySelector(".profile-info-container"),
    document.querySelector(".social-media-btns"),
    document.querySelector("aside hr:nth-of-type(2)")
];

const toggleIcon = (isOpen) => {
    if (isOpen) {
        showProfileBtnIcon.classList.remove("ri-arrow-down-s-line");
        showProfileBtnIcon.classList.add("ri-arrow-up-s-line");
    } else {
        showProfileBtnIcon.classList.add("ri-arrow-down-s-line");
        showProfileBtnIcon.classList.remove("ri-arrow-up-s-line");
    }
};

showProfileBtn.addEventListener("click", () => {
    const isOpen = showProfileBtn.classList.toggle("toggled");
    
    profileElements.forEach(element => {
        element.classList.toggle("open");
    });

    toggleIcon(profileElements[0].classList.contains("open"));
});


// For Custom Dropdown Menu(Portfolio Section)
const dropdownBtn = document.querySelector(".dropdown-placeholder");
const dropdownCategoryList = document.querySelector(".dropdown-categories");
const dropdownCategories = document.querySelectorAll(".dropdown-categories button");

// Filtering Portfolio Projects according to their Project Type
const projectItems = document.querySelectorAll(".portfolio-items");
const emptyCategoryPrompt = document.querySelector(".project-error-prompt");

dropdownBtn.addEventListener("click", () => {
    dropdownCategoryList.classList.toggle("open");

    // Dropdown Arrow Icon Interactivity
    const icon = dropdownBtn.querySelector("i");
    if (dropdownCategoryList.classList.contains("open")) {
        icon.classList.remove("ri-arrow-down-s-line");
        icon.classList.add("ri-arrow-up-s-line");
    } else {
        icon.classList.add("ri-arrow-down-s-line");
        icon.classList.remove("ri-arrow-up-s-line");
    }
});

// Add Dropdown Category Active State Button on first ("All") button
if (dropdownCategories.length > 0) {
    dropdownCategories[0].classList.add("active");
}

dropdownCategories.forEach((categoryBtn) => {
    categoryBtn.addEventListener("click", () => {
        dropdownBtn.querySelector("span").textContent = categoryBtn.textContent;
        dropdownCategoryList.classList.remove("open");

        // Dropdown Arrow Icon Interactivity
        dropdownBtn.querySelector("i").classList.add("ri-arrow-down-s-line");
        dropdownBtn.querySelector("i").classList.remove("ri-arrow-up-s-line");

        // Update Dropdown Category Active State Button by removing the previous active state category button(JS LINE: 57)
        dropdownCategories.forEach((btn) => {
            btn.classList.remove("active");
        });
        categoryBtn.classList.add("active");

        // Filtering Logic
        const categoryFilter = categoryBtn.getAttribute("data-category-filter");
        let isCategoryHasProject = false;

        projectItems.forEach((projectItem) => {
            const projectType = projectItem.querySelector("p").textContent.toLowerCase();

            if (categoryFilter === "all" || projectType.includes(categoryFilter)) {
                projectItem.style.display = "grid";
                isCategoryHasProject = true;
            } else {
                projectItem.style.display = "none";
            }
        });

        emptyCategoryPrompt.style.display = isCategoryHasProject ? "none" : "block";
    });
});



//Enabling and Disabling Contact Form
const contactForm = document.querySelector(".contact-form");
const submitBtn = document.querySelector(".submit-btn");
const inputData = document.querySelectorAll("[data-inputForm]");

for(let i = 0; i < inputData.length; i++){
    inputData[i].addEventListener("input", () => {
        if(contactForm.checkValidity()){
            submitBtn.removeAttribute("disabled");
        } else{
            submitBtn.setAttribute("disabled", "");
        }
    });
}


// Switch Sections using Navigation Bar
const sections = document.querySelectorAll(".main-contents section");
const navBtns = document.querySelectorAll(".nav-bar button:not(.theme-switcher):not(.settings-btn)");

function showSection(currentSection){
    sections.forEach((section, sectionIndex) => {
        if(sectionIndex === currentSection){
            section.classList.add("show-section");
        } else{
            section.classList.remove("show-section");
        }
    });

    navBtns.forEach((navBtn, navBtnIndex) => {
        if(navBtnIndex === currentSection){
            navBtn.classList.add("active");
        } else{
            navBtn.classList.remove("active");
        }
    });
}

navBtns.forEach((navBtn, navBtnIndex) => {
    navBtn.addEventListener("click", () => {
        showSection(navBtnIndex);
    });
});

showSection(0);


// Show Theme Switch Button on Larger Screens(1024px and above)
const themeSettings = document.querySelector(".settings-btn");

themeSettings.addEventListener("click", () => {
    themeSwitchBtn.classList.toggle("open"); //The themeSwitchBtn is already declared in JS line: 162
    themeSettings.classList.toggle("toggled");
});

// Close themeSwitchBtn when clicking outside
document.addEventListener("click", (event) => {
    const isClickInside = themeSwitchBtn.contains(event.target) || themeSettings.contains(event.target);
    
    if (!isClickInside) {
        themeSwitchBtn.classList.remove("open");
        themeSettings.classList.remove("toggled");
    }
});



// Theme Switch with Local Storage Functionality
const themeSwitchBtn = document.querySelector(".theme-switcher");
const themeSwitchBtnIcon = document.querySelector(".theme-switcher i"); 

/* Dark Mode */
function enableDarkMode(){
    document.body.classList.add("dark-mode");
    themeSwitchBtnIcon.classList.remove("ri-moon-clear-fill");
    themeSwitchBtnIcon.classList.add("ri-sun-fill");

    // Save Current Theme Mode
    localStorage.setItem("isDarkModeActive", "active");

    // Changing the theme of the project image
    changeProjectImages("darkmode");
}

// Light Mode
function disableDarkMode(){
    document.body.classList.remove("dark-mode");
    themeSwitchBtnIcon.classList.add("ri-moon-clear-fill");
    themeSwitchBtnIcon.classList.remove("ri-sun-fill");
    // Save Current Theme Mode
    localStorage.setItem("isDarkModeActive", "notActive");
    // Changing the theme of the project image
    changeProjectImages("lightmode");
}

themeSwitchBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // This Theme Icon Interactivity can be only seen in 1024px and above
    themeSwitchBtnIcon.classList.toggle("toggled");

    if(document.body.classList.contains("dark-mode")){
        enableDarkMode();
    } else{
        disableDarkMode();
    }
});

// Load Current Theme
function loadCurrentTheme(){
    const themeModeData = localStorage.getItem("isDarkModeActive") || [];

    if(themeModeData === "active"){
        enableDarkMode();
    } else{
        disableDarkMode();
    }
}
loadCurrentTheme();


// Change the Project Image with Darkmode functionality if depending to the Current Theme
function changeProjectImages(mode) {
    const projectImages = document.querySelectorAll(".portfolio-items img");

    projectImages.forEach((projectImage) => {
        const currentSrc = projectImage.src;
        if (mode === "darkmode") {
            projectImage.src = currentSrc.replace("lightmode", "darkmode");
        } else {
            projectImage.src = currentSrc.replace("darkmode", "lightmode");
        }
    });
}