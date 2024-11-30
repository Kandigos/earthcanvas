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
    console.log('Server response:', responseData);

    if (!response.ok) {
      const errorMessage = responseData.error || 'שגיאה בשליחת הטופס';
      console.error('Registration failed:', errorMessage);
      throw new Error(errorMessage);
    }

    if (!responseData.success) {
      const errorMessage = responseData.error || 'שגיאה בלתי ידועה';
      console.error('Registration processing failed:', errorMessage);
      throw new Error(errorMessage);
    }

    console.log('Registration successful:', responseData);
    return responseData;

  } catch (error) {
    let errorMessage = 'שגיאה בשליחת הטופס';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error && typeof error === 'object') {
      errorMessage = JSON.stringify(error);
    }

    console.error('Error sending registration data:', errorMessage);
    throw new Error(errorMessage);
  }
}