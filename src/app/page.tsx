import Image from "next/image";
import { getEntry, getEntryByUrl } from "../contentstack-sdk/index"

export default async function Home() {
  const query = await getEntry({contentTypeUid: 'blog_landing_page'})

  return (
    <div>{JSON.stringify(query)}</div>
  );
}
