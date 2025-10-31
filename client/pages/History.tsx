import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEcko } from "@/hooks/useEcko";
import { isEntryLocked } from "@/lib/eckoCore";

export default function History() {
  const { entries, isLoading, lockedCount, totalCount } = useEcko();
  const isEmpty = entries.length === 0;

  return (
    <div className="min-h-screen bg-white paper-texture">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl serif font-semibold text-foreground mb-2">
                Ecko History
              </h1>
              <p className="text-muted-foreground">
                {totalCount} total • {lockedCount} locked
              </p>
            </div>
            <Link to="/">
              <Button variant="outline" className="btn-secondary">
                New Ecko
              </Button>
            </Link>
          </div>
        </header>

        {/* Entries List */}
        {isLoading ? (
          <div className="paper-card p-16 text-center">
            <p className="text-muted-foreground">Loading your eckoes...</p>
          </div>
        ) : isEmpty ? (
          <div className="paper-card p-16 text-center">
            <p className="text-muted-foreground mb-4">No eckoes yet</p>
            <p className="text-sm text-muted-foreground mb-6">
              Start by writing your first ecko
            </p>
            <Link to="/">
              <Button className="btn-primary">Write your first ecko</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {entries.map((entry) => {
              const locked = isEntryLocked(entry.unlockDate);

              return (
                <article key={entry.id} className="paper-card p-8 hover-lift">
                  {/* Entry Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="serif text-xl font-semibold mb-2">
                        {entry.title || "Untitled"}
                      </h3>
                      <time className="text-sm text-muted-foreground">
                        {new Date(entry.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </time>
                    </div>
                    {locked && (
                      <span className="text-xs bg-misty-blue/10 text-misty-blue px-3 py-1 rounded">
                         Locked
                      </span>
                    )}
                  </div>

                  {/* Entry Content */}
                  <div className="mb-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {entry.content.substring(0, 200)}
                      {entry.content.length > 200 && "..."}
                    </p>
                  </div>

                  {/* Response Section */}
                  {entry.response && !locked && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-misty-blue mb-2 font-medium">
                        Ecko Response:
                      </p>
                      <div className="prose prose-sm text-muted-foreground leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: entry.response.substring(0, 300) + '...' }} />
                      </div>
                      <Link to={`/echo/${entry.id}`} className="text-sm text-misty-blue hover:underline mt-2 inline-block">
                        Read full response →
                      </Link>
                    </div>
                  )}

                  {/* Error Display */}
                  {entry.error && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-destructive">
                        ⚠️ {entry.error}
                      </p>
                    </div>
                  )}

                  {/* Locked Message */}
                  {locked && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-muted-foreground italic">
                        This entry will unlock soon... come back later to see the echo.
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {/* Footer Links */}
        <div className="flex gap-4 justify-center text-sm mt-12 pt-8 border-t border-gray-100">
          <Link
            to="/"
            className="text-muted-foreground hover:text-misty-blue transition-colors"
          >
            Back to Ecko
          </Link>
          <span className="text-gray-300">•</span>
          <Link
            to="/settings"
            className="text-muted-foreground hover:text-misty-blue transition-colors"
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
