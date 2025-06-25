'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signInvalidation } from '@/schemas/signInSchema'
import { signIn } from 'next-auth/react'



//all coming from api/auth/[...nextauth]
// signIn is a function from next-auth that allows you to sign in users with different providers
const page = () => {

  const router = useRouter()

  const form = useForm<z.infer<typeof signInvalidation>> ({
    resolver: zodResolver(signInvalidation),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })


  const onSubmit = async (data: z.infer<typeof signInvalidation>) => {
      const result = await signIn ('credentials', {
        identifier: data.identifier,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast ('Login faild', {
          description: result.error
        })
      }
      if (result?.url) {
        router.replace ('/dashboard')
      }
  }


  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold tracking-tight lg:text-5xl mb-6'>Join True Message</h1>
          <p className='mb-4'>Sign in to your account</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

        <FormField
          name="identifier"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email/Username</FormLabel>
              <FormControl>
                <Input placeholder="email/Username" {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="password" {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
         Sign in
        </Button>
          </form>
        </Form>

      </div>

    </div>
  )
}
export default page