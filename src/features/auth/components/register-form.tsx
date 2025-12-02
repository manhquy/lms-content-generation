'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRegister } from '../hooks/useAuth';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  full_name: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters' })
});

type RegisterFormValue = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const { mutate: register, isPending } = useRegister();

  const form = useForm<RegisterFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      full_name: ''
    }
  });

  const onSubmit = async (data: RegisterFormValue) => {
    register(data);
  };

  return (
    <div className='w-full max-w-md space-y-6'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Create an account</h1>
        <p className='text-muted-foreground'>
          Enter your information to get started
        </p>
      </div>

      <Form
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='full_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='John Doe'
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='user@example.com'
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Create a password'
                  autoComplete='new-password'
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} className='w-full' type='submit'>
          {isPending ? 'Creating account...' : 'Sign Up'}
        </Button>
      </Form>

      <div className='text-center text-sm'>
        Already have an account?{' '}
        <Link
          href='/auth/sign-in'
          className='text-primary font-medium hover:underline'
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
