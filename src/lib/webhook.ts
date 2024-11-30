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
    
    // Format timestamp for Israel timezone
    const timestamp = new Date().toLocaleString('he-IL', { 
      timeZone: 'Asia/Jerusalem',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Create URL with all parameters
    const params = new URLSearchParams({
      'timestamp': timestamp,
      'name': data.name,
      'email': data.email,
      'phone': data.phone,
      'event': data.eventTitle,
      'date': data.eventDate,
      'time': data.eventTime,
      'price': data.eventPrice.toString(),
      'notes': data.notes || ''
    });

    const fullUrl = `${SCRIPT_URL}?${params.toString()}`;
    console.log('Sending request to:', fullUrl);

    // Use no-cors mode to avoid CORS issues
    const response = await fetch(fullUrl, {
      method: 'GET',
      mode: 'no-cors',
    });

    // Since we're using no-cors, we'll assume success if no error is thrown
    console.log('Request sent successfully');
    return { success: true };
    
  } catch (error) {
    console.error('Error sending registration:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}