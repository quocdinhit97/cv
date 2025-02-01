const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 60;
        let sectionId = current.getAttribute('id')
        const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight && navLink) {
            navLink.classList.add('active-link');
        } else {
            if (navLink) {
                navLink.classList.remove('active-link');
            }
        }
    })
}

window.addEventListener('scroll', scrollActive);


function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    if (this.scrollY >= 200) {
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollTop);

const themeButton = document.getElementById('theme-button');
const themeButtonDesktop = document.getElementById('theme-button-desktop');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun'

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';
const getCurrentDesktopIcon = () => themeButtonDesktop.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
    themeButtonDesktop.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

themeButtonDesktop.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentDesktopIcon());
});

function scaleCv() {
    document.body.classList.add('scale-cv');
}

function removeScaleCv() {
    document.body.classList.remove('scale-cv');
}
let resumeButton = document.getElementById('resume-download');

let opt = {
    margin: 4,
    filename: 'DinhPhungQuocCv.pdf' ,
    image: {type: 'jpeg', quality: 0.98},
    html2canvas: {scale: 4},
    isPDF: {format: 'a4', orientation: 'portrait'}
}
let areaCv = document.getElementById('area-cv');
function generateResume() {
    html2pdf().set(opt).from(areaCv).save();
}

resumeButton.addEventListener('click', () => {
    let width = screen.width;
    if (width >= 968) {
        scaleCv();
        generateResume();
        setTimeout(removeScaleCv, 3000);
    } else  {
        resumeButton.href = "./assets/pdf/DinhPhungQuocCv.pdf";
        resumeButton.download = "";
    }

})
