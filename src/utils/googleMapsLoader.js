// src/utils/googleMapsLoader.js
//
// Loads the Google Maps JavaScript API (with the Places library) exactly
// once, no matter how many components ask for it. Requires:
//   VITE_GOOGLE_MAPS_API_KEY set in your .env
// with "Places API" and "Distance Matrix API" enabled on that key in
// Google Cloud Console (Maps Platform). Restrict the key by HTTP referrer
// to your domain(s) before shipping to production.

let loadPromise = null;

export function loadGoogleMaps() {
    if (typeof window === "undefined") {
        return Promise.reject(new Error("loadGoogleMaps called outside a browser"));
    }

    if (window.google?.maps?.places) {
        return Promise.resolve(window.google);
    }

    if (loadPromise) return loadPromise;

    loadPromise = new Promise((resolve, reject) => {
        const existing = document.getElementById("google-maps-script");

        if (existing) {
            existing.addEventListener("load", () => resolve(window.google));
            existing.addEventListener("error", () =>
                reject(new Error("Google Maps script failed to load")),
            );
            return;
        }

        const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        if (!key) {
            reject(
                new Error(
                    "VITE_GOOGLE_MAPS_API_KEY is missing — add it to your .env file",
                ),
            );
            return;
        }

        const script = document.createElement("script");
        script.id = "google-maps-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve(window.google);
        script.onerror = () => reject(new Error("Google Maps script failed to load"));
        document.head.appendChild(script);
    });

    return loadPromise;
}