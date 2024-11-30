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
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXL3LyOs7jGf1t1MJ55PDsD7qnwHqkJeSXefNq55mw9ALYfLZ9YUcaH0xCMl8a7G3mFg/exec';

    // Prepare registration data
    const registrationData = {
      gid: '0',
      name: data.name,
      phone: data.phone,
      email: data.email,
      event: data.eventTitle,
      date: data.eventDate,
      time: data.eventTime
    };

    // Build URL parameters
    const params = new URLSearchParams(registrationData);
    const url = `${SCRIPT_URL}?${params.toString()}`;
    
    console.log('Sending registration to:', url);

    const response = await fetch(url, {
      method: 'GET',
      mode: 'no-cors',
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending registration:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}