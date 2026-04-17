import config from "../config/config.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class dataServices {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredimages, status, userId }) {
        try {
            const document = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug,
                {
                    title,
                    slug,
                    content,
                    featuredimages,
                    status,
                    userId
                }
            );
            return document;
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(documentId, { title, content, featuredimages, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                documentId,
                { title, content, featuredimages, status }
            );
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(documentId) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                documentId
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const result = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                [Query.equal("slug", slug)]
            );
            return result.documents[0] || null;
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                queries
            )
        } catch (error) {
            console.error("Appwrite service :: getPosts :: error", error);
            return false
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.error("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.error("Appwrite service :: getFilePreview :: error", error);
            return null;
        }
    }
}



const service = new dataServices()
export default service;