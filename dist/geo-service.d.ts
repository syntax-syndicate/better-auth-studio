interface LocationData {
    country: string;
    countryCode: string;
    city: string;
    region: string;
}
export declare function initializeGeoService(): Promise<void>;
export declare function resolveIPLocation(ipAddress: string): LocationData | null;
export {};
//# sourceMappingURL=geo-service.d.ts.map