import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../common/Button'
import Input from '../common/Input'
import MediaUpload from './MediaUpload'
import ImageUpload from './ImageUpload'
import FormSection from '../FormSection'
import { useCategory } from '@/hooks/useCategories'

const ProductForm = ({ type, defaultValues, onFormSubmit, ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const { categories } = useCategory()
  const [isLoading, setIsLoading] = useState(false)
  // { name, description, price, category, seller, image, media }

  useEffect(() => {
    if (defaultValues) {
      setValue('name', defaultValues.name)
      setValue('description', defaultValues.description)
      setValue('price', defaultValues.price)
      setValue('category', defaultValues.category._id)
      setValue('condition', defaultValues.condition)
      setValue('image', defaultValues.image)
      setValue('media', defaultValues.media)
    }
  }, [defaultValues, setValue])

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    await onFormSubmit(data)
    setIsLoading(false)
  })

  return (
    <div {...props} className="flex flex-col">
      <form>
        <FormSection defaultOpen={true} title={'Product Information'}>
          <Input
            name="name"
            label="Name of the Product"
            placeholder="My beautiful product..."
            type="text"
            error={errors?.name}
            register={register('name', {
              required: {
                value: true,
                message: 'You must add the name of your product.',
              },
            })}
          />
          <Input
            name="description"
            label="Description (optional)"
            placeholder="Warm and cozy. Beautiful and elegant..."
            type="text"
            error={errors?.description}
            register={register('description')}
          />
          <Input
            divClass="flex-1"
            name="price"
            label="Price"
            placeholder="36.5"
            type="number"
            error={errors?.price}
            register={register('price', {
              required: {
                value: true,
                message: 'You must add the price of your product.',
              },
              setValueAs: (v) => parseFloat(v),
            })}
          />
          <div className="flex flex-col items-center md:flex-row md:space-x-2">
            <div className={clsx('mb-2 flex-1')}>
              <label htmlFor={'condition'} className="mb-1 block text-sm font-medium text-gray-600">
                Condition
              </label>
              <select
                id="condition"
                className={clsx([
                  'form-control block w-full border border-solid bg-white bg-clip-padding px-4 py-2 font-normal text-gray-700 focus:ring-2',
                  'm-0 rounded-md transition ease-in-out focus:border-teal-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:ring-teal-100',
                  errors?.condition ? 'border-red-300 ring ring-red-300' : 'border-gray-300',
                ])}
                defaultValue={defaultValues?.condition}
                {...register('condition', { required: 'Condition is required!' })}
              >
                <option disabled>Choose a condition</option>
                <option vlaue={'New'}>New</option>
                <option vlaue={'Used - like new'}>Used - like new</option>
                <option vlaue={'Used - good'}>Used - good</option>
                <option vlaue={'Used - fair'}>Used - fair</option>
              </select>
              {errors?.condition ? (
                <p className="mt-2 text-xs text-red-500">{errors?.condition?.message}</p>
              ) : null}
            </div>

            <div className={clsx('mb-2 flex-1')}>
              <label htmlFor={'category'} className="mb-1 block text-sm font-medium text-gray-600">
                Category
              </label>
              <select
                id="category"
                className={clsx([
                  'form-control block w-full border border-solid bg-white bg-clip-padding px-4 py-2 font-normal text-gray-700 focus:ring-2',
                  'm-0 rounded-md transition ease-in-out focus:border-teal-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:ring-teal-100',
                  errors?.category ? 'border-red-300 ring ring-red-300' : 'border-gray-300',
                ])}
                {...register('category', { required: 'Category is required!' })}
                defaultValue={
                  defaultValues?.category ? defaultValues.category._id : 'Choose a category'
                }
              >
                <option disabled>Choose a category</option>
                {categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors?.category ? (
                <p className="mt-2 text-xs text-red-500">{errors?.category?.message}</p>
              ) : null}
            </div>
          </div>
        </FormSection>
      </form>
      <FormSection title={'Image Upload'}>
        <ImageUpload defaultValue={defaultValues?.image} setValue={setValue} />
      </FormSection>
      <FormSection title={'Media Upload (optional)'}>
        <MediaUpload defaultValues={defaultValues?.media} setValue={setValue} />
      </FormSection>

      <Button
        type="button"
        onClick={onSubmit}
        loading={isLoading}
        loadingText={type ? `${type}ing Product...` : 'Submitting...'}
      >
        {type ? `${type} Product` : 'Submit'}
      </Button>
    </div>
  )
}

export default ProductForm
