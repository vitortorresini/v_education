const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/router_user');  // repetir para novo post
const workspaceRouter = require('./routes/router_workspace')
const taskRouter = require("./routes/router_tasks")
const app = express();

app.set('port', process.env.PORT || 3005);
app.use(cors());
app.use(express.json());
app.use('/api', userRouter); // repetir tbm
app.use('/api', workspaceRouter);
app.use('/api', taskRouter);


module.exports = app;


// para novo post criar outro router e controller