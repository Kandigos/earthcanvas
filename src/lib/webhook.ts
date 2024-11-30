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

    // Use Make webhook directly in development
    const WEBHOOK_URL = import.meta.env.DEV
      ? 'https://hook.eu2.make.com/qo7iiei70igppwvghoh1lysgzqoq22hj'
      : 'https://us-central1-kandigana-a72bc.cloudfunctions.net/forwardRegistration';

    console.log('Using webhook URL:', WEBHOOK_URL);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Response status:', response.status);

    const responseData = await response.text();
    console.log('Response data:', responseData);

    if (!response.ok) {
      throw new Error(`Failed to send registration data: ${responseData}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending registration data:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}