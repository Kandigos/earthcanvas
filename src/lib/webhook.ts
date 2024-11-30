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
    // The base URL for your Google Apps Script
    const BASE_URL = 'https://script.google.com/macros/s/AKfycbwXL3LyOs7jGf1t1MJ55PDsD7qnwHqkJeSXefNq55mw9ALYfLZ9YUcaH0xCMl8a7G3mFg/exec';
    
    // Encode the data properly
    const encodedData = encodeURIComponent(JSON.stringify({
      name: data.name,
      phone: data.phone,
      email: data.email,
      event: data.eventTitle,
      date: data.eventDate,
      time: data.eventTime
    }));

    // Build the URL with the encoded data
    const url = `${BASE_URL}?data=${encodedData}`;
    
    console.log('Sending data:', {
      name: data.name,
      phone: data.phone,
      email: data.email,
      event: data.eventTitle,
      date: data.eventDate,
      time: data.eventTime
    });

    // Make the request
    const response = await fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-cache',
    });

    console.log('Request sent successfully');
    return { success: true };

  } catch (error) {
    console.error('Error sending data:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}