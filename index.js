import cors from 'cors'
import Express, {json} from 'express'
import axios from 'axios'
import { router } from './src/rotas.js'
import pool from "./src/database.js";

const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4001
app.listen(port,()=>console.log(`listening on port ${port}`))



async function testarBanco() {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    console.log("Banco conectado!");
    console.log(rows[0]);
  } catch (err) {
    console.error(err);
  }
}

testarBanco();


