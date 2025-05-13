const API_BASE_PORT = "5233";
const API_BASE_IP = "localhost";
const API_PROTOCOL = "https";

export const API_BASE_URL = `${API_PROTOCOL}://${API_BASE_IP}:${API_BASE_PORT}/api`;

export const API_URLS = {
  clients: `${API_BASE_URL}`,
  admins: `${API_BASE_URL}`,
};

const S3_BASE_PORT = "9000";
const S3_BASE_IP = "localhost";
const S3_PROTOCOL = "http";

export const S3_BASE_URL = `${S3_PROTOCOL}://${S3_BASE_IP}:${S3_BASE_PORT}`;
