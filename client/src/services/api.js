const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function apiRequest(endpoint, { method = 'GET', body, headers = {} } = {}) {
  const token = localStorage.getItem('student_dashboard_token');
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, config);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Can’t reach the Curio server. Make sure the backend is running, then try again.');
    }
    throw error;
  }
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof payload === 'string' ? payload : payload.message || 'Request failed';
    throw new Error(message);
  }

  return payload;
}

export const api = {
  get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),
  post: (endpoint, body) => apiRequest(endpoint, { method: 'POST', body }),
  put: (endpoint, body) => apiRequest(endpoint, { method: 'PUT', body }),
  patch: (endpoint, body) => apiRequest(endpoint, { method: 'PATCH', body }),
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' })
};
