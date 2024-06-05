import { COLOR_OPTIONS } from '@/constants'
import { toDoState } from '@/models/atoms'
import { DraggableCardProps } from '@/models/drag'
import { colors } from '@/styles/colorPalette'
import truncate from '@/utils/truncate'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Input from '@shared/Input'
import Spacing from '@shared/Spacing'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { BiMessageSquareEdit } from 'react-icons/bi'
import { TbDragDrop } from 'react-icons/tb'
import { useSetRecoilState } from 'recoil'
import ColorCircle from './ColorCircle'
import Modal from './Modal'
import Tag from './Tags'

function DraggableCard({
  toDoId,
  toDoText,
  toDoTag,
  index,
  boardId,
  toDoColor,
}: DraggableCardProps) {
  const setToDos = useSetRecoilState(toDoState)
  const [isEdit, setIsEdit] = useState(false)
  const [newText, setNewText] = useState(toDoText)
  const [newTag, setNewTag] = useState(toDoTag)
  const [tagColor, setTagColor] = useState(toDoColor)
  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editInputRef.current !== null) {
      editInputRef.current.focus()
    }
  }, [isEdit])

  useEffect(() => {
    if (!isEdit) {
      setNewText(toDoText)
      setNewTag(toDoTag)
      setTagColor(toDoColor)
    }
  }, [isEdit, toDoText, toDoTag, toDoColor])

  const modalToggle = () => {
    setIsEdit((prev) => !prev)
  }

  const handleEditText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value)
  }

  const handleEditTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value)
  }

  const handleColorChange = useCallback((color: string) => {
    setTagColor((prevColor) => (prevColor === color ? '' : color))
  }, [])

  const handleDelete = () => {
    setToDos((prev) => {
      let updatedToDos = { ...prev }
      updatedToDos[boardId] = updatedToDos[boardId].filter(
        (toDo) => toDo.id !== toDoId,
      )
      return updatedToDos
    })
  }

  const handleConfirm = () => {
    setToDos((prev) => {
      let updatedToDos = { ...prev }
      updatedToDos[boardId] = updatedToDos[boardId].map((toDo) =>
        toDo.id === toDoId
          ? { ...toDo, text: newText, tag: newTag, color: tagColor }
          : toDo,
      )
      return updatedToDos
    })
    setIsEdit(false)
  }

  return (
    <>
      <Draggable key={toDoId} draggableId={String(toDoId)} index={index}>
        {(prov, snapshot) => (
          <Card
            isDragging={snapshot.isDragging}
            ref={prov.innerRef}
            {...prov.dragHandleProps}
            {...prov.draggableProps}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <CardBox>
                <div style={{ width: '50px', height: '50px' }}>
                  <TbDragDrop size="20" />
                </div>
                <TextContainer title={toDoText}>
                  {truncate(toDoText, 20)}
                </TextContainer>
              </CardBox>
              <CardBox>
                <CardButton onClick={modalToggle}>
                  <EditBtn size="20" />
                </CardButton>
                <CardButton onClick={handleDelete}>❌</CardButton>
              </CardBox>
            </div>

            {toDoTag !== '' ? (
              <div>
                <Tag tagName={toDoTag} color={tagColor} />
              </div>
            ) : null}
          </Card>
        )}
      </Draggable>
      {isEdit && (
        <Modal onClose={setIsEdit} onConfirm={handleConfirm}>
          <ModalForm>
            <div css={InputContainer}>
              <Input
                onChange={handleEditText}
                type="text"
                value={newText}
                ref={editInputRef}
                placeholder="Edit Title"
              />
            </div>

            <Spacing size={8} />

            <div css={InputContainer}>
              <Input
                onChange={handleEditTag}
                type="text"
                value={newTag}
                placeholder="Edit Tag"
              />
            </div>

            <Spacing size={8} />

            <ColorPicker>
              {COLOR_OPTIONS.map((color) => (
                <ColorCircle
                  key={color}
                  color={color}
                  isSelected={color === tagColor}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </ColorPicker>
          </ModalForm>
        </Modal>
      )}
    </>
  )
}

const EditBtn = styled(BiMessageSquareEdit)`
  color: ${colors.blue};
`

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const Card = styled.div<{ isDragging: boolean }>`
  overflow: hidden;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid ${colors.gray300};
  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`

const CardBox = styled.div`
  background-color: transparent;
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    font-size: 8px;
  }
`

const TextContainer = styled.span`
  margin-left: 5px;
`

const CardButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 5px 10px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 50%;
    font-size: 8px;
  }
`

const InputContainer = css`
  width: 100%;
`

const ColorPicker = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`

export default React.memo(DraggableCard)
