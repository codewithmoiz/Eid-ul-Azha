const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


// Main Code
let tl = gsap.timeline();
    let goatSound = new Audio('./Assets/Goat-sound.mp3');


    // Animate the goat entering from the left
    document.addEventListener('DOMContentLoaded', function(){
    tl.to('.parent #goat', {
        left: -50,
        duration: 1,
        ease: "power3.inOut",
    });

    // Animate the candles falling from the top
    tl.from('.candle', {
        top: -250,
        duration: 1.5,
        ease: "power3.inOut",
        stagger: 0.1,
    });

    // Splitting the hero heading text into individual spans
    let heroHeading = document.querySelector('.parent>h1');
    let spl = heroHeading.textContent.split('');
    function heroTextAnimation() {
        heroHeading.innerHTML = "";
        spl.forEach((txt) => {
            heroHeading.innerHTML += `<span>${txt}</span>`;
        });
    }
    heroTextAnimation();

    // Animate the hero heading text
    tl.from('.parent h1 span', {
        opacity: 0,
        stagger: 0.1,
    });

    // Animate the goat's position and opacity on scroll
    tl.to('.parent #goat', {
        top: 720,
        x: 300,
        transform: "rotateY(180deg) scale(0.8)",
        scrollTrigger: {
            trigger: '.section2',
            scroller: "body",
            start: "top 80%",
            end: "top 20%",
            // markers: true,
            scrub: 3,
        }
    });
    if(window.innerWidth >= 360 && window.innerWidth <= 400){
        tl.to('.parent #goat', {
            top: 750,
            x: 150,
            transform: "rotateY(180deg) scale(0.8)",
            scrollTrigger: {
                trigger: '.section2',
                scroller: "body",
                start: "top 80%",
                end: "top 20%",
                // markers: true,
                scrub: 3,
            }
        }); 
    }
    if(window.innerWidth > 0 && window.innerWidth <= 365){
        tl.to('.parent #goat', {
            top: 750,
            x: 65,
            transform: "rotateY(180deg) scale(0.8)",
            scrollTrigger: {
                trigger: '.section2',
                scroller: "body",
                start: "top 80%",
                end: "top 20%",
                // markers: true,
                scrub: 3,
            }
        }); 
    }
    tl.to('.parent #goat', {
        opacity: 0,
        scrollTrigger: {
            trigger: '.section2',
            scroller: "body",
            start: "top 20%",
            end: "top 10%",
            scrub: 3,
        }
    });

    tl.from('.img-box', {
        left: '-100%',
        scrollTrigger: {
            trigger: '.section2',
            scroller: "body",
            start: "50% 80%",
            end: "90% 20%",
            scrub: 5,
            // pin: true,
            // markers: true,
            onEnter: function() {
                goatSound.play();
            },
            onLeave: function() {
                goatSound.pause();
            },
            onEnterBack: function() {
                goatSound.currentTime = 0;
                goatSound.play();
            },
            onLeaveBack: function() {
                goatSound.pause();
            }
        }
    });

})

// Haseeb's JS
var image = document.querySelector('.cover-image');
    var video = document.querySelector('.cover-video');
    var imageSection = document.querySelector('.image-section');
    var message = document.querySelector('.message');
    var roadAudio = document.getElementById('road-audio');
    var roadImgs = document.querySelector('.road-imgs');

    image.addEventListener('mouseenter', () => {
        image.style.display = 'none';
        video.style.display = 'block'; 
        message.style.opacity = '1',
        video.play();
    });

    document.querySelector('.image-section').addEventListener('mouseleave', () => {
        video.style.display = 'none';
        image.style.display = 'block';
        message.style.opacity = '0',
        video.pause();
        video.currentTime = 0;
    });


    gsap.to(imageSection, {
        clipPath: 'circle(100% at 50% 50%)',
        ease: "power2.inOut",
        scrollTrigger: {
            trigger: imageSection,
            start: "top center",
            end: "top top",
            scrub: 3,
            onUpdate: (self) => {
                if (self.progress > 0.6) {
                    message.style.display = 'block';
                } else {
                    message.style.display = 'none';
                }
            }
        }
    });

    ScrollTrigger.create({
        trigger: ".section-road",
        start: "top center",
        end: "bottom center",
        onEnter: () => roadAudio.play(),
        onLeave: () => roadAudio.pause(),
        onEnterBack: () => roadAudio.play(),
        onLeaveBack: () => roadAudio.pause(),
    });
    
    gsap.to(roadImgs, {
        x: '100vw',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'linear'
    });

    let wishTexts = document.querySelectorAll('.wish-text>p');

function wishAnimation() {
    wishTexts.forEach(wishText => {
        let splText = wishText.textContent.split(' ');
        wishText.innerHTML = "";
        splText.forEach((elem) => {
            if(elem == 'From'){
                wishText.innerHTML += `<span></br>${elem +' '}</span>`;
            }
            else{
                wishText.innerHTML += `<span>${elem + ' '}</span>`;
            }
        });
    });
}

wishAnimation();

let wishNaat = new Audio('./Assets/Wish-audio.m4a')

    gsap.from('.wish-text span', {
        opacity: 0,
        stagger: 0.1,
        scrollTrigger:{
            trigger: '.wish',
            start: "5% 80%",
            end: "40% 25%",
            scrub: 3,
            // markers:true,

            onEnter: function() {
                wishNaat.play();
            },
            onLeave: function() {
                wishNaat.pause();
            },
            onEnterBack: function() {
                wishNaat.currentTime = 0;
                wishNaat.play();
            },
            onLeaveBack: function() {
                wishNaat.pause();
            }
        }
    });
    gsap.from('.masjid img', {
        y: '100%',
        scrollTrigger:{
            trigger: '.wish',
            start: "10% 80%",
            end: "11% 50%",
            // markers: true,
            scrub: 3,
        }
    });

