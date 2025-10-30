import { useEffect, useState } from "react"
import { Axios } from "../lib/api"
import type { ILesson, IStudent } from "../types"
import { AddLessonModal } from "./addLessonModal";
import { AddRankModal } from "./addRankModal";


export const ClassBook = () => {
  const [lessons, setLessons] = useState<ILesson[]>([])
  const [students, setStudents] = useState<IStudent[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenRank, setIsOpenRank] = useState(false)
  const [lessonId, setLessonId] = useState<number | null>(null)
  const [studentId, setStudentId] = useState<number | null>(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessonsRes, studentsRes] = await Promise.all([
          Axios.get<{ lessons: ILesson[] }>("/classbook/lessons"),
          Axios.get<{ students: IStudent[] }>("/classbook/students"),
        ])
        setLessons(lessonsRes.data.lessons)
        setStudents(studentsRes.data.students)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleCloseRank = () => {
    setIsOpenRank(false)
  }

  if (loading) return <p className="text-center mt-4">Loading...</p>

  return (
    <div className="p-6">
      <button 
        className="bg-blue-500 mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >Add Lesson</button>
     <AddLessonModal isOpen={isOpen} handleClose={handleClose}/>
     
      <table className="table-auto w-full border border-gray-400 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-400 p-2 text-left w-1/3">Students</th>
            {lessons.map((lesson, i) => (
              <th
                key={lesson.id}
                className="border border-gray-400 p-2 text-center"
              >
                L{i + 1}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border border-gray-400 p-2">{student.name}</td>

              {lessons.map((lesson) => {
                
                const rank = lesson.ranks?.find(
                  (r) => r.studentId === student.id
                )
                return (
                  <>
                    <td
                      onClick={() => {
                        setIsOpenRank(true)
                        setLessonId(lesson.id)
                        setStudentId(student.id)
                      }}
                      key={lesson.id}
                      className="border border-gray-400 p-2 text-center"
                      >
                      {rank ? rank.rate : ""}
                    </td>
                  </>
                  )
                })}
            </tr>
          ))}
        </tbody>
      </table>
      <AddRankModal id={lessonId!} studentId={studentId!} isOpen={isOpenRank} handleClose={handleCloseRank} />
    </div>
  )
}




