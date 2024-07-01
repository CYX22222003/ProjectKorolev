# Project Korolev
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
![image 1](/images/Screenshot%202024-06-30%20194734.png)

[[https://drive.google.com/file/d/1M7G4jCz9e7H2GOFZaeg6bFUPd56O3XNF/view?usp=sharing]]
![Screenshot 2024-06-30 194831](https://github.com/CYX22222003/ProjectKorolev/assets/142647056/bf060edc-17b5-44c0-b960-5740402b38cf)

[[https://drive.google.com/file/d/1bFa_aGTICfDsW7ntJsFDcxahutsOQSth/view?usp=sharing]]
#### 2. Data Storage and Organization
- **Cloud storage for documents**: Store the digitized data in a cloud storage, categorizing information by patient, date, session, and other relevant tags.
- **Structured database for user personal information**: Store the username, email and user password for authentication
- *current progress*: We have set up the cloud storage and test the connection between the web application and the cloud storage with mockup functions. 
![Screenshot 2024-06-30 194916](https://github.com/CYX22222003/ProjectKorolev/assets/142647056/3bac4e52-e199-4984-b936-afb5c1709dea)

[[https://drive.google.com/file/d/1CztprENJbKz_9CoAgLXt7bWfzmLmvomL/view?usp=sharing]]
![Screenshot 2024-06-30 194956](https://github.com/CYX22222003/ProjectKorolev/assets/142647056/8cd416d7-7812-45f7-b6fb-3a6ff64ffeb6)

[[https://drive.google.com/file/d/1ILBiN_l12A6FqNgkGPVs2ZJicohskOCn/view?usp=sharing]]
![Screenshot 2024-06-30 194947](https://github.com/CYX22222003/ProjectKorolev/assets/142647056/4e7a9bad-78b4-4eb2-b51e-6c298fc790d3)

[[https://drive.google.com/file/d/1NshgtzWcUa3bvjPdeJaHLEJUyDRZUPVG/view?usp=sharing]]
#### 3. Summarization
- **Natural Language Processing (NLP)**: Use NLP models to read through the text and summarize each session.
    - **Text Summarization**: Generate concise summaries of each session, highlighting key points, treatment changes, and notable events.
    - **Sentiment Analysis**: Analyze the emotional tone of the notes to gauge the patient’s mood and progression over time.
    - *current progress*: We have implemented the summarization function using gemini AI.
![Screenshot 2024-06-30 195105](https://github.com/CYX22222003/ProjectKorolev/assets/142647056/703b207d-7f90-4a3b-a90c-4f27498a50b5)

[[https://drive.google.com/file/d/1bUJqvgU6PBYjYG85tY4wIrI8yGDfxhxP/view?usp=sharing]]
![Screenshot 2024-06-30 195127](https://github.com/CYX22222003/ProjectKorolev/assets/142647056/27ab2ce9-311e-4aa4-8d2d-0413c21bf12d)

[[https://drive.google.com/file/d/1tr_uZacKAo0kZbNURCK8pCZwQmRrgXMp/view?usp=sharing]]      
#### 4. Insight Generation
- **Predictive Insights**: Predict potential based on the session documents.
    - **Risk Flags**: Identify warning signs that may need immediate attention, such as signs of relapse or worsening symptoms.
    - *current progress*: Mental health practitioners are able to download the sentimental analysis reports generated from AI. We are working on improving the quality of the sentimental analysis generated.

#### 5. Actionable Recommendations
- **Treatment Suggestions**: Provide evidence-based recommendations for next steps in treatment including potential therapy adjustments based on mental health practitioners' notes on mode of therapy.
- **Session Preparation**: Generate summaries and key points for the practitioner before each session to ensure they are fully informed of the patient’s history and current state.
- *current progress*: We have implemented the feature for storing and displaying patients' history data. A simple treatment recommendations feature is implemented and we are working on fine-tuning the GenAI model with more data or prompt engineering techniques. 
![Screenshot 2024-06-30 200303](https://github.com/CYX22222003/ProjectKorolev/assets/142647056/5fad1044-1d61-49db-bdde-e0ab5a5d81c4)

[[https://drive.google.com/file/d/16h9DnE6rOdbO59QVKaxxRUuTCrhzdEG8/view?usp=sharing]]
## User stories 
- As a Mental Health Practitioner, I want to add new patients to the system to manage their profiles and initial assessments efficiently.
- As a Mental Health Practitioner, I want to upload session documentation and get AI-generated summaries to quickly review key insights from the sessions.
- As a Mental Health Practitioner, I want to review a patient's progress over time to make informed decisions about their treatment plan.
- As a Mental Health Practitioner, I want to review a patient's history and recent sessions before an appointment to prepare effectively.
- As a Mental Health Practitioner, I want to receive alerts about potential risk factors in patient data to intervene promptly and adjust treatment plans.
- As a Mental Health Practitioner, I want to ensure that sensitive patient data is secure and access is restricted based on user roles and permissions to comply with privacy regulations.


## Use cases
### use case diagram  
<img width="512" alt="image" src="https://github.com/CYX22222003/ProjectKorolev/assets/138369841/9cd02207-4b57-4f42-9d51-a6875237ad50">

[[https://drive.google.com/file/d/1YbV8956kTXDRPWvnO7kUX2nNh9XZP4C3/view?usp=sharing]]  

### 1. New Patient Onboarding
**Actors:** Mental Health Practitioner, Patient
**Flow:**
1. The practitioner logs into the system and selects "Add New Patient."
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
1. The system periodically analyzes patient data to detect potential risk factors (e.g., signs of relapse or worsening symptoms).
2. If a risk is detected, the system generates an alert for the practitioner.
3. The practitioner reviews the alert and associated insights.
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
    - `/loginTest`
    - `/create_user`
    - `/logoutTest`
2. **Patient Management Endpoints:**
    - `/patients` (GET, POST)
    - `/patients/<patient_id>` (GET, PUT, DELETE)
3. **Session Management Endpoints:**
    - `/patients/<patient_id>/sessions` (GET, POST)
    - `/patients/<patient_id>/sessions/<session_id>` (GET, PUT, DELETE)
4. **AI Integration Endpoints:**
    - `/ai/summary` (POST): To request AI-generated summaries of each session.
    - `/ai/insight` (POST): To request for analysis of patients' patterns and trends

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
![PersonAI-第 2 页 drawio](https://github.com/CYX22222003/ProjectKorolev/assets/142647056/73e08b9f-3e3e-458b-9675-e106a17838b3)

[[https://drive.google.com/file/d/1pMKzt3fDZuSfAY_eT246xQ7bkCAfw11B/view?usp=sharing]]

### Deployment
- **Frontend**: Host on **Vercel** for static site hosting.
- **Backend**: Deploy Flask app on **Azure cloud services**.
- **AI Model**: Use OpenAI/Gemini GenAI API **OR** deployed fine-tuned model on Azure Cloud services

### Software architecture diagram
<img width="587" alt="image" src="https://github.com/CYX22222003/ProjectKorolev/assets/138369841/4fc469ac-769e-4440-92f5-cf7689c75c15">

[[https://app.diagrams.net/#G1CDOVNB7qP17IsVIbR9OD8dyzQALozsng#%7B%22pageId%22%3A%22rPmJ95wfWXq4vIkdD8LA%22%7D]]

## Development Plan
**Link to the schedule**:
[[https://docs.google.com/spreadsheets/d/1SRqs8lnIfb-OR-RiBW3CiIKhSkH2khLF/edit?usp=sharing&ouid=102555423746749954313&rtpof=true&sd=true]]

## Testing
### Unit testing
We used the Jest framework for unit testing in our login, signup, session management and document creation features in the React frontend. In addition, we also use Python unittest library to perform unit testing on business logics and functions such as prompt construction, GenAI API call and operations on database in our Flask backend. 
Unit test report:
  [[https://drive.google.com/file/d/1mVC4hax4lYrE56JqwSlKzLZ3Xymc18zE/view?usp=sharing]]

### Integration testing
In order to ensure diiferent features are intended to work correctly, we decide to conduct integration testing on interdependent components in the frontend on browser. For the backend deployed on a seperate server, we utilize the framework provided by Postman to mock the interaction with different API endpoints. We adopt the dogfooding principles to perform manual integration testing.
System test report:
  [[]]

### User testing
We conducted user testing for through meeting with mental health practitioners from PeronAI at the end of each sprint iteration. We would present the new features or changes made in the sprint to the practitioner and ask for feedback. Then, we would analyzed the feedback and used it to guide our development in the next iteration.

## Project Management and SWE practices
Our team utilizes GitHub's tools such as Issues for tracking tasks, pull requests for code review, and GitHub Projects for organizing work. We follow Scrum Agile principles to manage projects, breaking down tasks into sprints for efficient execution. Furthermore, we've implemented CI/CD pipelines using GitHub Actions to automate development, integration, and deployment processes, streamlining our workflow:

1. **GitHub Issues and Pull Requests**: We employ GitHub Issues for tracking tasks, bugs, and feature requests. Pull requests serve the purpose of code reviews and merging changes, ensuring high quality and collaborative development.
![Screenshot 2024-06-29 220831](https://github.com/CYX22222003/ProjectKorolev/assets/142647056/f3109568-ad1b-43fc-b841-8dbaa16db448)


[[https://drive.google.com/file/d/1FY5faUg5NqCqaKTV1SE4w0_rL7hDwkkM/view?usp=sharing]]
![Screenshot 2024-06-29 220846](https://github.com/CYX22222003/ProjectKorolev/assets/142647056/21ab90e6-7e6e-440a-a12f-b0416e54983a)


[[https://drive.google.com/file/d/1pGcVMUUSQ_W_gv4xBUPQDVR7RWIBENqR/view?usp=sharing]]

2. **GitHub Projects**: In GitHub Projects, our Kanban board provides a visual representation of our workflow. Tasks are organized into two-week sprint iterations, categorized into columns such as "To Do," "In Progress," and "Done." This structured approach to sprints allows us to effectively manage our workload and achieve our goals efficiently.
![Screenshot 2024-06-29 112425](https://github.com/CYX22222003/ProjectKorolev/assets/142647056/42b5fbab-52b4-4afb-8c8d-e5e487b6be20)

[[https://drive.google.com/file/d/1eyfF0VQIYlExFpFOL3LLilf-MbOi2pFq/view?usp=sharing]] 

3. **CI/CD Pipelines**: Through GitHub Actions, we've automated our CI/CD processes, which include basic unit testing during integration and application deployment. This automation ensures a seamless and efficient development cycle.
![Screenshot 2024-06-29 112619](https://github.com/CYX22222003/ProjectKorolev/assets/142647056/e78fe072-5737-4c7f-bb41-8b41db6c0c98)

[[https://drive.google.com/file/d/1JDn_hTuLWBrBOWOhWAFZ8TM7utyCBrjX/view?usp=sharing]]
![Screenshot 2024-06-29 222244](https://github.com/CYX22222003/ProjectKorolev/assets/142647056/82eb9881-a948-4491-bb9e-c0110b12f17e)

[[https://drive.google.com/file/d/17IWysZV5ngIdklA3S741IwpZkv-U2XAK/view?usp=sharing]]
![Screenshot 2024-06-29 222105](https://github.com/CYX22222003/ProjectKorolev/assets/142647056/383a50cc-6168-424c-9e88-9f179cc6193f)

[[https://drive.google.com/file/d/1ilpfF09eQDeZWAfLTdRBQGyJVoVeghF3/view?usp=sharing]]
![Screenshot 2024-06-29 222326](https://github.com/CYX22222003/ProjectKorolev/assets/142647056/1c4c0cd4-0d4b-4a64-933a-11d374cadd57)

[[https://drive.google.com/file/d/1ZlI7rWAYDQcpVuTwjLhhFg-wNM_qAq5n/view?usp=sharing]]

## Project Log
[[https://docs.google.com/spreadsheets/d/1gZ-6_n4IHtcjVQOZL2AiwTfylYgo2e5X6lWn0AGaCjI/edit?usp=sharing]]

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
  [[https://personaiweb.vercel.app/]]
