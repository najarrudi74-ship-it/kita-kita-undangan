import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import { getFirestore, addDoc, collection, serverTimestamp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export async function catatPermintaan(input) {
  const data = {
    customer: String(input.customer || '').trim().slice(0,100),
    phone: String(input.phone || '').trim().slice(0,20),
    kind: String(input.kind || '').trim().slice(0,60),
    title: String(input.title || '').trim().slice(0,120),
    details: String(input.details || '').trim().slice(0,1200),
    source: 'website',
    handled: false,
    createdAt: serverTimestamp()
  };
  if (!data.customer || !data.phone || !data.kind || !data.title) throw Error('Nama, WhatsApp, jenis, dan judul wajib diisi.');
  const result = await addDoc(collection(db,'permintaan'), data);
  return result.id;
}
