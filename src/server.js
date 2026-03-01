import app from "./app.js";
import { conectarBD } from "./config/db.js";

conectarBD();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

