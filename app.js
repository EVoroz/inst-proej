
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { db } = require('./DB')
const cookieParser = require('cookie-parser')
const res = require('express/lib/response')
const { request } = require('http')
const {sessions} = require('./sessions')
const { checkAuth } = require('./src/views/middlewares/checkAuth')
const session = require('express-session')


const PORT = 3000
const server = express()



server.set('view engine', 'hbs')

server.set('views', path.join(__dirname, 'src', 'views'))
hbs.registerPartials(path.join(__dirname, 'src', 'views', 'partials'))
server.use(express.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, 'public')))
server.use(cookieParser())

server.use((req, res, next) => {

  const sidFromPeople = req.cookies.sid
  const currentSession = sessions[sidFromPeople]
   if(currentSession) {
     const currentPeople = db.peoples.find((people) => people.email === currentSession.email)
     res.locals.name = currentPeople.name
   }
   next()
})

server.get('/', (req,res) => {
  res.render('main')
})

server.get('/secret', checkAuth, (req,res) => {
  res.render('secret')
})
server.get('/auth/signup', (req,res)=> {
  res.render('signUp')
})

server.post('/auth/signup', async (req, res) => {
  const { name, email, password } = req.body

  db.peoples.push({
    name,
    email,
    password, 
   })

   const sid = Date.now()

   session[sid] = {
     email,
   }

   res.cookie('sid',sid, {
     httpOnly: true,
     maxAge: 36e8,
 }) 
   res.redirect('/')
})

server.get('/auth/signin', (req, res)=> {
  res.render('signIn')
})

server.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body

  const currentPeople = db.peoples.find((people) => people.email === email)

  if(currentPeople) {
    if (currentPeople.password === password) {
      const sid = Date.now()

   session[sid] = {
     email,
   }

   res.cookie('sid',sid, {
     httpOnly: true,
     maxAge: 36e8,
   })
      return res.redirect('/')
    }
  }

  return res.redirect('/auth/signin')
 })

 server.get('/auth/signout', (req, res) => {
   const sidFromPeopleCookie = request.cookie.sid
   delete session[sidFromPeopleCookie]
   res.clearCookie('sid')
   res.redirect('/')

 })





server.get('/', (request, response) => {
    const usersQuery = request.query 
    let peopleForRender = db.people

  if (usersQuery.limit !== undefined && Number.isNaN(+usersQuery.limit) === false) {
    peopleForRender = db.people.slice(0, usersQuery.limit)
    }

  if (usersQuery.revers !== undefined && Number.isNaN(+usersQuery.revers) === 'true') {
    peopleForRender = db.people.revers()
  }

    response.render('main', { listOfPeople: peopleForRender })
  })

server.post('/lentapost', (req, res) => {
    const dataFromForm = req.body

    db.people.push(dataFromForm)

    res.redirect('/')
  })


server.get('*', (req, res) => {
    res.send(`<div>
    <h1>404 Ошибка запроса</h1>
    <a href='/'>Главная страница</a>
    </div>`)
  })

server.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`)
  })
