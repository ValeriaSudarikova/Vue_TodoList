<template>
    <div class="task-item-btn">
        <button @click="toggleTaskCompletion(todo)" class="task-item-btn-checked">
            <SvgChecked />
        </button>
        <button @click="removeTodo(todo)" class="task-item-btn-backet">
            <SvgBacket />
        </button>
    </div>
</template>

<script setup lang="ts">
import SvgChecked from '@/components/SvgChecked.vue'
import SvgBacket from '@/components/SvgBacket.vue'
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
.task-item-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 14px;

    &-checked {
        padding: 8px;
    }

    &-backet {
        padding: 4px;
    }

    &-checked,
    &-backet {
        transition: all 0.3s;
        border-radius: 6px;
        background-color: transparent;

        &:hover {
            background-color: rgba(158, 120, 207, 0.1);

            svg path {
                fill: #3e1671;
            }
        }
    }
}
</style>
