import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { 
  users, 
  categories, 
  subcategories, 
  posts, 
  profiles,
  type User, 
  type InsertUser,
  type Category,
  type Subcategory,
  type Post,
  type Profile,
  type InsertPost
} from "@shared/schema";
import { eq, and, or, desc, ilike } from "drizzle-orm";

// Database connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { 
  schema: { 
    users, 
    categories, 
    subcategories, 
    posts, 
    profiles 
  } 
});

export interface IStorage {
  // Legacy user methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Array<Category & { subcategories: Subcategory[] }>>;
  
  // Post methods
  getPosts(filters: {
    status?: string;
    categoryId?: string;
    subcategoryId?: string;
    division?: string;
    district?: string;
    upazila?: string;
    search?: string;
  }): Promise<Array<Post & { 
    author: Pick<Profile, 'displayName'>; 
    category: Pick<Category, 'name' | 'nameEn'>;
    subcategory: Pick<Subcategory, 'name' | 'nameEn'>;
  }>>;
  
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: string, updates: Partial<Post>): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Legacy user methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Category methods
  async getCategories(): Promise<Array<Category & { subcategories: Subcategory[] }>> {
    const categoriesResult = await db.select().from(categories).orderBy(categories.name);
    const subcategoriesResult = await db.select().from(subcategories).orderBy(subcategories.name);
    
    return categoriesResult.map(category => ({
      ...category,
      subcategories: subcategoriesResult.filter(sub => sub.categoryId === category.id)
    }));
  }

  // Post methods
  async getPosts(filters: {
    status?: string;
    categoryId?: string;
    subcategoryId?: string;
    division?: string;
    district?: string;
    upazila?: string;
    search?: string;
  }): Promise<Array<Post & { 
    author: Pick<Profile, 'displayName'>; 
    category: Pick<Category, 'name' | 'nameEn'>;
    subcategory: Pick<Subcategory, 'name' | 'nameEn'>;
  }>> {
    let whereConditions = [];
    
    if (filters.status) {
      whereConditions.push(eq(posts.status, filters.status));
    } else {
      whereConditions.push(eq(posts.status, 'approved'));
    }
    
    if (filters.categoryId) {
      whereConditions.push(eq(posts.categoryId, filters.categoryId));
    }
    
    if (filters.subcategoryId) {
      whereConditions.push(eq(posts.subcategoryId, filters.subcategoryId));
    }
    
    if (filters.division) {
      whereConditions.push(eq(posts.division, filters.division));
    }
    
    if (filters.district) {
      whereConditions.push(eq(posts.district, filters.district));
    }
    
    if (filters.upazila) {
      whereConditions.push(eq(posts.upazila, filters.upazila));
    }
    
    if (filters.search) {
      whereConditions.push(
        or(
          ilike(posts.title, `%${filters.search}%`),
          ilike(posts.content, `%${filters.search}%`)
        )!
      );
    }

    const result = await db
      .select({
        post: posts,
        author: {
          displayName: profiles.displayName
        },
        category: {
          name: categories.name,
          nameEn: categories.nameEn
        },
        subcategory: {
          name: subcategories.name,
          nameEn: subcategories.nameEn
        }
      })
      .from(posts)
      .leftJoin(profiles, eq(posts.authorId, profiles.id))
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .leftJoin(subcategories, eq(posts.subcategoryId, subcategories.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(desc(posts.createdAt));

    return result.map(row => ({
      ...row.post,
      author: row.author || { displayName: 'Unknown' },
      category: row.category || { name: 'Unknown', nameEn: 'Unknown' },
      subcategory: row.subcategory || { name: 'Unknown', nameEn: 'Unknown' }
    }));
  }

  async createPost(post: InsertPost): Promise<Post> {
    const result = await db.insert(posts).values(post).returning();
    return result[0];
  }

  async updatePost(id: string, updates: Partial<Post>): Promise<void> {
    await db.update(posts).set(updates).where(eq(posts.id, id));
  }
}

export const storage = new DatabaseStorage();
