# Client Portal Setup Guide

## Overview
The Grilly Cheese Client Portal is now fully implemented with client and admin interfaces for managing quotes, communications, documents, and billing.

## Features Implemented

### Authentication System
- Email/password authentication with auto-confirm enabled
- Secure session management
- Protected routes for both client and admin areas
- Role-based access control (admin/client roles stored separately)

### Client Portal (/portal/*)
- **Dashboard**: Overview of quotes, billing, and messages
- **Quotes**: View all quote requests and their status
- **Quote Details**: Detailed view with documents and communications
- **Messages**: Real-time messaging with Grilly Cheese staff
- **Documents**: Upload and download event-related documents
- **Billing**: View invoices and payment history
- **Settings**: Update profile information

### Admin Dashboard (/admin/*)
- **Dashboard**: Business overview with key metrics
- **Clients**: Manage all client accounts
- **Client Details**: View individual client info, quotes, and financial summary
- **Quotes**: Manage all quote requests
- **Quote Editor**: Update quote status, amounts, and internal notes
- All client portal features accessible from admin view

## Security Features
- Row Level Security (RLS) enabled on all tables
- Separate user_roles table to prevent privilege escalation
- Security definer functions for role checks
- Input validation using Zod schemas
- Secure file upload to Supabase Storage

## How to Create the First Admin User

Since this is a new system, you'll need to manually create the first admin user:

### Option 1: Via Lovable Cloud Dashboard
1. Open your Lovable Cloud dashboard
2. Go to Database → Tables → user_roles
3. Click "Insert" and add a new row:
   - user_id: [copy user ID from profiles or auth.users table]
   - role: admin

### Option 2: Via SQL (Recommended)
Run this SQL query in your database after a user signs up:

```sql
-- First, find the user ID (replace 'admin@grillycheese.net' with actual email)
SELECT id FROM auth.users WHERE email = 'admin@grillycheese.net';

-- Then insert the admin role using the user ID from above
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_ID_HERE', 'admin');
```

### Option 3: Create Admin User Script
Create a user through the signup page at `/auth`, then run this query:

```sql
-- This makes the most recently created user an admin
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
ORDER BY created_at DESC
LIMIT 1;
```

## Testing the Portal

### Test as a Client
1. Go to `/auth`
2. Sign up with a new account
3. Access the client portal at `/portal/dashboard`
4. Test creating messages, uploading documents

### Test as an Admin
1. Create admin role for your user (see above)
2. Log in and access `/admin/dashboard`
3. Test managing clients, quotes, and viewing all data

## Navigation Updates
- Added "Client Portal" link to main navigation
- Clients see "Client Portal" button in header
- Admins see both "Client Portal" and "Admin Dashboard" buttons
- Logout functionality in all portal areas

## Database Schema

### Key Tables
- **profiles**: User profile information
- **user_roles**: Role assignments (admin/client)
- **quote_requests**: Event quote submissions
- **communications**: Messages between clients and staff
- **documents**: File uploads linked to quotes
- **invoices**: Billing and payment tracking
- **payments**: Individual payment records

### Storage
- **event_documents** bucket: Stores uploaded files securely

## Next Steps

### Immediate Tasks
1. Create first admin user using instructions above
2. Test complete user flow (signup → quote → message → upload)
3. Verify all RLS policies are working correctly

### Recommended Enhancements
1. **Email Notifications**: Set up automated emails for:
   - New quote requests to admin
   - Quote status changes to clients
   - New messages notifications
   - Invoice reminders

2. **Integration with Existing Forms**: 
   - Link EventRequestForm to create quote_requests
   - Link QuickQuoteForm to create quote_requests
   - Offer users to create account when submitting quotes

3. **Admin Features**:
   - Bulk invoice generation
   - Payment tracking and reminders
   - Client activity timeline
   - Advanced filtering and search

4. **Client Features**:
   - Quote approval workflow
   - Online payment integration
   - Calendar integration for events
   - Event planning checklist

## Support

For questions about the portal implementation:
- Check the code comments in each component
- Review RLS policies in the database
- Test with the developer console open to see any errors

## Security Checklist

- ✅ RLS enabled on all tables
- ✅ Roles stored in separate table
- ✅ Security definer functions for role checks
- ✅ Input validation with Zod
- ✅ Protected routes with authentication
- ✅ Secure file upload policies
- ✅ No client-side role checking
- ✅ Session management with auto-refresh

## URLs Reference

### Public
- `/` - Homepage
- `/auth` - Login/Signup

### Client Portal (Requires Login)
- `/portal/dashboard` - Client dashboard
- `/portal/quotes` - All quotes
- `/portal/quotes/:id` - Quote details
- `/portal/messages` - Messages
- `/portal/documents` - Documents
- `/portal/billing` - Billing & invoices
- `/portal/settings` - Profile settings

### Admin Panel (Requires Admin Role)
- `/admin/dashboard` - Admin overview
- `/admin/clients` - All clients
- `/admin/clients/:id` - Client details
- `/admin/quotes` - All quotes
- `/admin/quotes/:id` - Edit quote
