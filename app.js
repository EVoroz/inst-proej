const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bcrypt = require('bcrypt')
const http = require('http')
const handlebars = require('handlebars')
const sessions = require('express-session')
const { db } = require('./DB')
// const cookieParser = require('cookie-parser')
// const { sessions } = require('./sessions')
const { checkAuth } = require('./src/views/middlewares/checkAuth')

const saltRounds = 10

const PORT = 3000

const server = express()

server.set('view engine', 'hbs')
server.set('cookieName', 'sid')
server.set('views', path.join(__dirname, 'src', 'views'))
hbs.registerPartials(path.join(__dirname, 'src', 'views', 'partials'))

const secretKey = 'ksdjfalskdl'
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))
// server.use(cookieParser())
server.use(sessions({
  name: server.get('cookieName'),
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  // store: new FileStore({
  //   secret: secretKey,
  // }),
  cookie: {
    // secure: true,
    httpOnly: true,
    maxAge: 86400 * 1e3,
  },
}))

server.use((req, res, next) => {
  const currentEmail = req.session?.user?.email

  if (currentEmail) {
    const currentUser = db.users.find((user) => user.email === currentEmail)
    console.log({ currentUser })
    res.locals.name = currentUser.name
  }

  next()
})

// server.get('/', (req, res) => {
// res.render('main')
// })

server.delete('/fetch', (req, res) => {
  res.sendStatus(204)
})

server.get('/secret', checkAuth, (req, res) => {
  res.render('secret')
})

server.get('/auth/signup', (req, res) => {
  res.render('signUp')
})

server.post('/auth/signup', async (req, res) => {
  const { name, email, password } = req.body

  const hashPass = await bcrypt.hash(password, saltRounds)
  db.users.push({
    name,
    email,
    password: hashPass,
  })

  req.session.user = {
    email,
  }

  // const sid = Date.now()
  // sessions[sid] = {
  //  email,
  // }
  // res.cookie('sid', sid, {
  //  httpOnly: true,
  //  maxAge: 36e8,
  //  })
  res.redirect('/')
})

server.get('/auth/signin', async (req, res) => {
  res.render('signIn')
})

server.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body

  const currentUser = db.users.find((user) => user.email === email)

  if (currentUser) {
    if (await bcrypt.compare(password, currentUser.password)) {
      req.session.user = {
        email,
      }

      return res.redirect('/')
    }
  }

  return res.redirect('/auth/signin')
})

server.get('/auth/signout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect('/')

    res.clearCookie(req.app.get('cookieName'))
    return res.redirect('/')
  })
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
  const allPost = JSON.parse(JSON.stringify(db.post))

allPost.forEach((post) => {
 const postAuthor = db.people.find((el) => el.id === post.personId)

//const options = {
//   hour: '2-digit',
//   minute: '2-digit',
//  second: '2-digit',
// }

// })

  response.render('main', { listOfPeople: peopleForRender }, { allPost })
})

server.post('/lentapost', (req, res) => {
  const dataFromForm = req.body

  db.people.push(dataFromForm)

  res.redirect('/')
})
// server.get('/', (req, res) => {
// const allPost = JSON.parse(JSON.stringify(db.post))

// allPost.forEach((post) => {
// const postAuthor = db.people.find((el) => el.id === post.personId)


// })
server.get('*', (req, res) => {
  res.send(`<div>
    <h1>404 Ошибка запроса</h1>
    <a href='/'>Главная страница</a>
    </div>`)
})

server.patch('/card/:id', (req, res) => {
  const { id } = req.params
  const { action } = req.body

  const currentCard = db.people.find((el) => el.id === id)

	 if (action === 'delete') {
    currentCard.count -= 1
  }

  req.sendStatus('404')
})

server.listen(PORT, () => {
	console.log(`Server has been started on port: ${PORT}`)
 })
