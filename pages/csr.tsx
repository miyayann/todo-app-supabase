import { Layout } from '@/components/Layout'
import { Notice, Task } from '@/types/types'
import { supabase } from '@/utils/supabase'
import { NextPage } from 'next'
import { useState, useEffect } from 'react'

const Csr:NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [notices, setNotices] = useState<Notice[]>([])

  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: true })
        setTasks(tasks as Task[])
    }
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: true })
        setNotices(notices as Notice[])
    }
    getTasks()
    getNotices()
  }, [])
  return <Layout title="CSR">
    <p className='mb-3 text-blue-500'>SSG + CSR</p>
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
  </Layout>
}

export default Csr
