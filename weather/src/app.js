require('dotenv').config({ path: 'config.env'})
const express = require('express')
const cors = require('cors')
const app  = express()
const port  = 3100

app.use(cors())
app.use(express.json())
const apikey = process.env.API_KEY
const geoApiKey = process.env.GEO_API_KEY

app.listen(port, '0.0.0.0', ()=>{
    console.log('server in ascolto su porta: ',port)
} )

setInterval(()=>{
    timerFun()
}, 5000)
const timerFun = ()=>{console.log('STILL RUNNING')}

app.get('/spaghetti-codes/test', (req,res)=>{
    if (req.body){
        console.log('RICHIESTA RICEVUTA', req.body)
    }
    res.send({message: "questa e'la risposta"})
})


app.post('/location', (req,res)=>{
    console.log('GOT REQUEST TO ENDPOINT: LOCATION',req.body)
    const location = req.body.location
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${geoApiKey}`;
    const options = {
        method: 'GET',
        headers: { 'Content-Type' : 'application/json'}
    }
    fetch(url, options)
    .then(res => res.json())
    .then(data => {
        if(req.body){
            console.log('LOCATION REQUEST: ',req.body)
        }
        if(data.status === 'OK'){
            res.send(data)
        }else{
            res.send({error: 'no location found'})
        }
    })
    .catch(err => res.send(err)); 
})


app.post('/forecast', (req,res)=>{
    console.log('GOT REQUEST TO ENDPOINT: FORECAST',req.body)
    const lat = req.body.lat
    const lng = req.body.lng
    console.log('WEATHER REQUEST',req.body )
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lng}&apikey=${apikey}`;
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'accept-encoding': 'deflate, gzip, br' }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log('RES FROM WEATHER API: ', res.body)
            res.send(json)
        
        })
        .catch(err => console.error(err));
})



