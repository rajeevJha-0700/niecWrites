const config = {
  Url : String(import.meta.env.VITE_URL),
  ProjectId : String(import.meta.env.VITE_PROJECT_ID),
  DatabaseId : String(import.meta.env.VITE_DATABASE_ID),
  CollectionId : String(import.meta.env.VITE_COLLECTION_ID),
  BucketId : String(import.meta.env.VITE_BUCKET_ID),
  tinymceEditor: String(import.meta.env.VITE_TINYMCE_EDITOR_API),
}

export default config