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

    // Format date for better readability
    const formattedDate = new Date(data.eventDate).toLocaleDateString('he-IL');
    
    // Build the submission data
    const registrationData = {
      gid: '0',
      name: data.name,
      phone: data.phone,
      email: data.email,
      'פסטיבל/סדנא': data.eventTitle,  // Event column title in Hebrew
      'תאריך': formattedDate,            // Date column title in Hebrew
      'שעה': data.eventTime              // Time column title in Hebrew
    };

    // Convert to URL parameters
    const params = new URLSearchParams();
    Object.entries(registrationData).forEach(([key, value]) => {
      params.append(key, value ? value.toString() : '');
    });

    // Build the full URL
    const url = `${SCRIPT_URL}?${params.toString()}`;
    console.log('Sending data:', registrationData);
    console.log('Request URL:', url);

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