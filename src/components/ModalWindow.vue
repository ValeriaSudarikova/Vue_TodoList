<template>
    <div v-if="isOpenModal" class="modal-overlay">
        <div class="modal">
            <button class="modal-close" @click="todoStore.closeModal"></button>
            <input v-model="modifiedTodoText" type="text" class="modal-input">
            <button class="modal-completed" @click="todoStore.saveNewTodoText">
                Completed
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/store/TodoStore';
import { storeToRefs } from 'pinia'

const todoStore = useTodoStore()
const { isOpenModal, modifiedTodoText } = storeToRefs(todoStore)

</script>

<style lang="scss">
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(29, 24, 37, .25);
        display: flex;
        justify-content: center;
        align-items: center;

        .modal {
            position: relative;
            max-width: 432px;
            width: 100%;
            padding: 50px 20px;
            border-radius: 10px;
            background-color: rgb(49 32 63);
            display: flex;
            justify-content: space-between;
            align-items: center;

            &-close {
                position: absolute;
                top: 8px;
                right: 14px;
                width: 30px;
                height: 30px;
                background: transparent;

                &::before, &::after {
                    content: '';
                    position: absolute;
                    right: 4px;
                    width: 20px;
                    height: 2px;
                    background-color: #fff;
                    display: block;
                }
    
                &::before {
                    transform: rotate(46deg);
                }
    
                &::after {
                    transform: rotate(-46deg);
                }
            }

            &-input {
                padding: 28px 20px;
                border-radius: 10px;
                border: 2px solid #3e1671;
                background-color: #15101cb5;
                color: #fff;
                font-family: Inter, sans-serif;
                font-size: 16px;
                transition: all .3s;

                &:focus {
                    box-shadow: 4px 4px 10px 0px #f8f8f8;
                }
            }

            &-completed {
                padding: 16px;
                margin-left: 20px;
                border: 2px solid #9e78cf;
                border-radius: 10px;
                background-color: transparent;
                color: #9e78cf;
                font-size: 16px;
                transition: all .3s;

                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }
</style>