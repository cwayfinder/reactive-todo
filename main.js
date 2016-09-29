import TodoList from './TodoList';

const todos = {
  1: { done: true, text: 'Решить все задания 4 модуля' },
  2: { done: false, text: 'Заплатить за 5 модуль' },
  3: { done: false, text: 'Победить лень' },
  4: { done: false, text: 'Захватить мир' }
};

const todoList = new TodoList({
  todos,
  node: document.querySelector('#todos'),
  onTodoStateChanged: function (id) {
    this.todos = {
      ...this.todos,
      [id]: { ...this.todos[id], done: !this.todos[id].done }
    };
  },
  onTodoRemoved: function (id) {
    const newTodos = { ...this.todos };
    delete newTodos[id];
    this.todos = newTodos;
  },
  onTodoAdd: function (text) {
    this.todos = {
      ...this.todos,
      [Math.random().toString(16).substr(2)]: { done: false, text }
    };
  }
});
