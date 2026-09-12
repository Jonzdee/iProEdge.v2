// src/utils/deliveryPricing.js
//
// Replaces the old per-bus-stop fee table with a distance-based
// calculation, so door delivery pricing automatically covers all of
// Nigeria instead of only the LGAs someone manually typed fees for.

// TODO: replace with your real warehouse / dispatch point coordinates.
// (Right-click the spot on Google Maps -> the lat/lng is the first thing
// in the context menu.)
export const WAREHOUSE_LOCATION = {
    lat: 6.6018,
    lng: 3.3515,
};

// TODO: tune these to your real cost-per-delivery. These are placeholder
// numbers, not researched rates.
export const DELIVERY_PRICING = {
    freeRadiusKm: 3, // distance covered by the flat minimum fee
    baseFee: 500,
    perKmRate: 120, // ₦ per km beyond the free radius
    minFee: 500,
    maxFee: 6000, // hard cap so a far-flung address doesn't return a wild number
    doorSurcharge: 500, // mirrors the old "+₦500 for door delivery" rule
};

/**
 * Straight-line (haversine) distance in km between two {lat, lng} points.
 * Used as an instant estimate and as a fallback if the Distance Matrix
 * call fails or is unavailable (e.g. offline, quota exceeded).
 */
export function haversineDistanceKm(a, b) {
    const R = 6371;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;
    const lat1 = (a.lat * Math.PI) / 180;
    const lat2 = (b.lat * Math.PI) / 180;
    const x =
        Math.sin(dLat / 2) ** 2 +
        Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

/**
 * Real driving distance via Google's Distance Matrix Service.
 * Resolves to a number of km, or `null` if the call fails for any reason
 * (caller should fall back to haversineDistanceKm in that case).
 */
export function fetchRoadDistanceKm(google, origin, destination) {
    return new Promise((resolve) => {
        try {
            const service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: [origin],
                    destinations: [destination],
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (response, status) => {
                    if (status === "OK") {
                        const el = response?.rows?.[0]?.elements?.[0];
                        if (el?.status === "OK") {
                            resolve(el.distance.value / 1000); // metres -> km
                            return;
                        }
                    }
                    resolve(null);
                },
            );
        } catch {
            resolve(null);
        }
    });
}

/** Turns a distance in km into a door-delivery fee in Naira. */
export function calculateDoorDeliveryFee(distanceKm) {
    if (distanceKm == null || Number.isNaN(distanceKm)) return null;

    const { freeRadiusKm, baseFee, perKmRate, minFee, maxFee, doorSurcharge } =
        DELIVERY_PRICING;

    if (distanceKm <= freeRadiusKm) {
        return minFee + doorSurcharge;
    }

    const extraKm = distanceKm - freeRadiusKm;
    let fee = baseFee + extraKm * perKmRate + doorSurcharge;
    fee = Math.ceil(fee / 50) * 50; // round up to the nearest ₦50
    return Math.min(Math.max(fee, minFee), maxFee);
}