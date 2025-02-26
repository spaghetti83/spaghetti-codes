class ThemeSelector extends HTMLElement{
    constructor(){
        super()

        const shadow = this.attachShadow({mode: 'open'})

        fetch('./theme-toggle/theme-toggle.html')
        .then(response => response.text())
        .then(html => {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = './theme-toggle/toggle-style.css'
            const script = document.createElement('script')
            script.src = './theme-toggle/transition.js'
            const htmlPage = document.createElement('div')
            htmlPage.innerHTML = html
            
            const toggleEl = htmlPage.querySelector('#main-toggle')
            console.log(shadow)
            shadow.appendChild(link)
            link.addEventListener('load',()=>{ 
                shadow.appendChild(toggleEl)
                shadow.appendChild(script);
                script.addEventListener('load',()=>{
                    exportedScript()
            })
        })
            
        })
        .catch( err => console.log(err))
        
        


    }
}
customElements.define('theme-selector',ThemeSelector)

class WeatherApp extends HTMLElement{
    constructor(){
        super()

        const shadow = this.attachShadow({mode: 'open'})

        fetch('./weather/index.html')
        .then(response => response.text())
        .then(html => {
            shadow.innerHTML = html
            const link = document.createElement('link')
            const script = document.createElement('script')
            link.rel = 'stylesheet'
            link.href = './weather/style.css'
            script.src = './weather/weather-script.js'
            shadow.appendChild(link)
            link.addEventListener('load',()=>{
                console.log('script loaded')
                
                shadow.appendChild(script)
                const btnFind = shadow.querySelector('button')
                btnFind.addEventListener('mouseover',()=> btnFind.style.cursor = 'pointer')
            })
            
        
        })
        .catch( err => console.log(err))

}
}
customElements.define('weather-app',WeatherApp)

class ReviewElement extends HTMLElement{
    constructor(){
        super()

        const shadow = this.shadowRoot({mode: 'open'})
        


    }
}