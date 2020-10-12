const sqlite = require('sqlite3').verbose()
const path = require('path')
const { formatBytes, trimName } = require('./formattingService')

const openDb = () => {
  const dbPath = path.resolve(__dirname, '../db/database.db')
  return new sqlite.Database(dbPath, (err) => {
    if (err) return console.log(err)
  })
}

exports.initDb = () => {
  const db = openDb()
  db.run('CREATE TABLE IF NOT EXISTS singleTable(id NUM, name TEXT NOT NULL, size INTEGER NOT NULL, sha1 TEXT NOT NULL);', (err) => {
    if (err) return console.log(err);
    console.log('Database initiated')
  })
  db.close()
}

exports.writeDb = (name, size, sha1) => {
  return new Promise((resolve, reject) => {
    try {
      const db = openDb()
      db.run(`INSERT INTO singleTable(name, size, sha1) VALUES('${name}', ${size}, '${sha1}')`)
      console.log('Inserted ✔')
      resolve(db.close())
    } catch (error) {
      reject(error)
    }
  })
}

exports.readDb = (req, max = 15) => {
  return new Promise((resolve, reject) => {
    const db = openDb()
    db.all(`SELECT * FROM singleTable ORDER BY rowid DESC LIMIT ${max}`, (error, rows) => {
      if (error) reject(error);
      else {
        console.log('Fetched ✔')
        const formattedData = rows.map(obj => {
          return {
            name: trimName(obj.name),
            size: formatBytes(obj.size),
            sha1: obj.sha1
          }
        })
        resolve(req.session.savedData = formattedData);
      }
      db.close();
    });
  })
}