import TodoApi from "apis/todo.api"
import { createContext, useContext, useState } from "react"


const TodoContext = createContext()


const TodoProvider = ({children}) => {

    const [todos, setTodos] = useState([])

    return <TodoContext.Provider value={[todos, setTodos]}>
        {children}
    </TodoContext.Provider>
}

export default TodoProvider


// 커스텀훅 만들기
//-->  useTodo 라는 커스텀훅의 관심사분리를 시켜준 것이다
export const useTodo = () => {
    const [todos, setTodos] = useContext(TodoContext)

    const getTodo = async() => {
        const response = await TodoApi.getTodo()
        setTodos(response.data)
    }

    const addTodo = async({title, content}) => {
        await TodoApi.addTodo({title, content})
    }

    const deleteTodo = async({todoId}) => {
        await TodoApi.deleteTodo(todoId)
    }

    const updateTodo = async(args) => {
        await TodoApi.updateTodo(args)
    }

    return {
        todos,
        setTodos,

        getTodo,
        addTodo,
        deleteTodo,
        updateTodo
    }
}



