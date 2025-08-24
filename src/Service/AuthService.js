import { Client, Account, ID } from "appwrite";
import config from "../configuration/config.js";

class AuthService{
    client = new Client();
    account ;
    
    constructor(){
        this.client 
                    .setEndpoint(config.Url)
                    .setProject(config.ProjectId);
        this.account = new Account(this.client) ;
       
    }
    async createAccount({email,password,username}) {
        try {
            let uniqueUserId = ID.unique()
           const userAccount = await this.account.create(uniqueUserId,email,password,username);
         
           if(userAccount){
               return this.login({email,password});
            }
        } catch (error) {
            throw error
        }
    }
    
    async login({email,password}){
        
      try {
          return await this.account.createEmailPasswordSession(email,password);
      } catch (error) {
         console.log(" service :: login :: error :",error)
      }
        
    };

    async getCurrentUser(){
       try {
            return await this.account.get();
        } catch (error) {
         console.log(" service :: getCurrentUser :: error :",error)
       };
       return null;
    };

    async logout(){
        try {
            return this.account.deleteSessions();
        } catch (error) {
             console.log(" service :: logout :: error :",error)
        }
    }
}
const authService = new AuthService() ;

export default authService ;

