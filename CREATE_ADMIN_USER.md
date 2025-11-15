# Create Your First Admin User

## Step 1: Sign Up
1. Visit your app at `/auth`
2. Click the "Sign Up" tab
3. Fill in your information:
   - **Email**: Use your Grilly Cheese email (e.g., `you@grillycheese.net`)
   - **Password**: Choose a secure password
   - **Full Name**: Your name
   - **Phone**: Optional
   - **Company Name**: Optional
4. Click "Sign Up"

## Step 2: Make Yourself an Admin

After signing up, you need to add the admin role to your account. You have two options:

### Option A: Using Lovable Cloud Dashboard (Recommended)

1. Click "View Backend" in the Lovable interface (or use the button below)
2. Go to **Database → Tables → user_roles**
3. Click **"Insert"** button
4. Fill in the new row:
   - **user_id**: Copy your user ID from the profiles table (same as your email's auth.users id)
   - **role**: Select `admin` from the dropdown
5. Click **Save**

### Option B: Using SQL Query

Run this SQL query in your database:

```sql
-- This makes your most recently created user an admin
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
ORDER BY created_at DESC
LIMIT 1;
```

**Or if you know your email:**

```sql
-- Replace 'your-email@grillycheese.net' with your actual email
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'your-email@grillycheese.net';
```

## Step 3: Verify Admin Access

1. Log out and log back in (or refresh the page)
2. You should now see an **"Admin Dashboard"** button in your portal header
3. Click it to access the admin panel at `/admin/dashboard`

## Troubleshooting

**"I don't see the Admin Dashboard button"**
- Make sure you logged out and back in after adding the admin role
- Check that the role was added correctly in the user_roles table
- Verify your user_id matches between auth.users and user_roles tables

**"I can't access /admin/dashboard"**
- Ensure you're logged in
- Verify the admin role exists for your user
- Check browser console for any errors

## What's Next?

Once you're an admin, you can:
- View all client accounts at `/admin/clients`
- Manage quote requests at `/admin/quotes`
- Update quote status and pricing
- View messages and documents
- Track invoices and payments

---

Need help? Check the PORTAL_SETUP.md file for more detailed documentation.
