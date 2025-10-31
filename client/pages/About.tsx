export default function About() {
  const portraitImage = "/assets/images/portrait.jpg"; // Change to "placeholder" to show placeholder
  const aboutText = "Only is a person who writes, translates, crafts and designs."; // Edit this text

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Image */}
          <div className="order-2 lg:order-1">
            {portraitImage !== "placeholder" ? (
              <div className="aspect-[3/4] overflow-hidden rounded paper-card">
                <img src={portraitImage} alt="Portrait" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded paper-card flex items-center justify-center">
                <span className="text-muted-foreground">Portrait placeholder</span>
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <h1 className="text-4xl lg:text-5xl serif font-semibold mb-8">About</h1>

            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-muted-foreground">
                {aboutText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
