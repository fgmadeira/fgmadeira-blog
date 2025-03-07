import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  UtensilsCrossed,
  MapPin,
  Search,
  Instagram,
  Twitter,
  Facebook,
  ArrowRight,
} from "lucide-react"
import { getEntry, getEntryByUrl } from "@/contentstack-sdk"
import RenderComponents from "@/components/util/render-components"

export default async function Home() {
  const query = await getEntryByUrl({ 
    entryUrl: '/',
     contentTypeUid: 'homepage',
     referenceFieldPath: [
      'page_components.hero_banner.hero_banner',
      'page_components.from_blog.featured_blogs',
      'page_components.from_blog.featured_blogs.author',
    ]
    })
  const components = query[0].page_components

  return (
      <main className="flex-1 space-y-20">
        {
          components.map((component, index) => {
            const id = Object.keys(component)[0]
            const props = component[id]
            return <section key={`${id}_${index}`} className="relative">
              <RenderComponents key={id} id={id} {...props} />
            </section>
            }
          )
        }

        {/* Categories */}
        <section className="bg-muted py-16">
          <div className="container">
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">Explore by Category</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                { name: "Street Food", icon: <UtensilsCrossed className="h-8 w-8" /> },
                { name: "Fine Dining", icon: <UtensilsCrossed className="h-8 w-8" /> },
                { name: "Local Markets", icon: <UtensilsCrossed className="h-8 w-8" /> },
                { name: "Cooking Classes", icon: <UtensilsCrossed className="h-8 w-8" /> },
              ].map((category, i) => (
                <Link
                  key={i}
                  href="#"
                  className="flex flex-col items-center justify-center rounded-lg bg-background p-6 text-center shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">{category.icon}</div>
                  <h3 className="text-xl font-medium">{category.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Discover amazing {category.name.toLowerCase()} from around the world
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid gap-10 md:grid-cols-2 items-center">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=800&width=600&text=About+Image"
                  alt="About TasteTravels"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">About TasteTravels</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  TasteTravels was born from a passion for exploring cultures through their cuisines. We believe that
                  food is the universal language that connects us all.
                </p>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our team of food enthusiasts and travel experts scour the globe to bring you authentic culinary
                  experiences, recipes, and stories from every corner of the world.
                </p>
                <Button className="mt-6">Learn More About Us</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight">Join Our Culinary Journey</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              Subscribe to our newsletter and get the latest food travel guides, recipes, and exclusive content
              delivered straight to your inbox.
            </p>
            <form className="mx-auto mt-8 flex max-w-md flex-col gap-4 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-black placeholder:text-gray-500"
                required
              />
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
  );
}
