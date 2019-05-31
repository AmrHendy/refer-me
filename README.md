# refer-me

Finding a job in top companies is pretty hard these days, as the process starts by sending the Resume through the company website, then the Resume goes through the automated process of selecting the appropriate Resume, to continue in the process of the job, as phone interviews, on-site interview,.. etc.. But unfortunately pretty good Resumes are skipped in the automation process, so some people may ask employees in the companies to refer them and give their resumes directly to the recruiter skipping the automation process. From that point we thought about making a web application, to organize the relation between the people working the company already (referrer) and the people who seeks job in that company (referee).

# Main Idea

The main idea of the project is that each user uploads its information, resume and the previous position that he worked at. When a user asks another user to refer, a request is sent to the other user to review, the other user could accept or reject that request, and then the first user would be notified if his request was accepted or not. The user can also update its information, add new positions, and search for a specific company by country, that the office is located in, or its name using filters.

# How to Run

Just run the `run-website.sh` script to start the front end, back end, and the database.


# Implementation Details

## Front End

In the front end, we used react-redux framework to make the view part of the application.

## Back End

In the back end, we used Nodejs framework to handle the comming requests from the front end.

## Database

In the database, we used Mongo database to handle unstructured data that we used to hold the information of each user.


# Examples

[TODO] Put images.