const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const cors = require("cors");
const categoryRouter = require('./routers/category.routes');
const medtypeRouter = require('./routers/med_type.routes');


var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

require('./routers/auth.routes')(app);
require('./routers/user.routes')(app);
require('./routers/doctor.routes')(app);
app.use('/api/categories', categoryRouter);
app.use('/api/medtype', medtypeRouter);
