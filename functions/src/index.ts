import * as functions from 'firebase-functions';
import * as cors from 'cors';

const corsHandler = cors({
  origin: [
    'https://earthcanvas-kk.netlify.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ]
});

export const forwardRegistration = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      // Log incoming request
      console.log('Received registration request:', request.body);

      if (request.method === 'OPTIONS') {
        // Handle CORS preflight request
        response.status(204).send('');
        return;
      }

      if (request.method !== 'POST') {
        response.status(405).send('Method Not Allowed');
        return;
      }

      const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/qo7iiei70igppwvghoh1lysgzqoq22hj';

      const makeResponse = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.body),
      });

      const responseText = await makeResponse.text();
      console.log('Make.com response:', responseText);

      if (!makeResponse.ok) {
        throw new Error(`Make.com responded with status: ${makeResponse.status}, body: ${responseText}`);
      }

      response.status(200).send({ success: true });
    } catch (error) {
      console.error('Error processing registration:', error);
      response.status(500).send({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  });
});