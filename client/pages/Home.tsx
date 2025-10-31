import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useEcko } from "@/hooks/useEcko";

export default function Home() {
  const [content, setContent] = useState("");
  const [unlockMinutes, setUnlockMinutes] = useState(1);
  const { toast } = useToast();
  const { saveEcko, stats, usageLimit, isProcessing } = useEcko();

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({
        title: "Empty echo",
        description: "Please write something before echoing.",
        variant: "destructive",
      });
      return;
    }

    if (stats.apiUsageCount >= usageLimit) {
      toast({
        title: "Usage limit reached",
        description: "You've reached your daily API limit. Try again tomorrow.",
        variant: "destructive",
      });
      return;
    }

    try {
      const entry = saveEcko(content, unlockMinutes);

      toast({
        title: "Ecko saved",
        description: `Your thought will unlock in ${unlockMinutes} minute${unlockMinutes > 1 ? 's' : ''}.`,
      });

      setContent("");
    } catch (error) {
      toast({
        title: "Failed to save",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white paper-texture">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl serif font-semibold text-foreground mb-3">
            Ecko
          </h1>
          <p className="text-muted-foreground">
            A space to converse with your past self
          </p>
        </header>

        {/* Echo Input */}
        <div className="paper-card p-8 mb-8">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Ecko your thoughts..."
            className="min-h-[200px] resize-none border-0 focus-visible:ring-0 text-lg leading-relaxed"
            disabled={isProcessing}
          />
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm text-muted-foreground">
                Unlock in:
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={unlockMinutes}
                onChange={(e) => setUnlockMinutes(Number(e.target.value))}
                className="w-16 px-2 py-1 border border-gray-200 rounded text-sm text-center"
              />
              <span className="text-sm text-muted-foreground">minute{unlockMinutes > 1 ? 's' : ''}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                <span>{content.length} characters</span>
                <span className="mx-2">•</span>
                <span>{stats.apiUsageCount} / {usageLimit} API calls</span>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={isProcessing || !content.trim() || stats.apiUsageCount >= usageLimit}
                className="btn-primary"
              >
                Echo →
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex gap-4 justify-center text-sm">
          <Link
            to="/history"
            className="text-muted-foreground hover:text-misty-blue transition-colors"
          >
            View history
          </Link>
          <span className="text-gray-300">•</span>
          <Link
            to="/settings"
            className="text-muted-foreground hover:text-misty-blue transition-colors"
          >
            Settings
          </Link>
          <span className="text-gray-300">•</span>
          <Link
            to="/welcome"
            className="text-muted-foreground hover:text-misty-blue transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </div>
  );
}
