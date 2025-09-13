import { join, dirname } from 'path';
import { existsSync, readFileSync } from 'fs';
import { createJiti } from 'jiti';
import { pathToFileURL } from 'url';

export interface AuthAdapter {
  createUser: (data: any) => Promise<any>;
  createSession: (data: any) => Promise<any>;
  createAccount: (data: any) => Promise<any>;
  createVerification: (data: any) => Promise<any>;
  createOrganization: (data: any) => Promise<any>;
  create?: (...args: any[]) => Promise<any>;
  update?: (...args: any[]) => Promise<any>;
  delete?: (...args: any[]) => Promise<any>;
  getUsers?: () => Promise<any[]>;
  getSessions?: () => Promise<any[]>;
  findMany?: (options: { model: string; where?: any; limit?: number; offset?: number }) => Promise<any[]>;
}

let authInstance: any = null;
let authAdapter: AuthAdapter | null = null;

export async function getAuthAdapter(): Promise<AuthAdapter | null> {
  try {
    const authConfigPath = await findAuthConfigPath();
    if (!authConfigPath) {
      return null;
    }
    
    let authModule;
    try {
      if (authConfigPath.endsWith('.ts')) {
        const aliases: Record<string, string> = {};
        const authConfigDir = dirname(authConfigPath);
        const content = readFileSync(authConfigPath, 'utf-8');
        
        const relativeImportRegex = /import\s+.*?\s+from\s+['"](\.\/[^'"]+)['"]/g;
        const dynamicImportRegex = /import\s*\(\s*['"](\.\/[^'"]+)['"]\s*\)/g;
        const foundImports = new Set<string>();
        
        let match;
        while ((match = relativeImportRegex.exec(content)) !== null) {
          foundImports.add(match[1]);
        }
        while ((match = dynamicImportRegex.exec(content)) !== null) {
          foundImports.add(match[1]);
        }
        
        for (const importPath of foundImports) {
          const importName = importPath.replace('./', '');
          const possiblePaths = [
            join(authConfigDir, importName + '.ts'),
            join(authConfigDir, importName + '.js'),
            join(authConfigDir, importName + '.mjs'),
            join(authConfigDir, importName + '.cjs'),
            join(authConfigDir, importName, 'index.ts'),
            join(authConfigDir, importName, 'index.js'),
            join(authConfigDir, importName, 'index.mjs'),
            join(authConfigDir, importName, 'index.cjs')
          ];
          
          for (const path of possiblePaths) {
            if (existsSync(path)) {
              aliases[importPath] = pathToFileURL(path).href;
              break;
            }
          }
        }
        
        const jiti = createJiti(import.meta.url, {
          debug: false,
          fsCache: true,
          moduleCache: true,
          interopDefault: true,
          alias: aliases
        });
        
        try {
          authModule = await jiti.import(authConfigPath);
        } catch (jitiError: any) {
          const content = readFileSync(authConfigPath, 'utf-8');
          authModule = {
            auth: {
              options: {
                _content: content
              }
            }
          };
        }
      } else {
        authModule = await import(authConfigPath);
      }
    } catch (error) {
      return null;
    }
    
    const auth = authModule.auth || authModule.default;
    if (!auth) {
      return null;
    }

    if (auth.options && auth.options._content) {
      return null;
    }

    let adapter;
    try {
      const context = await auth.$context;
      adapter = context?.adapter;
    } catch (error) {
      adapter = auth.adapter;
    }
    
    if (!adapter) {
      return null;
    }

    authAdapter = {
      createUser: async (data: any) => {
        try {
          const user = await adapter.create({
            model: "user",
            data: {
              createdAt: new Date(),
              updatedAt: new Date(),
              emailVerified: false,
              name: data.name,
              email: data.email?.toLowerCase(),
              image: data.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
            }
          });
          
          if (data.password) {
            try {
              await adapter.create({
                model: "account",
                data: {
                  userId: user.id,
                  providerId: "credential",
                  accountId: user.id,
                  password: data.password,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                }
              });
            } catch (accountError) {
              console.error('Error creating credential account:', accountError);
            }
          }
          
          return user;
        } catch (error) {
          console.error('Error creating user:', error);
          throw error;
        }
      },
      createSession: async (data: any) => {
        try {
          return await adapter.create({
            model: "session",
            data: {
              createdAt: new Date(),
              updatedAt: new Date(),
              ...data,
            }
          });
        } catch (error) {
          console.error('Error creating session:', error);
          throw error;
        }
      },
      createAccount: async (data: any) => {
        try {
          return await adapter.create({
            model: "account",
            data: {
              createdAt: new Date(),
              updatedAt: new Date(),
              ...data,
            }
          });
        } catch (error) {
          console.error('Error creating account:', error);
          throw error;
        }
      },
      createVerification: async (data: any) => {
        try {
          return await adapter.create({
            model: "verification",
            data: {
              createdAt: new Date(),
              updatedAt: new Date(),
              ...data,
            }
          });
        } catch (error) {
          console.error('Error creating verification:', error);
          throw error;
        }
      },
      createOrganization: async (data: any) => {
        try {
          return await adapter.create({
            model: "organization",
            data: {
              createdAt: new Date(),
              updatedAt: new Date(),
              ...data,
            }
          });
        } catch (error) {
          console.error('Error creating organization:', error);
          throw error;
        }
      },
      getUsers: async () => {
        try {
          if (typeof adapter.findMany === 'function') {
            const users = await adapter.findMany({ model: 'user' });
            return users || [];
          }
          if (typeof adapter.getUsers === 'function') {
            const users = await adapter.getUsers();
            return users || [];
          }
          return [];
        } catch (error) {
          console.error('Error getting users:', error);
          return [];
        }
      },
      getSessions: async () => {
        try {
          if (typeof adapter.findMany === 'function') {
            const sessions = await adapter.findMany({ model: 'session' });
            return sessions || [];
          }
          if (typeof adapter.getSessions === 'function') {
            const sessions = await adapter.getSessions();
            return sessions || [];
          }
          return [];
        } catch (error) {
          console.error('Error getting sessions:', error);
          return [];
        }
      },
      findMany: async (options: { model: string; where?: any; limit?: number; offset?: number }) => {
        try {
          if (typeof adapter.findMany === 'function') {
            return await adapter.findMany(options);
          }
          return [];
        } catch (error) {
          console.error('Error using findMany:', error);
          return [];
        }
      }
    };
    
    return { ...adapter, ...authAdapter };
  } catch (error) {
    console.error('Error loading auth adapter:', error);
    return null;
  }
}

async function findAuthConfigPath(): Promise<string | null> {
  const possibleConfigFiles = [
    'auth.ts',
    'auth.js',
    'src/auth.ts',
    'src/auth.js',
    'lib/auth.ts',
    'lib/auth.js',
    'better-auth.config.ts',
    'better-auth.config.js',
    'better-auth.config.json',
    'auth.config.ts',
    'auth.config.js',
    'auth.config.json',
    'studio-config.json'
  ];

  let currentDir = process.cwd();
  const maxDepth = 10;
  let depth = 0;

  while (currentDir && depth < maxDepth) {
    for (const configFile of possibleConfigFiles) {
      const configPath = join(currentDir, configFile);
      
      if (existsSync(configPath)) {
        return configPath;
      }
    }

    const parentDir = dirname(currentDir);
    if (parentDir === currentDir) {
      break;
    }
    currentDir = parentDir;
    depth++;
  }

  return null;
}

export async function createMockUser(adapter: AuthAdapter, index: number) {
  const randomString = Math.random().toString(36).substring(2, 8);
  
  const userData = {
    email: `user${randomString}@example.com`,
    name: `User ${index}`,
    emailVerified: true,
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${index}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return await adapter.createUser(userData);
}

export async function createMockSession(adapter: AuthAdapter, userId: string, index: number) {
  const sessionData = {
    userId: userId,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sessionToken: `session_token_${index}_${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return await adapter.createSession(sessionData);
}

export async function createMockAccount(adapter: AuthAdapter, userId: string, index: number) {
  const accountData = {
    userId: userId,
    type: 'oauth',
    provider: 'github',
    providerAccountId: `github_${index}`,
    refresh_token: `refresh_token_${index}`,
    access_token: `access_token_${index}`,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    token_type: 'bearer',
    scope: 'read:user',
    id_token: `id_token_${index}`,
    session_state: `session_state_${index}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return await adapter.createAccount(accountData);
}

export async function createMockVerification(adapter: AuthAdapter, userId: string, index: number) {
  const verificationData = {
    identifier: `user${index}@example.com`,
    token: `verification_token_${index}_${Date.now()}`,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return await adapter.createVerification(verificationData);
}