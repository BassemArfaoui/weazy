import React from 'react'
import { useConversation } from '../../Contexts/ConversationContext'

function Test() {

  const { model } = useConversation()
  return (
    <div>{model}</div>
  )
}

export default Test