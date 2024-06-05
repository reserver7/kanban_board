import { atom, AtomEffect } from 'recoil'
import { ToDoStateProps } from './todo'

const localStorageEffect =
  (key: string): AtomEffect<ToDoStateProps> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue))
    })
  }

const LOCAL_STORAGE_KEY = 'toDo'

export const toDoState = atom<ToDoStateProps>({
  key: 'toDo',
  default: {
    'To Do': [],
    Active: [],
    Done: [],
  },
  effects: [localStorageEffect(LOCAL_STORAGE_KEY)],
})
