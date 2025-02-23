
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



const styleChanger = (toggle)=> {

    const styleDefault1 = document.getElementById('style1')
    const styleDefault2 = document.getElementById('style2')
    const style1 = document.createElement('link')
    const style2 = document.createElement('link')

    style1.id = 'style1'
    style2.id = 'style2'
    style1.rel = 'stylesheet'
    style2.rel = 'stylesheet'
    style1.href = 'style.css'
    style2.href = 'style2.css'
    
    if(!toggle){
        document.head.appendChild(style2)
        const styleTemp1 = document.getElementById('style1')  
        if(styleTemp1){
            styleTemp1.remove()
        }
        
    }else{
        document.head.appendChild(style1)
        const styleTemp2 = document.getElementById('style2')  
        if(styleTemp2){
            styleTemp2.remove()
        }
        
    }
    ///REMOVE STYLE DEFAULT
    if(styleDefault1){
        styleDefault1.remove()
    }
    if(styleDefault2){
        styleDefault2.remove()
    }
    console.log(toggle)
}
styleChanger(true)



let rankValueSelected = 5
let themeManualMode = false
let themeStatus = true
icoTheme.style.color = 'rgb(0, 98, 163)'
///ONLY FOR DARK-LIGHT THEME, BASED ON THE PRESENT TIME

/* const today = new Date()
const hour = today.getHours()
if (themeManualMode === false ){
if(hour > 8 && hour < 18){
    icoTheme.innerText = 'change_circle'
    icoTheme.style.color = 'rgb(205, 118, 217)'
    themeStatus = true
    
}else{
    icoTheme.innerText = 'change_circle'
    icoTheme.style.color =  'rgb(0, 98, 163)'
    themeStatus = false
}
} */



icoTheme.addEventListener('click', ()=>{
    themeManualMode = true
    if(themeStatus){
        icoTheme.innerText = 'change_circle'
         icoTheme.style.color = 'rgb(205, 118, 217)'
        themeStatus = false
        styleChanger(themeStatus)
    }else{
        icoTheme.innerText = 'change_circle'
         icoTheme.style.color =  'rgb(0, 98, 163)'
        themeStatus = true
        styleChanger(themeStatus)
    }
})


elementsStarContainer.forEach((element,ind) =>{
    let scaleFactor = "scale(1)"
    let isSelected = false
    element.addEventListener('click',(e)=>{ 
        elementsStarContainer.forEach((e) =>{
            e.style.transform = scaleFactor
        })
        element.style.transform = 'scale(1.3)'
        isSelected = true
        
        rankValueSelected = ind+1
        console.log(rankValueSelected, isSelected)  
    })
    element.addEventListener('mouseover',(e)=>{ 
        element.style.transform = 'scale(1.3)'
       
        console.log( isSelected) 
    })
    element.addEventListener('mouseout',(e)=>{
        if(!isSelected){
            element.style.transform = scaleFactor
        }
        
    
    })
})


nameReview.addEventListener('keydown',()=>{ 
    if(nameReview.value.length >= 1 ){
        nameReview.style.border = 'none'
    }
})


let maxTextLength = 200
textReview.maxLength = maxTextLength
textCountdown.innerText = '0'

textReview.addEventListener('keydown', () => {
    
    if(textReview.value.length >= 1){
        textReview.style.border = 'none'
    }

    
    maxTextLength - textReview.value.length
    console.log(textReview.value.length)
    textCountdown.innerText = (maxTextLength - (textReview.value.length))
    if (textReview.value.length >= 200) {
        
        textReview.value = textReview.value.slice(0, 198)
       //textCountdown.style.display = 'block'
       // textCountdown.style.color = 'red'
        alert('limite caratteri raggiunto')
        console.log('limite parole raggiunto')
    }
})


closeBtn.addEventListener('click', () => {
    rankValueSelected = ''
    dialog.style.display = 'none'
    textReview.value = '';
    nameReview.value = ''
    maxTextLength = 200
    textCountdown.innerText = maxTextLength
    elementsStarContainer.forEach((element) =>{
        element.style.transform = 'scale(1)'
    })
})
addReview.addEventListener('click', () => dialog.style.display = 'flex')

sendBtn.addEventListener('click', () => {
    if(!nameReview.value){
        nameReview.style.border = 'red solid 0.5px'
        return
    }
    if(!textReview.value){
        textReview.style.border = 'red solid 0.5px'
        return
    }

    if(!textReview.value){

    }

    if (textReview.value.length >= 200) {
        textReview.value = textReview.value.slice(0, 200)
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
        maxTextLength = 200
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