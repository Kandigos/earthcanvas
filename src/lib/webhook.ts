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
    
    // Format date and time for better readability in Google Sheets
    const formattedDate = new Date().toLocaleString('he-IL', { 
      timeZone: 'Asia/Jerusalem',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Prepare the form data with all event details
    const formData = new FormData();
    formData.append('timestamp', formattedDate);
    formData.append('eventTitle', data.eventTitle);
    formData.append('eventDate', data.eventDate);
    formData.append('eventTime', data.eventTime);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('eventPrice', data.eventPrice.toString());
    if (data.notes) formData.append('notes', data.notes);

    console.log('Sending registration data to Google Script:', {
      eventTitle: data.eventTitle,
      eventDate: data.eventDate,
      eventTime: data.eventTime,
      name: data.name,
      email: data.email,
      phone: data.phone
    });

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