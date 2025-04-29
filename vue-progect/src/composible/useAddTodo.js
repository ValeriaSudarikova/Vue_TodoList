import { useTodoStore } from "@/store/TodoStore.ts"

export const useAddTodo = () => {
    const TodoStore = useTodoStore()
    const addTodo = () => {
        TodoStore.addTodo()
    }

    return { addTodo }
}