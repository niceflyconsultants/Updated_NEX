/*==================================================
    LOGISTIX
    Premium Website Script
    Version 2.0
==================================================*/

"use strict";

/*==================================================
    APP
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});

/*==================================================
    APPLICATION
==================================================*/

const App = {

init(){

    this.cache();

    this.preloader();

    this.stickyHeader();

    this.mobileMenu();

    this.activeNavigation();

    this.heroSlider();

    this.servicesSlider();

    this.showcaseSlider();

    this.faq();

    this.counter();

    this.partners();

    this.cursor();

    this.scrollProgress();

    this.scrollReveal();

    this.smoothScroll();

    this.resize();

},

/*==================================================
    CACHE DOM
==================================================*/

    cache(){

        this.body=document.body;

        this.header=document.querySelector(".header");

        this.menuToggle=document.querySelector(".menu-toggle");

        this.nav=document.querySelector(".nav-menu");

    },

    /*==================================================
    PRELOADER
==================================================*/

preloader(){

    const preloader = this.qs("#preloader");

    if(!preloader) return;

    const truck = this.qs(".loader-truck");
    const progress = this.qs(".loader-progress-fill");
    const percent = this.qs("#loadingPercent");

    let value = 0;

    const update = () => {

        value++;

        if(progress){

            progress.style.width = value + "%";

        }

        if(truck){

            truck.style.left = value + "%";

        }

        if(percent){

            percent.textContent = value + "%";

        }

        if(value >= 100){

            clearInterval(loader);

            setTimeout(()=>{

                preloader.classList.add("hide");

                setTimeout(()=>{

                    preloader.remove();

                },700);

            },300);

        }

    };

    window.addEventListener("load",()=>{

        loader = setInterval(update,18);

    });

    let loader;

},

/*==================================================
    STICKY HEADER
==================================================*/

stickyHeader(){

    if(!this.header) return;

    let ticking = false;

    const update = () => {

        if(window.scrollY > 80){

            this.header.classList.add("sticky");

        }else{

            this.header.classList.remove("sticky");

        }

        ticking = false;

    };

    update();

    window.addEventListener("scroll",()=>{

        if(!ticking){

            requestAnimationFrame(update);

            ticking = true;

        }

    },{ passive:true });

},

/*==================================================
    MOBILE NAVIGATION
==================================================*/

mobileMenu(){

    if(!this.menuToggle || !this.nav) return;

    const icon = this.menuToggle.querySelector("i");

    const openMenu = () => {

        this.nav.classList.add("active");

        this.body.classList.add("menu-open");

        icon?.classList.replace("fa-bars","fa-xmark");

    };

    const closeMenu = () => {

        this.nav.classList.remove("active");

        this.body.classList.remove("menu-open");

        icon?.classList.replace("fa-xmark","fa-bars");

    };

    const toggleMenu = () => {

        this.nav.classList.contains("active")
            ? closeMenu()
            : openMenu();

    };

    /*==============================
        TOGGLE
    ==============================*/

    this.on(this.menuToggle,"click",(e)=>{

        e.stopPropagation();

        toggleMenu();

    });

    /*==============================
        CLICK OUTSIDE
    ==============================*/

    document.addEventListener("click",(e)=>{

        if(
            !this.nav.contains(e.target) &&
            !this.menuToggle.contains(e.target)
        ){

            closeMenu();

        }

    });

    /*==============================
        ESC KEY
    ==============================*/

    document.addEventListener("keydown",(e)=>{

        if(e.key==="Escape"){

            closeMenu();

        }

    });

    /*==============================
        MENU LINKS
    ==============================*/

    this.nav.querySelectorAll("a").forEach(link=>{

        this.on(link,"click",()=>{

            closeMenu();

        });

    });

},

/*==================================================
    ACTIVE NAVIGATION
==================================================*/

activeNavigation(){

    const links = this.qsa(".nav-menu a");

    if(!links.length) return;

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    /*==============================
        CURRENT PAGE
    ==============================*/

    links.forEach(link=>{

        const href = link.getAttribute("href");

        link.classList.remove("active");

        if(

            href === currentPage ||

            (currentPage === "" && href === "index.html")

        ){

            link.classList.add("active");

        }

    });

    /*==============================
        ONE PAGE SECTIONS
    ==============================*/

    const sections = this.qsa("section[id]");

    if(!sections.length) return;

    const observer = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const id = entry.target.id;

            links.forEach(link=>{

                const href = link.getAttribute("href");

                if(href.startsWith("#")){

                    link.classList.toggle(

                        "active",

                        href === "#" + id

                    );

                }

            });

        });

    },{

        threshold:.55

    });

    sections.forEach(section=>{

        observer.observe(section);

    });

},

/*==================================================
    HERO SLIDER
==================================================*/

heroSlider(){

    const hero = this.qs(".hero");

    if(!hero) return;

    const slider = hero.querySelector(".hero-slider");

    const slides = [...hero.querySelectorAll(".hero-slide")];

    const dots = [...hero.querySelectorAll(".hero-dot")];

    const prev = hero.querySelector(".prev-slide");

    const next = hero.querySelector(".next-slide");

    const current = hero.querySelector(".current-slide");

    const total = hero.querySelector(".total-slide");

    if(!slides.length) return;

    let index = 0;

    let timer;

    let touchStart = 0;

    const DELAY = 6000;

    const updateCounter = ()=>{

        current && (
            current.textContent =
            String(index+1).padStart(2,"0")
        );

    };

    total && (
        total.textContent =
        String(slides.length).padStart(2,"0")
    );

    const updateDots = ()=>{

        dots.forEach((dot,i)=>{

            dot.classList.toggle(
                "active",
                i===index
            );

        });

    };

    const show = (newIndex)=>{

        if(newIndex >= slides.length){

            newIndex = 0;

        }

        if(newIndex < 0){

            newIndex = slides.length-1;

        }

        slides.forEach((slide,i)=>{

            slide.classList.toggle(
                "active",
                i===newIndex
            );

        });

        index = newIndex;

        updateDots();

        updateCounter();

    };

    const nextSlide = ()=>{

        show(index+1);

    };

    const prevSlide = ()=>{

        show(index-1);

    };

    const start = ()=>{

        stop();

        timer = setInterval(nextSlide,DELAY);

    };

    const stop = ()=>{

        clearInterval(timer);

    };

    /*==============================
        BUTTONS
    ==============================*/

    this.on(next,"click",()=>{

        nextSlide();

        start();

    });

    this.on(prev,"click",()=>{

        prevSlide();

        start();

    });

    /*==============================
        DOTS
    ==============================*/

    dots.forEach((dot,i)=>{

        this.on(dot,"click",()=>{

            show(i);

            start();

        });

    });


    /*==============================
        VISIBILITY
    ==============================*/

    document.addEventListener(

        "visibilitychange",

        ()=>{

            document.hidden
                ? stop()
                : start();

        }

    );

    /*==============================
        KEYBOARD
    ==============================*/

    document.addEventListener("keydown",(e)=>{

        if(e.key==="ArrowRight"){

            nextSlide();

            start();

        }

        if(e.key==="ArrowLeft"){

            prevSlide();

            start();

        }

    });

    /*==============================
        SWIPE
    ==============================*/

    slider?.addEventListener(

        "touchstart",

        e=>{

            touchStart =
            e.changedTouches[0].clientX;

        },

        {passive:true}

    );

    slider?.addEventListener(

        "touchend",

        e=>{

            const distance =

            touchStart -

            e.changedTouches[0].clientX;

            if(Math.abs(distance)<60) return;

            distance>0
                ? nextSlide()
                : prevSlide();

            start();

        },

        {passive:true}

    );

    show(0);

    start();

},

/*==================================================
    SERVICES SLIDER
==================================================*/

servicesSlider(){

    const slider = this.qs(".services-slider");

    if(!slider) return;

    const tabs = [...slider.parentElement.querySelectorAll(".service-tab")];

    const slides = [...slider.querySelectorAll(".service-item")];

    if(!slides.length) return;

    let index = 0;

    let timer;

    let touchStart = 0;

    const DELAY = 5000;

    const show = (newIndex)=>{

        if(newIndex >= slides.length){

            newIndex = 0;

        }

        if(newIndex < 0){

            newIndex = slides.length-1;

        }

        slides.forEach((slide,i)=>{

            slide.classList.toggle("active",i===newIndex);

        });

        tabs.forEach((tab,i)=>{

            tab.classList.toggle("active",i===newIndex);

        });

        index = newIndex;

    };

    const next = ()=>{

        show(index+1);

    };

    const previous = ()=>{

        show(index-1);

    };

    const start = ()=>{

        stop();

        timer = setInterval(next,DELAY);

    };

    const stop = ()=>{

        clearInterval(timer);

    };

    /*==============================
        TAB CLICK
    ==============================*/

    tabs.forEach((tab,i)=>{

        this.on(tab,"click",()=>{

            show(i);

            start();

        });

    });

    /*==============================
        HOVER
    ==============================*/

    this.on(slider,"mouseenter",stop);

    this.on(slider,"mouseleave",start);

    /*==============================
        PAGE VISIBILITY
    ==============================*/

    document.addEventListener(

        "visibilitychange",

        ()=>{

            document.hidden
                ? stop()
                : start();

        }

    );

    /*==============================
        TOUCH
    ==============================*/

    slider.addEventListener(

        "touchstart",

        e=>{

            touchStart =
            e.changedTouches[0].clientX;

        },

        {passive:true}

    );

    slider.addEventListener(

        "touchend",

        e=>{

            const distance =

            touchStart -

            e.changedTouches[0].clientX;

            if(Math.abs(distance)<60) return;

            distance>0
                ? next()
                : previous();

            start();

        },

        {passive:true}

    );

    show(0);

    start();

},

/*==================================================
    SHOWCASE SLIDER
==================================================*/

showcaseSlider(){

    const slider = this.qs(".showcase-slider");

    if(!slider) return;

    const slides = [...slider.querySelectorAll(".showcase-slide")];

    const prev = this.qs(".showcase-controls .prev-slide");

    const next = this.qs(".showcase-controls .next-slide");

    const current = this.qs(".showcase-counter .current-slide");

    const total = this.qs(".showcase-counter .total-slide");

    if(!slides.length) return;

    let index = 0;

    let timer;

    let touchStart = 0;

    const DELAY = 5000;

    total && (
        total.textContent =
        String(slides.length).padStart(2,"0")
    );

    const updateCounter = ()=>{

        current && (

            current.textContent =

            String(index+1).padStart(2,"0")

        );

    };

    const show = (newIndex,direction="next")=>{

        if(newIndex>=slides.length){

            newIndex=0;

        }

        if(newIndex<0){

            newIndex=slides.length-1;

        }

        const currentSlide = slides[index];

        const nextSlide = slides[newIndex];

        if(currentSlide===nextSlide) return;

        nextSlide.style.transition="none";

        nextSlide.style.transform =

            direction==="next"

            ? "translateX(100%)"

            : "translateX(-100%)";

        requestAnimationFrame(()=>{

            nextSlide.style.transition="transform .8s ease";

            currentSlide.style.transition="transform .8s ease";

            nextSlide.style.transform="translateX(0)";

            currentSlide.style.transform=

                direction==="next"

                ? "translateX(-100%)"

                : "translateX(100%)";

        });

        index = newIndex;

        updateCounter();

    };

    const nextSlide = ()=>{

        show(index+1,"next");

    };

    const previousSlide = ()=>{

        show(index-1,"prev");

    };

    const start = ()=>{

        stop();

        timer = setInterval(nextSlide,DELAY);

    };

    const stop = ()=>{

        clearInterval(timer);

    };

    /*==============================
        BUTTONS
    ==============================*/

    this.on(next,"click",()=>{

        nextSlide();

        start();

    });

    this.on(prev,"click",()=>{

        previousSlide();

        start();

    });


    /*==============================
        VISIBILITY
    ==============================*/

    document.addEventListener(

        "visibilitychange",

        ()=>{

            document.hidden
                ? stop()
                : start();

        }

    );

    /*==============================
        SWIPE
    ==============================*/

    slider.addEventListener(

        "touchstart",

        e=>{

            touchStart =

            e.changedTouches[0].clientX;

        },

        {passive:true}

    );

    slider.addEventListener(

        "touchend",

        e=>{

            const distance =

            touchStart -

            e.changedTouches[0].clientX;

            if(Math.abs(distance)<60) return;

            distance>0

                ? nextSlide()

                : previousSlide();

            start();

        },

        {passive:true}

    );

    updateCounter();

    start();

},

/*==================================================
    FAQ ACCORDION
==================================================*/

faq(){

    const items = this.qsa(".faq-item");

    if(!items.length) return;

    /*==============================
        INITIAL STATE
    ==============================*/

    items.forEach(item=>{

        const answer = item.querySelector(".faq-answer");

        answer.style.maxHeight =

            item.classList.contains("active")

            ? answer.scrollHeight + "px"

            : "0px";

    });

    /*==============================
        TOGGLE
    ==============================*/

    items.forEach(item=>{

        const button = item.querySelector(".faq-question");

        const answer = item.querySelector(".faq-answer");

        const icon = button.querySelector("i");

        this.on(button,"click",()=>{

            const opened = item.classList.contains("active");

            /* Close All */

            items.forEach(faq=>{

                faq.classList.remove("active");

                faq.querySelector(".faq-answer").style.maxHeight = "0px";

                faq.querySelector(".faq-question i")
                    ?.classList.replace(
                        "fa-chevron-up",
                        "fa-chevron-down"
                    );

            });

            /* Open Current */

            if(!opened){

                item.classList.add("active");

                answer.style.maxHeight =

                    answer.scrollHeight + "px";

                icon?.classList.replace(

                    "fa-chevron-down",

                    "fa-chevron-up"

                );

            }

        });

    });

},

/*==================================================
    COUNTER ANIMATION
==================================================*/

counter(){

    const counters = this.qsa(".counter");

    if(!counters.length) return;

    const animateCounter = (counter)=>{

        const target = parseInt(

            counter.dataset.count,

            10

        );

        const duration = 2000;

        const startTime = performance.now();

        const easeOut = t =>

            1 - Math.pow(1 - t, 3);

        const update = (time)=>{

            const elapsed = time - startTime;

            const progress = Math.min(

                elapsed / duration,

                1

            );

            const value = Math.floor(

                target * easeOut(progress)

            );

            counter.textContent = value;

            if(progress < 1){

                requestAnimationFrame(update);

            }else{

                counter.textContent = target;

            }

        };

        requestAnimationFrame(update);

    };

    const observer = new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            });

        },

        {

            threshold:.35

        }

    );

    counters.forEach(counter=>{

        observer.observe(counter);

    });

},

/*==================================================
    PARTNERS SLIDER
==================================================*/

partners(){

    const slider = this.qs(".partners-slider");

    if(!slider) return;

    /*==============================
        DUPLICATE CONTENT
    ==============================*/

    slider.innerHTML += slider.innerHTML;

    let position = 0;

    let animationId;

    let lastTime = 0;

    const SPEED = 70; // pixels per second

    const animate = (time)=>{

        if(!lastTime){

            lastTime = time;

        }

        const delta = (time - lastTime) / 1000;

        lastTime = time;

        position += SPEED * delta;

        const limit = slider.scrollWidth / 2;

        if(position >= limit){

            position = 0;

        }

        slider.style.transform =

            `translateX(-${position}px)`;

        animationId = requestAnimationFrame(animate);

    };

    const start = ()=>{

        cancelAnimationFrame(animationId);

        lastTime = 0;

        animationId = requestAnimationFrame(animate);

    };

    const stop = ()=>{

        cancelAnimationFrame(animationId);

    };

    /*==============================
        HOVER
    ==============================*/

    this.on(slider,"mouseenter",stop);

    this.on(slider,"mouseleave",start);

    /*==============================
        VISIBILITY
    ==============================*/

    document.addEventListener(

        "visibilitychange",

        ()=>{

            document.hidden
                ? stop()
                : start();

        }

    );

    start();

},

/*==================================================
    CUSTOM CURSOR
==================================================*/

cursor(){

    if(

        !window.matchMedia("(hover:hover)").matches ||

        window.innerWidth < 992

    ) return;

    const dot = this.qs(".cursor-dot");

    const outline = this.qs(".cursor-outline");

    if(!dot || !outline) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let outlineX = mouseX;
    let outlineY = mouseY;

    let animationId;

    /*==============================
        MOUSE MOVE
    ==============================*/

    window.addEventListener("mousemove",(e)=>{

        mouseX = e.clientX;
        mouseY = e.clientY;

        dot.style.transform =

            `translate(${mouseX}px,${mouseY}px)
             translate(-50%,-50%)`;

    },{passive:true});

    /*==============================
        OUTLINE ANIMATION
    ==============================*/

    const animate = ()=>{

        outlineX += (mouseX-outlineX)*0.18;

        outlineY += (mouseY-outlineY)*0.18;

        outline.style.transform =

            `translate(${outlineX}px,${outlineY}px)
             translate(-50%,-50%)`;

        animationId = requestAnimationFrame(animate);

    };

    animate();

    /*==============================
        INTERACTIVE ELEMENTS
    ==============================*/

    const hoverItems = this.qsa(

        "a,\
         button,\
         input,\
         textarea,\
         select,\
         .service-card,\
         .service-btn,\
         .track-btn,\
         .showcase-btn,\
         .hero-btn,\
         .hero-dot"

    );

    hoverItems.forEach(item=>{

        this.on(item,"mouseenter",()=>{

            outline.classList.add("cursor-hover");

        });

        this.on(item,"mouseleave",()=>{

            outline.classList.remove("cursor-hover");

        });

    });

    /*==============================
        CLICK
    ==============================*/

    window.addEventListener("mousedown",()=>{

        dot.classList.add("cursor-click");

        outline.classList.add("cursor-click");

    });

    window.addEventListener("mouseup",()=>{

        dot.classList.remove("cursor-click");

        outline.classList.remove("cursor-click");

    });

    /*==============================
        WINDOW
    ==============================*/

    document.addEventListener("mouseleave",()=>{

        dot.classList.add("cursor-hidden");

        outline.classList.add("cursor-hidden");

    });

    document.addEventListener("mouseenter",()=>{

        dot.classList.remove("cursor-hidden");

        outline.classList.remove("cursor-hidden");

    });

    /*==============================
        VISIBILITY
    ==============================*/

    document.addEventListener("visibilitychange",()=>{

        if(document.hidden){

            cancelAnimationFrame(animationId);

        }else{

            animate();

        }

    });

},

/*==================================================
    SCROLL PROGRESS
==================================================*/

scrollProgress(){

    const progress = this.qs(".scroll-progress");

    if(!progress) return;

    const circle = progress.querySelector(".progress-circle");

    if(!circle) return;

    const radius = circle.r.baseVal.value;

    const circumference = radius * Math.PI * 2;

    circle.style.strokeDasharray = circumference;

    circle.style.strokeDashoffset = circumference;

    let ticking = false;

    const update = ()=>{

        const scrollTop = window.scrollY;

        const pageHeight =

            document.documentElement.scrollHeight -

            window.innerHeight;

        const percent =

            pageHeight > 0

            ? scrollTop / pageHeight

            : 0;

        circle.style.strokeDashoffset =

            circumference -

            circumference * percent;

        progress.classList.toggle(

            "active",

            scrollTop > 300

        );

        ticking = false;

    };

    update();

    window.addEventListener(

        "scroll",

        ()=>{

            if(!ticking){

                requestAnimationFrame(update);

                ticking = true;

            }

        },

        { passive:true }

    );

    /*==============================
        BACK TO TOP
    ==============================*/

    this.on(progress,"click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

},

/*==================================================
    SCROLL REVEAL
==================================================*/

scrollReveal(){

    const elements = this.qsa(

        "[data-reveal],\
         .feature-card,\
         .service-item,\
         .industry-tag,\
         .team-card,\
         .message-content,\
         .news-card"

    );

    if(!elements.length) return;

    const observer = new IntersectionObserver(

        (entries)=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                const element = entry.target;

                const delay =

                    Number(

                        element.dataset.delay || 0

                    );

                setTimeout(()=>{

                    element.classList.add("show");

                },delay);

                observer.unobserve(element);

            });

        },

        {

            threshold:.15,

            rootMargin:"0px 0px -60px 0px"

        }

    );

    

    elements.forEach((element,index)=>{

        element.classList.add("reveal");

        if(!element.dataset.delay){

            element.dataset.delay=index*80;

        }

        observer.observe(element);

    });

},

/*==================================================
    SMOOTH SCROLL
==================================================*/

smoothScroll(){

    const links = this.qsa('a[href^="#"]');

    if(!links.length) return;

    links.forEach(link=>{

        this.on(link,"click",(e)=>{

            const href = link.getAttribute("href");

            if(
                href === "#" ||
                href.length < 2
            ) return;

            const target = this.qs(href);

            if(!target) return;

            e.preventDefault();

            const headerHeight =

                this.header
                ? this.header.offsetHeight
                : 0;

            window.scrollTo({

                top:

                    target.offsetTop -

                    headerHeight,

                behavior:"smooth"

            });

            /*==========================
                CLOSE MOBILE MENU
            ==========================*/

            this.nav?.classList.remove("active");

            this.body.classList.remove("menu-open");

            this.menuToggle
                ?.querySelector("i")
                ?.classList.replace(

                    "fa-xmark",

                    "fa-bars"

                );

        });

    });

},

/*==================================================
    RESIZE MANAGER
==================================================*/

resize(){

    let resizeTimer;

    const update = ()=>{

        /*==============================
            CLOSE MOBILE MENU
        ==============================*/

        if(window.innerWidth > 991){

            this.nav?.classList.remove("active");

            this.body.classList.remove("menu-open");

            this.menuToggle
                ?.querySelector("i")
                ?.classList.replace(
                    "fa-xmark",
                    "fa-bars"
                );

        }

        /*==============================
            CSS VIEWPORT HEIGHT
        ==============================*/

        document.documentElement.style.setProperty(

            "--vh",

            `${window.innerHeight * 0.01}px`

        );

    };

    update();

    window.addEventListener(

        "resize",

        ()=>{

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(update,150);

        },

        {passive:true}

    );

    window.addEventListener(

        "orientationchange",

        ()=>{

            setTimeout(update,300);

        }

    );

},

/*==================================================
    HELPERS
==================================================*/

    qs(selector){

        return document.querySelector(selector);

    },

    qsa(selector){

        return [...document.querySelectorAll(selector)];

    },

    on(element,event,callback){

        if(element){

            element.addEventListener(event,callback);

        }

    },

    add(element,className){

        element?.classList.add(className);

    },

    remove(element,className){

        element?.classList.remove(className);

    },

    toggle(element,className){

        element?.classList.toggle(className);

    },

};