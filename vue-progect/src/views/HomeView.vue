<script setup>
import { ref, computed } from 'vue'

let id = 0
const todos = ref([
{
    "userId": 1,
    "id": id++,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": id++,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": id++,
    "title": "fugiat veniam minus",
    "completed": false
  },
  {
    "userId": 1,
    "id": id++,
    "title": "et porro tempora",
    "completed": false
  },
  {
    "userId": 1,
    "id": id++,
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "completed": false
  },
  {
    "userId": 1,
    "id": id++,
    "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    "completed": false
  }
])

const newTodo = ref('')

function addTodo() {
    if (newTodo.value.trim() !== '') {
        todos.value.push({"userId": 1, "id": id++, "title": newTodo.value, "completed": false})
    }
    newTodo.value = ''
}

function removeTodo(todo) {
    todos.value = todos.value.filter((t) => t !== todo)
}

const TasksToDo = computed(() => {
    return todos.value.filter(todo => !todo.completed)
})

const TasksDone = computed(() => {
    return todos.value.filter(todo => todo.completed)
})

function taskCompleted(todo) {
    const index = todos.value.findIndex(t => t.id === todo.id)
    todos.value[index].completed = !todos.value[index].completed
}

const countTodos = computed(() => TasksToDo.value.length)
const countDoneTodos = computed(() => TasksDone.value.length)
</script>

<template>
    <div class="wrapper">
        <form @submit.prevent="addTodo" class="add-todo">
            <input v-model="newTodo" required type="text" placeholder="Add a new task">
            <button>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.25 9C17.25 9.18234 17.1776 9.35721 17.0486 9.48614C16.9197 9.61507 16.7448 9.6875 16.5625 9.6875H9.6875V16.5625C9.6875 16.7448 9.61507 16.9197 9.48614 17.0486C9.35721 17.1776 9.18234 17.25 9 17.25C8.81766 17.25 8.6428 17.1776 8.51386 17.0486C8.38493 16.9197 8.3125 16.7448 8.3125 16.5625V9.6875H1.4375C1.25516 9.6875 1.0803 9.61507 0.951364 9.48614C0.822433 9.35721 0.75 9.18234 0.75 9C0.75 8.81766 0.822433 8.6428 0.951364 8.51386C1.0803 8.38493 1.25516 8.3125 1.4375 8.3125H8.3125V1.4375C8.3125 1.25516 8.38493 1.0803 8.51386 0.951364C8.6428 0.822433 8.81766 0.75 9 0.75C9.18234 0.75 9.35721 0.822433 9.48614 0.951364C9.61507 1.0803 9.6875 1.25516 9.6875 1.4375V8.3125H16.5625C16.7448 8.3125 16.9197 8.38493 17.0486 8.51386C17.1776 8.6428 17.25 8.81766 17.25 9Z" fill="white"/>
                </svg>
            </button>
        </form>
        <div class="tasks">
            <h4 class="tasks-heading">Tasks to do - {{ countTodos }}</h4>
            <ul class="tasks-list">
                <transition-group name="task-list-transition" tag="ul">
                    <li v-for="todo in TasksToDo" :key="todo.id" class="task-item">
                        <span>{{ todo.title }}</span>
                        <div class="task-item-btn">
                            <button @click="taskCompleted(todo)" class="task-item-checked">
                                <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.7851 1.67391L6.7851 12.6739C6.72125 12.7378 6.64542 12.7885 6.56196 12.8231C6.4785 12.8577 6.38904 12.8755 6.29869 12.8755C6.20834 12.8755 6.11888 12.8577 6.03542 12.8231C5.95196 12.7885 5.87614 12.7378 5.81229 12.6739L0.999785 7.86141C0.870782 7.7324 0.798309 7.55744 0.798309 7.375C0.798309 7.19256 0.870782 7.0176 0.999785 6.88859C1.12879 6.75959 1.30375 6.68712 1.48619 6.68712C1.66863 6.68712 1.84359 6.75959 1.9726 6.88859L6.29869 11.2155L16.8123 0.701094C16.9413 0.572091 17.1163 0.499619 17.2987 0.499619C17.4811 0.499619 17.6561 0.572091 17.7851 0.701094C17.9141 0.830097 17.9866 1.00506 17.9866 1.1875C17.9866 1.36994 17.9141 1.5449 17.7851 1.67391Z" fill="#9E78CF"/>
                                </svg>
                            </button>
                            <button @click="removeTodo(todo)" class="task-item-backet">
                                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.6112 3.125H1.48621C1.30387 3.125 1.129 3.19743 1.00007 3.32636C0.871139 3.4553 0.798706 3.63016 0.798706 3.8125C0.798706 3.99484 0.871139 4.1697 1.00007 4.29864C1.129 4.42757 1.30387 4.5 1.48621 4.5H2.17371V16.875C2.17371 17.2397 2.31857 17.5894 2.57643 17.8473C2.8343 18.1051 3.18403 18.25 3.54871 18.25H14.5487C14.9134 18.25 15.2631 18.1051 15.521 17.8473C15.7788 17.5894 15.9237 17.2397 15.9237 16.875V4.5H16.6112C16.7935 4.5 16.9684 4.42757 17.0973 4.29864C17.2263 4.1697 17.2987 3.99484 17.2987 3.8125C17.2987 3.63016 17.2263 3.4553 17.0973 3.32636C16.9684 3.19743 16.7935 3.125 16.6112 3.125ZM14.5487 16.875H3.54871V4.5H14.5487V16.875ZM4.92371 1.0625C4.92371 0.880164 4.99614 0.705295 5.12507 0.576364C5.254 0.447433 5.42887 0.375 5.61121 0.375H12.4862C12.6685 0.375 12.8434 0.447433 12.9723 0.576364C13.1013 0.705295 13.1737 0.880164 13.1737 1.0625C13.1737 1.24484 13.1013 1.4197 12.9723 1.54864C12.8434 1.67757 12.6685 1.75 12.4862 1.75H5.61121C5.42887 1.75 5.254 1.67757 5.12507 1.54864C4.99614 1.4197 4.92371 1.24484 4.92371 1.0625Z" fill="#9E78CF"/>
                                </svg>
                            </button>
                        </div>
                    </li>
                </transition-group>
            </ul>
            <transition-group name="no-tasks" tag="p">
                <p v-if="countTodos === 0">There are no tasks</p>
            </transition-group>
        </div>
        <div class="tasks-done">
            <h4 class="task-done-heading">Done - {{ countDoneTodos }}</h4>
            <ul class="tasks-done-list">
                <transition-group name="task-done-list-transition" tag="ul">
                    <li v-for="todo in TasksDone" :key="todo.id" class="task-done-item">
                        <span>{{ todo.title }}</span>
                        <div class="task-item-btn">
                            <button @click="taskCompleted(todo)" class="task-item-checked">
                                <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.7851 1.67391L6.7851 12.6739C6.72125 12.7378 6.64542 12.7885 6.56196 12.8231C6.4785 12.8577 6.38904 12.8755 6.29869 12.8755C6.20834 12.8755 6.11888 12.8577 6.03542 12.8231C5.95196 12.7885 5.87614 12.7378 5.81229 12.6739L0.999785 7.86141C0.870782 7.7324 0.798309 7.55744 0.798309 7.375C0.798309 7.19256 0.870782 7.0176 0.999785 6.88859C1.12879 6.75959 1.30375 6.68712 1.48619 6.68712C1.66863 6.68712 1.84359 6.75959 1.9726 6.88859L6.29869 11.2155L16.8123 0.701094C16.9413 0.572091 17.1163 0.499619 17.2987 0.499619C17.4811 0.499619 17.6561 0.572091 17.7851 0.701094C17.9141 0.830097 17.9866 1.00506 17.9866 1.1875C17.9866 1.36994 17.9141 1.5449 17.7851 1.67391Z" fill="#9E78CF"/>
                                </svg>
                            </button>
                            <button @click="removeTodo(todo)" class="task-item-backet">
                                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.6112 3.125H1.48621C1.30387 3.125 1.129 3.19743 1.00007 3.32636C0.871139 3.4553 0.798706 3.63016 0.798706 3.8125C0.798706 3.99484 0.871139 4.1697 1.00007 4.29864C1.129 4.42757 1.30387 4.5 1.48621 4.5H2.17371V16.875C2.17371 17.2397 2.31857 17.5894 2.57643 17.8473C2.8343 18.1051 3.18403 18.25 3.54871 18.25H14.5487C14.9134 18.25 15.2631 18.1051 15.521 17.8473C15.7788 17.5894 15.9237 17.2397 15.9237 16.875V4.5H16.6112C16.7935 4.5 16.9684 4.42757 17.0973 4.29864C17.2263 4.1697 17.2987 3.99484 17.2987 3.8125C17.2987 3.63016 17.2263 3.4553 17.0973 3.32636C16.9684 3.19743 16.7935 3.125 16.6112 3.125ZM14.5487 16.875H3.54871V4.5H14.5487V16.875ZM4.92371 1.0625C4.92371 0.880164 4.99614 0.705295 5.12507 0.576364C5.254 0.447433 5.42887 0.375 5.61121 0.375H12.4862C12.6685 0.375 12.8434 0.447433 12.9723 0.576364C13.1013 0.705295 13.1737 0.880164 13.1737 1.0625C13.1737 1.24484 13.1013 1.4197 12.9723 1.54864C12.8434 1.67757 12.6685 1.75 12.4862 1.75H5.61121C5.42887 1.75 5.254 1.67757 5.12507 1.54864C4.99614 1.4197 4.92371 1.24484 4.92371 1.0625Z" fill="#9E78CF"/>
                                </svg>
                            </button>
                        </div>
                    </li>
                </transition-group>
            </ul>
            <transition-group name="no-done-task" tag="p">
                <p v-if="countDoneTodos === 0">There are no completed tasks</p>
            </transition-group>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    max-width: 432px;
    padding: 50px 0;
    .add-todo {
        display: flex;
        gap: 11px;
        input {
            padding: 11px 15px 10px;
            background-color: transparent;
            border: 1px solid #3e1671;
            border-radius: 10px;
            color: #fff;
            font-size: 16px;
            font-family: Inter, sans-serif;
            max-width: 381px;
            width: 100%;
            transition: all .3s;
            &::placeholder {
                color: #777;
            }
            &:focus {
                box-shadow: 4px 4px 10px 0px #f8f8f8;
            }
        }
        .error {
            background-color: red;
        }
        button {
            padding: 12px;
            background-color: #9E78CF;
            border-radius: 10px;
            transition: all .3s;
            &:hover {
                transform: scale(1.1);
            }
        }
    }
    .tasks {
        margin: 60px 0;
        h4 {
            margin-bottom: 17px;
        }
        ul {
            display: flex;
            flex-direction: column;
            gap: 16px;
            li {
                padding: 27.5px 21px 28.5px;
                background-color: #15101C;
                border-radius: 10px;
                color: #9e78cf;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span {
                    word-break: break-all;
                }
            }
        }
        p {
            display: flex;
            justify-content: center;
            font-size: 14px;
        }
    }
    .tasks-done {
        h4 {
            margin-bottom: 16px;
        }
        ul {
            
            li {
                padding: 27.5px 21px 28.5px;
                background-color: #15101C;
                border-radius: 10px;
                color: #78cfb0;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
                text-decoration: line-through;
                span {
                    word-break: break-all;
                }
            }
        }
        p {
            display: flex;
            justify-content: center;
            font-size: 14px;
        }
    }
    .task-item-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: 15px;
        .task-item-checked {
            padding: 9px 7px;
        }
        .task-item-backet {
            padding: 4px;
        }
        .task-item-checked, .task-item-backet {
            transition: all .3s;
            border-radius: 5px;
            background-color: transparent;
            &:hover {
                background-color: rgba(158, 120, 207, .1);
                svg path {
                    fill: #3e1671;
                }
            }
        }
    }
}

.task-list-transition-move,
.task-list-transition-enter-active,
.task-list-transition-leave-active,
.task-done-list-transition-move,
.task-done-list-transition-enter-active,
.task-done-list-transition-leave-active,
.no-tasks-move, .no-tasks-enter-active, .no-tasks-leave-active,
.no-done-task-move, .no-done-task-enter-active, .no-done-task-leave-active {
    transition: all .9s;
}

.task-list-transition-enter-from,
.task-list-transition-leave-to,
.task-done-list-transition-enter-from,
.task-done-list-transition-leave-to,
.no-tasks-enter-from, .no-tasks-leave-to, .no-done-task-enter-from, .no-done-task-leave-to {
    opacity: 0;
    transform: translate(200px);
}

</style>