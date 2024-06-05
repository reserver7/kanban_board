import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'

interface ColorCircleProps {
  color: string
  isSelected: boolean
  onClick: () => void
}

const ColorCircle = ({ color, isSelected, onClick }: ColorCircleProps) => {
  return <Circle color={color} isSelected={isSelected} onClick={onClick} />
}

const Circle = styled.div<{ color: string; isSelected: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: ${(props) =>
    props.isSelected ? `2px solid ${colors.gray800}` : 'none'};
  box-shadow: ${(props) =>
    props.isSelected ? `0 0 5px ${colors.gray800}` : 'none'};
  box-sizing: border-box;
`

export default ColorCircle
