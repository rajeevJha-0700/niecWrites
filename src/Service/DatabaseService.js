import { Client, Databases, ID, Storage, Query } from "appwrite";
import config from "../configuration/config";
class Database {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.Url)
      .setProject(config.ProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID, username,verified }) {
    try {
      return await this.databases.createDocument(
        config.DatabaseId,
        config.CollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
          username,
          verified
        }
      );
       } catch (error) {
      console.log(" service :: createPost :: error :", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status,verified }) {
    try {
      return await this.databases.updateDocument(
        config.DatabaseId,
        config.CollectionId,
        slug,
        {
          title,
          featuredImage,
          content,
          status,
          verified
        }
      );
    } catch (error) {
      console.log(" service :: updatePost :: error :", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.DatabaseId,
        config.CollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(" service :: deletePost :: error :", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.DatabaseId,
        config.CollectionId,
        slug
      );
    } catch (error) {
      console.log(" service :: getPost :: error :", error);
      return false;
    }
  }

  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.DatabaseId,
        config.CollectionId,
        queries
      );
    } catch (error) {
      console.log(" service :: getPost :: error :", error);
      return false;
    }
  }

  async getAllPost_user(userID){
    let queries = [Query.equal("userID",userID)]
    try {
      const userPost =  await this.databases.listDocuments(config.DatabaseId,config.CollectionId,queries)
       if(userPost){
        return userPost ;
       }else{
        return null;
       }
    } catch (error) {
      console.log("service :: getAllPost_user :: error : ",error);
    }
  }

  //file upload
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.BucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(" service :: uploadFile :: error :", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.BucketId, fileId);
      return true;
    } catch (error) {
      console.log(" service :: deleteFile :: error :", error);
      return false;
    }
  }
  
  fileView(fileId) {
    try {
      const fileView = this.bucket.getFileView(config.BucketId, fileId);
      return fileView;
    } catch (error) {
        console.log("fileViewError :: ",error)
    }
  }
}

const database = new Database();
export default database;
