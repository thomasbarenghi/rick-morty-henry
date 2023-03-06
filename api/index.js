const app = require("./config/app.js");
const port = 3001;

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});