const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    // Make the request to the target server
    const response = await fetch('https://es.besoccer.com/equipo/america-cali', {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:8888',
        // Add any additional headers you need for the request
      },
    });

    // Get the response body as text
    const data = await response.text();

    // Set the necessary CORS headers
    const headers = {
      'Access-Control-Allow-Origin': 'http://localhost:8888',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    return {
      statusCode: 200,
      headers,
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
