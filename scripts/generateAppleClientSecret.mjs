#!/usr/bin/env node
// Generate the Apple "client_secret" JWT that Supabase requires for the
// Sign In with Apple provider. Apple caps validity at 6 months; rerun this
// before the secret expires and paste the new value into Supabase.
//
// Usage:
//   node scripts/generateAppleClientSecret.mjs \
//     --team AJ4TDM8U35 \
//     --kid  28PQSLNMRS \
//     --sub  com.arabreezy.app \
//     --p8   /path/to/AuthKey_28PQSLNMRS.p8
//
// All four flags are required. `--sub` is the client_id Supabase will use
// (the iOS bundle id for native flow, or a Services ID for web OAuth).

import { readFileSync } from 'node:fs';
import { createPrivateKey, createSign } from 'node:crypto';

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i += 2) {
    const k = argv[i]?.replace(/^--/, '');
    const v = argv[i + 1];
    if (!k || v === undefined) throw new Error(`Bad flag near ${argv[i]}`);
    out[k] = v;
  }
  return out;
}

function base64UrlEncode(buf) {
  return Buffer.from(buf)
    .toString('base64')
    .replace(/=+$/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// ES256 signatures arrive in DER format from Node; JWT spec requires the raw
// 64-byte (r||s) concatenation. Strip the DER envelope and zero-pad each half.
function derToJose(der) {
  if (der[0] !== 0x30) throw new Error('Invalid DER signature');
  let offset = 2;
  if (der[1] & 0x80) offset += der[1] & 0x7f;
  if (der[offset] !== 0x02) throw new Error('Invalid DER: expected INTEGER (r)');
  const rLen = der[offset + 1];
  let r = der.slice(offset + 2, offset + 2 + rLen);
  offset += 2 + rLen;
  if (der[offset] !== 0x02) throw new Error('Invalid DER: expected INTEGER (s)');
  const sLen = der[offset + 1];
  let s = der.slice(offset + 2, offset + 2 + sLen);
  // Trim leading zero pad from DER, then left-pad to 32 bytes.
  while (r.length > 32 && r[0] === 0x00) r = r.slice(1);
  while (s.length > 32 && s[0] === 0x00) s = s.slice(1);
  const rPad = Buffer.concat([Buffer.alloc(32 - r.length), r]);
  const sPad = Buffer.concat([Buffer.alloc(32 - s.length), s]);
  return Buffer.concat([rPad, sPad]);
}

function main() {
  const args = parseArgs(process.argv);
  const required = ['team', 'kid', 'sub', 'p8'];
  for (const k of required) {
    if (!args[k]) {
      console.error(`Missing --${k}`);
      process.exit(1);
    }
  }

  const p8Pem = readFileSync(args.p8, 'utf8');
  const privateKey = createPrivateKey({ key: p8Pem, format: 'pem' });

  const now = Math.floor(Date.now() / 1000);
  const SIX_MONTHS = 15_777_000; // Apple's hard limit
  const header = { alg: 'ES256', kid: args.kid, typ: 'JWT' };
  const payload = {
    iss: args.team,
    iat: now,
    exp: now + SIX_MONTHS,
    aud: 'https://appleid.apple.com',
    sub: args.sub,
  };

  const signingInput =
    base64UrlEncode(JSON.stringify(header)) +
    '.' +
    base64UrlEncode(JSON.stringify(payload));

  const signer = createSign('SHA256');
  signer.update(signingInput);
  signer.end();
  const derSig = signer.sign(privateKey);
  const joseSig = derToJose(derSig);

  const jwt = signingInput + '.' + base64UrlEncode(joseSig);
  const expIso = new Date((now + SIX_MONTHS) * 1000).toISOString();

  console.log('\nApple client_secret JWT (paste into Supabase → Auth → Providers → Apple → Secret Key):\n');
  console.log(jwt);
  console.log(`\nExpires: ${expIso}`);
  console.log(`Client ID (sub): ${args.sub}`);
  console.log(`Team ID (iss):   ${args.team}`);
  console.log(`Key ID (kid):    ${args.kid}\n`);
}

main();
