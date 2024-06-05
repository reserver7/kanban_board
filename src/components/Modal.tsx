import styled from '@emotion/styled'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import { MouseEvent, ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  onClose: (open: boolean) => void
  onConfirm: () => void
  closeButtonLabel?: string
  confirmButtonLabel?: string
}

const Modal = ({
  children,
  onClose,
  onConfirm,
  closeButtonLabel = '닫기',
  confirmButtonLabel = '확인',
}: ModalProps) => {
  const handleBackgroundClick = () => {
    onClose(false)
  }

  const handleContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <CustomModal onClick={handleBackgroundClick}>
      <ModalContent onClick={handleContentClick}>
        {children}
        <ModalActions>
          <Button onClick={() => onClose(false)} weak={true}>
            {closeButtonLabel}
          </Button>

          <Spacing direction="horizontal" size={8} />

          <Button onClick={onConfirm}>{confirmButtonLabel}</Button>
        </ModalActions>
      </ModalContent>
    </CustomModal>
  )
}

export default Modal

const CustomModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.212);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`

const ModalContent = styled.div`
  position: relative;
  max-height: 95vh;
  width: 70%;
  max-width: 500px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.12);
  overflow-y: auto;
  padding: 20px;
  border-radius: 8px;

  &::-webkit-scrollbar {
    width: 12px !important;
  }
`

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`
