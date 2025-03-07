import Link from "next/link"
import Image from "next/image"

import { getEntryByUrl } from "../../../contentstack-sdk/index"
import { ArrowRight, Bookmark, Calendar, ChevronLeft, ChevronRight, Clock, Copy, Facebook, Filter, Heart, Instagram, MapPin, MessageCircle, Search, Share2, Twitter, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@radix-ui/react-context-menu"
import { json } from "stream/consumers"
import { cn } from "@/lib/utils"


export default async function BlogPage({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params
  const blogs = await getEntryByUrl({
    entryUrl: `/blog/${page}`,
    contentTypeUid: 'blog_landing_page',
    referenceFieldPath: [
      'author'
    ]
  })
  const blog = blogs[0]
  console.log(JSON.stringify(blog.body.children, undefined, 2))

  return (
    <main className="flex-1">
      <div className="container mt-8">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to all articles
        </Link>
      </div>
      <div className="relative mt-6 h-[50vh] w-full overflow-hidden lg:h-[70vh]">
        <Image src={blog.featured_image.url || "/placeholder.svg"} alt={blog.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container">
            <h1 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {blog.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Meta */}
      <div className="container mt-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-background">
              <AvatarImage src={blog.author[0].picture.url} alt={blog.author[0].title} />
              {/* <AvatarFallback>{blog.author[0].title.charAt(0)}</AvatarFallback> */}
            </Avatar>
            <div>
              <div className="font-medium">{blog.author[0].title}</div>
              <div className="text-sm text-muted-foreground">{blog.author[0].bio}</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{blog.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content with Sidebar */}
      <div className="container mt-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {blog.body.children.map((block, index) => {
              switch (block.type) {
                case "p":
                  return block.children.map(child =>
                    <p key={index} className={
                      cn(
                        "mb-6 leading-relaxed",
                        child.bold === true ? 'font-bold' : undefined,
                        child.italic === true ? 'italic' : undefined
                      )}
                    >
                      {child.text}
                    </p>
                  )
                case "heading":
                  return (
                    <h2 key={index} className="mt-12 mb-6 text-2xl font-bold tracking-tight">
                      {block.content}
                    </h2>
                  )
                default:
                  return null
              }
            })}
          </div>
        </div>
      </div>

    </main>
  )
}