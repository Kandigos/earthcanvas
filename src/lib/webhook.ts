import axios from 'axios';

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
    console.log('Attempting to send registration data:', data);

    const WEBHOOK_URL = 'https://hook.eu2.make.com/qo7iiei70igppwvghoh1lysgzqoq22hj';

    const response = await axios.post(WEBHOOK_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response received:', response.data);

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Registration error:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      return {
        success: false,
        error: `Error ${error.response?.status}: ${error.message}`
      };
    }
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}