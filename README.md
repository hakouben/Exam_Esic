# HostPro - Web Hosting Platform

HostPro is a comprehensive web hosting platform that allows users to browse hosting plans, place orders, and manage their services. It features user authentication, admin functionality, and a voucher system for discounts.

## Features

- **User Authentication**: Registration and login functionality with different user roles (Customer/Admin)
- **Hosting Plans Display**: View and compare different hosting plans (Shared Hosting and VPS)
- **Order System**: Place orders for hosting plans with optional voucher discount
- **Admin Dashboard**: Manage hosting plans, vouchers, and view orders
- **User Dashboard**: View and manage your hosting services

## Project Structure

### Core Components

#### Layout Components

- **Navbar (`src/components/layout/Navbar.tsx`)**
  - Main navigation bar with responsive design
  - Displays different menu items based on authentication status and user role
  - Includes login/signup buttons for unauthenticated users

- **Footer (`src/components/layout/Footer.tsx`)**
  - Page footer with links and copyright information

#### Authentication Components

- **Auth Page (`src/pages/Auth.tsx`)**
  - Combined login and registration page
  - Implements form validation and error messaging
  - Supports tab switching between login and register forms
  - Includes demo account information for testing

#### Hosting Plan Components

- **PlanCard (`src/components/hosting/PlanCard.tsx`)**
  - Card displaying hosting plan details
  - Shows plan specifications (CPU, RAM, Storage)
  - Highlights popular plans
  - Includes order button

- **PlanComparison (`src/components/hosting/PlanComparison.tsx`)**
  - Table for comparing different hosting plans
  - Highlights differences in features and specifications

#### Admin Components

- **PlanForm (`src/components/admin/PlanForm.tsx`)**
  - Form for creating and editing hosting plans
  - Validates inputs and handles feature list management
  - Used in the admin dashboard

- **VoucherForm (`src/components/admin/VoucherForm.tsx`)**
  - Form for generating new voucher codes
  - Validates voucher code and discount percentage
  - Used in the admin dashboard

- **AdminDashboard (`src/pages/AdminDashboard.tsx`)**
  - Complete admin interface with tabs for plans, vouchers, and orders
  - Allows CRUD operations on hosting plans and vouchers
  - Displays order information
  - Protected by role-based access control

#### Order Components

- **VoucherInput (`src/components/hosting/VoucherInput.tsx`)**
  - Input field for voucher codes
  - Validates and applies vouchers to orders
  - Shows success/error messages

- **OrderPage (`src/pages/OrderPage.tsx`)**
  - Complete order form for purchasing hosting plans
  - Includes plan details, pricing with optional voucher discount
  - Handles form validation and order submission

#### Dashboard Components

- **ServiceCard (`src/components/dashboard/ServiceCard.tsx`)**
  - Card displaying user's active hosting services
  - Shows plan details and service status
  - Includes service management actions

- **Dashboard (`src/pages/Dashboard.tsx`)**
  - User dashboard showing active services and account information
  - Protected by authentication

### Utility and Configuration

- **authUtils (`src/lib/authUtils.ts`)**
  - Handles authentication state management
  - Includes login, logout, and authentication checks
  - Manages user roles and permissions

- **types (`src/lib/types.ts`)**
  - TypeScript interfaces and types for the application
  - Ensures type safety across components

- **data (`src/lib/data.ts`)**
  - Mock data for hosting plans, users, vouchers, and orders
  - Used for demonstration purposes

## Backend

This project also includes a backend component responsible for handling data persistence, authentication, and business logic related to hosting plans, users, orders, and vouchers.

## Workflows

### User Workflow

1. **Browse Hosting Plans**: Users can view and compare available hosting plans on the homepage
2. **Authentication**: Users can register for a new account or login with existing credentials
3. **Order Process**:
   - Select a hosting plan
   - Optional: Apply a voucher code for a discount
   - Complete the order form with payment details
   - Confirm the order
4. **Dashboard**: After purchasing, users can view and manage their hosting services

### Admin Workflow

1. **Authentication**: Admins login with admin credentials
2. **Manage Plans**:
   - View all hosting plans
   - Create new hosting plans
   - Edit existing plans
   - Delete plans
3. **Voucher Management**:
   - Create new voucher codes with specified discount percentages
   - View active and used vouchers
   - Delete voucher codes
4. **Order Management**:
   - View all customer orders
   - Check order status and details

## Error Handling

- **Form Validation**: All forms include validation to ensure data integrity
- **Authentication Errors**: Detailed error messages for login and registration issues
- **Toast Notifications**: User-friendly notifications for success and error states

## UI Components

The project uses Shadcn UI components with Tailwind CSS for styling. Key components include:

- **Card**: Used for displaying plans, services, and form containers
- **Button**: Consistent button styling across the application
- **Input/Form**: Standardized form elements with validation
- **Dialog**: Modal dialogs for forms and confirmations
- **Tabs**: Used for organizing content in the admin dashboard
- **Alert**: For displaying error messages and important notifications
- **Toast**: For temporary success/error notifications

## Setup and Installation

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Access the application at `http://localhost:#PORTNUMBER#`

## Demo Accounts

- **Regular User**:
  - Email: user@example.com
  - Password: password

- **Admin User**:
  - Email: admin@example.com
  - Password: admin

## Development

This project is built with:

- React with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Shadcn UI for component library
- React Router for navigation
- React Query for data fetching
