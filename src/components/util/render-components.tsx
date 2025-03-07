import { FeaturedBlog } from "../featured-blog";
import { HeroBanner } from "../hero-banner";

export default function RenderComponents({id, ...props}: {id: string}) {
  let Component = null;
  switch(id) {
    case 'hero_banner':
      Component = HeroBanner
      break;
    case 'from_blog':
      Component = FeaturedBlog
      break;
  }

  if(!Component) {
    return null
  }

  return <Component {...props} />
}

