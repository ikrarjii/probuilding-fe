const configuredBaseUrl = import.meta.env.VITE_API_URL || '/api';
const API_BASE_URL = configuredBaseUrl.replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message, status, errors = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(
      payload.message || 'Terjadi kesalahan saat menghubungi server.',
      response.status,
      payload.errors || {}
    );
  }

  return payload.data;
}

export function getRegistrationOptions(eventSlug, signal) {
  return request(`/v1/public/events/${eventSlug}/registration`, { signal });
}

export function createParticipantRegistration(eventSlug, data, idempotencyKey) {
  return request(`/v1/public/events/${eventSlug}/registrations`, {
    method: 'POST',
    headers: {
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify(data),
  });
}

export function getETicket(ticketToken, signal) {
  return request(`/v1/public/e-tickets/${encodeURIComponent(ticketToken)}`, { signal });
}

export function getETicketPdfUrl(ticketToken) {
  return `${API_BASE_URL}/v1/public/e-tickets/${encodeURIComponent(ticketToken)}/pdf`;
}
