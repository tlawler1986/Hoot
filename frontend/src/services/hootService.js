import sendRequest from './sendRequest';

const BASE_URL = '/api/hoots';
 
export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(hootData) {
  return sendRequest(BASE_URL, 'POST', hootData);
}

export async function show(hootId) {
  return sendRequest(BASE_URL, 'GET', hootId);
}

export async function update(hootId) {
  return sendRequest(BASE_URL, 'PUT', hootId);
}

export async function deletedHoot(hootId) {
  return sendRequest(BASE_URL, 'DELETE', hootId);
}