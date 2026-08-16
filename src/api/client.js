const configuredBaseUrl = import.meta.env.VITE_API_URL || '/api';
const API_BASE_URL = configuredBaseUrl.replace(/\/$/, '');
const DEFAULT_API_ERROR = 'Terjadi kesalahan saat menghubungi server.';
const NETWORK_API_ERROR = 'Tidak dapat terhubung ke server registrasi.';
const INVALID_RESPONSE_ERROR = 'Server registrasi mengirim respons yang tidak valid.';
const STAFF_TOKEN_KEY = 'probuild_staff_access_token';

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

function staffRequest(path, options = {}) {
  const token = getStaffToken();

  return request(`/v1/staff${path}`, {
    ...options,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
}

async function staffFileRequest(path) {
  const url = `${API_BASE_URL}/v1/staff${path}`;
  let response;

  try {
    response = await fetch(url, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/pdf',
        ...(getStaffToken() ? { Authorization: `Bearer ${getStaffToken()}` } : {}),
      },
    });
  } catch (error) {
    const apiError = new ApiError(import.meta.env.DEV ? error.message : NETWORK_API_ERROR, 0);
    logDevelopmentError({
      url,
      method: 'GET',
      status: null,
      responseBody: null,
      error: apiError,
    });
    throw apiError;
  }

  if (!response.ok) {
    const responseBody = await response.text();
    let payload = {};
    try {
      payload = JSON.parse(responseBody);
    } catch {
      // A failed file response is not guaranteed to contain JSON.
    }

    const error = new ApiError(
      import.meta.env.PROD && response.status >= 500
        ? DEFAULT_API_ERROR
        : payload.message || DEFAULT_API_ERROR,
      response.status,
      payload.errors || {}
    );
    logDevelopmentError({ url, method: 'GET', status: response.status, responseBody, error });
    throw error;
  }

  return response.blob();
}

export function getStaffToken() {
  return sessionStorage.getItem(STAFF_TOKEN_KEY);
}

export function setStaffToken(token) {
  sessionStorage.setItem(STAFF_TOKEN_KEY, token);
}

export function clearStaffToken() {
  sessionStorage.removeItem(STAFF_TOKEN_KEY);
}

export function staffLogin(credentials) {
  return staffRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function staffMe(signal) {
  return staffRequest('/auth/me', { signal });
}

export function staffLogout() {
  return staffRequest('/auth/logout', { method: 'POST' });
}

export function getStaffEvents(signal) {
  return staffRequest('/events', { signal });
}

export function getStaffStatistics(eventSlug, signal) {
  return staffRequest(`/events/${encodeURIComponent(eventSlug)}/statistics`, { signal });
}

export function getStaffParticipants(
  eventSlug,
  { page = 1, perPage = 25, search = '', checkinStatus = 'all', eventDayId = '' } = {},
  signal
) {
  const query = new URLSearchParams({ page: String(page), per_page: String(perPage) });
  if (search) query.set('search', search);
  if (checkinStatus !== 'all') query.set('checkin_status', checkinStatus);
  if (eventDayId) query.set('event_day_id', eventDayId);

  return staffRequest(`/events/${encodeURIComponent(eventSlug)}/participants?${query}`, { signal });
}

export function recordStaffDailyCheckin(eventSlug, eventDayId, ticket) {
  return staffRequest(
    `/events/${encodeURIComponent(eventSlug)}/event-days/${encodeURIComponent(eventDayId)}/check-ins`,
    { method: 'POST', body: JSON.stringify({ ticket }) }
  );
}

export function recordStaffParticipantCheckin(eventSlug, eventDayId, registrationId) {
  return staffRequest(
    `/events/${encodeURIComponent(eventSlug)}/event-days/${encodeURIComponent(eventDayId)}/registrations/${encodeURIComponent(registrationId)}/check-ins`,
    { method: 'POST' }
  );
}

export function downloadStaffParticipantTicket(eventSlug, registrationId) {
  return staffFileRequest(
    `/events/${encodeURIComponent(eventSlug)}/registrations/${encodeURIComponent(registrationId)}/e-ticket`
  );
}

export function recordStaffTalkshowAttendance(eventSlug, talkshowId, ticket) {
  return staffRequest(
    `/events/${encodeURIComponent(eventSlug)}/talkshows/${encodeURIComponent(talkshowId)}/attendances`,
    { method: 'POST', body: JSON.stringify({ ticket }) }
  );
}

export function getStaffUsers(page = 1, signal) {
  return staffRequest(`/users?page=${page}&per_page=50`, { signal });
}

export function createStaffUser(data) {
  return staffRequest('/users', { method: 'POST', body: JSON.stringify(data) });
}

export function updateStaffUser(userId, data) {
  return staffRequest(`/users/${encodeURIComponent(userId)}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function getEventAssignments(eventSlug, signal) {
  return staffRequest(`/events/${encodeURIComponent(eventSlug)}/assignments`, { signal });
}

export function assignPanitia(eventSlug, userId) {
  return staffRequest(`/events/${encodeURIComponent(eventSlug)}/assignments`, {
    method: 'POST',
    body: JSON.stringify({ user_id: userId }),
  });
}

export function unassignPanitia(eventSlug, assignmentId) {
  return staffRequest(
    `/events/${encodeURIComponent(eventSlug)}/assignments/${encodeURIComponent(assignmentId)}`,
    { method: 'DELETE' }
  );
}

export function getAuditLogs(eventId, signal) {
  const query = new URLSearchParams({ per_page: '50' });
  if (eventId) query.set('event_id', eventId);

  return staffRequest(`/audit-logs?${query}`, { signal });
}
