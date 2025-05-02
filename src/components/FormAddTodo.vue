<template>
    <div class="todo-add-conteiner">
        <form @submit.prevent="addTodo" class="todo-add" novalidate>
            <input
                v-model="newTodo"
                required
                type="text"
                placeholder="Add a new task"
                class="todo-add-input"
            />
            <button class="todo-add-plus-btn">
                <SvgPlus />
            </button>
        </form>
        <p v-if="errorValidate" class="value-todo-add"> {{ errorValidate }}</p>
    </div>
</template>

<script setup lang="ts">
import SvgPlus from '@/components/SvgPlus.vue'
import { useAddTodo } from '@/composible/useAddTodo.ts'

const { errorValidate, addTodo, newTodo } = useAddTodo()
</script>

<style lang="scss" scoped>
.todo-add {
    display: flex;
    gap: 12px;

    &-input {
        padding: 12px 16px 10px;
        background-color: transparent;
        border: 2px solid #3e1671;
        border-radius: 10px;
        color: #fff;
        font-size: 16px;
        font-family: Inter, sans-serif;
        max-width: 380px;
        width: 100%;
        transition: all 0.3s;

        &::placeholder {
            color: #777;
        }

        &:focus {
            box-shadow: 4px 4px 10px 0px #f8f8f8;
        }
    }

    &-plus-btn {
        padding: 12px;
        background-color: #9e78cf;
        border-radius: 10px;
        transition: all 0.3s;

        &:hover {
            transform: scale(1.1);
        }
    }
}

.value-todo-add {
    margin-top: 16px;
    text-align: center;
    font-size: 14px;
    color: red;
}
</style>
