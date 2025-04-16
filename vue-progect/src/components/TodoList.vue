<template>
    <div class="tasks">
        <h4 class="tasks-heading">{{ title }} - {{ count }}</h4>
        <transition-group name="tasks-list" tag="ul" class="tasks-list">
            <TodoListItem 
            v-for="todo in tasksList" :key="todo.id"
            :todo="todo"
            @toggleTaskCompletion="toggleTaskCompletion"
            @removeTodo="removeTodo"/>
        </transition-group>
        <transition name="tasks-list">
            <p v-if="count === 0" class="tasks-message">{{ text }}</p>
        </transition>
    </div>
</template>

<script setup>
import TodoListItem from '@/components/TodoListItem.vue'

defineProps ({
    title: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    tasksList: {
        type: Array,
        required: true,
    },
    text: {
        type: String,
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

        &-message {
            display: flex;
            justify-content: center;
            font-size: 14px;
        }
    }

    .tasks-list-move, .tasks-list-enter-active, .tasks-list-leave-active {
        transition: all .9s;
    }

    .tasks-list-enter-from, .tasks-list-leave-to {
        opacity: 0;
        transform: translate(200px);
    }

    .tasks-done {

        .tasks-list {

            .task-item {
                color: #78cfb0;
                margin-bottom: 16px;
                text-decoration: line-through;
            }
        }
    }
</style>