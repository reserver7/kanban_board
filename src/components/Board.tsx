import { useAddToDo } from '@/hooks/useAddTodo'
import { BoardProps } from '@/models/board'
import { AreaProps } from '@/models/drag'
import { FormProps } from '@/models/form'
import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import Input from '@shared/Input'
import Text from '@shared/Text'
import { Droppable } from 'react-beautiful-dnd'
import { useForm } from 'react-hook-form'
import DraggableCard from './DraggableCard'
import Flex from './shared/Flex'
import Spacing from './shared/Spacing'

function Board({ toDos, boardId }: BoardProps) {
  const addToDo = useAddToDo()
  const { register, setValue, handleSubmit } = useForm<FormProps>()

  const onValid = ({ toDo }: FormProps) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    }
    addToDo(boardId, newToDo)
    setValue('toDo', '')
  }

  return (
    <Wrapper>
      <Text typography="t2" textAlign="center">
        {boardId}
      </Text>

      <Spacing backgroundColor="gray100" size={4} />

      <Spacing size={8} />

      <Flex>
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register('toDo', { required: true })}
            type="text"
            placeholder={`${boardId} 입력하세요.`}
          />
        </Form>
      </Flex>

      <Spacing size={4} />

      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                index={index}
                boardId={boardId}
                toDoTag={toDo.tag ? toDo.tag : ''}
                toDoColor={toDo.color ? toDo.color : ''}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: transparent;
  padding: 20px 5px;
  border-radius: 10px;
  width: 350px;
  min-width: 350px;
  min-height: 200px;
  border: 2px solid ${colors.blue};
  display: flex;
  flex-direction: column;
`

const Form = styled.form`
  width: 100%;
`

const Area = styled.div<AreaProps>`
  padding: 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? `rgba(211, 211, 211, 0.2)`
      : props.draggingFromThisWith
        ? 'transparent'
        : 'transparent'};
  flex-grow: 1;
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;
`

export default Board
