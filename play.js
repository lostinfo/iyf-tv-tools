function initTools() {
    console.log('爱壹帆TV助手 load success.')
    const video_wrapper_class = 'video-player'
    const ad_class = ['pggf', 'dabf', 'overlay-logo']

// 1.remove
// ad
    for (let i in ad_class) {
        document.getElementsByClassName(ad_class[i]) && document.getElementsByClassName(ad_class[i])[0].remove()
    }

// 2.resize player
    const video_player_wrapper = document.getElementsByClassName(video_wrapper_class)[0]
    video_player_wrapper.style.width = '100%'

// 3.add action
    const video_player = document.getElementById('video_player')
    const main_player = document.getElementById('main-player')
    const action_wrap = document.getElementsByTagName('vg-controls')[1]

    const pictureInPicture = document.createElement('div');
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

let sh = setInterval(() => {
    if (document.getElementById('main-player')) {
        initTools()
        clearInterval(sh)
    }
}, 200)