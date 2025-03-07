import { Button } from "./ui/button";

export function HeroBanner({hero_banner}: {hero_banner?: any}) {
  const hero = hero_banner[0]

  return <div
    className="flex h-[70vh] items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: `url('${hero.banner_image.url}')` }}
  >
    <div className="absolute inset-0 z-10 bg-black/40" />
    <div className="container relative z-20 mx-auto px-4 text-center text-white">
      <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        {hero.title}
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
        {hero.banner_description}
      </p>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
        <Button size="lg" className="bg-secondary text-black hover:bg-primary/90">
          {hero.call_to_action.title}
        </Button>
      </div>
    </div>
  </div>
}

