
/* RESPONSIVE NAV MENU
=========================================== */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


/* HOMEPAGE OLD MOVIE ANIMATION
=========================================== */

// SLIDESHOW
var sceneIndex = 0;
showScenes();

function showScenes() {
    var i;
    var scenes = document.getElementsByClassName("scene");
    for (i = 0; i < scenes.length; i++) {
        scenes[i].style.display = "none";
    }
    sceneIndex++;
    if (sceneIndex > scenes.length) {
        sceneIndex = 1
    }
    scenes[sceneIndex-1].style.display = "flex";
    setTimeout(showScenes, 4000); // 
} 

// SNAP CRACKLE POP
// CANVAS NOISE SCRIPT
const noise = () => {
    let canvas, ctx;
    let wWidth, wHeight;
    let noiseData = [];
    let frame = 0;
    let loopTimeout;

    // create Noise
    const createNoise = () => {
        const idata = ctx.createImageData(wWidth, wHeight);
        const buffer32 = new Uint32Array(idata.data.buffer);
        const len = buffer32.length;

        for (let i = 0; i < len; i++) {
            if (Math.random() < 0.5) {
                buffer32[i] = 0xff000000;
            }
        }
        noiseData.push(idata);
    };

    // play Noise
    const paintNoise = () => {
        if (frame === 9) {
            frame = 0;
        } else {
            frame++;
        }

        ctx.putImageData(noiseData[frame], 0, 0);
    };

    // loop
    const loop = () => {
        paintNoise(frame);
        loopTimeout = window.setTimeout(() => {
            window.requestAnimationFrame(loop);
        }, (1000 / 25));
    };

    // setup
    const setup = () => {
        wWidth = window.innerWidth;
        wHeight = window.innerHeight;

        canvas.width = wWidth;
        canvas.height = wHeight;

        for (let i = 0; i < 10; i++) {
            createNoise();
        }
        loop();
    };

    // reset
    let resizeThrottle;
    const reset = () => {
        window.addEventListener('resize', () => {
            window.clearTimeout(resizeThrottle);
            resizeThrottle = window.setTimeout(() => {
                window.clearTimeout(loopTimeout);
                setup();
            }, 200);
        }, false);
    };

    // init
    const init = (() => {
        canvas = document.getElementById('noise');
        ctx = canvas.getContext('2d');
        setup();
    })();
};
noise();


/* HOMEPAGE ARROW SCROLL DOWN ANIMATION
=========================================== */

function scrollWin() {
    window.scrollBy(0, 850);
}


/*  PROJECT SECTION
    PROJECTS SCROLLING ANIMATION
=========================================== */

const reveal = gsap.utils.toArray('.reveal');
reveal.forEach((text, i) => {
    ScrollTrigger.create({
        trigger: text,
        toggleClass: 'active',
        start: "top 95%",
    })
})


/*  PROJECT SECTION
    MODAL POPUP
=========================================== */

const btns = document.querySelectorAll("[data-target]");  // Targets all data-target popups
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(btn.dataset.target).classList.add("active");
        overlay.classList.add("active");
    });
});

close_modals.forEach((btn) => {
    btn.addEventListener("click", () => {
        const modal = btn.closest(".modal");
        modal.classList.remove("active");
        overlay.classList.remove("active");
    });
});

window.onclick = (event) => {
    if (event.target == overlay) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach((modal) => modal.classList.remove("active"));
        overlay.classList.remove("active");
    }
};
