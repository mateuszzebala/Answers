import apiUrl from "../apiUrl";

let _csrfToken = null;
async function getCsrfToken() {
  const response = await fetch(`${apiUrl}/csrf/`, {
      credentials: 'include',
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;

  return _csrfToken;
}
export default getCsrfToken