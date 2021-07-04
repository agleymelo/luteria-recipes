import { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import { Flex, Heading, Button, Box, Text, Input, Textarea, Divider, useToast } from '@chakra-ui/react'

import { useForm, useFieldArray, useFieldArray as useFieldArray2 } from 'react-hook-form'

import { Layout } from '../../../Layout'
import { supabase } from '../../../services/supabase'
import { useAuth } from '../../../hook/useAuth'

type InputForm = {
  title: string
  description: string
  list_of_ingredients: { name: string }[]
  preparation_mode: { name: string }[]
  images: string[] | FileList
  observation?: string
}

export function CreateRecipes() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InputForm>({
    defaultValues: {
      list_of_ingredients: [{ name: '' }],
      preparation_mode: [{ name: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: 'list_of_ingredients',
    control
  })

  const {
    fields: fields2,
    append: append2,
    remove: remove2
  } = useFieldArray2({
    name: 'preparation_mode',
    control
  })

  const toast = useToast()
  const history = useHistory()

  const { user } = useAuth()

  const onSubmit = async (data: InputForm) => {
    const formatted_list_of_ingredients: string[] = []
    const formatted_preparation_mode: string[] = []
    const formatted_images: string[] = []

    const images_file = data.images as FileList

    data.list_of_ingredients.map(item => formatted_list_of_ingredients.push(item.name))
    data.preparation_mode.map(item => formatted_preparation_mode.push(item.name))

    const renamed_accept_files = Array.from(images_file).map(file => {
      return new File([file], `${Date.now()}-${file.name}`, { type: file.type })
    })

    renamed_accept_files.map(item => formatted_images.push(item.name))

    const formatted_data = {
      ...data,
      user_id: user?.id,
      user_name: user?.user_metadata.full_name,
      list_of_ingredients: formatted_list_of_ingredients,
      preparation_mode: formatted_preparation_mode,
      images: formatted_images
    }

    try {
      const { data, error } = await supabase.from('recipes').insert(formatted_data)

      renamed_accept_files.forEach(async image => {
        await supabase.storage.from('luteria-images').upload(image.name, image, {
          cacheControl: '3600',
          upsert: false
        })
      })

      toast({
        position: 'top-right',
        title: 'Create Recipe',
        description: 'Recipe created successfully',
        duration: 5000,
        status: 'success'
      })

      if (data) {
        history.push(`/recipes/${data[0].id}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>
      <Flex mt="0.8rem" mb="0.8rem" width="100%" flexDirection="column">
        <Flex mt="0.8rem" width="100%" justifyContent="center">
          <Heading as="h1" textAlign="center" fontSize="1.8rem">
            Create a new Recipe
          </Heading>
        </Flex>

        <Flex
          as="form"
          flexDirection="column"
          mt="1.6rem"
          width={['100%', '100%', '100%', '100%']}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Flex flexDirection="row" width={['100%', '100%', '100%', '100%']}>
            <Flex as="section" width="100%" flexDirection="column" justifyContent="center">
              {/* Title */}
              <Box>
                <Text as="label">Title</Text>

                {errors.title?.message && (
                  <Text fontSize="0.8rem" color="red" mt="0.8rem">
                    Title is required
                  </Text>
                )}

                <Input mt="0.4rem" placeholder="Example title" type="text" {...register('title')} />
              </Box>

              <Divider color="gray.700" mt="1.2rem" mb="0.8rem" />

              {/* Description */}
              <Box>
                <Text as="label">Description</Text>

                <Textarea
                  mt="0.4rem"
                  placeholder="Example Description"
                  type="text"
                  row="4"
                  resize="none"
                  {...register('description')}
                />
              </Box>

              <Divider color="gray.700" mt="1.2rem" mb="0.8rem" />

              {/* List of Ingredients */}
              <Box>
                <Text as="label">List of Ingredients</Text>

                {errors.list_of_ingredients && errors.list_of_ingredients[0]?.name?.message && (
                  <Text fontSize="0.8rem" color="red" mt="0.8rem">
                    List Of Ingredients is Required
                  </Text>
                )}

                {fields.map((field, index) => {
                  return (
                    <Fragment key={field.id}>
                      <Input
                        mt="0.4rem"
                        mb="0.4rem"
                        placeholder="Example Ingredient"
                        type="text"
                        {...register(`list_of_ingredients.${index}.name` as const)}
                        defaultValue={field.name}
                      />

                      {fields.length - 1 === index && (
                        <Button
                          bgColor="green.500"
                          color="white"
                          mr="0.8rem"
                          mt="0.8rem"
                          w={['48%', '48%', '6.4rem', '6.4rem']}
                          h="2.8rem"
                          borderRadius="0.8rem"
                          _hover={{
                            backgroundColor: 'green.600'
                          }}
                          onClick={() =>
                            append({
                              name: ''
                            })
                          }
                        >
                          Add
                        </Button>
                      )}

                      {fields.length !== 1 && (
                        <Button
                          bgColor="red.500"
                          color="white"
                          mt="0.8rem"
                          mb={['1.4rem', '1.4rem', '0', '0']}
                          w={['48%', '48%', '6.4rem', '6.4rem']}
                          h="2.8rem"
                          borderRadius="0.8rem"
                          _hover={{
                            backgroundColor: 'red.600'
                          }}
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </Fragment>
                  )
                })}
              </Box>

              <Divider color="gray.700" mt="1.2rem" mb="0.8rem" />

              {/* Preparation Mode */}
              <Box>
                <Text as="label">Preparation mode</Text>

                {errors.preparation_mode && errors.preparation_mode[0]?.name?.message && (
                  <Text fontSize="0.8rem" color="red" mt="0.8rem">
                    List Of Ingredients is Required
                  </Text>
                )}

                {fields2.map((field, index) => {
                  return (
                    <Fragment key={field.id}>
                      <Input
                        mt="0.4rem"
                        mb="0.4rem"
                        placeholder="Example Preparation"
                        type="text"
                        {...register(`preparation_mode.${index}.name` as const)}
                        defaultValue={field.name}
                      />

                      {fields2.length - 1 === index && (
                        <Button
                          bgColor="green.500"
                          color="white"
                          mr="0.8rem"
                          mt="0.8rem"
                          w={['48%', '48%', '6.4rem', '6.4rem']}
                          h="2.8rem"
                          borderRadius="0.8rem"
                          _hover={{
                            backgroundColor: 'green.600'
                          }}
                          onClick={() =>
                            append2({
                              name: ''
                            })
                          }
                        >
                          Add
                        </Button>
                      )}

                      {fields2.length !== 1 && (
                        <Button
                          bgColor="red.500"
                          color="white"
                          mt="0.8rem"
                          mb={['1.4rem', '1.4rem', '0', '0']}
                          w={['48%', '48%', '6.4rem', '6.4rem']}
                          h="2.8rem"
                          borderRadius="0.8rem"
                          _hover={{
                            backgroundColor: 'red.600'
                          }}
                          onClick={() => remove2(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </Fragment>
                  )
                })}
              </Box>

              <Divider color="gray.700" mt="1.2rem" mb="0.8rem" />

              {/* Images */}
              <Box>
                <Text as="label">Images</Text>

                <Input pt="0.2rem" type="file" multiple accept="image/png, image/jpeg, image/jpg" {...register('images')} />
              </Box>

              <Divider color="gray.700" mt="1.2rem" mb="0.8rem" />

              {/* Observation */}
              <Box>
                <Text as="label">Observation</Text>

                <Textarea
                  mt="0.4rem"
                  placeholder="Example Observation"
                  type="text"
                  row="4"
                  resize="none"
                  {...register('observation')}
                />
              </Box>
            </Flex>
          </Flex>

          <Flex justifyContent="center" alignItems="center" mt="1.6rem" width="100%">
            <Button
              type="submit"
              bgColor="green.500"
              color="white"
              w={['100%', '100%', '50%', '50%']}
              h="2.8rem"
              borderRadius="3.2rem"
              _hover={{
                backgroundColor: 'green.700'
              }}
            >
              Create
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  )
}
