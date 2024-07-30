import express from "express"
import cookieParser from "cookie-parser"
import db from './models/index.js'
import User from "./routes/user.js"
import dotenv from "dotenv"
import Todo from "./routes/todo.js"
import cors from 'cors' //-->  import 받아줬다


dotenv.config()
const app = express()
db.sequelize.sync().then(() => {
    console.log('연결 성공')
})

//----------------------------------------------------------------------------------------------
// CORS 설정 :

app.use(cors({
    origin: true, //-->  안에 있는 모든 걸 전부 다 허용하겠다는 것  -->  보안이 굉장히 떨어진다
    //-->  원래는 우리들이 필요한 url 만 넣으면 된다 (사이트 배포한 url 을 넣으면 된다  -->  허용할 웹사이트의 주소만 연결하면 된다)

    credentials: true, //-->  쿠키 허용하는 것  -->  나중에 refresh token 할 때 필요하기에 허용해놓은 것
}))

//----------------------------------------------------------------------------------------------

app.use(express.json())
app.use(cookieParser())

app.use("/user", User)
app.use("/todo", Todo)


app.listen(3040, () => {
    console.log("start server port : 3040")
})