'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { acceptMessageValidation } from '@/schemas/acceptMessageSchema'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { ApiResponse } from '@/type/apiResponse'
import { Message } from '@/model/User'
import { User } from 'next-auth'

// ShadCN UI
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Loader2, Trash2, Copy, RefreshCw } from 'lucide-react'




const Page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [isSwitching, setIsSwitching] = useState(false)
  const { data: session } = useSession()



  const form = useForm({
    resolver: zodResolver(acceptMessageValidation),
  })



  const { setValue, watch, register } = form
  const acceptMessage = watch('acceptmessage')



  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitching(true)

    try {
      const response = await axios.get<ApiResponse>('/api/accept-message')
      setValue('acceptmessage', response.data.isAcceptingMessage ?? false)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message ?? 'Failed to fetch message status')
    } finally {
      setIsSwitching(false)
    }
  }, [setValue])



  const fetchMessage = useCallback(async (refresh: boolean = false) => {
    setLoading(true)
    setIsSwitching(false)

    try {
      const response = await axios.get<ApiResponse>('/api/accept-message')
      setMessages(response.data.messages ?? [])
      if (refresh) {
        toast.success('Messages refreshed successfully', {
          description: 'Messages have been updated.',
        })
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message ?? 'Failed to fetch messages')
    } finally {
      setLoading(false)
      setIsSwitching(false)
    }
  }, [])



  useEffect(() => {
    if (!session || !session.user) return
    fetchMessage()
    fetchAcceptMessage()
  }, [session, fetchAcceptMessage, fetchMessage])



  const handleSwitchChange = async () => {
    try {
      await axios.post('/api/accept-message', {
        isAcceptingMessage: !acceptMessage,
      })

      setValue('acceptmessage', !acceptMessage)
      toast.success('Message acceptance status updated successfully')
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message ?? 'Failed to update status')
    }
  }

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg._id !== messageId))
  }


  const copyToClipboard = () => {
    const username = (session?.user as User)?.username
    const baseUrl = `${window.location.protocol}//${window.location.host}`   //TODO: find a better way to get base URL
    const profileUrl = `${baseUrl}/profile/${username}`

    navigator.clipboard.writeText(profileUrl)
    toast.success('Profile URL copied to clipboard', {
      description: (
        <span className="text-sm text-foreground">
          You can share this link to receive anonymous messages.
        </span>
      )
    })

  }


  //only use for testing purpose
    // if (!session || !session.user) {
    //   return <div>You must be logged in to change message acceptance status</div>
    // }



  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">User Dashboard</h1>

      {/* Copy Link + Toggle */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <p className="text-lg font-medium">Copy Your Unique Link</p>
            <div className="flex items-center gap-2 mt-2">
              <Input
                readOnly
                value={`${window.location.origin}/profile/${(session?.user as User)?.username}`}
              />
              <Button onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <Switch
              {...register('acceptmessage')}
                checked={acceptMessage}
                onCheckedChange={handleSwitchChange}
                disabled={isSwitching}
              />
              <span className="text-sm font-medium">
                Accept Messages: {acceptMessage ? 'On' : 'Off'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Refresh Messages */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Messages</h2>
        <Button variant="outline" onClick={() => fetchMessage(true)} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </>
          )}
        </Button>
      </div>

      {/* Messages Grid */}
      {messages.length === 0 ? (
        <p className="text-muted-foreground text-center">No messages yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {messages.map((message) => (
            <Card key={message._id} className="relative group">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-red-500 hover:bg-red-100"
                onClick={() => handleDeleteMessage(message._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <CardContent className="pt-6">
                <p className="text-sm text-foreground break-words">
                  {message.content}
                </p>
              </CardContent>
              <CardFooter>
                <span className="text-xs text-muted-foreground mt-2">
                  {new Date(message.createAt).toLocaleString()}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
