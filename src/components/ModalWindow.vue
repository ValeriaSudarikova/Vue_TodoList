<template>
    <div class="modal-overlay" v-if="isOpenModal">
        <div class="modal">
            <button class="modal-close" @click="todoStore.closeModal"></button>
            <input type="text" class="modal-input" v-model="modifiedTodoText">
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
        background-color: rgba(29, 24, 37, .25);
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        .modal {
            background-color: rgb(49 32 63);
            padding: 50px 20px;
            border-radius: 10px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 432px;
            position: relative;

            &-close {
                width: 30px;
                height: 30px;
                position: absolute;
                top: 8px;
                right: 14px;
                background: transparent;

                &::before, &::after {
                    content: '';
                    width: 20px;
                    height: 2px;
                    display: block;
                    background-color: #fff;
                    position: absolute;
                    right: 4px;
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
                background-color: #15101cb5;
                border-radius: 10px;
                font-family: Inter, sans-serif;
                color: #fff;
                border: 2px solid #3e1671;
                font-size: 16px;
                transition: all .3s;

                &:focus {
                    box-shadow: 4px 4px 10px 0px #f8f8f8;
                }
            }

            &-completed {
                padding: 16px;
                background-color: transparent;
                color: #9e78cf;
                font-size: 16px;
                border: 2px solid #9e78cf;
                border-radius: 10px;
                margin-left: 20px;
                transition: all .3s;

                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }
</style>