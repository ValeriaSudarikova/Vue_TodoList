<template>
    <section class="todo">
        <form @submit.prevent="addTodo" class="todo-add">
            <input v-model="newTodo" required type="text" placeholder="Add a new task" class="todo-add-input">
            <SvgPlus />
        </form>
        <TodoList
            title="Tasks to do"
            :count="countTodos"
            text="There are no tasks"
            :tasksList="tasksToDo"
            @removeTodo="removeTodo"
            @taskCompleted="taskCompleted"
        />
        <TodoList 
            class="tasks-done"
            title="Done"
            :count="countDoneTodos"
            text="There are no completed tasks"
            :tasksList="tasksDone"
            @taskCompleted="taskCompleted"
            @removeTodo="removeTodo"
        />
    </section>
</template>

<script setup>
import SvgPlus from '@/components/SvgPlus.vue'
import TodoList from '@/components/TodoList.vue'
import { ref, computed } from 'vue'

let id = 0
const todos = ref([
{
    "userId": 1,
    "id": id++,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": id++,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": id++,
    "title": "fugiat veniam minus",
    "completed": false
  },
  {
    "userId": 1,
    "id": id++,
    "title": "et porro tempora",
    "completed": false
  },
  {
    "userId": 1,
    "id": id++,
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "completed": false
  },
  {
    "userId": 1,
    "id": id++,
    "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    "completed": false
  }
])

const newTodo = ref('')

function addTodo() {
    if (newTodo.value.trim() !== '') {
        todos.value.push({"userId": 1, "id": id++, "title": newTodo.value, "completed": false})
    }
    newTodo.value = ''
}

function removeTodo(todo) {
    todos.value = todos.value.filter((t) => t !== todo)
}

const tasksToDo = computed(() => {
    return todos.value.filter(todo => !todo.completed)
})

const tasksDone = computed(() => {
    return todos.value.filter(todo => todo.completed)
})

function taskCompleted(todo) {
    const index = todos.value.findIndex(t => t.id === todo.id)
    todos.value[index].completed = !todos.value[index].completed
}

const countTodos = computed(() => tasksToDo.value.length)
const countDoneTodos = computed(() => tasksDone.value.length)
</script>

<style lang="scss" scoped>
.todo {
    max-width: 432px;
    padding: 50px 0;

    &-add {
        display: flex;
        gap: 12px;

        &-input {
            padding: 12px 16px 10px;
            background-color: transparent;
            border: 2px solid #3e1671;
            border-radius: 10px;
            color: #fff;
            font-size: 16px;
            font-family: Inter, sans-serif;
            max-width: 380px;
            width: 100%;
            transition: all .3s;

            &::placeholder {
                color: #777;
            }

            &:focus {
                box-shadow: 4px 4px 10px 0px #f8f8f8;
            }
        }
    }
}
</style>