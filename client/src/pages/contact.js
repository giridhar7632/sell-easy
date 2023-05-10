import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Layout from '@/components/layout'
import React from 'react'
import { useForm } from 'react-hook-form'

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onFormSubmit = handleSubmit(async (data) => {
    console.log(data)
  })

  return (
    <Layout meta={{ name: 'Contact' }}>
      <section className="mx-auto max-w-xl">
        <div className="mx-auto max-w-screen-md py-8 px-4 lg:py-16">
          <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="text-md mb-8 text-center">
            Got a technical issue? Want to send feedback about a beta feature? Need details about
            our plans? Let us know.
          </p>
          <form className="">
            <Input
              label={'Email'}
              name={'email'}
              type="email"
              required
              placeholder="your@email.com"
              aria-label="user-email"
              autoComplete="current-email"
              register={register('email', {
                required: `Email is required!`,
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Invalid email address!',
                },
              })}
              error={errors?.email}
            />
            <Input
              name="subject"
              type="text"
              label="Subject"
              placeholder="Let us know how we can help you."
              error={errors?.subject}
              register={register('subject')}
            />
            <Input
              name="comment"
              label="Comment"
              placeholder="Describe your comment..."
              type="text"
              error={errors?.comment}
              register={register('comment')}
            />
            <Button onClick={onFormSubmit} type="submit">
              Send message
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  )
}

export default Contact
