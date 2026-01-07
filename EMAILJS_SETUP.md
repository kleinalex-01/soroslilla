# EmailJS Setup Guide

Your Contact page is configured to use **EmailJS** - a free service that sends emails directly from the browser without needing a backend server.

## Quick Setup (2 minutes)

### 1. Create EmailJS Account
- Go to [emailjs.com](https://www.emailjs.com)
- Sign up for free
- Confirm your email

### 2. Create Email Service
- In the dashboard, go to **Email Services**
- Click **Create Service**
- Choose your email provider (Gmail, Outlook, etc.)
- Name it something like `gmail_service`
- Follow the connection steps
- Copy the **Service ID**

### 3. Create Email Template
- Go to **Email Templates**
- Click **Create Template**
- Name it `contact_form`
- Set the **To Email** field to: `{{to_email}}`
- Use this template structure:

```
From: {{from_name}} <{{from_email}}>
Subject: {{subject}}

Message:
{{message}}

Phone: {{phone}}
```

- Copy the **Template ID**

### 4. Get Your Public Key
- Go to **Account** → **API Keys**
- Copy your **Public Key**

### 5. Update Contact.tsx
Open `src/pages/Contact.tsx` and replace these three lines at the top:

```tsx
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE'
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID_HERE'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID_HERE'
```

Also update the email address where you want to receive messages:
```tsx
to_email: 'your-email@example.com', // Change this
```

### 6. Test It
Build and test the form. If it works, emails will arrive in your inbox!

## Free Tier Limits
- **50 form submissions per month** (free tier)
- **Unlimited email recipients** for each submission
- Great for small business websites

## Security Notes
✅ Your Public Key is safe to be public (it's meant to be)
✅ No form data is stored on servers
✅ Emails are sent directly to your inbox
✅ All validation happens client-side

## Troubleshooting

**Form won't send?**
- Check that Service ID and Template ID match exactly
- Make sure your email service is connected in EmailJS dashboard
- Check browser console for error messages

**Emails not arriving?**
- Check spam folder
- Verify sender email is authorized in EmailJS settings
- Ensure template syntax is correct (use `{{variable_name}}`)

**Want more submissions?**
- EmailJS Pro plan: $10/month for unlimited submissions
- Or try Formspree.io for 50 free/month

Need help? Check EmailJS docs: https://www.emailjs.com/docs/
