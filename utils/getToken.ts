export default function getToken(): string {
  const token = localStorage.getItem('token');
  return token ? token : '';
}
