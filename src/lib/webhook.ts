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

    // Format date to dd.mm.yyyy
    const dateParts = data.eventDate.split('-');
    const formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
    
    const registrationData = {
      gid: '0',
      name: data.name,
      phone: data.phone,
      email: data.email,
      // Try different variations of column names
      'event': data.eventTitle,
      'שם האירוע': data.eventTitle,
      'אירוע': data.eventTitle,
      'date': formattedDate,
      'תאריך': formattedDate,
      'time': data.eventTime,
      'שעה': data.eventTime
    };

    // Log the data we're sending
    console.log('Event data being sent:', {
      eventTitle: data.eventTitle,
      eventDate: formattedDate,
      eventTime: data.eventTime
    });

    // Build URL parameters
    const params = new URLSearchParams();
    Object.entries(registrationData).forEach(([key, value]) => {
      if (value) {
        params.append(key, value.toString());
      }
    });

    const url = `${SCRIPT_URL}?${params.toString()}`;
    console.log('Full URL:', url);

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