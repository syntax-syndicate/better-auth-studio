/**
 * Converts a reason (code or message) to a human-readable message for event metadata.
 * Known codes (e.g. invalid_credentials) are mapped; other values are used as-is (e.g. API messages).
 */
export declare function reasonToMessage(reason: string | undefined): string;
