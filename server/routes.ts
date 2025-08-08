import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPostSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories API
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Posts API
  app.get("/api/posts", async (req, res) => {
    try {
      const filters = {
        status: req.query.status as string,
        categoryId: req.query.category_id as string,
        subcategoryId: req.query.subcategory_id as string,
        division: req.query.division as string,
        district: req.query.district as string,
        upazila: req.query.upazila as string,
        search: req.query.search as string,
      };

      // Remove undefined values
      Object.keys(filters).forEach(key => {
        if (filters[key as keyof typeof filters] === undefined) {
          delete filters[key as keyof typeof filters];
        }
      });

      const posts = await storage.getPosts(filters);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  // Create post
  app.post("/api/posts", async (req, res) => {
    try {
      const validatedData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid post data", details: error.errors });
      }
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  // Update post (for likes, views, etc.)
  app.patch("/api/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      await storage.updatePost(id, updates);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Failed to update post" });
    }
  });

  // Like post
  app.post("/api/posts/:id/like", async (req, res) => {
    try {
      const { id } = req.params;
      
      // For now, just increment likes by 1
      // In a real app, you'd track user likes to prevent duplicates
      const currentPost = await storage.getPosts({ status: 'approved' });
      const post = currentPost.find(p => p.id === id);
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      await storage.updatePost(id, { likes: (post.likes || 0) + 1 });
      res.json({ success: true });
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ error: "Failed to like post" });
    }
  });

  // View post (increment view count)
  app.post("/api/posts/:id/view", async (req, res) => {
    try {
      const { id } = req.params;
      
      const currentPost = await storage.getPosts({ status: 'approved' });
      const post = currentPost.find(p => p.id === id);
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      await storage.updatePost(id, { views: (post.views || 0) + 1 });
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating view count:", error);
      res.status(500).json({ error: "Failed to update view count" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
