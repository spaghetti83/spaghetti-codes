async function testEndpoints() {
  console.log('test Endpoints avviato...')
    try {
      // Richiesta all'endpoint principale
      const mainResponse = await fetch('http://localhost:3100/mainEndpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: 'Test principale' }),
      });
  
      const mainData = await mainResponse.json();
      console.log('Risposta dall\'endpoint principale:', mainData);
  
      // Richiesta all'endpoint interno
      const internalResponse = await fetch('http://localhost:3100/mainEndpoint/internalEndpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: 'Test interno' }),
      });
  
      const internalData = await internalResponse.json(); 
      console.log('Risposta dall\'endpoint interno:', internalData);
    } catch (error) {
      console.error('Errore durante il test degli endpoint:', error);
    }
  }
  
  testEndpoints();