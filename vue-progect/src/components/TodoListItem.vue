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

<script setup>
import SvgCheckedBacket from '@/components/SvgCheckedBacket.vue'

defineProps({
    todo: {
        type: Object,
        required: true,
    }
})

const emit = defineEmits(['toggleTaskCompletion', 'removeTodo'])

const toggleTaskCompletion = (todo) => {
    emit('toggleTaskCompletion', todo)
}
const removeTodo = (todo) => {
    emit('removeTodo', todo)
}
</script>

<style lang="scss" scoped>
    .task-item {
        padding: 28px 20px;
        background-color: #15101C;
        border-radius: 10px;
        color: #9e78cf;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &-text {
            word-break: break-all;
        }
    }
</style>