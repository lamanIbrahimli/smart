const jsonServer = require('json-server');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const app = express();
const port = 3000;

server.use(jsonServer.bodyParser);

server.post('/signup', (req, res, next) => {
    const { organizationName, phoneNumber, address, user } = req.body;

    if (!organizationName || !phoneNumber || !address || !user) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    const existingOrganization = router.db.get('organizations').find({ organizationName }).value();
    if (existingOrganization) {
        return res.status(400).json({ error: 'Organization already exists' });
    }

    const newOrganization = router.db
        .get('organizations')
        .insert({ organizationName, phoneNumber, address })
        .write();

    const newUser = router.db
        .get('users')
        .insert({ ...user, organizationId: newOrganization.id })
        .write();

    res.json({ organization: newOrganization, user: newUser });
});

server.post('/signin', (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    const existingUser = router.db.get('users').find({ email }).value();

    if (!existingUser) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ user: existingUser });
});

const tasks = [];
server.post('/tasks', (req, res) => {
    const { title, description, deadline, status, assignedUsers } = req.body;

    if (!title || !status || !assignedUsers || !Array.isArray(assignedUsers)) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    const newTask = {
        title,
        description: description || '',
        deadline: deadline || '',
        status: status.value,
        assignedUsers,
    };

    tasks.push(newTask);

    res.json(newTask);
});

server.put('/tasks/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Update the status of the existing task
  tasks[taskIndex].status = status;

  // Return the updated task
  res.json(tasks[taskIndex]);
});


server.use(middlewares);

server.use(router);
app.use(cors());
app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
