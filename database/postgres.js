const { Pool, Client } = require('pg')
const client = new Client({
  user: 'renatnorderhaug',
  host: 'localhost',
  database: 'calendar',
  password: 'rootpass',
  port: 5432,
})
client.connect()



