export default props => {
  const { id, length, cols, isMobile, isTable, isDesktop } = props
  let helperStyle = {}

  if (isMobile) {
    helperStyle = { borderRight: 'none' }
    if (id === length - 1)
      helperStyle = { ...helperStyle, borderBottom: 'none' }
  }

  if (isTable) {
    if (id % 2 === 1)
      helperStyle = { borderRight: 'none' }
    let pointer = length % 2
    if (pointer === 0) pointer = 2
    pointer = length - pointer
    if (id >= pointer)
      helperStyle = { ...helperStyle, borderBottom: 'none' }
  }

  if (isDesktop) {
    if (id % cols === 1)
      helperStyle = { borderRight: 'none' }
    let pointer = length % cols
    if (pointer === 0) pointer = cols
    pointer = length - pointer
    if (id >= pointer)
      helperStyle = { ...helperStyle, borderBottom: 'none' }
  }

  return helperStyle
}