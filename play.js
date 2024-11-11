function hackPlayer() {
    console.log('爱壹帆TV助手 hack success.')
    const ad_class = ['pggf', 'dabf', 'overlay-logo']

// 1.remove
// ad
    for (let i in ad_class) {
        let ad = document.getElementsByClassName(ad_class[i])
        ad instanceof HTMLCollection && ad.length > 0 && ad[0].remove()
    }

// 3.add action
    const video_player = document.getElementById('video_player')
    const main_player = document.getElementById('main-player')
    const controls = document.getElementsByTagName('vg-controls')

    console.log(main_player, typeof main_player)

    if (!main_player instanceof HTMLElement) return
    if (!video_player instanceof HTMLElement) return
    if (!controls instanceof HTMLCollection) return
    const action_wrap = controls[1]
    if (action_wrap === undefined) return


    const pictureInPicture = document.createElement('div')
    pictureInPicture.className = 'control-item'
    pictureInPicture.innerText = '画中画'
    pictureInPicture.style.marginRight = '10px'
    pictureInPicture.style.color = '#ffffffb3'
    pictureInPicture.style.cursor = 'pointer'
    pictureInPicture.addEventListener('click', function () {
        video_player.requestPictureInPicture().then(() => {
            console.log('requestPictureInPicture success.')
        })
    })
    action_wrap.lastChild.appendChild(pictureInPicture)

    const fullWindow = document.createElement('div');
    fullWindow.className = 'control-item'
    fullWindow.innerText = '网页全屏'
    fullWindow.style.marginRight = '10px'
    fullWindow.style.color = '#ffffffb3'
    fullWindow.style.cursor = 'pointer'
    fullWindow.addEventListener('click', function () {
        if (main_player.classList.contains('fullscreen')) {
            main_player.classList.remove('fullscreen')
            document.body.style.overflow = ''
        } else {
            main_player.classList.add('fullscreen')
            document.body.style.overflow = 'hidden'
        }
    })
    action_wrap.lastChild.appendChild(fullWindow)
}

function startHackPlayer() {
    let sh = setInterval(() => {
        let main_player = document.getElementById('main-player')
        if (main_player instanceof HTMLElement && !main_player.hasAttribute('hack-success')) {
            main_player.setAttribute('hack-success', 'true')
            try {
                hackPlayer()
            } catch (e) {
                console.log('hack fail,', e)
            }
            clearInterval(sh)
        }
    }, 500)
}

function isPlayPage() {
    return location.href.includes('/play/')
}

startHackPlayer()

let previousUrl = ''
const observer = new MutationObserver(function (mutations) {
    if (location.href !== previousUrl) {
        previousUrl = location.href
        if (isPlayPage()) {
            startHackPlayer()
        }
    }
});
observer.observe(document, {subtree: true, childList: true})