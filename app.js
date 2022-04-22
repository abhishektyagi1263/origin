const hike = document.querySelector('.hike');
let controller;
let slideScene;
let pageScene
function animateSlides(){
    controller= new ScrollMagic.Controller();
    const sliders = document.querySelectorAll('.slide');
    const nav = document.querySelector('.nav-header');
    sliders.forEach((slide,index,slides)=>{
        const revealing = slide.querySelector('.reveal-img');
        const img=slide.querySelector("img");
        const revealText=slide.querySelector('.reveal-text');
        // gsap.to(revealing,1,{x:"100%", });
        // gsap.to(img,1,{scale:2});
        const sliderT1=gsap.timeline({
            defaults:{duration:1, ease:'power2.inOut'}
        });

        sliderT1.fromTo(revealing,{x:"0%"},{x:"100%"});

        sliderT1.fromTo(img,{scale:2,opacity:0},{scale:1,opacity:1},'-=1');
        sliderT1.fromTo(revealText,{x:"0%"},{x:"100%"},'-=0.1');

        sliderT1.fromTo(nav,{y:"-100%"},{y:"0%"},"-0.5");
        
        // 

        slideScene = new ScrollMagic.Scene({
            triggerElement:slide,
            triggerHook:0.25,
            reverse:false,
            
        })
        .setTween(sliderT1)
        .addIndicators({colorStart:'white',
        colorTrigger:'white',
    name:"slide"
    })
        .addTo(controller);
        // new Animation

        const pageT1=gsap.timeline();
        let nextslide = slides.length-1 === index ? 'end': slide[index+1];
        pageT1.fromTo(nextslide,{y:'0%'},{y:'50%'});
        pageT1.fromTo(slide,{opacity:1,scale:1},{opacity:0,scale:0.5});
        // 
        pageT1.fromTo(nextslide,{y:'50%'},{y:'0%'},'-=0.5');
        // new cn
         pageScene=new ScrollMagic.Scene({
           triggerElement:slide,
           duration: '100%',
           triggerHook:0,
        })
        .addIndicators({colorStart:'white',
        colorTrigger:'white',
    name:"page",indent:200,
    })
    .setPin(slide,{pushFollowers:false})
    .setTween(pageT1)
    .addTo(controller)
    });

}
animateSlides();

// window.addEventListener('scroll',scrollReveal);
// function scrollReveal(){
//     const hikepos = hike.getBoundingClientRect().top();
//     console.log(hikepos);

// };