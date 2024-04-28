'use client'
import { useRouter } from "next/navigation"
const Page = () => {
    const router = useRouter()
    try {
        router.back()
    } catch (error) {
        router.push("/")
    }
    return <></>
}

export default Page