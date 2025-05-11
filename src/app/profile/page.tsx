'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function ProfilePage() {
    const { data: session } = useSession()

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
            <div className='border-l-4 border-r-4 border-[#3FBDAD] flex flex-col mb-auto min-w-[950px] max-w-[950px] h-screen'>
                <div className='flex border-b-4 border-[#853C4F] w-full p-[40px]'>
                    <span className='absolute left-1/2 -translate-x-1/2 text-[16px] text-[#3FBDAD] text-center font-bold'>
                        <Link href={'/'}>
                            ГЛАВНАЯ
                        </Link>
                    </span>
                </div>
                {session?.user && (
                    <div className='flex flex-col gap-[40px] items-center justify-center p-[40px]'>
                        <span className='text-[64px] text-[#853C4F] text-center font-bold pt-[100px]'>
                            Профиль
                        </span>
                        <img
                            src={session.user.image ?? ''}
                            alt='Аватар'
                            className='w-50 h-50 rounded-full' />
                        <div className='flex flex-col gap-[10px] items-center'>
                            <span className='text-[24px]'>{session.user.name}</span>
                            <span className='text-[24px]'>{session.user.email}</span>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className='bg-[#853C4F] text-[48px] text-center rounded-[10px] w-full cursor-pointer mt-[100px]'>
                            Выйти
                        </button>
                    </div>
                )}
            </div>
            <img
                className='fixed right-0 top-1/2 -translate-y-1/2 w-[300px] max-w-[30vw]'
                src="/dio.png"
                alt="Дио" />
        </div>
    )
}
