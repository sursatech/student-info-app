// Frontend configuration
// Using environment variables with fallbacks
const API_BASE_URL = (typeof process !== 'undefined' && process.env?.API_BASE_URL);
const FRONTEND_PORT = (typeof process !== 'undefined' && process.env?.FRONTEND_PORT) || '5173';

export const config = {
  API_BASE_URL,
  FRONTEND_PORT,
  API_URL: `${API_BASE_URL}/students`,
};