let isLoaded = false;
let loadPromise: Promise<void> | null = null;

export function loadGoogleMaps(apiKey: string) {
  if (isLoaded) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      isLoaded = true;
      resolve();
    };

    script.onerror = (err) => reject(err);

    document.head.appendChild(script);
  });

  return loadPromise;
}
