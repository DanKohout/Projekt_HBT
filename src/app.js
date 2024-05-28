const path = require('path')
const fs = require('fs');
const express = require('express')
const hbs = require('hbs')
//const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)
//console.log(path.join(__dirname, '../public'))
const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

//Defining paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

const data = require('./data_luzek.json');

//Setup handlebars engine and views location
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('luzko_seznam', {
        title: 'Dynamic site',
        name: 'Dakoh Kodah'
    })
})

app.get('/luzko', (req, res) => {
    res.render('luzko', {
        title: 'Dynamic site',
        name: 'Dakoh Kodah'
    })
})



app.get('/data', (req, res) => {
    res.json(data);
    /*fs.readFile('src/data_luzek.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error reading data')
            return
        }
        //console.log(data)
        res.send(data)
        
    })*/
})

app.get('/data/:bedid', (req, res) => {
    const bedId = req.params.bedid;
    const bed = data.find(b => b.id_bed === bedId);
    if (bed) {
        res.json(bed);
    } else {
        res.status(404).send('Bed not found');
    }
});

app.get('/data/room/:roomid', (req, res) => {
    const roomId = req.params.roomid;
    const bedsInRoom = data.filter(b => b.id_room === roomId);
    res.json(bedsInRoom);
});




app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dakoh Kodah',
        errorMessage: 'Page not found'
    })
})




app.listen(port, () => {
    console.log('server is running on port '+ port)
})