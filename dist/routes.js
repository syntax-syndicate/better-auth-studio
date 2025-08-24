"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = createRoutes;
const express_1 = require("express");
const data_1 = require("./data");
function createRoutes(authConfig) {
    const router = (0, express_1.Router)();
    // Health check with comprehensive system info
    router.get('/api/health', (req, res) => {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        res.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            system: {
                studioVersion: '1.0.0',
                nodeVersion: process.version,
                platform: process.platform,
                arch: process.arch,
                uptime: `${hours}h ${minutes}m ${seconds}s`,
                memory: {
                    used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
                    total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
                    external: Math.round(process.memoryUsage().external / 1024 / 1024)
                },
                pid: process.pid,
                cwd: process.cwd()
            }
        });
    });
    // Get comprehensive Better Auth configuration
    router.get('/api/config', (req, res) => {
        console.log('Raw authConfig:', JSON.stringify(authConfig, null, 2));
        // Extract comprehensive configuration from Better Auth config
        const config = {
            // Basic application settings
            appName: authConfig.appName || 'Better Auth',
            baseURL: authConfig.baseURL || process.env.BETTER_AUTH_URL,
            basePath: authConfig.basePath || '/api/auth',
            secret: authConfig.secret ? 'Configured' : 'Not set',
            // Database configuration
            database: {
                type: authConfig.database?.type || 'unknown',
                dialect: authConfig.database?.dialect,
                casing: authConfig.database?.casing || 'camel',
                debugLogs: authConfig.database?.debugLogs || false,
                url: authConfig.database?.url
            },
            // Email verification settings
            emailVerification: {
                sendOnSignUp: authConfig.emailVerification?.sendOnSignUp || false,
                sendOnSignIn: authConfig.emailVerification?.sendOnSignIn || false,
                autoSignInAfterVerification: authConfig.emailVerification?.autoSignInAfterVerification || false,
                expiresIn: authConfig.emailVerification?.expiresIn || 3600
            },
            // Email and password authentication - IMPORTANT: Use the actual config values
            emailAndPassword: {
                enabled: authConfig.emailAndPassword?.enabled ?? false,
                disableSignUp: authConfig.emailAndPassword?.disableSignUp ?? false,
                requireEmailVerification: authConfig.emailAndPassword?.requireEmailVerification ?? false,
                maxPasswordLength: authConfig.emailAndPassword?.maxPasswordLength ?? 128,
                minPasswordLength: authConfig.emailAndPassword?.minPasswordLength ?? 8,
                resetPasswordTokenExpiresIn: authConfig.emailAndPassword?.resetPasswordTokenExpiresIn ?? 3600,
                autoSignIn: authConfig.emailAndPassword?.autoSignIn ?? true, // defaults to true
                revokeSessionsOnPasswordReset: authConfig.emailAndPassword?.revokeSessionsOnPasswordReset ?? false
            },
            // Social providers - Convert from object to array format
            socialProviders: authConfig.socialProviders ?
                Object.entries(authConfig.socialProviders).map(([provider, config]) => ({
                    type: provider,
                    clientId: config.clientId,
                    clientSecret: config.clientSecret,
                    redirectUri: config.redirectUri,
                    ...config
                })) :
                (authConfig.providers || []),
            // User configuration
            user: {
                modelName: authConfig.user?.modelName || 'user',
                changeEmail: {
                    enabled: authConfig.user?.changeEmail?.enabled || false
                },
                deleteUser: {
                    enabled: authConfig.user?.deleteUser?.enabled || false,
                    deleteTokenExpiresIn: authConfig.user?.deleteUser?.deleteTokenExpiresIn || 86400
                }
            },
            // Session configuration - Use actual config values
            session: {
                modelName: authConfig.session?.modelName || 'session',
                expiresIn: authConfig.session?.expiresIn || 604800, // 7 days
                updateAge: authConfig.session?.updateAge || 86400, // 1 day
                disableSessionRefresh: authConfig.session?.disableSessionRefresh || false,
                storeSessionInDatabase: authConfig.session?.storeSessionInDatabase || false,
                preserveSessionInDatabase: authConfig.session?.preserveSessionInDatabase || false,
                cookieCache: {
                    enabled: authConfig.session?.cookieCache?.enabled || false,
                    maxAge: authConfig.session?.cookieCache?.maxAge || 300
                },
                freshAge: authConfig.session?.freshAge || 86400
            },
            // Account configuration
            account: {
                modelName: authConfig.account?.modelName || 'account',
                updateAccountOnSignIn: authConfig.account?.updateAccountOnSignIn !== false, // defaults to true
                accountLinking: {
                    enabled: authConfig.account?.accountLinking?.enabled !== false, // defaults to true
                    trustedProviders: authConfig.account?.accountLinking?.trustedProviders || [],
                    allowDifferentEmails: authConfig.account?.accountLinking?.allowDifferentEmails || false,
                    allowUnlinkingAll: authConfig.account?.accountLinking?.allowUnlinkingAll || false,
                    updateUserInfoOnLink: authConfig.account?.accountLinking?.updateUserInfoOnLink || false
                },
                encryptOAuthTokens: authConfig.account?.encryptOAuthTokens || false
            },
            // Verification configuration
            verification: {
                modelName: authConfig.verification?.modelName || 'verification',
                disableCleanup: authConfig.verification?.disableCleanup || false
            },
            // Trusted origins
            trustedOrigins: Array.isArray(authConfig.trustedOrigins) ? authConfig.trustedOrigins : [],
            // Rate limiting - Use actual config values
            rateLimit: {
                enabled: authConfig.rateLimit?.enabled ?? false,
                window: authConfig.rateLimit?.window || 10,
                max: authConfig.rateLimit?.max || 100,
                storage: authConfig.rateLimit?.storage || 'memory',
                modelName: authConfig.rateLimit?.modelName || 'rateLimit'
            },
            // Advanced options
            advanced: {
                ipAddress: {
                    ipAddressHeaders: authConfig.advanced?.ipAddress?.ipAddressHeaders || [],
                    disableIpTracking: authConfig.advanced?.ipAddress?.disableIpTracking || false
                },
                useSecureCookies: authConfig.advanced?.useSecureCookies || false,
                disableCSRFCheck: authConfig.advanced?.disableCSRFCheck || false,
                crossSubDomainCookies: {
                    enabled: authConfig.advanced?.crossSubDomainCookies?.enabled || false,
                    additionalCookies: authConfig.advanced?.crossSubDomainCookies?.additionalCookies || [],
                    domain: authConfig.advanced?.crossSubDomainCookies?.domain
                },
                cookies: authConfig.advanced?.cookies || {},
                defaultCookieAttributes: authConfig.advanced?.defaultCookieAttributes || {},
                cookiePrefix: authConfig.advanced?.cookiePrefix,
                database: {
                    defaultFindManyLimit: authConfig.advanced?.database?.defaultFindManyLimit || 100,
                    useNumberId: authConfig.advanced?.database?.useNumberId || false
                }
            },
            // Disabled paths
            disabledPaths: authConfig.disabledPaths || [],
            // Telemetry - Use actual config values
            telemetry: {
                enabled: authConfig.telemetry?.enabled ?? false,
                debug: authConfig.telemetry?.debug || false
            },
            // Studio information
            studio: {
                version: '1.0.0',
                nodeVersion: process.version,
                platform: process.platform,
                uptime: process.uptime()
            }
        };
        console.log('Processed config:', JSON.stringify(config, null, 2));
        res.json(config);
    });
    // Get dashboard statistics
    router.get('/api/stats', async (req, res) => {
        try {
            const stats = await (0, data_1.getAuthData)(authConfig, 'stats');
            res.json(stats);
        }
        catch (error) {
            console.error('Error fetching stats:', error);
            res.status(500).json({ error: 'Failed to fetch statistics' });
        }
    });
    router.get('/api/users', async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const search = req.query.search;
            const users = await (0, data_1.getAuthData)(authConfig, 'users', { page, limit, search });
            res.json(users);
        }
        catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    });
    // Get sessions with pagination
    router.get('/api/sessions', async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const sessions = await (0, data_1.getAuthData)(authConfig, 'sessions', { page, limit });
            res.json(sessions);
        }
        catch (error) {
            console.error('Error fetching sessions:', error);
            res.status(500).json({ error: 'Failed to fetch sessions' });
        }
    });
    // Get provider statistics
    router.get('/api/providers', async (req, res) => {
        try {
            const providers = await (0, data_1.getAuthData)(authConfig, 'providers');
            res.json(providers);
        }
        catch (error) {
            console.error('Error fetching providers:', error);
            res.status(500).json({ error: 'Failed to fetch providers' });
        }
    });
    // Delete user
    router.delete('/api/users/:id', async (req, res) => {
        try {
            const { id } = req.params;
            await (0, data_1.getAuthData)(authConfig, 'deleteUser', { id });
            res.json({ success: true });
        }
        catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    });
    // Update user
    router.put('/api/users/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const userData = req.body;
            const updatedUser = await (0, data_1.getAuthData)(authConfig, 'updateUser', { id, userData });
            res.json(updatedUser);
        }
        catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Failed to update user' });
        }
    });
    return router;
}
//# sourceMappingURL=routes.js.map