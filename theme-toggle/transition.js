
const toggleMain = document.getElementById('main-toggle')
const circle = document.getElementById('circle')
const sky = document.getElementById('tgl-box')
const stars = document.getElementsByClassName('star')
const cloud = document.getElementsByClassName('cloud')
/* circle.style.transition = '0.4s ease-in-out'
sky.style.transition = '0.4s ease-in-out' */
toggleMain.addEventListener('touchstart' && 'click', () => {
    
    if (circle.classList.contains('sun')) {
        circle.classList.remove('sun')
        circle.style.top = '150%'
       /*  circle.style.boxShadow = 'inset 0px -20px 20px 15px #EA3FB8'
        sky.style.boxShadow = 'inset 0px -20px 20px 15px #EA3FB8' */
        setTimeout(() => {
            circle.classList.add('moon')
            circle.style.backgroundColor = '#FFFCE6'
            circle.style.boxShadow = 'inset 0px -20px 20px 15px #D3C59B'
            circle.style.top = '50%'
            sky.style.boxShadow = 'inset 0px -20px 20px  rgba(1, 57, 153,0.6)'
            sky.style.backgroundColor = '#002971'
           for (let i = 0; i < stars.length; i++) {
            stars[i].style.transition = '0.8s ease-in-out'
            stars[i].style.backgroundColor = 'white'
            console.log(stars[i])
           }
        }, 400)
    }else{
        circle.style.top = '150%'
        setTimeout(() => {
            circle.classList.add('sun')
            circle.style.top = '50%'
            circle.style.backgroundColor = '#FFDF00'
            circle.style.boxShadow = 'inset 20px 0px 15px 15px #FEC108'
            circle.style.top = '50%'
            sky.style.boxShadow = 'inset 0px 20px 20px 15px  rgba(1, 57, 153,0.6)'
            sky.style.backgroundColor = '#74A7FF'
            for (let i = 0; i < stars.length; i++) {
                stars[i].style.backgroundColor = 'transparent'
                console.log(stars[i])
               }
        }, 400)
    }
})
