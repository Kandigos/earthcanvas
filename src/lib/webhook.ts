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
    console.log('Sending registration data:', data);

    // Uses the Netlify Functions path
    const response = await axios.post('/.netlify/functions/registration', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response received:', response.data);

    if (!response.data.success) {
      throw new Error(response.data.error || 'Registration failed');
    }

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Registration error:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.message;
      console.error('Error details:', errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}