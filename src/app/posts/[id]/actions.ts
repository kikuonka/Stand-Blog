export async function submitComment(postId: number, text: string) {
    const res = await fetch(`/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    })

    if (!res.ok) throw new Error('Ошибка при отправке комментария')
}
