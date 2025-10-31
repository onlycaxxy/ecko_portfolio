export default function Portfolio() {
  const translationItems = [
    {
      id: 7,
      title: "Prologue",
      note: "Early fragments and reflections on responsible creation",
      image: "/assets/images/translations/translation-prologue.jpg",
      link: "/translations/prologue"
    },
    {
      id: 8,
      title: "Spring",
      note: "On longing, abandonment, and the vegetative life of imagining",
      image: "/assets/images/translations/translation-spring-postcard.jpg",
      link: "/translations/spring-postcard"
    },
    {
      id: 9,
      title: "Fragments — May 2025",
      note: "Selected translations from The Book of Disquiet",
      image: "/assets/images/translations/translation-fragments-may.jpg",
      link: "/translations/fragments-may"
    },
    {
      id: 10,
      title: "Fragments — June 2025",
      note: "On dreaming, living as being other, and the metaphysics of experience",
      image: "/assets/images/translations/translation-fragments-june.jpg",
      link: "/translations/fragments-june"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <header className="mb-16">
          <h1 className="text-4xl lg:text-5xl serif font-semibold mb-4">Portfolio</h1>
          <p className="text-xl text-muted-foreground content-width">
            Visual explorations in interface design, typography, and research documentation.
            Each piece reflects a commitment to quiet aesthetics and honest communication.
          </p>
        </header>

        {/* Translation Design Section */}
        <section>
          <h2 className="text-2xl serif font-semibold mb-8 text-foreground">Translation Design</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {translationItems.map((item) => (
              <a key={item.id} href={item.link} className="paper-card overflow-hidden hover-lift cursor-pointer block">
                {item.image !== "placeholder" ? (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Translation</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="serif text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.note}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
