import { Layout } from "@/components/Layout"
import { Notice, Task } from "@/types/types"
import { supabase } from "@/utils/supabase"
import { GetStaticProps, NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"

export const getStaticProps: GetStaticProps = async () => {
 console.log("getStaticProps/ssg invoked")
 const {data: tasks} = await supabase
  .from('todos')
  .select('*')
  .order('created_at', {ascending: true})
  const {data: notices} = await supabase
  .from('notices')
  .select('*')
  .order('created_at', {ascending: true})
  return {props: {tasks, notices}}
}

type StaticProps = {
  tasks: Task[]
  notices: Notice[]
}

const Ssg: NextPage<StaticProps> = ({tasks, notices}) => {
  const router = useRouter()
  return (
    <Layout title="SSG">
      <p className="mb-3 text-teal-500">SSG</p>
      <ul className="mb-2">
        {tasks.map((task) => {
          return (
            <li className="mb-1" key={task.id}>
              <p>{task.title}</p>
            </li>
          )
        })}
      </ul>
      <ul>
        {notices.map((notice) => {
          return (
            <li key={notice.id} className="mb-1">
              <p>{notice.content}</p>
            </li>
          )
        })}
      </ul>
      <Link href="/ssr" prefetch={false}>
      <a className='text-xs mb-3'>Link to ssr</a>
      </Link>
      <button className='mb-3 text-xs' onClick={() => router.push("/ssr")}>Route to ssr</button>
    </Layout>
  )
}

export default Ssg