import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface TodoItem {
    userId: number
    id: number
    title: string
    completed: boolean
}

export const useTodoStore = defineStore('todo', () => {

    const todos = ref<TodoItem[]>([])
    const error = ref<string | null>(null)
    const fetchTodosLoading = ref<boolean>(false)
    const fetchTodosLoaded = ref<boolean>(false)

    const fetchTodos = async () => {
        if (fetchTodosLoaded.value) {
            return
        }
        error.value = null
        fetchTodosLoading.value = true
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos')
            const data: TodoItem[] = await response.json()
            todos.value = data.slice(0, 6)
            fetchTodosLoaded.value = true
        } catch (e: unknown) {
            error.value = `Tasks loading error: ${e}`
        } finally {
            fetchTodosLoading.value = false
        }
    }

    function removeTodo(todo: TodoItem) {
        todos.value = todos.value.filter((t) => t !== todo)
    }

    const tasksToDo = computed<TodoItem[]>(() => {
        return todos.value.filter((todo) => !todo.completed)
    })

    const tasksDone = computed<TodoItem[]>(() => {
        return todos.value.filter((todo) => todo.completed)
    })

    function toggleTaskCompletion(todo: TodoItem) {
        todo.completed = !todo.completed
    }

    const countTodos = computed<number>(() => tasksToDo.value.length)
    const countDoneTodos = computed<number>(() => tasksDone.value.length)

    const isOpenModal = ref<boolean>(false)
    const originalTodoId = ref<number | null>(null)
    const modifiedTodoText = ref<string>('')

    const openModal = (todoId: number) => {
        isOpenModal.value = true
        originalTodoId.value = todoId
        const todo = todos.value.find(todo => todo.id === todoId)
        if (todo) {
            modifiedTodoText.value = todo.title
        }
    }
    const closeModal = () => {
        isOpenModal.value = false
        originalTodoId.value = null
        modifiedTodoText.value = ''
    }
    const saveNewTodoText = () => {
        const todo = todos.value.find(todo => todo.id === originalTodoId.value)
        if(todo) {
            todo.title = modifiedTodoText.value
        }
        closeModal()
    }

    return {
        todos,
        removeTodo,
        tasksToDo,
        tasksDone,
        toggleTaskCompletion,
        countTodos,
        countDoneTodos,
        fetchTodos,
        error,
        fetchTodosLoading,
        openModal,
        closeModal,
        isOpenModal,
        modifiedTodoText,
        saveNewTodoText
    }
})
