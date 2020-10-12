const sqlite = require('sqlite3').verbose()
const path = require('path')
const fs = require('fs')

const openDb = () => {
  const dbPath = path.resolve(__dirname, '../db/database.db')
  return new sqlite.Database(dbPath, (err) => {
    if (err) return console.log(err)
  })
}

exports.initDb = () => {
  const db = openDb()
  db.run('CREATE TABLE IF NOT EXISTS singleTable(name TEXT NOT NULL, size INTEGER NOT NULL, sha1 TEXT NOT NULL);', (err) => {
    if (err) return console.log(err);
    console.log('Database initiated')
  })
  db.close()
}

exports.create = (name, size, sha1) => {
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

exports.read = (max = 15) => {
  return new Promise((resolve, reject) => {
    const db = openDb()
    db.all(`SELECT * FROM singleTable LIMIT ${max}`, (error, rows) => {
      if (error) reject(error);
      else resolve(rows);
      db.close();
    });
  })
}