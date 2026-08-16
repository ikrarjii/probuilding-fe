const configuredBaseUrl = import.meta.env.VITE_API_URL || '/api';
const API_BASE_URL = configuredBaseUrl.replace(/\/$/, '');
const DEFAULT_API_ERROR = 'Terjadi kesalahan saat menghubungi server.';
const NETWORK_API_ERROR = 'Tidak dapat terhubung ke server registrasi.';
const INVALID_RESPONSE_ERROR = 'Server registrasi mengirim respons yang tidak valid.';

export class ApiError extends Error {
  constructor(message, status, errors = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

function logDevelopmentError({ url, method, status, responseBody, error }) {
  if (!import.meta.env.DEV) return;

  console.error('[ProBuild API request failed]', {
    requestUrl: url,
    httpMethod: method,
    httpStatus: status,
    responseBody,
    errorType: error.name,
    errorMessage: error.message,
  });
}

async function request(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const method = options.method || 'GET';
  let response;

  try {
    response = await fetch(url, {
      ...options,
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;

    const apiError = new ApiError(import.meta.env.DEV ? error.message : NETWORK_API_ERROR, 0);
    logDevelopmentError({
      url,
      method,
      status: null,
      responseBody: null,
      error,
    });
    throw apiError;
  }

  const responseBody = await response.text();
  let payload = {};

  if (responseBody) {
    try {
      payload = JSON.parse(responseBody);
    } catch {
      const error = new ApiError(INVALID_RESPONSE_ERROR, response.status);
      logDevelopmentError({ url, method, status: response.status, responseBody, error });
      throw error;
    }
  }

  if (!response.ok) {
    const error = new ApiError(
      import.meta.env.PROD && response.status >= 500
        ? DEFAULT_API_ERROR
        : payload.message || DEFAULT_API_ERROR,
      response.status,
      payload.errors || {}
    );
    logDevelopmentError({ url, method, status: response.status, responseBody, error });
    throw error;
  }

  if (!payload || typeof payload !== 'object' || !Object.hasOwn(payload, 'data')) {
    const error = new ApiError(INVALID_RESPONSE_ERROR, response.status);
    logDevelopmentError({ url, method, status: response.status, responseBody, error });
    throw error;
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
