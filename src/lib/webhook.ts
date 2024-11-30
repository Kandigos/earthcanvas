const WEBHOOK_URL = 'https://hook.eu2.make.com/qo7iiei70igppwvghoh1lysgzqoq22hj';

interface RegistrationData {
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
}

export async function sendRegistrationToWebhook(data: RegistrationData) {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send registration data');
    }

    return true;
  } catch (error) {
    console.error('Error sending registration data:', error);
    return false;
  }
}