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
            :error="error"
            :count="countTodos"
            :tasksList="tasksToDo"
            @toggleTaskCompletion="TodoStore.toggleTaskCompletion"
            @removeTodo="TodoStore.removeTodo"
        />
        <TodoList 
            title="Done"
            text="There are no completed tasks"
            class="tasks-done"
            :error="error"
            :count="countDoneTodos"
            :tasksList="tasksDone"
            @toggleTaskCompletion="TodoStore.toggleTaskCompletion"
            @removeTodo="TodoStore.removeTodo"
        />
    </section>
</template>

<script setup lang="ts">
import FormAddTodo from '@/components/FormAddTodo.vue'
import TodoList from '@/components/TodoList.vue'
import { useTodoStore } from '@/store/TodoStore'
import { storeToRefs } from 'pinia'
import { useAddTodo } from '@/composible/useAddTodo.js'
import { onMounted } from 'vue'

const TodoStore = useTodoStore()

const {
    newTodo,
    countTodos, countDoneTodos,
    tasksToDo, tasksDone, error
} = storeToRefs(TodoStore)

const { addTodo } = useAddTodo()

onMounted(() => {
    TodoStore.fetchTodos()
})
</script>

<style lang="scss" scoped>
.todo {
    max-width: 432px;
    padding: 50px 0;
}
</style>