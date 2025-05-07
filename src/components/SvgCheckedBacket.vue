<template>
    <div class="task-item-btn">
        <button @click="toggleTaskCompletion(todo)" class="task-item-btn-checked">
            <SvgChecked />
        </button>
        <button @click="removeTodo(todo)" class="task-item-btn-backet">
            <SvgBacket />
        </button>
        <button v-if="!todo.completed" @click="openModal(todo.id)" class="task-item-btn-completed">
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

    &-completed {
        padding: 8px;
        background-color: transparent;
        color: #9e78cf;
        font-size: 14px;
        border: 2px solid #9e78cf;
        border-radius: 10px;
        margin-left: 20px;
        transition: all .3s;

        &:hover {
            transform: scale(1.1);
        }
    }
}
</style>
