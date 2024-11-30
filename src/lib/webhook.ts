const WEBHOOK_URL = 'https://hook.eu2.make.com/qo7iiei70igppwvghoh1lysgzqoq22hj';

export interface RegistrationData {
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  notes?: string;
  eventDate: string;
  eventTime: string;
  eventPrice: number;
}

export async function sendRegistrationToWebhook(data: RegistrationData) {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        registrationDate: data.registrationDate || new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send registration data: ${errorText}`);
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