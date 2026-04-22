require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;


app.get('/', async (req, res) => {
    const pets = 'https://api.hubapi.com/crm/v3/objects/2-201684177?properties=name,species,favorite_toy';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };
    try {
        const resp = await axios.get(pets, { headers });
        const data = resp.data.results;
        res.render('homepage', { title: 'Pets | HubSpot APIs', data });
    } catch (error) {
        console.error(error);
    }
});


app.get('/update-cobj', (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});


app.post('/update-cobj', async (req, res) => {
    const newPet = {
        properties: {
            name: req.body.name,
            species: req.body.species,
            favorite_toy: req.body.favorite_toy
        }
    };
    const createPet = 'https://api.hubapi.com/crm/v3/objects/2-201684177';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };
    try {
        await axios.post(createPet, newPet, { headers });
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));