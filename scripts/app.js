const sideToggle = document.querySelector('.js-side-toggle');
const side = document.querySelector('.js-side');
const mainContent = document.querySelector('.js-main');

sideToggle.addEventListener('click', () => {
    side.classList.toggle('minify');
    mainContent.classList.toggle('wide');
})

// ANIMATION
const tl = gsap.timeline();

function pageAnimIn2(container){
    return tl.to(container.querySelector('.preloader--top') , {
        duration: .5,
        scaleX: 1,
        transformOrigin: 'bottom left'
    })
    .to(container.querySelector('.preloader--bottom'), {
        duration: .5,
        scaleX: 1,
        transformOrigin: 'bottom right'
    }, '<')
}

function pageAnimOut2(container) {
    return tl.from(container.querySelector('.preloader--top') , {
        duration: .5,
        scaleX: 1,
        transformOrigin: 'bottom right'
    })
    .from(container.querySelector('.preloader--bottom'), {
        duration: .5,
        scaleX: 1,
        transformOrigin: 'bottom left'
    }, '<')
    .call(animContent, [container])
}

// function pageAnimIn(container){
//     return tl.to(container.querySelector('.preloader-round'), {
//         scale: 2,
//         duration: .5
//     })
// }

// function pageAnimOut(container) {
//     return tl
//     .from(container.querySelector('.preloader-round'), {
//         scale: 2,
//         duration: .5
//     })
//     .call(animContent, [container])
// }

function animContent(container) {
    let $h1 = container.querySelector('h1')
    let $p = container.querySelector('p')

    return tl.fromTo($h1, {
        translateY: 30,
        opacity: 0
    }, {
        translateY: 0,
        opacity: 1
    })
    .fromTo($p, {
        translateY: 30,
        opacity: 0,
        stagger: .2
    }, {
        translateY: 0,
        opacity: 1,
        stagger: .2
    })
}

function activeNavItem(data) {
    document.querySelectorAll('.nav__list-link').forEach(el => {
        el.classList.remove('active')
    })
    data.trigger.classList.add('active')
}

barba.init({
    preventRunning: true,
    transitions: [
        {
            name: 'base',
            async leave(data) {
                activeNavItem(data)
                await pageAnimIn2(data.current.container)
                data.current.container.remove()
            },
            async enter(data) {
                await pageAnimOut2(data.next.container)
            },
            async once(data) {
                await animContent(data.next.container)
            }
        }
    ],
    views: [
        {
            namespace: 'favourite',
            afterEnter() {
               someCode() 
            }
        }
    ]
});

document.querySelectorAll('.nav__list-link').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault()
    })
})
function someCode() {
    console.log('privet');
}
