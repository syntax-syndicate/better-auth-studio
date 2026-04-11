import { handleStudioRequest } from "../core/handler.js";
import { injectEventHooks, injectLastSeenAtHooks } from "../utils/hook-injector.js";
/**
 * Elysia adapter for Better Auth Studio
 */
export function betterAuthStudio(config) {
    if (config.auth) {
        injectLastSeenAtHooks(config.auth, config);
        if (config.events?.enabled)
            injectEventHooks(config.auth, config.events);
    }
    return async (context) => {
        try {
            const universalReq = await convertElysiaToUniversal(context);
            const universalRes = await handleStudioRequest(universalReq, config);
            return sendElysiaResponse(context, universalRes);
        }
        catch (error) {
            console.error("Studio handler error:", error);
            context.set.status = 500;
            return { error: "Internal server error" };
        }
    };
}
async function convertElysiaToUniversal(context) {
    let body;
    const method = context.request.method;
    if (method !== "GET" && method !== "HEAD") {
        const elysiaBody = context.body ?? context.query ?? undefined;
        if (elysiaBody !== undefined) {
            body = elysiaBody;
        }
        else {
            const contentType = context.request.headers.get("content-type") || "";
            try {
                if (contentType.includes("application/json")) {
                    body = await context.request.json();
                }
                else if (contentType.includes("application/x-www-form-urlencoded") ||
                    contentType.includes("multipart/form-data")) {
                    const formData = await context.request.formData();
                    body = Object.fromEntries(formData.entries());
                }
                else {
                    const text = await context.request.text();
                    if (text && text.trim()) {
                        try {
                            body = JSON.parse(text);
                        }
                        catch {
                            body = text;
                        }
                    }
                }
            }
            catch (error) { }
        }
    }
    const headers = {};
    context.request.headers.forEach((value, key) => {
        headers[key] = value;
    });
    const url = new URL(context.request.url);
    const pathWithQuery = url.pathname + url.search;
    return {
        url: pathWithQuery,
        method: method,
        headers,
        body,
    };
}
function sendElysiaResponse(context, universal) {
    const headers = new Headers(universal.headers);
    universal.setCookies?.forEach((cookie) => {
        headers.append("Set-Cookie", cookie);
    });
    return new Response(universal.body, {
        status: universal.status,
        headers,
    });
}
