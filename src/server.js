require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/init.model');

//* Autenticacion con la BASE DE DATOS
db.authenticate()
    .then(() => console.log('Database Authenticated!...😊'))
    .catch((err) => console.log(err));

//* Relaciones de tablas de BASE DE DATOS
initModel();

//* Sincronizacion con la BASE DE DATOS
db.sync({ force: false })
    .then(() => console.log('Database synced!...✌️'))
    .catch((err) => console.log(err));

const PORT = +process.env.PORT || 3400;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}⏱`);
});