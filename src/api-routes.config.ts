const API_BASE_PORT = "5233";
const API_BASE_IP = "localhost";
const PROTOCOL = "https";

export const API_BASE_URL = `${PROTOCOL}://${API_BASE_IP}:${API_BASE_PORT}/api`;

export const API_URLS = {
  clients: `${API_BASE_URL}/client`,
  admins: `${API_BASE_URL}/admin`,
};
