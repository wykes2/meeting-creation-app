# Meeting Creation App - Sharing Instructions

## Local Sharing (Currently Running)

Your meeting creation app is now available as a shareable production build:

### **Current Shareable Link:**
```
http://localhost:3003
```

### **How to Share with Friends:**

#### Option 1: Local Network Sharing
1. **Find your local IP address:**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
   
2. **Share this link with friends on the same network:**
   ```
   http://YOUR_LOCAL_IP:3003
   ```
   (Replace YOUR_LOCAL_IP with your actual local IP address)

#### Option 2: Temporary Cloud Deployment
For sharing with friends outside your local network, you can use these free services:

1. **GitHub Pages (Free & Permanent)**
   - Create a GitHub repository
   - Upload the `build` folder
   - Enable GitHub Pages
   - Share the generated URL

2. **Netlify Drop (Free & Quick)**
   - Go to https://app.netlify.com/drop
   - Drag and drop the `build` folder
   - Get an instant shareable link

3. **Vercel (Free & Professional)**
   - Go to https://vercel.com
   - Connect your GitHub account
   - Import the project
   - Get a professional URL

#### Option 3: ngrok (Temporary Public URL)
1. **Install ngrok:**
   ```bash
   brew install ngrok  # or download from https://ngrok.com
   ```

2. **Create a public URL:**
   ```bash
   ngrok http 3003
   ```

3. **Share the ngrok URL** (looks like: https://random-words.ngrok.io)

### **What Your Friends Will See:**
- A fully functional meeting creation app
- All 5 screens with smooth animations
- Modern, professional design
- Responsive layout for mobile and desktop
- No login required

### **Features They Can Use:**
- Create different types of meetings (1-on-1, Group, Team, etc.)
- Set meeting details (title, date, time, duration)
- Select participants with search functionality
- Review meeting summary
- Get success confirmation with meeting link

### **Note:**
- The current setup is for demonstration purposes
- Meeting data is stored locally in the browser session
- For a production app, you'd want to add:
  - User authentication
  - Database storage
  - Email notifications
  - Calendar integration

### **Quick Start for Friends:**
Just share the link and they can start creating meetings immediately - no installation required!

---

**App Status:** Currently running and ready to share!
