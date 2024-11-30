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
    
    // Create the parameters exactly matching the sheet columns
    const params = new URLSearchParams({
      'name': data.name,
      'phone': data.phone,
      'email': data.email,
      'event': data.eventTitle,    // שם האירוע
      'date': data.eventDate,      // תאריך
      'time': data.eventTime       // שעה
    });

    // Log the data being sent
    console.log('Registration data:', {
      name: data.name,
      phone: data.phone,
      email: data.email,
      event: data.eventTitle,
      date: data.eventDate,
      time: data.eventTime
    });

    const fullUrl = `${SCRIPT_URL}?${params.toString()}`;
    console.log('Sending request to:', fullUrl);

    const response = await fetch(fullUrl, {
      method: 'GET',
      mode: 'no-cors'
    });

    console.log('Request sent');
    return { success: true };

  } catch (error) {
    console.error('Error sending registration:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}