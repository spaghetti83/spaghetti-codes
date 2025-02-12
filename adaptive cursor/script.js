const cursor = document.getElementById('cursor')
const elements = document.getElementsByClassName('element')
console.log(elements)
document.addEventListener('mousemove', (event)=>{
   const x = event.clientX
   const y = event.clientY
   cursor.style.transform = 'translate(-50%,-50%)'
   cursor.style.left = `${x}px`
   cursor.style.top = `${y}px`

   console.log(`${x}px`,y)
})

for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('mouseover',(e)=>{
        console.log('OVER')
    })
    
}