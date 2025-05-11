import { posts } from '../route'

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const post = posts.find(p => p.id === Number(params.id))
    return Response.json(post)
}
