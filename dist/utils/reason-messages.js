/**
 * Maps known error/reason codes from auth events to human-readable messages.
 * Used so event metadata.reason is stored as a message, not a code.
 */
const REASON_CODE_MESSAGES = {
    invalid_credentials: "Invalid email or password",
    validation_failed: "Validation failed",
    user_already_exists: "User already exists with this email",
    invalid_request: "Invalid request",
    authentication_failed: "Authentication failed",
    unauthorized: "Unauthorized",
    member_not_found: "Member not found",
    forbidden: "Forbidden",
    invalid_otp: "Invalid or expired code",
    unknown: "Unknown error",
};
/**
 * Converts a reason (code or message) to a human-readable message for event metadata.
 * Known codes (e.g. invalid_credentials) are mapped; other values are used as-is (e.g. API messages).
 */
export function reasonToMessage(reason) {
    if (reason === undefined || reason === null || typeof reason !== "string") {
        return "Unknown error";
    }
    const trimmed = reason.trim();
    if (!trimmed)
        return "Unknown error";
    const mapped = REASON_CODE_MESSAGES[trimmed];
    if (mapped)
        return mapped;
    return trimmed;
}
