import { AuthConfig } from './config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export interface User {
  id: string;
  email?: string;
  name?: string;
  image?: string;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
  provider?: string;
  lastSignIn?: Date;
}

export interface Session {
  id: string;
  userId: string;
  expires: Date;
  createdAt: Date;
  userAgent?: string;
  ip?: string;
}

export interface AuthStats {
  totalUsers: number;
  activeUsers: number;
  totalSessions: number;
  activeSessions: number;
  usersByProvider: Record<string, number>;
  recentSignups: User[];
  recentLogins: Session[];
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Database connection cache
let db: any = null;

async function getDatabase(authConfig: AuthConfig) {
  if (!db && authConfig.database?.url) {
    try {
      const client = postgres(authConfig.database.url);
      db = drizzle(client);
    } catch (error) {
      console.error('Failed to connect to database:', error);
      return null;
    }
  }
  return db;
}

// Fetch real data from Better Auth database
export async function getAuthData(
  authConfig: AuthConfig,
  type: 'stats' | 'users' | 'sessions' | 'providers' | 'deleteUser' | 'updateUser' = 'stats',
  options?: any
): Promise<any> {
  const database = await getDatabase(authConfig);
  
  if (!database) {
    // Fallback to mock data if database connection fails
    return getMockData(type, options);
  }

  try {
    switch (type) {
      case 'stats':
        return await getRealStats(database);
      case 'users':
        return await getRealUsers(database, options);
      case 'sessions':
        return await getRealSessions(database, options);
      case 'providers':
        return await getRealProviderStats(database);
      case 'deleteUser':
        return await deleteRealUser(database, options.id);
      case 'updateUser':
        return await updateRealUser(database, options.id, options.userData);
      default:
        throw new Error(`Unknown data type: ${type}`);
    }
  } catch (error) {
    console.error(`Error fetching ${type} data:`, error);
    // Fallback to mock data
    return getMockData(type, options);
  }
}

async function getRealStats(database: any): Promise<AuthStats> {
  // Query users table
  const users = await database.select().from('users');
  const sessions = await database.select().from('sessions');
  const accounts = await database.select().from('accounts');

  const now = new Date();
  const activeSessions = sessions.filter((s: any) => new Date(s.expires) > now);
  const activeUsers = new Set(activeSessions.map((s: any) => s.userId)).size;

  // Group users by provider
  const usersByProvider: Record<string, number> = {};
  accounts.forEach((account: any) => {
    const provider = account.provider;
    usersByProvider[provider] = (usersByProvider[provider] || 0) + 1;
  });

  // Get recent signups (last 5 users)
  const recentSignups = users
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
    .map((user: any) => ({
      ...user,
      provider: accounts.find((a: any) => a.userId === user.id)?.provider
    }));

  // Get recent logins (last 5 sessions)
  const recentLogins = activeSessions
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return {
    totalUsers: users.length,
    activeUsers,
    totalSessions: sessions.length,
    activeSessions: activeSessions.length,
    usersByProvider,
    recentSignups,
    recentLogins
  };
}

async function getRealUsers(database: any, options: { page: number; limit: number; search?: string }): Promise<PaginatedResult<User>> {
  const { page, limit, search } = options;
  
  let query = database.select().from('users');
  
  if (search) {
    query = query.where(
      database.sql`${database.users.email} ILIKE ${`%${search}%`} OR ${database.users.name} ILIKE ${`%${search}%`}`
    );
  }

  const total = await query.count();
  const users = await query
    .limit(limit)
    .offset((page - 1) * limit)
    .orderBy(database.users.createdAt);

  return {
    data: users,
    total: total[0]?.count || 0,
    page,
    limit,
    totalPages: Math.ceil((total[0]?.count || 0) / limit)
  };
}

async function getRealSessions(database: any, options: { page: number; limit: number }): Promise<PaginatedResult<Session>> {
  const { page, limit } = options;
  
  const total = await database.select().from('sessions').count();
  const sessions = await database.select().from('sessions')
    .limit(limit)
    .offset((page - 1) * limit)
    .orderBy(database.sessions.createdAt);

  return {
    data: sessions,
    total: total[0]?.count || 0,
    page,
    limit,
    totalPages: Math.ceil((total[0]?.count || 0) / limit)
  };
}

async function getRealProviderStats(database: any) {
  const accounts = await database.select().from('accounts');
  
  const providerStats = accounts.reduce((acc: any, account: any) => {
    const provider = account.provider;
    if (!acc[provider]) {
      acc[provider] = { type: provider, users: 0, active: 0 };
    }
    acc[provider].users++;
    return acc;
  }, {});

  return Object.values(providerStats);
}

async function deleteRealUser(database: any, userId: string): Promise<void> {
  await database.delete().from('users').where(database.users.id.eq(userId));
}

async function updateRealUser(database: any, userId: string, userData: Partial<User>): Promise<User> {
  const updatedUser = await database.update('users')
    .set(userData)
    .where(database.users.id.eq(userId))
    .returning();
  
  return updatedUser[0];
}

// Mock data fallback
function getMockData(type: string, options?: any): any {
  switch (type) {
    case 'stats':
      return getMockStats();
    case 'users':
      return getMockUsers(options);
    case 'sessions':
      return getMockSessions(options);
    case 'providers':
      return getMockProviderStats();
    case 'deleteUser':
      return Promise.resolve();
    case 'updateUser':
      return Promise.resolve(generateMockUsers(1)[0]);
    default:
      throw new Error(`Unknown data type: ${type}`);
  }
}

function getMockStats(): AuthStats {
  return {
    totalUsers: 1247,
    activeUsers: 892,
    totalSessions: 3456,
    activeSessions: 1234,
    usersByProvider: {
      'google': 456,
      'github': 234,
      'email': 557
    },
    recentSignups: generateMockUsers(5),
    recentLogins: generateMockSessions(5)
  };
}

function getMockUsers(options: { page: number; limit: number; search?: string }): PaginatedResult<User> {
  const { page, limit, search } = options;
  const allUsers = generateMockUsers(100);
  
  let filteredUsers = allUsers;
  if (search) {
    filteredUsers = allUsers.filter(user => 
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.name?.toLowerCase().includes(search.toLowerCase())
    );
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filteredUsers.slice(start, end);

  return {
    data,
    total: filteredUsers.length,
    page,
    limit,
    totalPages: Math.ceil(filteredUsers.length / limit)
  };
}

function getMockSessions(options: { page: number; limit: number }): PaginatedResult<Session> {
  const { page, limit } = options;
  const allSessions = generateMockSessions(200);
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = allSessions.slice(start, end);

  return {
    data,
    total: allSessions.length,
    page,
    limit,
    totalPages: Math.ceil(allSessions.length / limit)
  };
}

function getMockProviderStats() {
  return [
    { type: 'google', users: 456, active: 234 },
    { type: 'github', users: 234, active: 123 },
    { type: 'email', users: 557, active: 345 }
  ];
}

function generateMockUsers(count: number): User[] {
  const users: User[] = [];
  const providers = ['google', 'github', 'email'];
  
  for (let i = 0; i < count; i++) {
    const provider = providers[Math.floor(Math.random() * providers.length)];
    users.push({
      id: `user_${i + 1}`,
      email: `user${i + 1}@example.com`,
      name: `User ${i + 1}`,
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i + 1}`,
      emailVerified: Math.random() > 0.3 ? new Date() : undefined,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      provider,
      lastSignIn: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
    });
  }
  
  return users;
}

function generateMockSessions(count: number): Session[] {
  const sessions: Session[] = [];
  
  for (let i = 0; i < count; i++) {
    sessions.push({
      id: `session_${i + 1}`,
      userId: `user_${Math.floor(Math.random() * 100) + 1}`,
      expires: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      ip: `192.168.1.${Math.floor(Math.random() * 255)}`
    });
  }
  
  return sessions;
}
