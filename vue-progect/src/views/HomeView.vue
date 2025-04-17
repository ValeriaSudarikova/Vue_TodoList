<template>
    <section class="todo">
        <FormAddTodo 
            v-model="newTodo"
            @addTodo="addTodo"
        />
        <TodoList
            title="Tasks to do"
            text="There are no tasks"
            class="tasks"
            :count="countTodos"
            :tasksList="tasksToDo"
            @toggleTaskCompletion="toggleTaskCompletion"
            @removeTodo="removeTodo"
        />
        <TodoList 
            title="Done"
            text="There are no completed tasks"
            class="tasks-done"
            :count="countDoneTodos"
            :tasksList="tasksDone"
            @toggleTaskCompletion="toggleTaskCompletion"
            @removeTodo="removeTodo"
        />
    </section>
</template>

<script setup>
import FormAddTodo from '@/components/FormAddTodo.vue'
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

function toggleTaskCompletion(todo) {
    todo.completed = !todo.completed
}

const countTodos = computed(() => tasksToDo.value.length)
const countDoneTodos = computed(() => tasksDone.value.length)
</script>

<style lang="scss" scoped>
.todo {
    max-width: 432px;
    padding: 50px 0;
}
</style>