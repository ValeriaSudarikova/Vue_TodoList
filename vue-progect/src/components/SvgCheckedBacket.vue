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

<script setup>
import SvgChecked from '@/components/SvgChecked.vue'
import SvgBacket from '@/components/SvgBacket.vue'

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

        &-checked, &-backet {
            transition: all .3s;
            border-radius: 6px;
            background-color: transparent;

            &:hover {
                background-color: rgba(158, 120, 207, .1);
                
                svg path {
                    fill: #3e1671;
                }
            }
        }
    }
</style>