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

#### 2. Data Storage and Organization
- **Cloud storage for documents**: Store the digitized data in a cloud storage, categorizing information by patient, date, session, and other relevant tags.
- **Structured database for user personal information**: Store the username, email and user password for authentication
- *current progress*: We have set up the cloud storage and test the connection between the web application and the cloud storage with mockup functions. 

#### 3. Summarization
- **Natural Language Processing (NLP)**: Use NLP models to read through the text and summarize each session.
    - **Text Summarization**: Generate concise summaries of each session, highlighting key points, treatment changes, and notable events.
    - **Sentiment Analysis**: Analyze the emotional tone of the notes to gauge the patient’s mood and progression over time.
    - *current progress*: We have implemented the summarization function using gemini AI.
      
#### 4. Insight Generation
- **Predictive Insights**: Use machine learning or any other tools to predict potential issues or improvements based on historical data.
    - **Risk Flags**: Identify warning signs that may need immediate attention, such as signs of relapse or worsening symptoms.
    - *current progress*: We are exploring on different Generative AI models, and the feature is yet to be implemented.

#### 5. Actionable Recommendations
- **Treatment Suggestions**: Provide evidence-based recommendations for next steps in treatment, including potential therapy adjustments.
- **Session Preparation**: Generate summaries and key points for the practitioner before each session to ensure they are fully informed of the patient’s history and current state.
- *current progress*: We are exploring on different Generative AI models, and the feature is yet to be implemented.

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
4. The practitioner specifies the context for AI interpretation (e.g., therapy type, session focus).
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
- **Material-UI** or other UI libraries: For consistent and responsive UI components.

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

## User guide for testing
**Test on the website**
- Test the website by accessing the URL:
  [[https://personaiweb.vercel.app/]]
- Unit test report:
  [[https://drive.google.com/file/d/1mVC4hax4lYrE56JqwSlKzLZ3Xymc18zE/view?usp=sharing]]

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
- CORS errors
- CI/CD setup
- GenAI prompt generation implementation
