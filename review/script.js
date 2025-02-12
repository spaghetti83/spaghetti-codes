const addReview = document.getElementById('bubble-container')


addReview.addEventListener('click',()=>{
    
    const strElement = `
         <div class="card">
            <div class="stars-container">
                <div class="box-star">
                    <span class="stars">5</span>
                </div>
            </div>
            <div class="title">Fantastico!!</div>
            <div class="mask-review">
                <div class="review">esperienza enogastronomica eccezionale. Cocktail, sinfonie di sapori e opere d'arte
                    create con maestria. Aperitivo, esperienza culinaria superiore al buffet, con prelibatezze gourmet
                    freschissime e sorprendenti, dai classici rivisitati a creazioni originali. Ogni assaggio,
                    un'esplosione di sapore e cura al dettaglio. Offerta di altissimo livello per un'esperienza
                    sensoriale indimenticabile.</div>
            </div>
            <div class="name-box">
                <div class="name">Marco</div>
            </div>
        </div>
    
    `
})