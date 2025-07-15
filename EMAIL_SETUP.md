# Email Setup Instructions for Mirage Waitlist

## Quick Setup with Resend

Your waitlist form is now ready! To receive email notifications when users sign up, follow these steps:

### 1. Sign up for Resend (Free)
- Go to [resend.com](https://resend.com)
- Sign up for a free account (3,000 emails/month)

### 2. Get Your API Key
- Log into your Resend dashboard
- Go to API Keys section
- Create a new API key
- Copy the key (starts with `re_`)

### 3. Set Up Environment Variables
Create a `.env.local` file in your project root with:

```env
RESEND_API_KEY=your_actual_api_key_here
```

### 4. Verify Your Domain (Optional but Recommended)
- In Resend dashboard, go to Domains
- Add your domain (e.g., `mirage.com`)
- Follow DNS verification steps
- Update the API route to use your domain instead of the placeholder

### 5. Update Email Settings (Optional)
In `src/app/api/waitlist/route.ts`, you can customize:
- **From email**: Change `noreply@mirage.com` to your verified domain
- **Subject line**: Customize the email subject
- **Email template**: Modify the HTML template design

## Current Features

✅ **Email Form**: Captures user emails with validation  
✅ **Success Modal**: Beautiful golden-themed popup with thumbs up icon  
✅ **Email Notifications**: Sends styled notifications to `hello.vladasana@gmail.com`  
✅ **Error Handling**: Graceful error handling and user feedback  
✅ **Responsive Design**: Works on all devices  

## Testing

For testing without setting up Resend:
- The form will still work and show the success modal
- Email sending will fail silently (logged to console)
- Check browser console for submission logs

## Email Template

The notification emails include:
- Mirage branding with golden theme
- User's email address
- Timestamp of submission
- Source confirmation (Mirage Landing Page)
- Professional HTML styling

## Need Help?

- [Resend Documentation](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**Note**: Your waitlist form is fully functional! The email service is optional for notifications. 