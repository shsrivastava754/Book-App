# Book-App

The book app built using the MERN stack (MongoDB, Express.js, React.js, Node.js) is a comprehensive application that allows users to search for, view, and manage books.

Before you begin, make sure you have the following prerequisites installed on your machine:

Node.js: Install the latest stable version of Node.js from the official website: https://nodejs.org

Git: Install the latest stable version of Git from the official website: https://git-scm.com/downloads

Steps for setup of the project:

# Step 1: Clone the Project
1) Open your terminal or command prompt.

2) Change the current working directory to the location where you want to clone the project.

3) Run the following command to clone the project repository:
   git clone https://github.com/shsrivastava754/Book-App.git

# Step 2: Set up the Backend (Node.js and Express.js)
1) Change the current working directory to the project's backend folder by writing following line into the terminal:
   cd <project_folder>/backend
   
2) Install the dependencies by running the following command:
   npm install

3) Create a .env file in the backend folder and copy the entire text written in "sample.env" file present in the backend folder. Paste the copied text into the       .env file created. Replace the variables by respective information.
   
4) Start the backend server by running the following command:
   npm start

The backend server will start running on the specified port.

# Step 3: Set up the Frontend (React.js)
1) Change the current working directory to the project's frontend folder by writing following line into the terminal:
   cd <project_folder>/frontend

2) Install the dependencies by running the following command:
   npm install

3) Create a .env file in the backend folder and copy the entire text written in "sample.env" file present in the backend folder. Paste the copied text into the       .env file created. Replace the variables by respective information.

4) Start the frontend development server by running the following command:
   npm start

The frontend server will start running on http://localhost:3000 and connect to the backend server.

# Step 4: Database and user setup
1) Create a new database on the Atlas MongoDB page: https://cloud.mongodb.com/

2) Provide the obtained URI of the database to the .env file at backend.
   Example: MONGO_URI = "mongodb://127.0.0.1:27017/myDatabase"

3) i) Change the current working directory to the project's backend folder by writing following line into the terminal:<br>
      cd <project_folder>/backend <br>
   ii) Write following line of code to register the admin user into the database:
      npm run setup
   
# Step 5: Open the Application
1) Open your web browser and visit http://localhost:3000.

2) You should see the Book App running successfully.
