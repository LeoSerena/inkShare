# InkShare Project

## TODOs

### MongoDB

- Use the *populate* function to perform joins instead of this ping-pong mess https://mongoosejs.com/docs/populate.html


### JWT

- refresh token in a better spot

### Web scraping

- Use Wikipedia to automatically fill forms
- Use Wikipedia to automatically create lists (such as countries vs capitals)

### Data Analysis

- Make so that when adding a book, tries to fit to another already existing in another book list
- Find lists that could be of interest depending on:
    - similar lists
    - similar users
- stats over the lists training
- trending topics on main page

### Lists

- Possibility to set view property of list (User, Particular, Friends, All)
- Possibility to set modify property of list (User, Particular)
- Set List type (text, images, sound) and entry dimension (1-4)
- Implement way of training on lists
- Add ratings

### Friends

- Possibility to add friends
- Display friends list
- Possibility to search for friends
- chatting
- forums

### Register Form

- Make so that if something wrong is given to the form, it stays on the page
- Explain either under the register form or in with an alert what went wrong

### Language Selection

- Add way to change site language

### Validation

- Books modifications needs to be validated

### Error handling

- Need to properly handle error when validating registration
- Need to write proper callbacks for error handling

### MORE

- proper accessible server
- backups
- Ask if cookies are ok
- Condition d'utilisation

-------------------------

## LOGS

### 18/4/22

- App now redirects to homepage and automatically logs in when registering

### 19/4/22

- modified some callbacks and DB connect now returns an error when fails

### 25/4/22

- added adding, modif and deletion of books with react