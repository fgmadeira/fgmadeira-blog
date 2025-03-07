import Link from "next/link";
import Image from "next/image";

import { ArrowRight, MapPin } from "lucide-react";

export function FeaturedBlog({title_h2, featured_blogs}: {title_h2?: any, featured_blogs?: any}) {
  console.log(JSON.stringify(featured_blogs, undefined, 2))

  return <div className="container">
  <div className="mb-10 flex items-center justify-between">
    <h2 className="text-3xl font-bold tracking-tight">{title_h2}</h2>
    <Link href="/blog" className="flex items-center text-primary hover:underline">
      View all posts <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  </div>
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {featured_blogs.map((blog, i) => (
      <Link
        href={blog.url}
        key={blog.uid}
        className="group overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md"
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={`${blog.featured_image.url}`}
            alt={`Featured post ${i}`}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Tokyo, Japan</span>
          </div>
          <h3 className="mt-2 text-xl font-semibold">{blog.title}</h3>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src={blog.author[0].picture.url}
                  alt="Author"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium">{blog.author[0].title}</span>
            </div>
            <span className="text-sm text-muted-foreground">{blog.date}</span>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>
}

