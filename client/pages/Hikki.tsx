export default function Hikki() {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header bar */}
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-serif text-gray-800">
          Hikki - Visual Knowledge Mapping
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Transform ideas into interactive maps with AI
        </p>
      </div>

      {/* Iframe container */}
      <div className="flex-1 relative">
        <iframe
          src="https://hikki2025.netlify.app"
          className="absolute inset-0 w-full h-full border-0"
          title="Hikki Visual Mapping Tool"
          allow="clipboard-write"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
        />
      </div>
    </div>
  );
}
