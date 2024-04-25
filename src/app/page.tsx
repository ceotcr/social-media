import CreatePost from "@/components/Feed/CreatePost";
import Feed from "@/components/Feed/Feed";

export default async function Home() {
  const posts = await fetch("http://localhost:3000/api/feed", { cache: 'no-store' }).then((res) =>
    res.json()
  );
  return (
    <>
      <Feed posts={posts} />
      <CreatePost />
    </>
  );
}
