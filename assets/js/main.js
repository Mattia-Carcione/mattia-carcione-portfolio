/* Aos animation on window loads */
window.addEventListener('load', () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    scrollEvent();
    portfolioFilters();
    backToTop();
    apiMpas();
});

/* Set api key to iframe */
async function apiMpas () {
    const frame = document.getElementById('frame');
    frame.src = `https://www.google.com/maps/embed/v1/place?q=%20Giussago%2C%20PV%2C%20Italia&key=${YOUR_API_KEY}`;
}

/* Button Toggle Header */
const toggleHeader = () => {
    const buttonToggle = document.getElementById('mobile-nav-toggle');
    document.getElementById('header').classList.toggle('header-toggle');
    buttonToggle.classList.toggle('bi-list');
    buttonToggle.classList.toggle('bi-x');
}
const buttonToggle = document.getElementById('mobile-nav-toggle');
buttonToggle.addEventListener('click', toggleHeader);

/* Navigation Links Toggle Header */
const linksToggle = document.getElementsByClassName('toggle-menu');
const header = document.getElementById('header');
for (let i = 0; i < linksToggle.length; i++) {
    linksToggle[i].addEventListener('click', () => {
        header.classList.add('header-toggle');
        buttonToggle.classList.add('bi-list');
        buttonToggle.classList.remove('bi-x');
    });
}

/* Typed js */
const typed = document.getElementById('typed');
let typedStrings = typed.getAttribute('data-typed-items');
typedStrings = typedStrings.split(',')
new Typed('#typed', {
    strings: typedStrings,
    typeSpeed: 50,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 1000
});

/* Navigation Scroll */
function scrollEvent() {
    let windowScroll = window.scrollY;
    const sections = document.getElementsByClassName('checkScroll');
    for (let i = 0; i < sections.length; i++) {
        let sectionOffsetTop = sections[i].offsetTop - 200;
        let sectionOffsetHeight = sections[i].offsetHeight;
        if (windowScroll >= sectionOffsetTop && windowScroll < sectionOffsetTop + sectionOffsetHeight) {
            const allSpan = document.querySelectorAll('a span');
            const allItem = document.querySelectorAll('a i');
            allSpan.forEach(link => {
                link.classList.remove('span-custom');
            });
            allItem.forEach(item => {
                item.classList.remove('i-custom');
            });
            const aSelector = `a[href="#` + sections[i].id + `"] span`;
            const spanLink = document.querySelector(aSelector);
            spanLink.classList.add('span-custom');
            const iSelector = `a[href="#` + sections[i].id + `"] i`;
            const iLink = document.querySelector(iSelector);
            iLink.classList.add('i-custom');
            break;
        }
    }
}
window.addEventListener("scroll", scrollEvent);

/* Back To Top */
function backToTop () {
    const toggleBackToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            toggleBackToTop.classList.add('active');
        } else {
            toggleBackToTop.classList.remove('active');
        }
    })
}

/* Skills animation */
let skilsContent = document.querySelector('.skills-content');
if (skilsContent) {
    new Waypoint({
        element: skilsContent,
        offset: '80%',
        handler: function (direction) {
            let progress = document.querySelectorAll('.progress .progress-bar', true);
            progress.forEach((el) => {
                el.style.width = el.getAttribute('aria-valuenow') + '%'
            });
        }
    })
}

/* Porfolio isotope and filter */
function portfolioFilters () {
    let portfolioContainer = document.querySelector('.portfolio-container');
    if (portfolioContainer) {
        let portfolioFilters = document.querySelectorAll('#portfolio-flters li');
        let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item'
          });
          portfolioFilters.forEach(filter => (
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                portfolioFilters.forEach(function (el) {
                    el.classList.remove('filter-active');
                });
                filter.classList.add('filter-active');
    
                portfolioIsotope.arrange({
                    filter: filter.getAttribute('data-filter')
                });
                portfolioIsotope.on('arrangeComplete', function () {
                    AOS.refresh()
                });
            })
          ))
    }
}

/* Initiate portfolio lightbox */
const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
});