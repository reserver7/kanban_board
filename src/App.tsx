import Board from '@components/Board'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useRecoilState } from 'recoil'
import { toDoState } from './models/atoms'
import { colors } from './styles/colorPalette'
import globalStyles from './styles/globalStyles'

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)

  const onDragEnd = (info: DropResult) => {
    console.log(info)
    const { destination, source } = info

    if (!destination) return

    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]
        const taskObj = boardCopy[source.index]
        boardCopy.splice(source.index, 1)
        boardCopy.splice(destination?.index, 0, taskObj)

        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        }
      })
    }

    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const dragItem = [...allBoards[source.droppableId]]
        const taskObj = dragItem[source.index]
        const dropItem = [...allBoards[destination.droppableId]]
        dragItem.splice(source.index, 1)
        dropItem.splice(destination.index, 0, taskObj)

        return {
          ...allBoards,
          [source.droppableId]: dragItem,
          [destination.droppableId]: dropItem,
        }
      })
    }
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Kanban Board</title>
        </Helmet>
        <Global styles={globalStyles} />

        <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
            <Text typography="t1">Kanban Board</Text>

            <Spacing size={24} />

            <Boards>
              {Object.keys(toDos).map((boardId) => (
                <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
              ))}
            </Boards>
          </Wrapper>
        </DragDropContext>
      </HelmetProvider>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 60vw;
  margin: 0 auto;
  width: 100%;
  height: 80vh;

  h1 {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 50px;
    color: ${colors.black};
  }
`

const Boards = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  width: 100%;
`

export default App
