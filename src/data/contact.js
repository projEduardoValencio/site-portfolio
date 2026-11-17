/**
 * Contact details, kept out of the HTML so address harvesters that only read markup do not collect them.
 * This is a speed bump, not security: anyone who runs the page can read them. To stop publishing a real
 * address, swap EMAIL for a forwarding alias on the site's domain (e.g. contato@eduardovalencio.com.br).
 * Values are base64 (`btoa('...')`).
 */
const EMAIL = 'ZWR1YXJkby52YWxlbmNpby5zYW50b3NAZ21haWwuY29t';
const PHONE = 'NTUxNDk5ODE3MDU1Mg==';

export const email = () => atob(EMAIL);
export const mailtoUrl = (subject = '') => `mailto:${email()}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
export const whatsappUrl = (text = '') => `https://api.whatsapp.com/send?phone=${atob(PHONE)}${text ? `&text=${encodeURIComponent(text)}` : ''}`;
