'use client'

import React, { useState } from 'react'
import { Message } from '@/model/User'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { acceptMessageValidation } from '@/schemas/acceptMessageSchema'

const page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [isSwitching, setIsSwitching] = useState(false)


  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message.id !== messageId))
  }

  const { data: session } = useSession()

  const form = useForm ({
    resolver: zodResolver(acceptMessageValidation)
  })

  const { setValue, register, watch } = form;

  const acceptMessage = watch('acceptmessage');


  const fetchMessages = async () => {
    setIsSwitching(true)

    try {
      
    } catch (error) {
      
    }
  }

  return (
    <div><h1>Dashboard</h1></div>
  )
}

export default page