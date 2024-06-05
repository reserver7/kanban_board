import { toDoState } from '@/models/atoms'
import { ToDoStateProps } from '@/models/todo'
import { useSetRecoilState } from 'recoil'

export function useAddToDo() {
  const SetToDos = useSetRecoilState(toDoState)

  const addToDo = (boardId: string, newToDo: { id: number; text: string }) => {
    SetToDos((prevToDos: ToDoStateProps) => {
      return {
        ...prevToDos,
        [boardId]: [newToDo, ...(prevToDos[boardId] || [])],
      }
    })
  }

  return addToDo
}
