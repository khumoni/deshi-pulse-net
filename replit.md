# replit.md

## Overview

This is a full-stack web application called "Local Info Hub" (স্থানীয় তথ্য কেন্দ্র) - a community information platform for Bangladesh. The application allows users to share and access local information categorized by location (division, district, upazila) and topic categories. It features a modern React frontend with Tailwind CSS and shadcn/ui components, an Express.js backend API, and uses PostgreSQL with Drizzle ORM for data persistence.

The platform supports multi-language functionality (Bengali/English), user authentication, post management with approval workflows, and location-based filtering. It's designed as a community-driven platform where users can share local services, emergency information, job postings, and other relevant community content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Bangladesh-themed color palette and design system
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: React Router for client-side navigation
- **Forms**: React Hook Form with Zod validation
- **Theming**: next-themes for dark/light mode support

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **API Design**: RESTful API structure with proper error handling
- **Development Setup**: Vite middleware integration for full-stack development

### Database Schema Design
The application uses a relational database structure with the following core entities:
- **Categories**: Hierarchical content organization with subcategories
- **Posts**: User-generated content with location-based filtering and approval workflow
- **Profiles**: Extended user information with location details and contribution scoring
- **Users**: Basic user authentication (legacy structure, appears to be transitioning away from this)

Key relationships include category-to-subcategory (one-to-many), profile-to-posts (one-to-many), and location-based associations throughout the schema.

### Authentication & Authorization
- **Current Implementation**: Custom authentication system using localStorage for session management
- **User Management**: Profile-based system with display names, location information, and verification status
- **Authorization Levels**: Basic user roles with admin panel functionality for post approval

### Location System
- **Geographic Structure**: Complete Bangladesh administrative divisions with all 8 divisions, 64 districts, and 500+ upazilas
- **Special Areas**: Includes Dhaka North City Corporation and Dhaka South City Corporation in Dhaka division
- **Filtering**: Three-tier location filtering system (Division → District → Upazila) for precise content discovery
- **Data Structure**: Comprehensive location data in `/client/src/data/bangladeshLocations.ts` with helper functions for easy access

### Content Management
- **Post Lifecycle**: Create → Pending → Approved/Rejected workflow
- **Categories**: Fixed category system with subcategories for content organization
- **Media Support**: Image upload functionality with size limitations
- **Analytics**: Basic engagement metrics (views, likes, comments)

## External Dependencies

### Database Services
- **Neon Database**: PostgreSQL hosting service for production database
- **Drizzle Kit**: Database migration and introspection tools

### UI & Styling
- **Radix UI**: Comprehensive set of low-level UI primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **date-fns**: Date manipulation and formatting library with Bengali locale support

### Development & Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: JavaScript bundler for server-side code
- **PostCSS & Autoprefixer**: CSS processing tools

### State & Data Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management with validation
- **Zod**: Runtime type validation and schema definition

### Authentication (Potential Integration)
- **Supabase**: Authentication service (imported but not actively used, suggests future integration planned)
- **Firebase**: Complete setup present but appears to be legacy/unused

Note: The application appears to be in transition from Firebase to a Supabase + Custom backend architecture, with some legacy code still present.