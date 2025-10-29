// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Welcome to Writ Smaller",
        date: "2025-10-28",
        author: "Admin",
        excerpt: "Welcome to our new blog! This is a simple, lightweight blog built with plain HTML, CSS, and jQuery. No frameworks, no build tools, just good old web development.",
        content: `
            <p>Welcome to our new blog! This is a simple, lightweight blog built with plain HTML, CSS, and jQuery. No frameworks, no build tools, just good old web development.</p>
            <p>In a world where web development has become increasingly complex, sometimes it's refreshing to go back to basics. This blog is a testament to the fact that you don't need fancy frameworks or build pipelines to create something functional and beautiful.</p>
            <p>We'll be sharing thoughts, tutorials, and insights about web development, programming, and technology in general. Stay tuned!</p>
        `
    },
    {
        id: 2,
        title: "The Beauty of Simple Web Development",
        date: "2025-10-27",
        author: "Admin",
        excerpt: "Sometimes the best solutions are the simplest ones. Let's explore why plain HTML, CSS, and JavaScript still have their place in modern web development.",
        content: `
            <p>In today's web development landscape, it's easy to get caught up in the complexity of modern frameworks and tooling. While these tools certainly have their place, there's something to be said for the simplicity of plain HTML, CSS, and JavaScript.</p>
            <p>Here are some benefits of keeping things simple:</p>
            <ul>
                <li><strong>Fast load times:</strong> No heavy frameworks means faster initial page loads.</li>
                <li><strong>Easy to understand:</strong> Anyone familiar with basic web technologies can jump in and contribute.</li>
                <li><strong>No build step:</strong> Just edit and refresh. It's that simple.</li>
                <li><strong>Full control:</strong> You know exactly what's happening without layers of abstraction.</li>
            </ul>
            <p>This doesn't mean frameworks are bad - they solve real problems. But for simple projects like blogs, documentation sites, or landing pages, keeping it simple can be the best choice.</p>
        `
    },
    {
        id: 3,
        title: "Getting Started with jQuery",
        date: "2025-10-26",
        author: "Admin",
        excerpt: "jQuery might be considered 'old school' by some, but it's still a powerful and easy-to-use library for DOM manipulation and event handling.",
        content: `
            <p>jQuery has been around for over a decade, and while modern JavaScript has incorporated many of its features natively, jQuery remains a convenient and concise way to work with the DOM.</p>
            <p>Some reasons to still consider jQuery:</p>
            <ul>
                <li><strong>Concise syntax:</strong> <code>$('.element')</code> is cleaner than <code>document.querySelectorAll('.element')</code></li>
                <li><strong>Cross-browser compatibility:</strong> jQuery handles browser quirks for you</li>
                <li><strong>Rich plugin ecosystem:</strong> Thousands of plugins are available for common tasks</li>
                <li><strong>Easy animations:</strong> Built-in animation methods make UI effects simple</li>
            </ul>
            <p>For this blog, we're using jQuery to handle navigation, dynamic content loading, and smooth interactions. It's perfect for our needs!</p>
        `
    },
    {
        id: 4,
        title: "Building a Blog Without a Database",
        date: "2025-10-25",
        author: "Admin",
        excerpt: "Who says you need a database for a blog? Static site generation and client-side data structures can be just as effective for small to medium-sized blogs.",
        content: `
            <p>Traditional blogs typically use a database to store posts, comments, and other content. But for many use cases, especially smaller blogs or static sites, a database is overkill.</p>
            <p>This blog stores all its posts in a simple JavaScript array. Here's why this approach works well:</p>
            <ul>
                <li><strong>Simplicity:</strong> No database setup or maintenance required</li>
                <li><strong>Version control:</strong> All content is in files that can be tracked with Git</li>
                <li><strong>Free hosting:</strong> Static sites can be hosted on GitHub Pages for free</li>
                <li><strong>Fast performance:</strong> No database queries means instant load times</li>
                <li><strong>Easy backups:</strong> Just commit and push your changes</li>
            </ul>
            <p>Of course, this approach has limitations - no user-generated content, no real-time updates, and you need to rebuild/redeploy to add posts. But for a personal blog or documentation site, it's perfect!</p>
        `
    },
    {
        id: 5,
        title: "Responsive Design with Pure CSS",
        date: "2025-10-24",
        author: "Admin",
        excerpt: "CSS has come a long way, and modern CSS features make responsive design easier than ever. No CSS frameworks needed!",
        content: `
            <p>Creating responsive designs used to require CSS frameworks like Bootstrap or Foundation. But modern CSS has evolved to the point where you can create beautiful, responsive layouts with just vanilla CSS.</p>
            <p>Key CSS features that make this possible:</p>
            <ul>
                <li><strong>Flexbox:</strong> Easy layouts with flexible containers</li>
                <li><strong>CSS Grid:</strong> Powerful two-dimensional layouts</li>
                <li><strong>Media queries:</strong> Adapt styles to different screen sizes</li>
                <li><strong>CSS custom properties:</strong> Variables for consistent theming</li>
                <li><strong>Modern selectors:</strong> Target elements precisely without extra classes</li>
            </ul>
            <p>This blog uses these modern CSS features to ensure it looks great on desktop, tablet, and mobile devices. Try resizing your browser window to see it in action!</p>
        `
    }
];
