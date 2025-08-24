import { useCallback, useEffect } from 'react'
import database from '../Service/DatabaseService'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Input, Button, RTE, Select } from './Warehouse.js'

function PostForm({ Post_Object }) {
  const navigate = useNavigate();
  const userData = useSelector(state => state.authorization.userData);
  const { register, handleSubmit, watch, getValues, setValue, control } = useForm({
    defaultValues: {
      title: Post_Object?.title || "TITLE",
      slug: Post_Object?.slug || "TITLE",
      content: Post_Object?.content || `hello i am ${userData.name}`,
      featuredImage: Post_Object?.featuredImage || "",
      status: Post_Object?.status || "active",
    }
  })
  
  const onPostSubmit = async (data) => {
    const verified = userData.emailVerification;
    if (Post_Object) {
     
      const file = data.image[0] ? await database.uploadFile(data.image[0]) : null;
    
      if (Post_Object.featuredImage && file) await database.deleteFile(Post_Object.featuredImage);
      const newFeaturedImage = file ? file.$id : undefined;
      const updatedPost = await database.updatePost(Post_Object.$id, { ...data, featuredImage: newFeaturedImage,verified: verified })
     
      if (updatedPost) {
        navigate(`/post/${updatedPost.$id}`)
      }
    } else {
      const file = data.image[0] ? await database.uploadFile(data.image[0]) : null;
      
      if (file) data.featuredImage = file.$id;
      const newPost = await database.createPost({ ...data, userID: userData.$id,username: userData.name,verified:verified });
      
      if (newPost) {
        navigate(`/post/${newPost.$id}`)
      }
    }
  }

  const slugTransformation = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim()
        .toLowerCase()
        .replace(/\s+/g, '-')     
        .replace(/[^\w\-]+/g, '') 
        .replace(/\-\-+/g, '-')   
        .replace(/^-+/, '')       
        .replace(/-+$/, '');      
    }
    return "";
  }, []);

  useEffect(() => {
    const subscribe = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransformation(value.title))
      }
    })
    return () => {
      subscribe.unsubscribe();
    }
  }, [watch, slugTransformation, setValue])

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onPostSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Input
              label="Title"
              placeholder="Enter post title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              {...register("title", { required: true })}
            />
            {!Post_Object && (
              <Input
                label="Slug"
                placeholder="Enter post slug"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue("slug", slugTransformation(e.currentTarget.value), { shouldValidate: true });
                }}
              />
            )}
            <RTE 
              label="Content" 
              name="content" 
              control={control} 
              defaultValue={getValues("content")} 
              className="min-h-[200px] border border-gray-300 rounded-lg"
            />
          </div>
          <div className="md:col-span-1 space-y-6">
            <Input
              label="Featured Image"
              type="file"
              className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition duration-200"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !Post_Object })}
            />
            {Post_Object && (
              <div className="w-full">
                <img
                  src={database.fileView(Post_Object.featuredImage)}
                  alt={Post_Object.title}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              {...register("status", { required: true })}
            />
            <Button 
              type="submit" 
              className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition duration-200 ${Post_Object ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`} 
              assign={Post_Object ? "Update" : "Submit"} 
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default PostForm