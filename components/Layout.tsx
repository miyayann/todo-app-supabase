import Head from 'next/head';
import {ReactNode , FC} from 'react'
import {BadgeCheckIcon} from "@heroicons/react/solid"

type Title = {
  title: string;
  children: ReactNode
}

export const Layout: FC<Title> = ({children, title= "Todo app"}) => {
  return (
    <div className='flex min-h-screen flex-col justify-center items-center font-mono'>
      <Head>
        <title>{title}</title>
      </Head>
      <main className='flex flex-1 flex-col justify-center items-center text-xl '>
        {children}
      </main>
      <footer className='flex justify-center items-center h-12 border-t w-full'>
        <BadgeCheckIcon className='h-6 w-6 text-blue-600'/>
      </footer>
    </div>
  )
}
