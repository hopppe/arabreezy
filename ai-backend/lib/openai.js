import { config } from './config.js';

const OPENAI_BASE = 'https://api.openai.com/v1';

function authHeaders() {
  return {
    Authorization: `Bearer ${config.openai.apiKey}`,
    'Content-Type': 'application/json',
  };
}

export async function openaiJson(path, body) {
  const res = await fetch(`${OPENAI_BASE}${path}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`OpenAI ${path} failed: ${res.status}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }
  return res.json();
}

export async function openaiBinary(path, body) {
  const res = await fetch(`${OPENAI_BASE}${path}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`OpenAI ${path} failed: ${res.status}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }
  return Buffer.from(await res.arrayBuffer());
}

export async function openaiMultipart(path, formData) {
  const res = await fetch(`${OPENAI_BASE}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.openai.apiKey}` },
    body: formData,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`OpenAI ${path} failed: ${res.status}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }
  return res.json();
}
