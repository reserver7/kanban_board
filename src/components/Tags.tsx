import styled from '@emotion/styled'
import Spacing from './shared/Spacing'

interface TagProps {
  color?: string
  tagName: string
}

const Tag = ({ color, tagName }: TagProps) => {
  return (
    <>
      <Spacing size={16} />
      <TagContainer style={{ backgroundColor: color }}>{tagName}</TagContainer>
    </>
  )
}

const TagContainer = styled.span`
  width: fit-content;
  padding-inline: 1em;
  border-radius: 5px 5px 5px 5px;
  font-size: 13px;
  height: 20px;
  font-weight: 600;
  color: black;
`

export default Tag
