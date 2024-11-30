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
  console.log('Sending registration data:', JSON.stringify(data, null, 2));

  try {
    const response = await fetch('/.netlify/functions/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Registration failed:', responseData);
      throw new Error(responseData.error || 'Failed to send registration data');
    }

    console.log('Registration successful:', responseData);
    return responseData;

  } catch (error) {
    console.error('Error sending registration data:', error);
    throw error;
  }
}