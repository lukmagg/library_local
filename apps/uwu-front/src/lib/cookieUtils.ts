export function deleteCookie(name: string, locale: string) {
  console.log('deleteCookie: ' + locale);
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function getToken() {
  if (typeof window !== 'undefined') {
    if (document.cookie) {
      const tokenCookie = document.cookie
        .split('; ')
        .find((element) => element.startsWith('token='));

      if (tokenCookie) {
        return tokenCookie.split('=')[1];
      }
    }
  }
  return null;
}
