const express = require ('express')
const jsonwebtoken = require ('jsonwebtoken')
const mysql = require ('mysql')
const bodyParser = require ('body-parser')
const app = express()
const port = 4000;

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: "penyewaan"
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// endpoint user
app.get('/users', (req, res) => {
    let sql = `
    select nama, username, password, created_at from users
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "Berhasil",
            data: result
        })
    })
})

app.post('/users', (req, res) => {
    let data = req.body

    let sql = `
    insert into user (nama, username, password)
    values ('`+data.nama+`','`+data.username+`', '`+data. password+`')
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "user created",
            data: result
        })
    })
})

app.get("/user/:id", (req, res) => {
    let sql = `
    select * from user
    where id = `+req.params.id+`
    limit 1
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "berhasil",
            data: result[0]
        })
    })
})

app.put('/users/:id', (req, res) => {
    let data = req.body

    let sql = `
    update user 
    set nama = '`+data.nama+`',
    username ='`+data.username+`',
    password ='`+data.password+`'
    where id = '`+req.params.id+`'
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: " berhasil ",
            data: result
        })
    })
})

app.delete('/users/:id', (req, res) => {
    let sql = `
    delete from user
    where id = '`+req.params.id+`'
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "berhasil",
            data: result
        })
    })
})

app.listen(port, () => {
    console.log('app running on port ' + port)
})