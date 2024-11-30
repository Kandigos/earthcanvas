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

    // Use Netlify function endpoint
    const response = await axios.post('/api/registration', data, {
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
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}