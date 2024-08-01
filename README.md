# kanflow
> Kanflow is the ultimate kanban task management solution, embracing simplicity and minimalism, providing users with a clean and easy-to-navigate workspace. Users can create, update, and delete boards and tasks, and break complex tasks into manageable subtasks. Features intuitive drag-and-drop functionality to change task's status and re-order them in a column.

## Demo
[Live Demo](https://kanflow.up.railway.app/)

<img src="./client/public/assets/kanflow.gif" alt="" border="0" width="100%">

## Built with
- React, Vite
- Express.js, Node.js
- Mongoose.js, MongoDB
- Passport.js
- TailwindCSS
- HTML5/CSS3
- Hosted on Railway

## Features
#### Home Page:
- Call to action buttons for signing up and logging into an account
- Explore Demo button to allow users to test out the application as a demo user
- Features section highlighting the app's key functionalities

#### Auth Page:
- User authentication supported with Passport.js LocalStrategy with email and password encryption using Bcrypt password-hashing
- Custom form validation for login and sign up pages

#### Board Page:
- Create, read, update, and delete boards and tasks
- Receive form validations when trying to create/edit boards and tasks
- Mark subtasks as complete and move tasks between columns
- Hide/show the board sidebar
- Toggle the theme between light/dark modes
- Allow users to drag and drop tasks to change their status and re-order them in a column

#### User Management:
- Users can update their email address and change their password if applicable
- Users can upload a profile picture
- Users can delete their account and all associated data, getting redirected back to the homepage

## Optimizations
#### Cookies and Monorepo
#### UPDATE: As of May 2024, Cyclic has shut down its services. I have now migrated my app to Railway for hosting.

Initially, the client-side was hosted on Render and the server-side was hosted on Cyclic. However, I began to encounter authentication issues with Chrome and Safari. Despite successfully authentication, I would receive a 401 Unauthorized status code upon redirection in the application because my cookies were not getting stored correctly. After researching and consulting both StackOverflow and the Express documentation, I implemented `app.set('trust proxy', 1)`, allowing the correct navigation to the `/board` path for logged-in users. While this resolves the issue for most browsers, Safari continued to pose more challenges due to its strict third-party cookie policies. To solve this, I opted to consolidate both the client and server components into a single repository hosted on Cyclic. This helped address the issues related to CORS limitations and Safari's third-party cookie policies. By serving the client-side code through the server, both components share the same origin, eliminating any cross-origin issues and allowing for seamless routing.

#### Loading state
To enhance user experience and provide clear feedback during loading processes, I created a `loading` state, used to conditionally render a spinner component, offering users a visual cue. I integrated this `loading` state into both the logout process, as well as into the `Board` component to indicate that the system is processing their request or that data is being fetched, ensuring users are aware of the ongoing processes. 

#### Database Restructure for Improved Organization
Initially, each board was a document stored in one collection, while tasks were stored separately in another collection. To identify which tasks belonged to which user and board, I relied on the corresponding board ID for filtering. However, when it came to implementing the drag-and-drop functionality, I recognized a great need for a more structured approach to enhance organization and maintain task reordering effectively. To fix this, I revamped the data structure by storing each user as a document in the collection. Within this document would contain a `boards` array to accommodate multiple boards. Each board element would contain a `tasks` array to store individual tasks specific to that board. This restructuring not only significantly improved the readability and organization of the database but also ensured seamless updating of task reordering.

#### Optimizing State Management with Local Storage & Context API
Upon successful authentication, a `user` property with a value of `true` is added to the localStorage and is removed upon logout. This eliminated the need for redundant execution of my previous `checkAuthentication()` function and unnecessary GET requests, as I would leverage this stored property, enhancing the rendering efficiency of the homepage.

The Context API is utilized quite extensively for state management throughout this application. One instance was to help minimize unnecessary page refreshes and optimize the user experience by introducing a new state `isBoardUpdated`. This state is designed to track any changes that require the board to be updated. I modified the logic within tasks-related operations (adding a new task, editing a task, changing subtask completion or task status) and editing the board, to then update the `isBoardUpdated` state to `true`. This ensures seamless tracking of changes and that the latest data is efficiently fetched without resorting to a manual page reload. 

## Lessons Learned
- using template literals to dynamically build the field path and utilize MongoDB's array update operators
- greater understanding of CORS and third-party cookie policies

## Running this Project Locally
#### Server
In one terminal:
1. Create `.env` variables `PORT` and `DB_STRING`
2. Run `npm install` to install all relevant packages and dependencies
3. Run `NODE_ENV=development node server.js` to start a dev server and view the project in your browser

#### Client
In a second terminal:
1. `cd` to the `client` directory
2. Run `npm install` to install all relevant dependencies
3. Run `npm run dev` to start a dev server and view the project in your browser

## Future Enhancements
- [ ] Due dates and reminders
  - Users can set due dates for tasks and receive timely reminders, ensuring to stay on top of deadlines
- [ ] Priority Levels
  - Prioritize tasks with customizable priority levels, to focus on what matters most
- [ ] Search and Filters
  - Easily find and filter tasks based on keywords, tags, or other criteria, streamlining the search process
- [ ] Integration with Calendar
  - Sync tasks and due dates with the user's calendar for a consolidated view of your schedule
