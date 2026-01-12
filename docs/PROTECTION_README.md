# CeremonIA UI Demo - Protection Guide

## 🔒 Protection Measures Implemented

This branch (`feat/ui-purpose`) contains client-side protection measures designed to discourage casual copying and inspection of the UI demo. **Important:** These are deterrents only, not real security measures.

### Protection Features

#### 1. **Right-Click Protection**
- Context menu is disabled across the entire site
- Shows a notice when users attempt to right-click

#### 2. **DevTools Restrictions**
- Disabled keyboard shortcuts:
  - `F12` - DevTools
  - `Ctrl+Shift+I` - Inspect Element
  - `Ctrl+Shift+J` - Console
  - `Ctrl+Shift+C` - Inspect Element (alternative)
  - `Ctrl+U` - View Source
  - `Ctrl+S` - Save Page
- Basic DevTools detection (monitors window size changes)

#### 3. **Image Protection**
- Drag-and-drop disabled on all images
- Right-click save disabled
- `user-select: none` applied to images
- `draggable="false"` attribute added

#### 4. **Visible Watermark**
- Fixed watermark in bottom-right corner
- Text: "UI Demo – Not for Development Use"
- Purple background with icon
- Non-interactive (pointer-events: none)

#### 5. **Anti-Caching Headers**
- Meta tags prevent browser caching
- Forces fresh load on each visit

#### 6. **SEO Protection**
- `noindex, nofollow` robots meta tag
- Prevents search engine indexing

#### 7. **Print Protection**
- Large watermark appears when printing
- Rotated "UI DEMO - NOT FOR PRODUCTION USE" text

#### 8. **Iframe Protection**
- Prevents embedding in iframes (clickjacking protection)
- Automatically breaks out of frames

## 📁 Files Added

```
assets/
├── js/
│   └── protection.js       # Main protection script
└── css/
    └── protection.css      # Protection-specific styles
```

## 🚀 Deployment to Vercel

### Step 1: Prepare for Deployment

```bash
# Ensure you're on the correct branch
git checkout feat/ui-purpose

# Verify all changes are committed
git status
git add .
git commit -m "Add UI demo protection measures"
```

### Step 2: Push to GitHub

```bash
# Push the branch to GitHub
git push origin feat/ui-purpose
```

### Step 3: Deploy to Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Import Project** or select existing project
3. **Configure Deployment**:
   - **Branch**: `feat/ui-purpose`
   - **Root Directory**: `./` (or leave default)
   - **Framework Preset**: Other (static HTML)
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: `./` (or leave default)

4. **Environment Variables**: None needed for this demo

5. **Deploy**: Click "Deploy"

### Step 4: Custom Domain (Optional)

Set up custom domain: `ceremonia-ui.vercel.app`

1. Go to Project Settings → Domains
2. Add domain: `ceremonia-ui.vercel.app`
3. Follow Vercel's DNS configuration instructions

## ⚠️ Important Disclaimers

### What These Protections DO:
✅ Discourage casual users from copying code  
✅ Make it harder for non-technical users to inspect  
✅ Add visible attribution/watermark  
✅ Prevent accidental right-clicks  
✅ Show this is a demo, not production code  

### What These Protections DON'T DO:
❌ Provide real security  
❌ Stop determined developers  
❌ Prevent viewing source via browser menu  
❌ Stop network request inspection  
❌ Prevent screenshot/screen recording  
❌ Protect against browser extensions  

### The Reality:
**Any client-side code can be viewed and copied.** These measures are psychological deterrents and legal notices, not technical barriers. A determined person can:
- Disable JavaScript
- Use browser menu to view source
- Inspect network requests
- Use browser extensions
- Take screenshots
- Use mobile devices

## 🎯 Best Practices for UI Demos

### Additional Recommendations:

1. **Watermark Images**: Add visible watermarks to all custom images
2. **License Agreement**: Add a clear license/terms page
3. **Contact Information**: Make it easy for interested clients to reach you
4. **Limited Functionality**: Don't include actual backend functionality
5. **Time-Limited Access**: Consider adding expiration dates for demos
6. **Tracking**: Use analytics to monitor who accesses the demo

### Legal Protection (More Effective):

1. **Copyright Notice**: Add © notice in footer
2. **Terms of Service**: Create a ToS page
3. **License Agreement**: Require acceptance before viewing
4. **Watermarked Assets**: Watermark all custom graphics
5. **Documentation**: Keep records of your original work

## 🔧 Customization

### Change Watermark Text:
Edit `assets/js/protection.js`, line ~140:
```javascript
<span>UI Demo – Not for Development Use</span>
```

### Change Watermark Color:
Edit the `background` color in the watermark style (line ~145):
```javascript
background: rgba(130, 58, 175, 0.9); // Purple
```

### Disable Specific Protections:
Comment out sections in `protection.js`:
```javascript
// Comment out right-click protection
/*
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    ...
});
*/
```

## 📊 Monitoring

### Recommended Analytics:
- **Google Analytics**: Track page views and user behavior
- **Vercel Analytics**: Built-in analytics for deployment
- **Hotjar/Microsoft Clarity**: See how users interact with the demo

### What to Monitor:
- Page views and unique visitors
- Time spent on page
- Geographic location
- Referral sources
- Device types

## 🆘 Support

If you need to:
- Remove protections for development
- Add additional protections
- Customize watermark or messages
- Set up authentication

Switch to the `feat/ui-work-actual` branch for the unprotected version:
```bash
git checkout feat/ui-work-actual
```

## 📝 Notes

- **Demo URL**: https://ceremonia-ui.vercel.app/
- **Protected Branch**: `feat/ui-purpose`
- **Development Branch**: `feat/ui-work-actual`
- **Production Branch**: `main` (when ready)

---

**Remember**: The best protection is a combination of:
1. Legal measures (copyright, terms of service)
2. Technical deterrents (these protections)
3. Business relationships (contracts, NDAs)
4. Watermarked assets
5. Limited demo functionality
