'use client'

import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { use } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'

import { submitComment } from './actions'
import type { Post } from '@/app/api/posts/route'

export default function PostPage(props: { params: Promise<{ id: string }> }) {
    const { id } = use(props.params)
    const [post, setPost] = useState<Post | null>(null)
    const [text, setText] = useState('')
    const { data: session } = useSession()

    useEffect(() => {
        fetch(`/api/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data))
    }, [id])

    const handleSubmit = async () => {
        await submitComment(Number(id), text)

        if (!session?.user?.name) return

        setPost((prev) =>
            prev
                ? {
                    ...prev,
                    comments: [
                        ...prev.comments,
                        {
                            avatar: session?.user?.image ?? '/avatar.png',
                            user: session.user?.name ?? 'Инкогнито',
                            created_at: new Date().toISOString(),
                            text,
                        },
                    ],
                }
                : prev
        )
        setText('')
    }

    if (!post) return (
        <div className='w-full h-full flex items-center justify-center'>
            <span className='text-[#853C4F] text-[64px]'>Загрузка...</span>
        </div>
    )

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
            <div className='border-l-4 border-r-4 border-[#3FBDAD] flex flex-col mb-auto min-w-[950px] max-w-[950px]'>
                <div className='flex border-b-4 border-[#853C4F] w-full p-[10px]'>
                    <span className='absolute left-1/2 -translate-x-1/2 text-[16px] text-[#3FBDAD] text-center font-bold'>
                        <Link href={'/'}>
                            ГЛАВНАЯ
                        </Link>
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
                <div className='flex flex-col p-[20px]'>
                    <span className='text-[32px] text-left pb-[20px] font-bold'>
                        Информация о стенде
                    </span>
                    <span className='text-[24px] text-left pb-[10px] font-bold'>
                        {post.title}
                    </span>
                    <span className='text-[20px] text-[#3FBDAD] text-left pb-[20px]'>
                        {post.date}
                    </span>
                    <div className='text-justify leading-relaxed'>
                        <img
                            src={post.image_stand}
                            alt='Стенд'
                            className='float-right w-[250px] p-[10px]' />
                        <p>
                            {post.content_start}
                        </p>
                    </div>
                    <div className='text-justify leading-relaxed'>
                        <img
                            src={post.image_char}
                            alt='Владелец'
                            className='float-left w-[250px] p-[10px]' />
                        <p>
                            {post.content_end}
                        </p>
                    </div>
                    <div className='clear-both' />
                    {session ? (
                        <div className='flex items-center gap-[20px]'>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder='Напишите комментарий...'
                                className='resize-none border-2 border-[#853C4F] text-[#853C4F] text-[16px] rounded-[10px] w-full h-[40px] px-[20px] py-[5px] focus:border-[#3FBDAD] focus:text-[#3FBDAD]'>
                            </textarea>
                            <button
                                className='bg-[#853C4F] rounded-[10px] px-[30px] py-[5px] h-[40px] cursor-pointer'
                                onClick={handleSubmit}>
                                Отправить
                            </button>
                        </div>
                    ): (
                        <div className='flex items-center gap-[20px]'>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder='Напишите комментарий...'
                                className='resize-none border-2 border-[#853C4F] text-[#853C4F] text-[16px] rounded-[10px] w-full h-[40px] px-[20px] py-[5px] focus:border-[#3FBDAD] focus:text-[#3FBDAD]'>
                            </textarea>
                            <button
                                className='bg-[#853C4F] rounded-[10px] px-[30px] py-[5px] h-[40px] cursor-pointer'
                                onClick={() => signIn()}>
                                Войти
                            </button>
                        </div>
                    )}
                    <span className='text-[32px] text-[#853C4F] font-bold py-[20px]'>
                        ЧАТ
                    </span>
                    <ul className='space-y-[20px]'>
                        {post.comments.map((c, i) => (
                            <li key={i}>
                                <div className='flex gap-[20px]'>
                                    <img
                                        src={c.avatar}
                                        className='w-[60px] h-[60px] rounded-[100%]' />
                                    <div className='w-full'>
                                        <div className='flex justify-between items-start pb-[10px]'>
                                             <span className='text-[24px] font-bold'>
                                                {c.user}
                                            </span>
                                            <span className='text-[16px] text-[#853C4F] text-right'>
                                                {formatDistanceToNow(new Date(c.created_at), { addSuffix: true, locale: ru })}
                                            </span>
                                        </div>
                                        <span className='text-[16px]'>
                                            {c.text}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <img
                className='fixed right-0 top-1/2 -translate-y-1/2 w-[300px] max-w-[30vw]'
                src="/dio.png"
                alt="Дио" />
        </div>
    )
}
