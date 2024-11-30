import { Handler } from '@netlify/functions';

interface RegistrationData {
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  participants: number;
  specialRequests?: string;
  registrationDate: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  // מספר טלפון ישראלי: 10 ספרות, מתחיל ב-05 או ב-07
  const phoneRegex = /^0(5|7)[0-9]{8}$/;
  return phoneRegex.test(phone);
}

function validateRegistrationData(data: any): { isValid: boolean; error?: string } {
  console.log('Validating registration data:', JSON.stringify(data, null, 2));

  // בדיקת שדות חובה
  const requiredFields = ['eventId', 'eventTitle', 'name', 'email', 'phone'] as const;
  for (const field of requiredFields) {
    if (!data[field]) {
      return { isValid: false, error: `Missing required field: ${field}` };
    }
    if (typeof data[field] !== 'string') {
      return { isValid: false, error: `Invalid type for ${field}: expected string` };
    }
  }

  // בדיקת אורך שדות
  if (data.name.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }

  // בדיקת פורמט אימייל
  if (!validateEmail(data.email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  // בדיקת פורמט טלפון
  if (!validatePhone(data.phone)) {
    return { isValid: false, error: 'Invalid phone format (must be Israeli phone number)' };
  }

  // בדיקת מספר משתתפים
  if ('participants' in data) {
    if (typeof data.participants !== 'number' || data.participants < 1 || data.participants > 100) {
      return { isValid: false, error: 'Invalid number of participants (must be between 1 and 100)' };
    }
  }

  // בדיקת תאריך רישום
  if (data.registrationDate) {
    try {
      new Date(data.registrationDate);
    } catch {
      return { isValid: false, error: 'Invalid registration date format' };
    }
  }

  return { isValid: true };
}

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // Check method
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  console.log('Processing registration request...');
  
  try {
    // Check for request body
    if (!event.body) {
      throw new Error('No data provided');
    }

    // Parse and validate request data
    const data = JSON.parse(event.body);
    console.log('Received data:', JSON.stringify(data, null, 2));

    const validation = validateRegistrationData(data);
    if (!validation.isValid) {
      console.log('Validation failed:', validation.error);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: validation.error }),
      };
    }

    const registrationData: RegistrationData = {
      eventId: data.eventId,
      eventTitle: data.eventTitle,
      name: data.name,
      email: data.email,
      phone: data.phone,
      participants: data.participants || 1,
      specialRequests: data.specialRequests,
      registrationDate: data.registrationDate || new Date().toISOString(),
    };

    // Send to Make webhook
    const makeResponse = await fetch(process.env.MAKE_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...registrationData,
        source: 'netlify-function',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!makeResponse.ok) {
      const errorText = await makeResponse.text();
      console.error('Make webhook error:', errorText);
      throw new Error(`Make webhook error: ${errorText}`);
    }

    console.log('Registration successful');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Registration successful',
        registrationId: `${data.eventId}-${Date.now()}`,
      }),
    };

  } catch (error) {
    console.error('Registration error:', error);

    // שגיאת parsing
    if (error instanceof SyntaxError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON format' }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
    };
  }
};