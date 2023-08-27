const express = require('express')
//const { result } = require('lodash')
const mongoose = require('mongoose')
//const Blog = require('./models/blog')
//const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes')


//express app
const app = express()

//conect to mangoDB
const dbURI = 'mongodb+srv://quella:que1234@nodetuts.zpnshyt.mongodb.net/node-tuts'


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))


//register view engine
app.set('view engine', 'ejs')

//middleware &static files
app.use(express.static('public'))
  //use this when using methods like POST, DELETE
app.use(express.urlencoded({extended: true})) 

//mangoose & mango test
/* app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })

  blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});
 */
//routes
app.get('/', (req, res) => {
  res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  res.render('about', {title: 'About'})
})


//blog routes
app.use('/blogs', blogRoutes)

//redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about')
})

//404 page
app.use((req, res) => {
  res.status(404).render('404', {title: '404'})
})