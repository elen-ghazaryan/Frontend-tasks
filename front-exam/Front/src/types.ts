export interface ILesson {
  id: number
  title: string
  ranks: IRank []
}

export interface IRank {
  studentId: number
  rate: number
}

export interface IStudent {
  id: number
  name: string
  surname: string
}