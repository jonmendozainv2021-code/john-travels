/* John Travels: tapping a notification opens (or focuses) the app. Loaded by the Workbox service worker with importScripts. */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const scope = self.registration.scope;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.startsWith(scope) && 'focus' in c) return c.focus();
      }
      return self.clients.openWindow(scope);
    }),
  );
});
