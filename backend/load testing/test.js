import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const response = http.get('https://localhost:3000/login');

  check(response, {
    'is status 200': (r) => r.status === 200,
  });
  const userCount = response.json().length;
  console.log(`تعداد کاربران: ${userCount}`);
}
