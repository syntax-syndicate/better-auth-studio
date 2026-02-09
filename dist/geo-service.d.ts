export interface LocationData {
    country: string;
    countryCode: string;
    city: string;
    region: string;
}
export declare function setGeoDbPath(path: string | null): void;
export declare function initializeGeoService(): Promise<void>;
/**
 * Resolve IP location using ipapi.co first, then fallback to local DB/ranges.
 * Use this for API handlers (async).
 */
export declare function resolveIPLocationAsync(ipAddress: string): Promise<LocationData | null>;
export declare function resolveIPLocation(ipAddress: string): LocationData | null;
//# sourceMappingURL=geo-service.d.ts.map