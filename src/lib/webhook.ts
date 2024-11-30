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
    
    // Format the data for the Google Sheet
    const formData = new FormData();
    formData.append('eventId', data.eventId);
    formData.append('eventTitle', data.eventTitle);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('registrationDate', data.registrationDate);
    formData.append('eventDate', data.eventDate);
    formData.append('eventTime', data.eventTime);
    formData.append('eventPrice', data.eventPrice.toString());
    if (data.notes) formData.append('notes', data.notes);

    console.log('Sending registration data to Google Script');

    const response = await fetch(`${GOOGLE_SCRIPT_URL}?gid=0`, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
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