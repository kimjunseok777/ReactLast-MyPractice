import { baseHttp } from "./base"



const TodoApi = {

    getTodo() {
        return baseHttp.get("/todo")
    },

    addTodo({title, content}) {
        return baseHttp.post("/todo", {title, content})
    },

    // 수정은 todoId 를 queryString 으로 요청했다
    updateTodo({todoId, title, content, state}) {
        return baseHttp.patch("/todo", {title, content, state}, {
            params: {
                todoId //--> 이러면 자동으로 "/todo?todoId=${todoId}" 이렇게 오는 것이다 (axios 라이브러리라서 가능하다)
            }
        })
    },

    // 삭제는 todoId 를 useParams 로 요청했다
    deleteTodo(todoId) {
        return baseHttp.delete(`/todo/${todoId}`)
    },

}

export default TodoApi