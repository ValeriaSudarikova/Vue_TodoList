import { useTodoStore } from '@/store/TodoStore'
import { ref } from 'vue'

export const useAddTodo = () => {
    const todoStore = useTodoStore()
    const errorValidate = ref<string | null>(null)

    const validateNewTodo = (value: string): boolean => {
        if (!value || value.trim() === '') {
            errorValidate.value = "Task cannot be empty."
            return false
        }
        if (value.trim().length < 5) {
            errorValidate.value = "Tasks cannot be less than 5 characters"
            return false
        }
        else {
            errorValidate.value = null
            return true
        }
    }

    let id: number = 0
    const newTodo = ref<string>('')

    const addTodo = () => {
        if(validateNewTodo(newTodo.value)) {
            todoStore.todos.push({ userId: 1, id: id++, title: newTodo.value, completed: false })
        }
        newTodo.value = ''
    }

    return { errorValidate, addTodo, newTodo }
}

