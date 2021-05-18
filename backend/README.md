The development build runs with nodemon. It will start the typescript build without compiling in a build folder

## tl;dr

* From the **root** directory, run `npm run backend`
* OR from **this** directory, run `npm install && npm run dev`
* Routes are available at `localhost:3001/{{Route}}` (further information below)


## Prerequisites
initiate this project by running ```npm install```


## Start the backend Server
Type ```npm run dev``` to start the backend server.


## Testing:

Use a program like Postman or the RESTful plugin for vscode to send requests to ``` localhost:3001/{{Route}}```  
All routes use x-www-urlencoded bodys to receive the data (Except for upload file, which needs a multiform/form-data request


## Routes:

### Inspectionplans

```/plans/receive GET ```  
-> Returns object with all inspectionplans from the db  

```/plans/uploadFile POST (multipart/form-data)```    
expected parameter:  
inspectionPlanName: String,  
file_upload: File(.txt)  (Example included in the examples folder in root)
--> returns message with error if the upload failed or the provided txt is not formatted correctly

### User

```/user/login POST```  
expected parameter:  
mail: string,  
password: string  
returns object with message: string, valid: bool, role: string  


### Folder structure:
```
src
│   index.ts               # Entry point for our app, with router (router can also be seperated).
└───controllers            # defines app routes and their logic
│
└───helpers                # code and functionality to be shared by different parts of the project
│
└───middlewares            # Express middlewares which process the incoming requests before handling them down to the routes
│
└───models                 # represents interface, implements business logic and handles storage
│
└───schema                 # represents database schemas
│
└───examples                # examples for testing purposes
```



