import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import servisiRoutes from './routes/servisi.js'
import photoRoutes from './routes/photos.js'

const app = express();



app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/posts', postRoutes);
app.use('/servisi', servisiRoutes)
app.use('/photos', photoRoutes)
const CONNECTION_URL = 'mongodb+srv://alem_hodzic:alem_hodzic123@cluster0.txwd6.mongodb.net/<dbname>'
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
.catch((err) => console.log(err.message));



