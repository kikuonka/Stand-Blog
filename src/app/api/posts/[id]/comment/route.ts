import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { posts } from '@/app/api/posts/route'

export async function POST(
    req: Request,
    contextPromise: Promise<{ params: { id: string } }>
) {
    const { params } = await contextPromise
    const session = await getServerSession(authOptions)

    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const post = posts.find(p => p.id === Number(params.id))

    if (!post) {
        return new Response('Not found', { status: 404 })
    }

    post.comments.push({
        avatar: session.user?.image ?? '/avatar.png',
        user: session.user?.name ?? 'Инкогнито',
        created_at: new Date().toISOString(),
        text: body.text,
    })

    return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
    })
}
