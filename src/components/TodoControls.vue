<template>
    <div class="task-item-btn">
        <button class="task-item-btn-checked" @click="toggleTaskCompletion(todo)">
            <SvgChecked />
        </button>
        <button class="task-item-btn-backet" @click="removeTodo(todo)">
            <SvgBacket />
        </button>
        <button v-if="!todo.completed" class="task-item-btn-completed" @click="openModal(todo.id)">
            Completed
        </button>
    </div>
    <ModalWindow v-if="todoStore.isOpenModal" :todo="todo"/>
</template>

<script setup lang="ts">
import SvgChecked from '@/components/SvgChecked.vue'
import SvgBacket from '@/components/SvgBacket.vue'
import ModalWindow from '@/components/ModalWindow.vue';
import { TodoItem, useTodoStore } from '@/store/TodoStore'

const todoStore = useTodoStore()

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

const openModal = (todoId: number) => {
    todoStore.openModal(todoId)
}
</script>

<style lang="scss" scoped>
.task-item-btn {
    margin-left: 14px;
    display: flex;
    gap: 8px;
    align-items: center;

    &-checked {
        padding: 8px;
    }

    &-backet {
        padding: 4px;
    }

    &-checked,
    &-backet {
        border-radius: 6px;
        background-color: transparent;
        transition: all 0.3s;

        &:hover {
            background-color: rgba(158, 120, 207, 0.1);

            svg path {
                fill: #3e1671;
            }
        }
    }

    &-completed {
        padding: 8px;
        margin-left: 20px;
        border: 2px solid #9e78cf;
        border-radius: 10px;
        background-color: transparent;
        color: #9e78cf;
        font-size: 14px;
        transition: all .3s;

        &:hover {
            transform: scale(1.1);
        }
    }
}
</style>
