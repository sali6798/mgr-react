<!-- omit in toc -->
# [MGR](https://mgr-talent.herokuapp.com/)

<!-- omit in toc -->
## Table of Contents
- [Description](#description)
- [User Story](#user-story)
- [Usage](#usage)
- [Installation](#installation)
- [Credits](#credits)
- [Future Developments](#future-developments)
- [Deployed Site](#deployed-site)
- [Developers](#developers)

## Description
MGR is an application that helps managers and artists track deadlines and social media commitments with shared calendars and cloud-based file sharing. Our goal is to automate the process of communicating important dates, managing social media schedules, and sharing content necessary for artist promotion in a simple & seamless experience.

## User Story
<strong>Manager/Record Label Rep</strong> <br>
AS AN artist manager/record label representative <br>
I WANT to be able to set release dates, social media scheduling deadlines, and share content <br>
SO THAT I can easily manage commitments for my artists and keep all content in one place to be easily accessible so that artists can post on their social media platforms by a given deadline

<strong>Artist</strong> <br>
AS AN artist <br>
I WANT to be able to check a calendar for upcoming music release dates and social media/promotion deadlines and quickly access the content I need <br>
SO THAT I can easily track timelines for release dates and promotional activities and easily send out social media posts 

## Usage
<strong>Views for all users</strong>
- Create an account, enter information for all the fields and choose whether it is a manager account or not
- Once logged in the user is redirected to their Dashboard, which contains
    - A list of today's schedule, with a preview button for posts that need to be posted to social media
      - The preview button will display a modal with what the body of the post will be and the images to be attached, which are created by the manager, but the post body can be edited by the artist. The user can click the post to facebook and post to twitter buttons to post to the respective platforms
    - A calendar that is populated with events from groups the user belongs to that are created by the group's manager and personal events that the user created and only they can see
      - Personal events are shown as orange, and group events are blue. Personal events can be created through the 'Add Event' button or by clicking a time on the week or day calendar view
      - Group events are all day events. Personal events can span multiple days and can have the end date/time set
      - Click on an event, and the event details will be displayed
- Update account details on the 'My Account' page and link a Twitter account and a Facebook account. Linking of social media accounts is required before posting posts from the Dashboard.  

<strong>Manager account view</strong>
- Create a group, view groups currently being managed, and delete groups from the 'Groups' page
- Clicking on a group leads to their group page, where the manager can then manage their details and events
    - Can add multiple artists to a group at a time by searching for their emails and remove artists from the group
    - Create an event/post for the group
      - Add an event title, the body of the post, upload images for the post and set the status of the event. If a post is ready, it will send email notifications to the artists straight away, if it is scheduled for a later date, it will not send notifications until that date. 
    - Events/posts can also be edited, change the event title, post's body, delete pictures, or change the status.
    - See all events grouped by their different statuses

## Installation
The app can be used through the deployed client site below, but if you want to clone the repo, the application requires Node.js and MongoDB to be installed. 
1. Check if Node.js is installed by entering `node --version` into the command line. If it is installed, a version number should be displayed. 
   - If not, it can be [downloaded from their website](https://nodejs.org/en/download/), then check if it was installed properly by performing `node --version` 
2. If the command `mongod` or `mongo` is not recognised in the command line, MongoDB has not been installed. [Follow the guides here for your OS](https://docs.mongodb.com/manual/installation/)
3. Run `npm install` in the command line from the root directory of the project to install all dependencies
4. To run locally,
   1. Run `npm start` in the command line from the root directory of the project and then it should automatically open the site in your default browser. (This will just allow non-logged in functionality i.e. only view not interact with landing, create account and login pages)
      - If not, go to open your browser and enter localhost:3000
   2. For full functionality, 
      - Clone the [server repository](https://github.com/sali6798/mgr-api/), run `npm install` in the root directory of the server project and then run `node server` also from the root directory.  
      - Then in a different command line window, run `npm start` in the root directory of the client project

## Credits
- [Material-UI](https://material-ui.com/)
- [FullCalendar](https://fullcalendar.io/)
- [Moment.js](https://momentjs.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [React Facebook Login](https://www.npmjs.com/package/react-facebook-login)
- Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com
- Favicons created from https://favicon.io/

## Future Developments
- Add sample pack hosting
- Send links to artists for signup that'll link them to a group automatically, so manager doesn't have to wait for artists to create an account before adding them to a group
- Search for users only within your company, currently searches whole database
- Create more seamless social media posting direct from application
- Get necessary approvals from Twitter and Facebook 

## Deployed Site
- Client Side: https://mgr-talent.herokuapp.com/
- Server Side: https://mgrserver.herokuapp.com/

## Developers
- Shaidee Alingcastre ([Github](https://github.com/sali6798/), [LinkedIn](https://www.linkedin.com/in/shaidee-alingcastre/))
- Brett Belka ([Github](https://github.com/bbelka/), [LinkedIn](https://www.linkedin.com/in/brettbelka/))
- JJ Cardenas ([Github](https://github.com/cardeens), [LinkedIn](https://www.linkedin.com/in/jordanjcardenas/))
- Kridsanapong Daihentob ([Github](https://github.com/commiewalker), [LinkedIn](https://www.linkedin.com/in/kridsanapong-daihentob-9341ba152/))
