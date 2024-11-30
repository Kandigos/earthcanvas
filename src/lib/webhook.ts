interface RegistrationData {
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  participants?: number;
  specialRequests?: string;
}

export async function sendRegistrationToWebhook(data: RegistrationData) {
  try {
    const response = await fetch('/.netlify/functions/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send registration data');
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Error sending registration data:', error);
    throw error;
  }
}