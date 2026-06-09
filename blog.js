// Blog functionality using jQuery
$(document).ready(function() {
    let currentPage = 'home';
    let currentPostId = null;

    // Initialize the blog
    init();

    function init() {
        // Load the home page by default
        loadHomePage();
        
        // Set up navigation click handlers
        $('.nav-links a').on('click', function(e) {
            e.preventDefault();
            const page = $(this).data('page');
            navigateToPage(page);
            
            // Update active state
            $('.nav-links a').removeClass('active');
            $(this).addClass('active');
        });
    }

    function navigateToPage(page) {
        currentPage = page;
        currentPostId = null;

        switch(page) {
            case 'home':
                loadHomePage();
                break;
            case 'about':
                loadAboutPage();
                break;
            case 'archive':
                loadArchivePage();
                break;
        }
    }

    function loadHomePage() {
        const $content = $('#content');
        $content.empty();

        if (blogPosts.length === 0) {
            $content.html('<p class="loading">No posts available.</p>');
            return;
        }

        // Display all posts with excerpts
        blogPosts.forEach(function(post) {
            const $post = createPostExcerpt(post);
            $content.append($post);
        });

        // Animate posts on load
        $('.post').hide().fadeIn(600);
    }

    function createPostExcerpt(post) {
        const $post = $('<article>').addClass('post');
        
        const $title = $('<h2>').addClass('post-title');
        const $titleLink = $('<a>')
            .attr('href', '#')
            .text(post.title)
            .on('click', function(e) {
                e.preventDefault();
                loadSinglePost(post.id);
            });
        $title.append($titleLink);
        
        const $meta = $('<div>').addClass('post-meta')
            .text(`Posted on ${formatDate(post.date)} by ${post.author}`);
        
        const $excerpt = $('<div>').addClass('post-excerpt').text(post.excerpt);
        
        const $readMore = $('<a>')
            .attr('href', '#')
            .addClass('read-more')
            .text('Read more →')
            .on('click', function(e) {
                e.preventDefault();
                loadSinglePost(post.id);
            });
        
        $post.append($title, $meta, $excerpt, $readMore);
        return $post;
    }

    function loadSinglePost(postId) {
        const post = blogPosts.find(p => p.id === postId);
        if (!post) {
            $('#content').html('<p class="loading">Post not found.</p>');
            return;
        }

        currentPostId = postId;
        const $content = $('#content');
        $content.empty();

        const $backLink = $('<a>')
            .attr('href', '#')
            .addClass('back-to-home')
            .text('← Back to all posts')
            .on('click', function(e) {
                e.preventDefault();
                loadHomePage();
            });

        const $post = $('<article>').addClass('post');
        
        const $title = $('<h2>').addClass('post-title').text(post.title);
        const $meta = $('<div>').addClass('post-meta')
            .text(`Posted on ${formatDate(post.date)} by ${post.author}`);
        const $content_div = $('<div>').addClass('post-content').html(post.content);
        
        $post.append($title, $meta, $content_div);
        $content.append($backLink, $post);

        // Smooth scroll to top
        $('html, body').animate({ scrollTop: 0 }, 300);
        
        // Fade in the post
        $post.hide().fadeIn(600);
    }

    function loadAboutPage() {
        const $content = $('#content');
        $content.empty();

        const $about = $('<div>').addClass('about-content');
        $about.html(`
            <h2>About Writ Smaller</h2>
            <p>Welcome to Writ Smaller, a minimalist blog focused on the art of simplicity in web development and beyond.</p>
            <p>This blog is built using pure HTML, CSS, and jQuery - no complex frameworks, no build systems, just straightforward web technologies that anyone can understand and modify.</p>
            <p>We believe in:</p>
            <ul>
                <li>Keeping things simple and maintainable</li>
                <li>Writing clear, understandable code</li>
                <li>Embracing the fundamentals of web development</li>
                <li>Creating fast, lightweight experiences</li>
            </ul>
            <p>The name "Writ Smaller" reflects our philosophy: sometimes the best solutions come from thinking smaller, not bigger. By constraining ourselves to simple tools and techniques, we often discover more elegant solutions.</p>
            <p>Thank you for visiting!</p>
        `);

        $content.append($about);
        $about.hide().fadeIn(600);
    }

    function loadArchivePage() {
        const $content = $('#content');
        $content.empty();

        const $archive = $('<div>').addClass('about-content');
        const $title = $('<h2>').text('Blog Archive');
        const $list = $('<ul>').addClass('archive-list');

        blogPosts.forEach(function(post) {
            const $item = $('<li>');
            const $date = $('<span>').addClass('post-date').text(formatDate(post.date));
            const $link = $('<a>')
                .attr('href', '#')
                .text(post.title)
                .on('click', function(e) {
                    e.preventDefault();
                    loadSinglePost(post.id);
                });
            
            $item.append($link, $date);
            $list.append($item);
        });

        $archive.append($title, $list);
        $content.append($archive);
        $archive.hide().fadeIn(600);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Handle browser back/forward buttons
    $(window).on('popstate', function() {
        if (currentPostId) {
            loadHomePage();
        }
    });
});
