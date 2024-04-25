export const publishPost = async (
    title: string,
    content: string,
    published: boolean
) => {
    if (title.trim() === '' || content.trim() === '') {
        alert('Title and content both are required.')
        return false
    }
    const response = await fetch('/api/posts/mypost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            content,
            published
        })
    })
    const data = await response.json()
    if (response.ok) {
        return true
    }
    return false
}