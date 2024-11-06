# GrootHub
[Live Demo](https://tech-tips-khaki.vercel.app/)

A Next.js application built with TypeScript and Redux, designed for a user-friendly experience with robust features such as user authentication, post management, and an admin dashboard for managing user data and viewing analytics.

## Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Routes](#routes)
- [License](#license)

## About
This project is a comprehensive Next.js web application that includes user and admin functionality. The platform allows users to create, edit, and follow posts, manage profiles, and connect with others. Admins can manage users and access detailed statistics, providing a full-featured experience for both users and administrators.

## Features
- **User Authentication**: Login, register, and password recovery.
- **Profile Management**: Update profile details and payment information.
- **Post Management**: Create, edit, and view posts with follower capabilities.
- **Admin Dashboard**: Manage users and view platform statistics.
- **Responsive Design**: Optimized for both desktop and mobile views.
  
## Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) - A React framework for building fast and optimized web applications.
- **Language**: TypeScript - A typed superset of JavaScript.
- **State Management**: Redux - For global state management.
- **Styling**: CSS Modules and Tailwind CSS.
- **Backend (Optional)**: Add description if you’re using any specific backend or API.

## Project Structure
# Project Name

## Getting Started

To run this project locally:

1. Clone the repository:

   ``` bash
   git clone https://github.com/bashputi/tech-tips-frontend 

Navigate to the project directory:

``` bash
cd project-name 
```

Install dependencies** 

``` bash
npm install

``` bash
 npm run dev
 ```
Open http://localhost:3000 in your browser to see the application.

## Usage
This application offers a range of user and admin functionalities:

- **User Actions**: Register, login, create/edit posts, follow other users' posts, and update profiles.

- **Admin Actions**: Access user statistics, view a list of all users, and manage user data.

## Routes
The following routes are available in the application:

## General Routes
- **/** - Home page
- **/about** - About the application
- **/contact** - Contact page

## Auth Routes
- **/auth/login** - User login page
- **/auth/register** - User registration page
- **/auth/forget-password** - Forgot password page
- **/auth/forget-password/[id]/[token]** - Password reset page

## Post Routes
- **/post/create** - Create a new post
- **/post/[id]** - View a specific post
- **/post/edit/[id]** - Edit a post
- **/post/follower/[id]** - View followers of a post

## Profile Routes
- **/profile** - User profile page
- **/profile/[id]** - View another user's profile
- **/profile/update** - Update user profile
- **/profile/payment** - User payment information

## Admin Routes
- **/admin/statistics** - View platform statistics
- **/admin/users** - Manage users

## License
- This project is licensed under the MIT License.
