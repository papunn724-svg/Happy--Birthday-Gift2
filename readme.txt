========================================================================
             BIRTHDAY / ROMANTIC LOVE PROJECT — CONFIGURATION GUIDE
========================================================================

Welcome! This guide explains step-by-step how to customize the project
for your special someone in just a few clicks.

------------------------------------------------------------------------
STEP 1: OPEN THE CONFIGURATION FILE
------------------------------------------------------------------------
1. Open the project folder.
2. Open the "script.js" file using any text editor (Notepad, VS Code, etc.).
3. At the very top of "script.js" (around lines 8 to 12), you will see the
   Global Configuration block:

   const CONFIG = {
     name: 'Aditi',
     email: 'demo@gmail.com'
   };

------------------------------------------------------------------------
STEP 2: CHANGE THE RECIPIENT NAME & YOUR EMAIL
------------------------------------------------------------------------
- Change 'Aditi' to your recipient's name (e.g. 'Sarah' or 'Alex').
- Change 'demo@gmail.com' to your actual email address where you want to
  receive notification emails when she interacts with the website.

Example:
   const CONFIG = {
     name: 'Sophia',
     email: 'your-email@gmail.com'
   };

Save the file after editing.

------------------------------------------------------------------------
WHAT GETS UPDATED AUTOMATICALLY WITH 'name':
------------------------------------------------------------------------
Changing the 'name' in `CONFIG` will automatically update all the
following locations across the website:
  1. Browser Tab Title ("Happy Birthday, <Name> ✨")
  2. Navigation Bar Logo ("<Name> ✦")
  3. Main Hero Banner Name
  4. Love Letter Salutation ("Dear <Name>,")
  5. Post-candle blow wish message
  6. Finale Footer ("Happy Birthday, <Name>...")

------------------------------------------------------------------------
STEP 3: FORMSUBMIT EMAIL ACTIVATION (IMPORTANT!)
------------------------------------------------------------------------
This project uses FormSubmit (https://formsubmit.co) to send emails when
she:
  1. Blows out the cake candles 💨
  2. Opens the personal love letter 💌
  3. Spins a new birthday wish ✦

Activation Step for First-Time Use:
1. Put your real email address in `CONFIG.email` in `script.js`.
2. Open `index.html` in your browser and click "💨 Blow the Candles!".
3. Check your email inbox. FormSubmit will send you a ONE-TIME activation link.
4. Click the confirmation link in that email to activate notifications.
5. After activating, all future interactions on the website will instantly
   deliver email notifications to your inbox!

------------------------------------------------------------------------
TROUBLESHOOTING & NOTES
------------------------------------------------------------------------
- If emails are not arriving, check your Email Spam/Junk folder for the
  FormSubmit activation email.
- Ensure your device has an active internet connection so FormSubmit API
  can deliver the notifications.

Enjoy celebrating! 🌟
========================================================================
