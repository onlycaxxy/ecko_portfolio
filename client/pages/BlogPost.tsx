import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { marked } from "marked";

// Simple frontmatter parser (browser-compatible, no Buffer needed)
function parseFrontmatter(markdown: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: markdown };
  }

  const [, frontmatterText, content] = match;
  const data: Record<string, string> = {};

  // Parse YAML-like frontmatter
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      data[key] = value;
    }
  });

  return { data, content };
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<{
    title: string;
    date: string;
    content: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Load markdown file from /content/blog/
    const url = `/content/blog/${slug}.md`;
    console.log('Fetching blog post from:', url);
    fetch(url)
      .then((res) => {
        console.log('Fetch response status:', res.status, res.ok);
        if (!res.ok) throw new Error("Post not found");
        return res.text();
      })
      .then((markdown) => {
        console.log('Markdown loaded, length:', markdown.length);
        console.log('Markdown preview:', markdown.substring(0, 200));

        // Parse frontmatter and content
        const { data, content } = parseFrontmatter(markdown);
        console.log('Parsed frontmatter:', data);
        console.log('Content length:', content.length);

        // Convert markdown to HTML
        const htmlContent = marked(content);

        setPost({
          title: data.title,
          date: data.date,
          content: htmlContent as string,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading blog post:', err);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Post not found</p>
          <Link to="/blog" className="text-misty-blue hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-muted-foreground hover:text-misty-blue mb-8 focus-ring rounded"
        >
          ← Back to Blog
        </Link>

        <article className="content-width mx-auto">
          <header className="mb-12">
            <time className="text-sm text-muted-foreground mb-4 block">
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
            <h1 className="text-4xl lg:text-5xl serif font-semibold text-foreground leading-tight">
              {post.title}
            </h1>
          </header>

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <footer className="mt-16 pt-8 border-t border-gray-100">
          <div className="content-width mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-muted-foreground hover:text-misty-blue focus-ring rounded"
            >
              ← More writing
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
