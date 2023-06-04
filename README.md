# Notes App
## Introduction
- This is a simple web application that allows users to index, create, update, and delete notes.
- To sign up and create notes yourself, you can visit http://164.92.104.129:3000/
## Technology Choices
### React
React offers a component-based architecture and unidirectional data flow. UI elements such as note cards, headers, and pages would be similar for everyone using the app and hence reusable. This allowed for better code organization and easibility with maintaining the UI. Additionally, its unidirectional data flow allowed for a predictable system. For example, notes would first be fetched from the backend, then passed as props to note card components.
### Tailwind
TailwindCSS mdae styling the web app incredibly efficient by eliminating the need for custom css classes and files. This also helped with code organization.
### Firebase
Firebase was used to handle user authentication due to its simplicity and security. All passwords were stored on Google's Firebase servers, rather than the app's PostgreSQL database.
### GraphQL
GraphQL, opposed to REST, allowed for efficient full-stack development by offering a consistent and reliable API. The frontend could define its own requests based on its needs, whether it was for user or note information.
### NestJS
NestJS was used to build the backend API due to its reliability from Typescript and easily maintainable strucutre.
### PostgreSQL
PostgreSQL was used as the database due to its reliability. For a simple notes app, most of the data will be structured, with certain properties and constraints between notes and users. Hence, PostgreSQL was used instead of a NoSQL database like MongoDB
## User Guide & Functionality
### Account Creation
- Upon visiting the website for the first time, you will be redirected to the login page. Click "Register here" to sign up.
- On the register page, after clicking the 'Register' button, you will be redirected to the main website.
### Navigation
- After logging in, you will see a header at the top of the page. The "Notes" link is the main page, where you can index, create, update, and delete notes. The "Create Note" page is a page dedicated to creating notes. 
### Manipulating Notes
#### Creating Notes
- To create a note, you can click the "Create Note" button on the main page or click the "Create Note" link on the header. You will have to fill out your note description, which must be between 20 and 300 characters.
#### Indexing Notes
- On the main page, you will be able to see a list of all your notes. At the top of the main page is a search bar, where you can search for any note for its description or date created/updated.
#### Updating Notes
- On the main page, after finding the note you'd like to update, simply hit the "Edit Note" button. This will redirect you to a page where you can edit that note. Similarly to creating a note, the description must be between 20 and 300 characters.
#### Deleting Notes
- Similarly to updated notes, after finding the note you'd like to delete, simply hit the "Delete Note" button.
