
const dialog = document.getElementById('dialog-box')
const addReview = document.getElementById('bubble-container')
const reviewContainer = document.getElementById('container')
const container = document.getElementById("container")
const audio = new Audio('./sounds/swing-whoosh-in-room-5-234257.mp3')
const icoTheme = document.getElementById('ico-theme-mode')
//DIALOG BOX
dialog.style.display = 'none'
const nameReview  = document.getElementById('name')
const textReview = document.getElementById('review')
const closeBtn = document.getElementById('close-view-btn')
const sendBtn = document.getElementById('send-review-btn')
const starContainer = document.getElementById('stars-container')
const textCountdown = document.getElementById('text-countdown')
const elementsStarContainer = starContainer.querySelectorAll('.star-btn')
////////////
let rankValueSelected = 5

let themeManualMode = false
let themeStatus = true
const today = new Date()
const hour = today.getHours()
if (themeManualMode === false ){
if(hour > 8 && hour < 18){
    icoTheme.innerText = 'light_mode'
    themeStatus = true
}else{
    icoTheme.innerText = 'dark_mode'
    themeStatus = false
}
}
icoTheme.addEventListener('click', ()=>{
    themeManualMode = true
    if(icoTheme.innerText === 'light_mode' ){
        icoTheme.innerText = 'dark_mode'
        themeStatus = false
    }else{
        icoTheme.innerText = 'light_mode'
        themeStatus = true
    }
})


elementsStarContainer.forEach((element,ind) =>{
    element.addEventListener('click',()=>{ 
        elementsStarContainer.forEach((e) =>{
            e.style.color = 'rgb(205, 118, 217)'
        })
        element.style.color = 'white'
        rankValueSelected = ind+1
        console.log(rankValueSelected)  
    })
    
})

let maxTextLength = 400
textReview.maxLength = maxTextLength
textCountdown.innerText = '0'

textReview.addEventListener('keydown', () => {
    
    maxTextLength - textReview.value.length
    console.log(textReview.value.length)
    textCountdown.innerText = (maxTextLength - (textReview.value.length))
    if (textReview.value.length >= 400) {
        textCountdown.style.display = 'block'
        textReview.value = textReview.value.slice(0, 399)
        textCountdown.style.color = 'rgb(236, 165, 245)'
        textCountdown.style.fontWeight = 'bolder'
        console.log('limite parole raggiunto')
    }
})


closeBtn.addEventListener('click', () => {
    rankValueSelected = ''
    dialog.style.display = 'none'
    textReview.value = '';
    nameReview.value = ''
    maxTextLength = 400
    textCountdown.innerText = maxTextLength
})
addReview.addEventListener('click', () => dialog.style.display = 'flex')

sendBtn.addEventListener('click', () => {
    if (textReview.value.length >= 400) {
        textReview.value = textReview.value.slice(0, 400)
        textCountdown.innerText = maxTextLength - textReview.value.length
        textCountdown.style.color = 'red'
        textCountdown.style.fontWeight = 'bolder'
    } else {

        const newReview = document.createElement('div')
        newReview.classList = 'card'
        newReview.innerHTML = `
        
            <div class="stars-container">
                <div class="box-star">
                    <span class="stars">${rankValueSelected}</span>
                </div>
            </div>
            <div class="mask-review">
                <div class="review">${textReview.value}</div>
            </div>
            <div class="name-box">
                <div class="name">${nameReview.value}</div>
            </div>
        
    
    `
        const firstReview = reviewContainer.firstChild
        reviewContainer.insertBefore(newReview, firstReview)
        rankValueSelected = 5
        textReview.value = '';
        nameReview.value = ''
        maxTextLength = 400
        newReview.style.opacity = 0
        newReview.style.transform = 'translate(0,-100%)'
        dialog.style.display = 'none'
        setTimeout(() => {
            audio.play()
            newReview.scrollIntoView({ behavior: "smooth", block: 'start' })
            newReview.style.opacity = 1
            newReview.style.transform = 'translate(0,0)'
        }, 100)


    }
})