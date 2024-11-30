import { Handler } from '@netlify/functions';

const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/qo7iiei70igppwvghoh1lysgzqoq22hj';

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    if (!event.body) {
      throw new Error('No data provided');
    }

    const data = JSON.parse(event.body);

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'eventId', 'eventTitle'];
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Forward to Make webhook
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        source: 'netlify-function',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Make webhook error: ${await response.text()}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Registration successful',
        registrationId: data.eventId + '-' + Date.now(),
      }),
    };

  } catch (error) {
    console.error('Registration error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
    };
  }
};