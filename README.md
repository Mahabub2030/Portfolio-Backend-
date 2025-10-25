# Portfolio Backend

- This backend powers the Portfolio, providing a secure and scalable API for managing projects, blogs, and personal data. Built with Node.js, Express, Prisma, and PostgreSQL, it features role-based authentication, full CRUD operations, and optimized data delivery for the frontend.

## Live Link

```
https://my-portfolio-backend-inky.vercel.app/
```

## Features

1. **Dynamic Project Management**

- Add, update, delete, and display your projects dynamically from a database.
- Public routes for project display and data fetching

2. **Blog Management System**

- Public access for viewing all blogs and individual blog pages
- Full CRUD (Create, Read, Update, Delete) functionality
- Private access for managing blog posts (owner only)

3. **Admin Dashboard**

- Secure dashboard (with JWT authentication) to manage your projects, blogs, and personal information.
- Owner-only access to dashboard and management APIs
- APIs to fetch, create, update, or delete content dynamically

4. **Authentication & Authorization**

- Login and logout system using JWT tokens and cookies, with role-based access (admin).
- Token-based session management

## Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma**
- **PostgreSQL**
- **jsonwebtoken**

## Installation & Setup

```
git clone https://github.com/Mahabub2030/Portfolio-Backend-
```

```
cd Portfolio-Backend
```

```
npm install
bun install
```

Create a **.env** file and add:

```
PORT="8000"
NODE_ENV="development"
DATABASE_URL="postgresql://demo_user:demo_password@localhost:5432/demo_portfolio_db?schema=public"schema=public"
JWT_ACCESS_SECRET="super_secret_jwt_key_example_123"
JWT_ACCESS_EXPIRATION="2d"
CORS_ORIGIN="http://localhost:3000"
```

```
npm run dev
bun run dev
```

## Project Structure

```
portfolio-backend/
├── src/
│   ├── app/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   └── auth.validation.ts
│   │   │   ├── blog/
│   │   │   ├── project/
│   │   │   └── user/
│   │   ├── routes/
│   │   │   └── index.ts
│   │   └── utils/
│   ├── app.ts
│   └── server.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── package.json
├── tsconfig.json
└── .env

```

## API Endpoints

### Auth Endpoints

#### 1.Login

```
POST /api/v1/auth/login
```

```json
Request Body:
{
  "email": "mahaubalom709@gmail.com",
  "password": "20302030WA@"
}
```

#### 2.Logout

```
POST /api/v1/auth/logout
```

```json
Response:
{
  "success": true,
  "message": "User logged out successfully",
  "data": null
}
```

### User Endpoints (Admin)

```
GET /api/v1/users/me
```

```json
Response:
 {
   "success": true,
   "user": {
   "id": 1,
   "name": "Admin",
   "email": "admin@example.com",
   "role": "ADMIN"
   } }
```

### Blog Endpoints

#### 1.Create Blog(Admin)

```
POST /api/v1/blog
```

```json
{
  "success": true,
  "blog": {
    "id": 1,
    "title": "My First Blog",
    "slug": "my-first-blog",
    "content": "This is demo blog content",
    "createdAt": "2025-10-16T12:00:00Z"
  }
}
```

#### 2.Get Blog(Public)

```
GET /api/v1/blog
```

```json
{
  "success": true,
  "blogs": [
    {
      "id": 1,
      "title": "My First Blog",
      "slug": "my-first-blog",
      "excerpt": "This is demo blog content..."
    }
  ]
}
```

#### 3.Get Blog By Slug(Public)

```
GET /api/v1/blog/:slug
```

```json
{
  "success": true,
  "blog": {
    "id": 1,
    "title": "My First Blog",
    "slug": "my-first-blog",
    "content": "Full demo blog content",
    "createdAt": "2025-10-16T12:00:00Z"
  }
}
```

#### 4.Update Blog (Admin)

```
PATCH /api/v1/blog/:slug
```

```json
{
  "success": true,
  "blog": {
    "id": 1,
    "title": "Updated Blog Title",
    "slug": "updated-blog",
    "content": "Updated demo content"
  }
}
```

#### 5.Delete Blog (Admin)

```
DELETE  /api/v1/blog/:slug
```

```json
{ "success": true, "message": "Blog deleted successfully" }
```

### Project Endpoints

#### 1.Create Project(Admin)

```
POST  /api/v1/project
```

```json
{
  "success": true,
  "project": {
    "id": 1,
    "title": "Portfolio Project",
    "slug": "portfolio-project",
    "description": "Demo project description",
    "liveUrl": "https://demo-project.com",
    "createdAt": "2025-10-16T12:00:00Z"
  }
}
```

#### 2.Get All Project

```
GET  /api/v1/project
```

```json
{
  "success": true,
  "projects": [
    {
      "id": 1,
      "title": "Portfolio Project",
      "slug": "portfolio-project",
      "description": "Demo project description",
      "liveUrl": "https://demo-project.com"
    }
  ]
}
```

#### 3.Get Project By Slug

```
GET  /api/v1/project/:slug
```

```json
{
  "success": true,
  "project": {
    "id": 1,
    "title": "Portfolio Project",
    "slug": "portfolio-project",
    "description": "Full project description",
    "liveUrl": "https://demo-project.com",
    "createdAt": "2025-10-16T12:00:00Z"
  }
}
```

#### 4.Update Project(Admin)

```
UPDATE  /api/v1/project/:slug
```

```json
{
  "success": true,
  "project": {
    "id": 1,
    "title": "Updated Project",
    "slug": "updated-project",
    "description": "Updated demo description"
  }
}
```

#### 5.Delete Project(Admin)

```
DELETE  /api/v1/project/:slug
```

```json
{ "success": true, "message": "Project deleted successfully" }
```
