async function testEndpoint(url, method = 'GET', body = null, headers = {}) {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
      };
  
      if (body) {
        options.body = JSON.stringify(body);
      }
  
      const response = await fetch(url, options);
  
      console.log(`Test ${method} ${url}:`);
      console.log(`Status: ${response.status}`);
  
      if (response.headers.get('Content-Type')?.includes('application/json')) {
        const data = await response.json();
        console.log('Response Body:', data);
      } else {
        const text = await response.text();
        console.log('Response Body:', text);
      }
  
      if (!response.ok) {
        console.error(`Test ${method} ${url} failed!`);
      }
  
      console.log('---');
      return response; // Restituisce la risposta per ulteriori analisi se necessario
  
    } catch (error) {
      console.error(`Test ${method} ${url} error:`, error);
      console.log('---');
      return null;
    }
  }
  
  // Esempio di utilizzo
  async function runTests() {
    // Test GET
    await testEndpoint('https://85.235.144.126:3100/location');
  
    // Test POST con dati JSON
    await testEndpoint('https://85.235.144.126:3100/location', 'POST', { location: 'Roma' });
  
    // Test POST su forecast
    await testEndpoint('https://85.235.144.126:3100/forecast', 'POST', { lat: 41.9, lng: 12.5 });
  
    //test endpoint errato
    await testEndpoint('https://85.235.144.126:3100/locazionee');
  
    // Ulteriori test...
  }
  
  runTests();