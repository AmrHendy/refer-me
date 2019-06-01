# Refer Me

Finding a job in top companies is pretty hard these days, as the process starts by sending the Resume through the company website, then the Resume goes through the automated process of selecting the appropriate Resume, to continue in the process of the job, as phone interviews, on-site interview,.. etc.. But unfortunately pretty good Resumes are skipped in the automation process, so some people may ask employees in the companies to refer them and give their resumes directly to the recruiter skipping the automation process. From that point we thought about making a web application, to organize the relation between the people working the company already (referrer) and the people who seeks job in that company (referee).

# Main Idea

The main idea of the project is that each user uploads its information, resume and the previous positions that he worked at. When a user asks another user for refer, a request is sent to the other user to review, the other user could accept or reject that request, and then the first user would be notified if his request was accepted or not. 

# How to Run

Just follow the instruction commands at `run-website.sh` script to start the front end, back end, and the database.


# Implementation Details

## Front End

In the front end, we used react-redux framework to make the view part of the application in addition to W3.CSS framework.

## Back End

In the back end, we used Nodejs with Express framework to handle the comming requests from the front end.

## Database

In the database, we used MongoDB to handle the unstructured data that we used to hold the information of each user to make it easy for any extensions in future.

# Features
- [x] Create account
- [x] Update profile sections including user information and positions.
- [x] Filtering jobs by company or country or employee name.
- [x] Ask for a refer.
- [x] Attach a message with the refer request.
- [x] Live counter of the incoming requests but not responded yet.
- [x] Responding to the incoming requests by accepting or rejecting them.
- [x] Ability to change the response status for the incoming requests.
- [ ] Attach files with the refer request.
- [ ] Filter the jobs by keywords and multi-options.
- [ ] Ability to start a conversation chat with someone if he allows this feature in his profile.
- [ ] Filter sended requests by their status.
- [ ] Ability to add some keywords to be able to spam the refer requests if they don't match these keywords. This feature is used to avoid sending requests to anyone.


# Examples

[TODO] Put images.
