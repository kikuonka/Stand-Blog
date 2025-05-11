'use client'

import type { Post } from '@/app/api/posts/route'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const { data: session } = useSession()

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <span className='text-[#853C4F] text-[64px]'>
                    Загрузка...
                </span>
            </div>
        )
    }

    return (
        <div className='min-h-screen min-w-screen flex items-center justify-center'>
            <div className='fixed p-[20px] right-0 top-0 flex flex-col'>
                <span className='text-[64px] text-[#853C4F] font-bold text-right'>
                    JOJO
                </span>
                <span className='text-[24px] text-[#3FBDAD] font-bold text-right'>
                    STAND BLOG
                </span>
            </div>
            <img
                className='fixed left-0 top-1/2 -translate-y-1/2 w-[300px] max-w-[30vw]'
                src='/jojo.png'
                alt='ДжоДжо' />
            <div className='border-l-4 border-r-4 border-[#3FBDAD] flex flex-col mb-auto max-w-[950px]'>
                <img
                    className='w-full'
                    src='/cover.png'
                    alt='Обложка' />
                <div className='flex border-b-4 border-[#853C4F] w-full p-[10px]'>
                    <span className='absolute left-1/2 -translate-x-1/2 text-[16px] text-[#3FBDAD] text-center font-bold'>
                        YARE YARE DAZE
                    </span>
                    {session ? (
                        <span className='text-[16px] text-[#3FBDAD] text-center font-bold cursor-pointer ml-auto hover:underline'>
                            <Link href={'/profile'}>
                                ПРОФИЛЬ
                            </Link>
                        </span>
                    ): (
                        <button
                            className='text-[16px] text-[#3FBDAD] text-center font-bold cursor-pointer ml-auto hover:underline'
                            onClick={() => signIn()}>
                            ВОЙТИ
                        </button>
                    )}
                </div>
                <div className='flex flex-col p-[20px] gap-[20px]'>
                    <span className='text-[24px] text-[#853C4F] text-left font-bold'>
                        Стенды Вселенной ДжоДжо
                    </span>
                    <div className='flex flex-col gap-[10px]'>
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/posts/${post.id}`}
                                className='group border-2 border-[#853C4F] rounded-[20px] p-[20px] cursor-pointer hover:border-[#3FBDAD] flex flex-col'>
                                <span className='text-[24px] text-[#853C4F] text-left group-hover:text-[#3FBDAD]'>
                                    {post.title}
                                </span>
                                <span className='text-[20px] text-[#853C4F] text-left pb-[10px] group-hover:text-[#3FBDAD]'>
                                    {post.date}
                                </span>
                                <span className='text-[20px] text-left'>
                                    {post.description}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <img
                className='fixed right-0 top-1/2 -translate-y-1/2 w-[300px] max-w-[30vw]'
                src="/dio.png"
                alt="Дио" />
        </div>
    )
}
