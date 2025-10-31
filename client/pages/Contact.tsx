export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-4xl lg:text-5xl serif font-semibold mb-8">Contact</h1>
        
        <div className="space-y-8 text-lg leading-relaxed">
          <p>
            I'm interested in conversations about aesthetic design, research methods, and tools for thinking. 
            Whether you're working on similar questions or simply curious about the ideas presented here, 
            I'd enjoy hearing from you.
          </p>

          <p>
            Particularly interested in discussing:
          </p>

          <ul className="space-y-2 text-muted-foreground ml-6">
            <li>• Tools that support deep, reflective work</li>
            <li>• The intersection of analog and digital aesthetics</li>
            <li>• Design research methods and phenomenology</li>
            <li>• Collaborative opportunities in interface design</li>
          </ul>

          <div className="pt-8">
            <p className="mb-4">Reach me at:</p>
            <a 
              href="mailto:hello@portfolio-research.example" 
              className="text-xl serif font-semibold text-misty-blue hover:text-misty-blue/80 focus-ring rounded"
            >
              caxxyweng@gmail.com
            </a>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <p className="text-muted-foreground">
              I try to respond to all genuine inquiries within a few days. Please include enough context 
              about your interest or project so I can offer a thoughtful response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
