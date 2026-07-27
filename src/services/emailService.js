import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_USER_ID = process.env.REACT_APP_EMAILJS_USER_ID;

export const sendContactEmail = async (formData) => {
  try {
    const templateParams = {
      to_email: 'hello@zerobycineviv.com',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      company: formData.company || 'Not specified',
      service: formData.service || 'Not specified',
      message: formData.message,
    };
    
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_USER_ID
    );
    
    return { success: true, data: response };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.text };
  }
};

export const sendNewsletterSignup = async (email) => {
  try {
    const templateParams = {
      to_email: email,
      from_email: 'newsletter@zerobycineviv.com',
      subject: 'Welcome to ZERO BY CINEVIV Newsletter',
    };
    
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'newsletter_template',
      templateParams,
      EMAILJS_USER_ID
    );
    
    return { success: true, data: response };
  } catch (error) {
    console.error('Newsletter error:', error);
    return { success: false, error: error.text };
  }
};