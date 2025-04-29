import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface TodoItem {
    userId: number
    id: number
    title: string
    completed: boolean
}

export const useTodoStore = defineStore('todo', () => {

    let id: number = 0

    const todos = ref<TodoItem[]>([])
    const error = ref<string | null>(null)

    const fetchTodos = async () => {
        error.value = null
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos')
            const data: TodoItem[] = await response.json()
            todos.value = data.slice(0, 6)
        } catch(e: any) {
            error.value = 'Tasks loading error'
        }
    }

    const newTodo = ref<string>('')

    function addTodo() {
        if (newTodo.value.trim() !== '') {
            todos.value.push({ "userId": 1, "id": id++, "title": newTodo.value, "completed": false })
        }
        newTodo.value = ''
    }

    function removeTodo(todo: TodoItem) {
        todos.value = todos.value.filter((t) => t !== todo)
    }

    const tasksToDo = computed<TodoItem[]>(() => {
        return todos.value.filter(todo => !todo.completed)
    })

    const tasksDone = computed<TodoItem[]>(() => {
        return todos.value.filter(todo => todo.completed)
    })

    function toggleTaskCompletion(todo: TodoItem) {
        todo.completed = !todo.completed
    }

    const countTodos = computed<number>(() => tasksToDo.value.length)
    const countDoneTodos = computed<number>(() => tasksDone.value.length)

    return { 
        id, 
        todos, 
        newTodo, 
        addTodo, 
        removeTodo, 
        tasksToDo, 
        tasksDone, 
        toggleTaskCompletion, 
        countTodos, 
        countDoneTodos,
        fetchTodos,
        error
    }
})