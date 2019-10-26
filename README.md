# New York Times Scraper
New York Times Scraper is a full stack **CRUD** app that utilizes Mongoose, MongoDB, Handlebars, Express, Axios, Cheerio, and Morgan.
Axios and Cheerio are utilized to create a custom API by scraping data from the front page of the *New York Times*.  This information is added to a Mongo database and rendered to the user utilizing Handlebars.  All routes are handled using Express and Mongoose and Morgan is utilized for more detailed error handleing.

### Home Page
![Home Page](./public/images/background.jpeg "Home Page")
From here the user can scrape the mose current articles from the *New York Times* and render them to the page.  The user can then favorite articles to save to the saved articles page or remove all articles from the page and database.

### Saved Articles
![Saved Articles](./public/images/saved.png "Saved Articles")
The user can view and add notes to each article, delete an article or remove all articles from the database.

### Deployed App
[Deployed App](https://fast-citadel-83096.herokuapp.com/)

