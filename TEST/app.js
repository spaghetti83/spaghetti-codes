const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware per il parsing del JSON nel corpo delle richieste

// Endpoint principale
app.post('/mainEndpoint', (req, res) => {
  console.log('Richiesta a /mainEndpoint ricevuta', req.body);

  // Endpoint interno simulato
  app.post('/mainEndpoint/internalEndpoint', (req, resInternal) => {
    console.log('Richiesta a /mainEndpoint/internalEndpoint ricevuta', req.body);
    resInternal.json({ message: 'Richiesta interna ricevuta con successo' });
  });

  res.json({ message: 'Richiesta principale ricevuta con successo' });
});

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
