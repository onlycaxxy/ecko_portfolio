import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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

export default function TranslationView() {
  const { slug } = useParams();
  const [translation, setTranslation] = useState<{
    title: string;
    author: string;
    translator: string;
    date: string;
    description: string;
    enContent: string;
    zhContent: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Scroll sync refs
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const syncingRef = useRef(false);

  useEffect(() => {
    console.log('Loading translation:', slug);
    // Load markdown file from /content/translations/
    fetch(`/content/translations/${slug}.md`)
      .then((res) => {
        console.log('Fetch response:', res.status, res.ok);
        if (!res.ok) throw new Error("Translation not found");
        return res.text();
      })
      .then((markdown) => {
        console.log('Markdown loaded, length:', markdown.length);
        // Parse frontmatter and content
        const { data, content } = parseFrontmatter(markdown);
        console.log('Frontmatter:', data);
        console.log('Content preview:', content.substring(0, 100));

        // Split content by ## EN and ## ZH sections
        if (!content.includes('## EN') || !content.includes('## ZH')) {
          throw new Error('Translation must have "## EN" and "## ZH" sections');
        }

        const sections = content.split('## EN');
        if (sections.length < 2) throw new Error('Missing ## EN section');

        const afterEN = sections[1];
        const zhSplit = afterEN.split('## ZH');

        if (zhSplit.length < 2) throw new Error('Missing ## ZH section');

        const enContent = zhSplit[0].trim();
        const zhContent = zhSplit[1].trim();

        if (!enContent || !zhContent) {
          throw new Error('EN or ZH section is empty');
        }

        // Convert markdown to HTML
        const enHTML = marked(enContent);
        const zhHTML = marked(zhContent);

        setTranslation({
          title: data.title || "Untitled",
          author: data.author || "",
          translator: data.translator || "",
          date: data.date || "",
          description: data.description || "",
          enContent: enHTML as string,
          zhContent: zhHTML as string,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Translation loading error:', err);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  // Scroll sync effect
  useEffect(() => {
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!leftCol || !rightCol) return;

    const syncScroll = (source: HTMLDivElement, target: HTMLDivElement) => {
      if (syncingRef.current) return;
      syncingRef.current = true;

      const ratio = source.scrollTop / (source.scrollHeight - source.clientHeight || 1);
      const targetScroll = ratio * (target.scrollHeight - target.clientHeight);
      target.scrollTop = targetScroll;

      syncingRef.current = false;
    };

    const handleLeftScroll = () => syncScroll(leftCol, rightCol);
    const handleRightScroll = () => syncScroll(rightCol, leftCol);

    leftCol.addEventListener('scroll', handleLeftScroll, { passive: true });
    rightCol.addEventListener('scroll', handleRightScroll, { passive: true });

    return () => {
      leftCol.removeEventListener('scroll', handleLeftScroll);
      rightCol.removeEventListener('scroll', handleRightScroll);
    };
  }, [translation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-muted-foreground">Loading translation...</p>
      </div>
    );
  }

  if (error || !translation) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Translation not found</p>
          <Link to="/portfolio" className="text-misty-blue hover:underline">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f10] text-[#e6e0d6] font-mono relative">
      {/* Film Grain Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[4] opacity-[0.18] mix-blend-screen animate-grain-shift"
        style={{
          backgroundImage: 'url(/assets/textures/grain.png)',
          backgroundSize: 'auto'
        }}
      />

      {/* Scanlines Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[5] opacity-[0.12] mix-blend-soft-light"
        style={{
          background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0 1px, rgba(0,0,0,0) 1px 3px)'
        }}
      />

      {/* Header */}
      <div className="border-b border-[#2a2a2c]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link
            to="/portfolio"
            className="inline-flex items-center text-[#bdb7ae] hover:text-[#b55a5a] mb-6 focus-ring rounded transition-colors"
          >
            ← Back to Portfolio
          </Link>

          <header className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-semibold text-[#e6e0d6] mb-4 tracking-wide">
              {translation.title}
            </h1>
            {translation.author && (
              <p className="text-[#bdb7ae] mb-2 text-sm">
                by {translation.author}
                {translation.translator && ` • translated by ${translation.translator}`}
              </p>
            )}
            {translation.date && (
              <time className="text-xs text-[#bdb7ae] tracking-wider">
                {new Date(translation.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
          </header>
        </div>
      </div>

      {/* Split Column Layout */}
      <div className="max-w-6xl mx-auto h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-[#2a2a2c] h-full">
          {/* English Column */}
          <div
            ref={leftColRef}
            className="px-6 py-12 lg:px-12 bg-gradient-to-b from-[#141414] to-[#0f0f10] overflow-y-auto scroll-smooth"
          >
            <div
              className="prose prose-invert prose-lg max-w-none [&>h3]:text-[#e6e0d6] [&>h3]:tracking-wider [&>h3]:text-sm [&>h3]:uppercase [&>h3]:opacity-85 [&>p]:text-[#e6e0d6] [&>p]:leading-relaxed [&>blockquote]:border-l-[#b55a5a] [&>blockquote]:text-[#e6e0d6] [&>blockquote]:opacity-90 [&_em]:text-[#bdb7ae] [&_em]:not-italic"
              dangerouslySetInnerHTML={{ __html: translation.enContent }}
            />
          </div>

          {/* Chinese Column */}
          <div
            ref={rightColRef}
            className="px-6 py-12 lg:px-12 bg-gradient-to-b from-[#0f0f10] to-[#141414] overflow-y-auto scroll-smooth"
          >
            <div
              className="prose prose-invert prose-lg max-w-none [&>h3]:text-[#e6e0d6] [&>h3]:tracking-wider [&>h3]:text-sm [&>h3]:uppercase [&>h3]:opacity-85 [&>p]:text-[#e6e0d6] [&>p]:leading-relaxed [&>blockquote]:border-l-[#b55a5a] [&>blockquote]:text-[#e6e0d6] [&>blockquote]:opacity-90 [&_em]:text-[#bdb7ae] [&_em]:not-italic"
              dangerouslySetInnerHTML={{ __html: translation.zhContent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
