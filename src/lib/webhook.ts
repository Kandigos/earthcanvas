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
    // The new Apps Script URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwfQLzH7C9XkmhI4Bq6RBkIlQP8o47a_OlOTlE0K1dQt-iKTQWrISk8nz8Gtxcg5v_sfg/exec';
    
    // Prepare the data
    const formData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      event: data.eventTitle,
      date: data.eventDate,
      time: data.eventTime
    };

    // Build URL with parameters
    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      params.append(key, value.toString());
    });

    const url = `${SCRIPT_URL}?${params.toString()}`;
    console.log('Sending request to:', url);

    // Make the request
    const response = await fetch(url, {
      method: 'GET',
      mode: 'no-cors'
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