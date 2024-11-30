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
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXL3LyOs7jGf1t1MJ55PDsD7qnwHqkJeSXefNq55mw9ALYfLZ9YUcaH0xCMl8a7G3mFg/exec';
    
    // Create URL with parameters for Google Sheet
    const params = new URLSearchParams({
      'event': data.eventTitle,
      'date': data.eventDate,
      'time': data.eventTime,
      'name': data.name,
      'email': data.email,
      'phone': data.phone,
      'notes': data.notes || '',
      'price': data.eventPrice.toString()
    });

    console.log('Sending data with params:', params.toString());

    const fullUrl = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
    
    const response = await fetch(fullUrl, {
      method: 'GET', // Changed to GET to work better with Google Scripts
      mode: 'no-cors',
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending registration data:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}