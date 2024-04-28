'use client'
import CreatePost from "@/components/Feed/CreatePost";
import Feed from "@/components/Feed/Feed";
import { Pagination } from "@nextui-org/react";
import { Like } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [feedPosts, setFeedPosts] = useState([] as {
    id: string
    title: string
    content: string
    likes: Like[]
    author: {
      name: string
      email: string
      image: string
    }
  }[])

  useEffect(() => {
    setLoading(true)
    fetch(`/api/feed?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedPosts(data.posts)
        setCount(data.totalPosts)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [page]
  )

  return (
    <>
      <Feed posts={feedPosts} count={count} setPage={setPage} page={page} loading={loading} />
      <CreatePost setFeedPosts={setFeedPosts} feedPosts={feedPosts} />
    </>
  );
}
