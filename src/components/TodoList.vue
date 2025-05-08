<template>
    <div class="tasks">
        <h4 class="tasks-heading">{{ title }} - {{ count }}</h4>
        <transition-group name="slide-fade" tag="ul" class="tasks-list">
            <TodoListItem
                v-for="todo in tasksList"
                :key="todo.id"
                :todo="todo"
                @toggleTaskCompletion="toggleTaskCompletion"
                @removeTodo="removeTodo"
            />
        </transition-group>
        <transition name="slide-fade">
            <p v-if="todoStore.fetchTodosLoading" class="tasks-loading">Loading...</p>
        </transition>
        <transition name="slide-fade">
            <p v-if="error" class="tasks-error">{{ error }}</p>
        </transition>
        <transition name="slide-fade">
            <p v-if="count === 0 && !error && !todoStore.fetchTodosLoading" class="tasks-message">{{ text }}</p>
        </transition>
    </div>
</template>

<script setup lang="ts">
import TodoListItem from '@/components/TodoListItem.vue'
import { useTodoStore, TodoItem } from '@/store/TodoStore'

const todoStore = useTodoStore()

interface Props {
    title: string
    count: number
    tasksList: TodoItem[]
    text: string
    error: string | null
}

defineProps<Props>()

const emit = defineEmits<{
    (e: 'toggleTaskCompletion', todo: TodoItem): void
    (e: 'removeTodo', todo: TodoItem): void
}>()

const toggleTaskCompletion = (todo: TodoItem) => {
    emit('toggleTaskCompletion', todo)
}
const removeTodo = (todo: TodoItem) => {
    emit('removeTodo', todo)
}
</script>

<style lang="scss" scoped>
.tasks {
    margin: 60px 0;

    &-heading {
        margin-bottom: 16px;
    }

    &-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    &-loading, &-error, &-message {
        display: flex;
        justify-content: center;
        font-size: 14px;
    }
}

.slide-fade-move,
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.9s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translate(200px);
}

.tasks-done {

    .tasks-list {
        
        .task-item {
            margin-bottom: 16px;
            color: #78cfb0;
            text-decoration: line-through;
        }
    }
}
</style>
