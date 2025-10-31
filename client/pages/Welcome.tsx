import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl serif font-semibold text-foreground mb-6 leading-tight">
            Portfolio × Research — the smallest set you can feel: writing, aesthetics, and thinking tools in practice.
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 font-light leading-relaxed max-w-3xl mx-auto">
            Ecko is a dynamic notebook for deep thinkers. Hikki is the canvas that thinks with you. Here I open my process.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link to="/">
              <Button className="btn-primary text-lg px-8 py-6">
                Ecko your thoughts
              </Button>
            </Link>
            <Link to="/hikki">
              <Button className="btn-primary text-lg px-8 py-6">
                Hikki canvas
              </Button>
            </Link>
            <Link to="/post/origin-story">
              <Button variant="outline" className="btn-secondary text-lg px-8 py-6">
                Origins
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Route Index */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-2xl serif font-semibold text-center mb-12">Site Index</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/portfolio" className="paper-card p-6 hover-lift block">
            <h3 className="serif text-lg font-semibold mb-2">Portfolio</h3>
            <p className="text-muted-foreground text-sm">Visual work and design explorations</p>
          </Link>

          <Link to="/blog" className="paper-card p-6 hover-lift block">
            <h3 className="serif text-lg font-semibold mb-2">Blog</h3>
            <p className="text-muted-foreground text-sm">Writing on design, research, and process</p>
          </Link>



          <Link to="/about" className="paper-card p-6 hover-lift block">
            <h3 className="serif text-lg font-semibold mb-2">About</h3>
            <p className="text-muted-foreground text-sm">Design and Literature </p>
          </Link>

          <Link to="/contact" className="paper-card p-6 hover-lift block">
            <h3 className="serif text-lg font-semibold mb-2">Contact</h3>
            <p className="text-muted-foreground text-sm">Get in touch for collaboration</p>
          </Link>

          <Link to="/" className="paper-card p-6 hover-lift block border-2 border-misty-blue">
            <h3 className="serif text-lg font-semibold mb-2 text-misty-blue">Ecko Tool</h3>
            <p className="text-muted-foreground text-sm">Dynamic notebook for reflection</p>
          </Link>

          <Link to="/hikki" className="paper-card p-6 hover-lift block border-2 border-misty-blue">
            <h3 className="serif text-lg font-semibold mb-2 text-misty-blue">Hikki Tool</h3>
            <p className="text-muted-foreground text-sm">The Canvas That Thinks With You</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
