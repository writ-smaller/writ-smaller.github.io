# Writ Smaller Blog

A simple, lightweight blog built with plain HTML, CSS, and jQuery. No frameworks, no build tools, just good old web development.

## Features

- 📝 Clean, minimal design
- 📱 Fully responsive layout
- ⚡ Fast loading with no heavy frameworks
- 🎨 Pure CSS styling with smooth animations
- 🔧 jQuery for dynamic content loading
- 📚 Easy to add new blog posts
- 🚀 Ready for GitHub Pages deployment

## Project Structure

```
.
├── index.html        # Main HTML file with blog structure
├── styles.css        # All CSS styling for the blog
├── blog-data.js      # Blog posts data (array of post objects)
├── blog.js           # jQuery-powered blog functionality
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## How It Works

### Blog Posts

All blog posts are stored in `blog-data.js` as a JavaScript array. Each post object contains:

- `id`: Unique identifier
- `title`: Post title
- `date`: Publication date (YYYY-MM-DD format)
- `author`: Author name
- `excerpt`: Short preview text
- `content`: Full post content (HTML)

### Adding New Posts

To add a new blog post:

1. Open `blog-data.js`
2. Add a new post object to the `blogPosts` array:

```javascript
{
    id: 6,
    title: "Your Post Title",
    date: "2025-10-29",
    author: "Your Name",
    excerpt: "A brief description...",
    content: `
        <p>Your full post content here...</p>
        <p>You can use HTML tags!</p>
    `
}
```

3. Save and refresh - that's it!

## Navigation

The blog includes three pages:

- **Home**: Displays all blog posts with excerpts
- **About**: Information about the blog
- **Archive**: List of all posts with dates

Navigation is handled dynamically using jQuery - clicking between pages doesn't reload the browser.

## Styling

The blog uses:

- Modern CSS Flexbox for layouts
- CSS transitions for smooth effects
- Media queries for responsive design
- A clean, readable color scheme
- System font stack for fast loading

## Local Development

To run locally:

```bash
# Clone the repository
git clone https://github.com/writ-smaller/writ-smaller.github.io.git
cd writ-smaller.github.io

# Start a local server (Python 3)
python3 -m http.server 8080

# Or use Node.js
npx http-server -p 8080

# Visit http://localhost:8080 in your browser
```

## GitHub Pages Deployment

This blog is designed for GitHub Pages:

1. Push your changes to the `main` branch
2. Go to repository Settings → Pages
3. Select source: Deploy from a branch
4. Select branch: `main`, folder: `/ (root)`
5. Save and wait for deployment

Your blog will be available at: `https://writ-smaller.github.io/`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- jQuery 3.6.0 handles cross-browser compatibility
- Responsive design works on mobile, tablet, and desktop

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- jQuery 3.6.0 (via CDN)

## License

Free to use and modify as you wish!

## Credits

Built with simplicity in mind. No frameworks, no complexity, just the web fundamentals.