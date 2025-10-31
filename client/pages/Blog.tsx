import { Link } from "react-router-dom";

// Blog post metadata - add your posts here
export default function Blog() {
  const blogPosts = [
    {
      slug: "from-philosophy-to-implementation",
      title: "From Philosophy to Implementation: Building Hikki's Architecture",
      excerpt: "I came from design, writing, translation—spaces where you shape meaning, not systems. When I started building Hikki, I knew I'd need to learn frontend architecture deeply enough to make technical decisions that served the philosophy: this is a tool for seeing how you think.",
      date: "2025-10-27",
      image: "/assets/images/blog/blog-from-philosophy-to-implementation.jpg"
    },
    {
      slug: "the-canvas-that-thinks-with-you",
      title: "The Canvas That Thinks With You",
      excerpt: "There's a moment in exam prep when the screen becomes the enemy. Tabs multiply. Word lists scroll. And somewhere between the vocabulary flashcards and the essay templates, the question arrives: where does any of this actually go?",
      date: "2025-10-27",
      image: "/assets/images/blog/blog-the-canvas-that-thinks-with-you.jpg"
    },
    {
      slug: "between-drift-and-destruction",
      title: "Between Drift and Destruction",
      excerpt: "Reading Didion and Daisies while writing a screenplay—finding the space where exhausted caring lives.",
      date: "2025-10-22",
      image: "/assets/images/blog/blog-between-drift-and-destruction.jpg"
    },
    {
      slug: "introducing-echo",
      title: "Introducing Ecko",
      excerpt: "在這個世界要求你立刻回答、立刻行動、立刻產出的時候，Ecko 說：「等一下。你真的想清楚了嗎？」",
      date: "2025-01-15",
      image: "/assets/images/blog/blog-introducing-echo.jpg"
    },
    {
      slug: "introducing-hikki",
      title: "Introducing Hikki",
      excerpt: "讓思路自動成圖的 AI 工作畫布——不用從零開始，聊著聊著地圖就出來了",
      date: "2025-01-15",
      image: "/assets/images/blog/blog-introducing-hikki.jpg"
    },
    {
      slug: "echo-principles",
      title: "Ecko Principles: A Framework for Thought",
      excerpt: "How a dynamic notebook becomes a conversation with your past self. Exploring the principles behind reflective thinking and digital note-taking.",
      date: "2024-01-15",
      image: "/assets/images/blog/blog-echo-principles.jpg"
    },
    {
      slug: "origin-story",
      title: "Origin Story: Why Ecko Exists",
      excerpt: "The gift of necessary distance. The space between thought and understanding.",
      date: "2024-01-10",
      image: "/assets/images/blog/blog-origin-story.jpg"
    },
    // Add more posts here following the same structure
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-16">
          <h1 className="text-4xl lg:text-5xl serif font-semibold mb-4">Read</h1>
          <p className="text-xl text-muted-foreground">
            Writing on aesthetics, research methods, and the intersection of digital tools with human thinking. 
            Each post is an echo — a reflection meant to resonate.
          </p>
        </header>

        <div className="space-y-12">
          {blogPosts.map((post) => (
            <article key={post.slug} className="paper-card overflow-hidden hover-lift">
              <Link to={`/post/${post.slug}`} className="block">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="aspect-[4/3] md:aspect-square overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="p-8 md:w-2/3">
                    <time className="text-sm text-muted-foreground mb-2 block">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                    <h2 className="serif text-2xl font-semibold mb-4 text-foreground">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
