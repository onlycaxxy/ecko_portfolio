import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEcko } from "@/hooks/useEcko";
import { API_CONFIG } from "@/lib/eckoConfig";
import { isEntryLocked } from "@/lib/eckoCore";
import { useState } from "react";

export default function Settings() {
  const { toast } = useToast();
  const {
    entries,
    stats,
    totalCount,
    clearAll,
    exportJSON,
    exportText,
    usageLimit,
  } = useEcko();

  const [showDebug, setShowDebug] = useState(false);

  const handleClearData = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all echo data? This cannot be undone."
    );

    if (confirmed) {
      clearAll();
      toast({
        title: "Data cleared",
        description: "All echoes and statistics have been cleared.",
      });
    }
  };

  const handleExportJSON = () => {
    try {
      const data = exportJSON();
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ecko-export-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Export successful",
        description: "Your echoes have been downloaded as JSON.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportText = () => {
    try {
      const data = exportText();
      const blob = new Blob([data], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ecko-export-${new Date().toISOString().split("T")[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Export successful",
        description: "Your echoes have been downloaded as text.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white paper-texture">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl serif font-semibold text-foreground mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your echo preferences and data
          </p>
        </header>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Data Management */}
          <section className="paper-card p-8">
            <h2 className="serif text-xl font-semibold mb-4">Data Management</h2>

            <div className="space-y-4">
              {/* Storage Info */}
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium">Total echoes</p>
                  <p className="text-sm text-muted-foreground">
                    Stored in browser localStorage
                  </p>
                </div>
                <span className="text-sm text-misty-blue font-semibold">{totalCount}</span>
              </div>

              {/* Export JSON */}
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium">Export as JSON</p>
                  <p className="text-sm text-muted-foreground">
                    Download your data as JSON file
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportJSON}
                  className="btn-secondary"
                  disabled={totalCount === 0}
                >
                  Export JSON
                </Button>
              </div>

              {/* Export Text */}
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium">Export as Text</p>
                  <p className="text-sm text-muted-foreground">
                    Download your data as plain text
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportText}
                  className="btn-secondary"
                  disabled={totalCount === 0}
                >
                  Export TXT
                </Button>
              </div>

              {/* Clear Data */}
              <div className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium text-destructive">
                    Clear all data
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Delete all echoes permanently
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleClearData}
                  disabled={totalCount === 0}
                >
                  Clear
                </Button>
              </div>
            </div>
          </section>

          {/* API Settings */}
          <section className="paper-card p-8">
            <h2 className="serif text-xl font-semibold mb-4">API Settings</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium">API provider</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {API_CONFIG.provider} ({API_CONFIG.model})
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded ${
                  API_CONFIG.apiKey
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {API_CONFIG.apiKey ? 'Configured' : 'No API Key'}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium">API usage</p>
                  <p className="text-sm text-muted-foreground">
                    Calls made this session
                  </p>
                </div>
                <span className="text-sm text-muted-foreground font-semibold">
                  {stats.apiUsageCount} / {usageLimit}
                </span>
              </div>

              <div className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium">Token usage</p>
                  <p className="text-sm text-muted-foreground">
                    Approximate total tokens used
                  </p>
                </div>
                <span className="text-sm text-muted-foreground font-semibold">
                  {stats.totalTokens.toLocaleString()}
                </span>
              </div>
            </div>
          </section>

          {/* About */}
          <section className="paper-card p-8">
            <h2 className="serif text-xl font-semibold mb-4">About Echo</h2>

            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                Ecko is a slow AI memory notebook that creates space for
                reflection and deeper thought.
              </p>
              <p>
                Built with patience, designed for thinkers who value depth over
                speed.
              </p>
              <p className="text-xs mt-6 pt-4 border-t border-gray-100">
                Fully integrated with multi-provider API support (DeepSeek, OpenAI, Anthropic).
              </p>
            </div>
          </section>

          {/* Debug Panel */}
          <section className="paper-card p-8 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="serif text-xl font-semibold">Debug Panel</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDebug(!showDebug)}
                className="btn-secondary"
              >
                {showDebug ? "Hide" : "Show"} Debug Info
              </Button>
            </div>

            {showDebug && (
              <div className="space-y-4">
                {/* Current Time */}
                <div className="p-4 bg-white rounded border border-gray-200">
                  <p className="text-sm font-medium mb-2">Current Time:</p>
                  <p className="text-xs font-mono text-muted-foreground">
                    {new Date().toLocaleString()}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground">
                    Timestamp: {Date.now()}
                  </p>
                </div>

                {/* Entries Debug */}
                <div className="p-4 bg-white rounded border border-gray-200">
                  <p className="text-sm font-medium mb-3">All Entries ({entries.length}):</p>
                  {entries.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">No entries yet</p>
                  ) : (
                    <div className="space-y-3">
                      {entries.map((entry, index) => {
                        const locked = isEntryLocked(entry.unlockDate);
                        const now = Date.now();
                        const timeRemaining = entry.unlockDate ? Math.round((entry.unlockDate - now) / 1000 / 60) : null;

                        return (
                          <div key={entry.id} className="p-3 bg-gray-50 rounded border border-gray-100">
                            <p className="text-xs font-semibold mb-2">Entry #{index + 1}: {entry.id}</p>
                            <div className="text-xs font-mono space-y-1 text-muted-foreground">
                              <p>Created: {new Date(entry.createdAt).toLocaleString()}</p>
                              <p>Unlock: {entry.unlockDate ? new Date(entry.unlockDate).toLocaleString() : 'null'}</p>
                              <p className={locked ? "text-orange-600 font-semibold" : "text-green-600 font-semibold"}>
                                Status: {locked ? "🔒 LOCKED" : "🔓 UNLOCKED"}
                              </p>
                              {timeRemaining !== null && (
                                <p>
                                  Time {locked ? 'remaining' : 'since unlock'}: {Math.abs(timeRemaining)} minutes
                                </p>
                              )}
                              <p>Has Response: {entry.response ? "✅ Yes" : "❌ No"}</p>
                              <p>Has Error: {entry.error ? "⚠️ Yes" : "✅ No"}</p>
                              {entry.error && <p className="text-red-600">Error: {entry.error}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* localStorage Raw Data */}
                <div className="p-4 bg-white rounded border border-gray-200">
                  <p className="text-sm font-medium mb-2">Raw localStorage Data:</p>
                  <pre className="text-xs font-mono bg-gray-100 p-3 rounded overflow-x-auto max-h-64 overflow-y-auto">
                    {JSON.stringify(entries, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Footer Links */}
        <div className="flex gap-4 justify-center text-sm mt-12 pt-8 border-t border-gray-100">
          <Link
            to="/"
            className="text-muted-foreground hover:text-misty-blue transition-colors"
          >
            Back to Echo
          </Link>
          <span className="text-gray-300">•</span>
          <Link
            to="/history"
            className="text-muted-foreground hover:text-misty-blue transition-colors"
          >
            History
          </Link>
          <span className="text-gray-300">•</span>
          <Link
            to="/welcome"
            className="text-muted-foreground hover:text-misty-blue transition-colors"
          >
            Welcome
          </Link>
        </div>
      </div>
    </div>
  );
}
