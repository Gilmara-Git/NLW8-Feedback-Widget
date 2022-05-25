import express from 'express';
import { routes } from './routes';
import cors  from 'cors';


const app = express();

app.use(cors());
app.use(express.json()); // middleware 
app.use(routes);

app.listen(process.env.PORT || 3333, ()=>{
    console.log('I am a function that indicates the Http server is running')
});
