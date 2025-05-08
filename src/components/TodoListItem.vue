<template>
    <li class="task-item">
        <span class="task-item-text">{{ todo.title }}</span>
        <SvgCheckedBacket
            :todo="todo"
            @toggleTaskCompletion="toggleTaskCompletion"
            @removeTodo="removeTodo"
        />
    </li>
</template>

<script setup lang="ts">
import SvgCheckedBacket from '@/components/SvgCheckedBacket.vue'
import { TodoItem } from '@/store/TodoStore'

interface Props {
    todo: TodoItem
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
.task-item {
    width: 100%;
    padding: 28px 20px;
    border-radius: 10px;
    background-color: #15101c;
    color: #9e78cf;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-text {
        word-break: break-all;
    }
}
</style>
