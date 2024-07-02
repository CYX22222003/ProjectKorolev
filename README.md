## Team
Team Korolev

## Proposed Level 
Apollo 11

## Motivation and Vision:

Mental Health Practitioners are overwhelmed by the number of patients/customers they have to track.

Right now most of psychological/therapy/case work is recorded by hand and kept in patient files/books. This is very manual and is terrible in terms of figuring out how well the patient is doing over their entire patient history over all sessions. (The practitioner can’t possible read it all, and get full context of the patient’s current state)  

The Generative AI solution can potentially help practitioners to summarize and draw insights, to improve and speed up reviewing patient history.

Therefore, we decide to design a web App providing a seamless experience for users to:

- CRUD (Create/Read/Update/Delete) patient sessions (as a text data file) to cloud storage
    
- CRUD to allow app users to select/specify the gen AI context to interpret in
    
- Make API calls to either online services/local server Gen AI model
    
- Display results of Gen AI summary, insights on Web App
    
- User Authentication and access to only appropriate user data

### Features

#### 1. Authentication
- **Registration and log in**: Practitioners can create new account and log in to manage the patient records.
- *current progress*: We have created the Sign Up and Sign In page for use with email and password authentication.
<img src="/ProjectKorolev/images/image1.png" >


<img src="/ProjectKorolev/images/image2.png" >



#### 2. Data Storage and Organization
- **Cloud storage for documents**: Store the digitized data in a cloud storage, categorizing information by patient, date, session, and other relevant tags.
- **Structured database for user personal information**: Store the username, email and user password for authentication
- **Note-taking editor**: Built-in note-taking editor for metal health practitioners to add additional notes such as the modelities of therapy
- **Document preview**: Enable users to preview focuments uploaded to cloud storage. 
- *current progress*: We have implemented the cloud storage and database for users to store and extract documents. The text editior is also available for users. We are still working on implementing the document preview 
<img src="/ProjectKorolev/images/image3.png" >


<img src="/ProjectKorolev/images/image4.png" >


<img src="/ProjectKorolev/images/image5.png" >



#### 3. Summarization
- **Natural Language Processing (NLP)**: Use NLP models to read through the text and summarize each session.
    - **Text Summarization**: Generate concise summaries of each session, highlighting key points, treatment changes, and notable events.
    - **Sentiment Analysis**: Analyze the emotional tone of the notes to gauge the patient’s mood and progression over time.
- *current progress*: We have implemented the summarization function using gemini AI.
<img src="/ProjectKorolev/images/image6.png" >


<img src="/ProjectKorolev/images/image7.png" >


 
#### 4. Insight Generation
- **Trend Insights**: Analyze multiple documents for a specific patients.
- **Thematic analysis**: Analyze patients data based on a specific theme such as family issues.
- *current progress*: Mental health practitioners are able to download the sentimental analysis reports and session summaries generated from AI. We are working on improving the quality of the sentimental analysis generated. We are also working on enabling the GenAI to analyse multiple doucments related to a user

#### 5. Actionable Recommendations
- **Treatment Suggestions**: Provide evidence-based recommendations for next steps in treatment including potential therapy adjustments based on mental health practitioners' notes on mode of therapy.
- **Session Preparation**: Generate summaries and key points for the practitioner before each session to ensure they are fully informed of the patient’s history and current state.
- *current progress*: We have implemented the feature for storing and displaying patients' history data. A simple treatment recommendations feature is implemented and we are working on fine-tuning the GenAI model with more data or prompt engineering techniques. 
<img src="/ProjectKorolev/images/image8.png" >



## User stories 
- As a Mental Health Practitioner, I want to add new patients to the system to manage their profiles and initial assessments efficiently.
- As a Mental Health Practitioner, I want to upload session documentation and get AI-generated summaries to quickly review key insights from the sessions.
- As a Mental Health Practitioner, I want to review a patient's progress over time to make informed decisions about their treatment plan.
- As a Mental Health Practitioner, I want to review a patient's history and recent sessions before an appointment to prepare effectively.
- As a Mental Health Practitioner, I want to receive alerts about potential risk factors in patient data to intervene promptly and adjust treatment plans.
- As a Mental Health Practitioner, I want to ensure that sensitive patient data is secure and access is restricted based on user roles and permissions to comply with privacy regulations.


## Use cases
### use case diagram  
<img src="/ProjectKorolev/images/image9.png" >



### 1. New Patient Onboarding
**Actors:** Mental Health Practitioner, Patient  

**Flow:**
1. The practitioner logs into the system and selects "Create New Patient."
2. The practitioner inputs the patient's details and creates a new patient profile.
3. The system generates a unique patient ID and creates a cloud storage directory for the patient's files.
4. The practitioner uploads initial assessment notes and any relevant documents.
5. The system digitizes and stores the documents securely.

### 2. Session Documentation and Summarization 
**Actors:** Mental Health Practitioner  

**Flow:**
1. The practitioner logs into the system and selects an existing patient.
2. The practitioner uploads documentations from a recent session. Documentations are in form of 
	- text documents
4. The practitioner specifies the context for AI interpretation (e.g., therapy type, session focus) and use editor to create notes on mode of therapy.
5. The system calls the AI service to generate a summary of the session and extracts key insights.
6. The practitioner reviews the AI-generated summary and insights, which are displayed on the web app.

### 3. Reviewing Patient Progress
**Actors:** Mental Health Practitioner  

**Flow:**
1. The practitioner logs into the system and selects an existing patient.
2. The practitioner navigates to the patient's history dashboard.
3. The system displays summaries of past sessions
4. Based on past trajectory of treatment and the feedback, the practitioner adjusts the treatment plan if necessary.

### 4. Preparing for a Session
**Actors:** Mental Health Practitioner  

**Flow:**
1. The practitioner logs into the system and selects an upcoming session with a patient.
2. The system retrieves and displays a summary of the patient's history and recent sessions.
3. The practitioner reviews the summary and any AI-generated insights.
4. The practitioner uses this information to prepare for the session, ensuring they are up-to-date with the patient's current state.

### 5. Patient Follow-up and Risk Management
**Actors:** Mental Health Practitioner  

**Flow:**
1. The system periodically analyzes patient data to generate a reports about patients progress. 
2. Practitioners can used the generated documents detect potential risk factors (e.g., signs of relapse or worsening symptoms).
3. If a risk is detected, the system generates an alert for the practitioner.
4. The practitioner contacts the patient to address the issue and adjust the treatment plan as necessary.

### 7. Secure Access and Data Privacy
**Actors:** Mental Health Practitioner  

**Flow:**
1. Users log into the system using their credentials.
2. The system verifies user roles and permissions.
3. Users access only the data and functionalities they are authorized for.
4. Sensitive patient data is encrypted both in transit and at rest, ensuring privacy and compliance with regulations (e.g., HIPAA).

## Software architecture design
### Frontend (React.js)

#### Components:

1. **Authentication Components:**
    - Login
    - Registration
    - Forgot Password
    - Profile Management
2. **Patient Management:**
    - List of Patients
    - Patient Details
    - Add New Patient
    - Edit Patient Details
3. **Session Management:**
    - List of Sessions for a Patient
    - Session Details
    - Add New Session
    - Edit Session Details
4. **AI Integration:**
    - Form for specifying AI context parameters
    - Display AI-generated summaries and insights
5. **Dashboard:**
    - Visualizations for patient's history record of AI-generated insights
6. **Navigation:**
    - Header with navigation links
    - Sidebar or menu for easy access to different sections
7. **Error Handling and Notifications:**
    - Display error messages and notifications for user feedback

#### Libraries:
- **React Router**: For client-side routing.
- **Material-UI**: For consistent and responsive UI components.

### Backend (Flask)

#### Endpoints:

1. **Authentication Endpoints:**
    - `/login`
    - `/create_user`
    - `/logout`
2. **Patient Management Endpoints:**
    - `/patients` (GET)
    - `/patient/<patient_id>` (GET, DELETE, PUT)
    - `/patient/create` (POST)
3. **Session Management Endpoints:**
    - `/patients/session/create` (POST)
    - `/patients/sessions/<session_id>` (GET, PUT, DELETE)
4. **AI Integration Endpoints:**
    - `/ai/summary` (POST): To request AI-generated summaries of each session.
    - `/ai/insight` (POST): To request for analysis of patients' patterns and trends

#### API design:
<a href="https://api.postman.com/collections/32139578-2adfeb79-ccf3-4377-8c8b-8cd204ca9a1c?access_key=PMAT-01J1RPWHCNH4HA4AV31Z5NTGTM">
    Postman JSON file link in OpenAPI standard
</a>

#### Libraries: 
- **Flask**: Lightweight Python web framework for building RESTful APIs.
- **Flask-CORS**: For handling Cross-Origin Resource Sharing (CORS) headers.
- **Flask-Login**: for user authentication
- **SQLAlchemy**: For database interactions.

### Database
- **SQL Database**: Use **SQLite SQL** database to store user authentication data 
- **Cloud Storage**: **Azure Blob Storage** to store patient information, session data, and AI context parameters.
- **Generative AI**: fine-tuned **Google Gemini AI** to generate response with well designed prompts

### ER Diagram 
<img src="/ProjectKorolev/images/image10.png" >


### Deployment
- **Frontend**: Host on **Vercel** for static site hosting.
- **Backend**: Deploy Flask app on **Azure cloud services**.
- **AI Model**: Use OpenAI/Gemini GenAI API **OR** deployed fine-tuned model on Azure Cloud services

### Software architecture diagram
<img src="/ProjectKorolev/images/image11.png" >



## Development Plan
<a href="https://docs.google.com/spreadsheets/d/1SRqs8lnIfb-OR-RiBW3CiIKhSkH2khLF/edit?usp=sharing&ouid=102555423746749954313&rtpof=true&sd=true">
    Link to the schedule
</a>  
   
| Title                                                                               | Priority | Size | Iteration   | Status      |
| ----------------------------------------------------------------------------------- | -------- | ---- | ----------- | ----------- |
| Feature: Implement user login on frontend                                           | P0       | M    | Iteration 1 | Done        |
| Docs: Update documents for MS1 submission (design plan, README, project log)        | P0       | S    | Iteration 1 | Done        |
| Feature: Implement user sign-up feature for frontend                                | P0       | M    | Iteration 1 | Done        |
| Feature: Implement basic interactions with GenAI API                                | P0       | L    | Iteration 2 | Done        |
| Feature: Implement patients management and sessions management                      | P0       | L    | Iteration 2 | Done        |
| Feature: Set up interaction with cloud storage and implement file uploading feature | P0       | L    | Iteration 2 | Done        |
| Docs: Create mockup of the frontend and complete API design                         | P0       | M    | Iteration 2 | Done        |
| Test: Add unit test cases for utility functions                                     | P1       | M    | Iteration 3 | In Progress |
| Bug: Exception caused by the failure to follow username convention is not handled   | P2       | S    | Iteration 3 | Done        |
| Bug: Use Toast elements to display warnings and alerts                              | P2       | S    | Iteration 3 | Done        |
| Bug: detect empty inputs during signup and login                                    | P2       | M    | Iteration 3 | Done        |
| Feature: create text editor for users to key in context documents                   | P0       | S    | Iteration 3 | Done        |
| Feature: enable users to delete unwanted documents from cloud storage               | P0       | M    | Iteration 3 | Done        |
| Docs: Update README, video and poster for MS2 submission                            | P0       | L    | Iteration 3 | In Progress |
| Enhancement: enable users to preview uploaded documents                             | P0       | M    | Iteration 4 | Todo        |
| Feature: audio-to-text/ dialogue-to-text                                            | P0       | L    | Iteration 4 | Todo        |
| Feature: Implement user account management feature                                  | P0       | M    | Iteration 4 | Todo        |
| Feature: fine-tune GenAI model to improve its performance and quality of response   | P0       | L    | Iteration 4 | Todo        |
| Enhancement : use GenAI to implement analysis of multiple related documents         | P0       | L    | Iteration 4 | Todo        |
| Enhancement: beautify the webpage design to improve UI/UX                           | P1       | L    | Iteration 5 | Todo        |
| Docs: Update relevant documents, posters and videos for final submission            | P1       | L    | Iteration 5 | Todo        |    
     
| Iteration   | From      | To        |
| ----------- | --------- | --------- |
| Iteration 1 | 20/5/2024 | 6/6/2024  |
| Iteration 2 | 7/6/2024  | 20/6/2024 |
| Iteration 3 | 21/6/2024 | 4/7/2024  |
| Iteration 4 | 5/7/2024  | 18/7/2024 |
| Iteration 5 | 19/7/2024 | 2/8/2024  |   
   
| Priority | Description |     
| -------- | ----------- |
| P0       | High        |
| P1       | Medium      |
| P2       | Low         |   
    
| Size | Description                     |
| ---- | ------------------------------- |
| L    | changes of more than 100 lines. |
| M    | changes of 99-200 lines         |
| S    | changes of 0-99 lines           |


## Testing
### Unit testing
We used the Jest framework for unit testing in our login, signup, session management and document creation features in the React frontend. In addition, we also use Python unittest library to perform unit testing on business logics and functions such as prompt construction, GenAI API call and operations on database in our Flask backend.   
   
Unit test report: <a href="https://drive.google.com/file/d/1mVC4hax4lYrE56JqwSlKzLZ3Xymc18zE/view?usp=sharing">Link</a>   
  
Frontend test report:   
<img src="/ProjectKorolev/images/test_report1.png">   
<img src="/ProjectKorolev/images/test_report2.png">  
<img src="/ProjectKorolev/images/test_report3.png">   
<img src="/ProjectKorolev/images/test_report4.png">    
<img src="/ProjectKorolev/images/test_report5.png">  

Backend test report:   
<img src="/ProjectKorolev/images/test_report6.png"> 

### Integration testing
In order to ensure diiferent features are intended to work correctly, we decide to conduct integration testing on interdependent components in the frontend on browser. For the backend deployed on a seperate server, we utilize the framework provided by Postman to mock the interaction with different API endpoints. We adopt the dogfooding principles to perform manual integration testing. Every components are well functioning and meet the requirements of target audiences.  


### User testing
We conducted user testing for through meeting with Mdm Dawn Heng, the mental health practitioners from PeronAI on a weekly basis. We would present the new features or changes made in the sprint to the practitioner and ask for feedback. Then, we would analyzed the feedback and used it to guide our development in the next iteration.

Mdm Heng has tested our prototype before our MS2 submission. She was satisfied with the session document management and the interaction with GenAI. At the same time, she also suggested us to improve the interactivity of the UI/UX design and add additional features of document preview fratures.

## Project Management and SWE practices
Our team utilizes GitHub's tools such as Issues for tracking tasks, pull requests for code review, and GitHub Projects for organizing work. We follow Scrum Agile principles to manage projects, breaking down tasks into sprints for efficient execution. Furthermore, we've implemented CI/CD pipelines using GitHub Actions to automate development, integration, and deployment processes, streamlining our workflow:

1. **GitHub Issues and Pull Requests**: We employ GitHub Issues for tracking tasks, bugs, and feature requests. Pull requests serve the purpose of code reviews and merging changes, ensuring high quality and collaborative development.
<img src="/ProjectKorolev/images/image12.png" >


<img src="/ProjectKorolev/images/image13.png" >



2. **GitHub Projects**: In GitHub Projects, our Kanban board provides a visual representation of our workflow. Tasks are organized into two-week sprint iterations, categorized into columns such as "To Do," "In Progress," and "Done." This structured approach to sprints allows us to effectively manage our workload and achieve our goals efficiently.
<img src="/ProjectKorolev/images/image14.png" >



3. **CI/CD Pipelines**: Through GitHub Actions, we've automated our CI/CD processes, which include basic unit testing during integration and application deployment. This automation ensures a seamless and efficient development cycle.
<img src="/ProjectKorolev/images/image15.png" >


<img src="/ProjectKorolev/images/image16.png" >


<img src="/ProjectKorolev/images/image17.png" >


<img src="/ProjectKorolev/images/image18.png" >



## Project Log
<a href="https://docs.google.com/spreadsheets/d/1gZ-6_n4IHtcjVQOZL2AiwTfylYgo2e5X6lWn0AGaCjI/edit?usp=sharing">
    Link to project log
</a>

## Problems encountered
### GenAI prompt generation implementation
We initially allow medical practitioner to key in their own prompts to generate analysis reports about the session documents. However, this always causes inaccurate and low quality responses to be generated. Therefore, we provided pre-designed prompts for users to choose based on the tasks they want to perform. To further improve the reliablity of the responses, we employ some prompting design strategies. We have give instructions that provide more details about the context, specify the format of the response and set constraints about the size of response. In addition, we planned to include few-shots example with a standard analysis of mock session documents. We are planning to further fine-tune our application with more consulting session documents so that it can generate meaningful contents for mental health practitioners.

### Integration of editor
Through the weekly meething with external organization PersonAI, we realize that mental health practitioners often need to add their own notes on mode of therapy after the end of each sessions. Therefore, we add an additional features of editor by customizing the RichTextEditor component from MUI library. This makes the editor more user-friendly and increases mental health practitioners' creativity in taking down the notes.

### Continuous Delivery and Deployment  
The current application is deployed on my Azure Cloud service personal account, which lacks secure storage for sensitive data and has limited capacity to handle a large volume of requests. To prepare the application for public use, we containerize the frontend web app to run an Apache server. We also containerize the Flask backend with a Gunicorn WSGI server. Furthermore, We use Docker Compose to orchestrate and streamline the interaction between the frontend and backend, we can enhance the efficiency and flexibility of deployment. This approach increases the likelihood of hosting the application on a more secure and robust server in the future.

The seperation of frontend application and backend application deployment also results in the CORS errors when they interact with HTTP requests. Our initial solution was to add proxy in the dependencies of frontend web app. However, this will cause server error when the services are deployed on cloud servers. Finally, we utilized the Flask-CORS library to configure headers of the backend responses to enable CORS mechanism and session authentication.  

### Storage for Blob
We initially decide to store BLOB data such as word document in SQL database on the frontend server in the format of a byte string. However, this approach makes our backend cubersome, as the conversion between the blobs and byte string makes the processing of BLOB files inefficient and complicated. Therefore, we switch to use Cloud services such as Azure Blob Storage for a more efficient and secure storage of large media files. Furthermore, we streamline the interaction between the web application and cloud storage and enable Blob data to be directly sent from the frontend to the cloud storage utilize the API of Azure Cloud Service. The backend will only store the reference to the Blob file in the cloud storage in the database, and use these reference to extract the documents from cloud storage for further processing.

## Setting Up
**Test on the website**
- Test the website by accessing the URL:
  <a href="https://personaiweb.vercel.app/">Link</a>
- Video tutorial:
  <a href="">Link to video tutorial</a>
      
**Docker images**   
We have stored the backend and frontend images in the remote registry of dockerHub. Public images are available to be pulled to local machine for testing.  
- frontend image: `e1155533/orbital_test:frontend_ms2`
- backend image: `e1155533/orbital_test:backend_ms2`
- use `docker pull` to pull images to the local machine
- use `docker run` to build and run backend and frontend service in docker container
