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

    // Format the data according to the Google Sheet columns
    const queryParams = {
      'Name': data.name,
      'Email': data.email,
      'Phone': data.phone,
      'Event': data.eventTitle,  // שם האירוע
      'Date': data.eventDate,    // תאריך האירוע
      'Time': data.eventTime,    // שעת האירוע
      'Price': data.eventPrice.toString(),
      'Notes': data.notes || ''
    };

    // Convert to URL parameters
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      params.append(key, value);
    });

    console.log('Sending data:', queryParams);

    // Make the request
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
      method: 'GET',
      mode: 'no-cors',
    });

    // Since we're using no-cors, we'll assume success if no error was thrown
    return { success: true };
  } catch (error) {
    console.error('Error sending registration data:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}