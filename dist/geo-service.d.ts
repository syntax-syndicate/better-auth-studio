export interface LocationData {
    country: string;
    countryCode: string;
    city: string;
    region: string;
}
/** Config passed from studio config ipAddress (avoids importing handler types). */
export type IpAddressProviderConfig = {
    provider: "ipinfo";
    apiToken?: string;
    baseUrl?: string;
    endpoint?: "lite" | "lookup";
} | {
    provider: "ipapi";
    apiToken?: string;
    baseUrl?: string;
} | {
    provider: "static";
    path: string;
};
export declare function setGeoDbPath(path: string | null): void;
export declare function initializeGeoService(): Promise<void>;
/**
 * Resolve IP location: if ipConfig is set, use that provider (ipinfo or ipapi); else fallback to local DB/ranges.
 * Use this for API handlers (async).
 */
export declare function resolveIPLocationAsync(ipAddress: string, ipConfig?: IpAddressProviderConfig | null): Promise<LocationData | null>;
export declare function resolveIPLocation(ipAddress: string): LocationData | null;
