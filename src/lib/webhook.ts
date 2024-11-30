export interface RegistrationData {
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  eventDate: string;
  eventTime: string;
  eventPrice: number;
  notes?: string;
}

export async function sendRegistrationToWebhook(data: RegistrationData) {
  try {
    // Base URL of your Google Apps Script
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXL3LyOs7jGf1t1MJ55PDsD7qnwHqkJeSXefNq55mw9ALYfLZ9YUcaH0xCMl8a7G3mFg/exec';
    
    // Current timestamp in Israel timezone
    const timestamp = new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' });

    // Create the parameters object matching exact column names in your sheet
    const params = new URLSearchParams({
      'Timestamp': timestamp,
      'Full Name': data.name,
      'Email Address': data.email,
      'Phone Number': data.phone,
      'Event Name': data.eventTitle,
      'Event Date': data.eventDate,
      'Event Time': data.eventTime,
      'Event Price': data.eventPrice.toString(),
      'Comments': data.notes || '',
    });

    // Log the URL being sent for debugging
    const fullUrl = `${SCRIPT_URL}?${params.toString()}`;
    console.log('Sending request to:', fullUrl);

    // Make the request
    const response = await fetch(fullUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // For debugging
    console.log('Response status:', response.status);
    const responseText = await response.text();
    console.log('Response body:', responseText);

    return { success: true };
  } catch (error) {
    console.error('Error sending registration:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}