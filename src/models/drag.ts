export interface AreaProps {
  draggingFromThisWith: boolean
  isDraggingOver: boolean
}

export interface DraggableCardProps {
  toDoId: number
  toDoText: string
  toDoTag: string
  index: number
  boardId: string
  toDoColor: string
}
