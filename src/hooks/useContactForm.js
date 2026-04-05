import emailjs from '@emailjs/browser';
import { useCallback, useState } from 'react';

function envTrim(key) {
  const v = import.meta.env[key];
  if (v == null || typeof v !== 'string') return '';
  return v.trim();
}

const serviceId = envTrim('VITE_EMAILJS_SERVICE_ID');
const templateId = envTrim('VITE_EMAILJS_TEMPLATE_ID');
const publicKey = envTrim('VITE_EMAILJS_PUBLIC_KEY');

/** Non-empty values from .env — EmailJS validates the service ID when sending */
const hasEmailJs =
  serviceId.length > 0 && templateId.length > 0 && publicKey.length >= 8;

const initial = { name: '', email: '', message: '' };

export function useContactForm() {
  const [values, setValues] = useState(initial);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const setField = useCallback((key, v) => {
    setValues((prev) => ({ ...prev, [key]: v }));
  }, []);

  const submit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      if (!hasEmailJs) {
        await new Promise((r) => setTimeout(r, 550));
        const text =
          'Fill VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env, save, then restart npm run dev.';
        setStatus({ type: 'warn', text });
        setValues(initial);
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message,
        },
        { publicKey }
      );
      setStatus({ type: 'ok', text: 'Message sent — I’ll get back to you soon.' });
      setValues(initial);
    } catch (err) {
      console.error(err);
      const apiText =
        typeof err?.text === 'string'
          ? err.text
          : typeof err?.message === 'string'
            ? err.message
            : '';
      setStatus({
        type: 'error',
        text: apiText
          ? `Send failed: ${apiText}`
          : 'Could not send. Check your EmailJS keys and that the template includes {{from_name}}, {{from_email}}, and {{message}}.',
      });
    } finally {
      setLoading(false);
    }
  }, [values.email, values.message, values.name]);

  return {
    values,
    setField,
    focused,
    setFocused,
    status,
    loading,
    submit,
  };
}
