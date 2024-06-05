export interface ToDoStateProps {
  [key: string]: ToDoProps[]
}

export interface ToDoProps {
  id: number
  text: string
  tag?: string
  color?: string
}
