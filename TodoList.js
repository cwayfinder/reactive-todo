export default class TodoList {
  constructor(config) {
    config.node.classList.add('todo-list-wrapper');
    config.node.innerHTML = `
      <div class="add-todo">
        <input type="text">
        <button>Add</button>
      </div>`;

    this.$addInput = config.node.querySelector('.add-todo input');
    this.$addButton = config.node.querySelector('.add-todo button');

    this.$list = document.createElement('div');
    config.node.appendChild(this.$list);

    this.todos = config.todos;
    this._config = config;

    this.bindEvents();
  }

  bindEvents() {
    this.$addInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        this._config.onTodoAdd.call(this, this.$addInput.value);
        this.$addInput.value = '';
      }
    });

    this.$addButton.addEventListener('click', () => {
      this._config.onTodoAdd.call(this, this.$addInput.value);
      this.$addInput.value = '';
    });

    this.$list.addEventListener('change', event => {
      const id = event.target.parentElement.dataset.itemId;
      this._config.onTodoStateChanged.call(this, id);
    });

    this.$list.addEventListener('click', event => {
      if (event.target.classList.contains('delete-icon')) {
        const id = event.target.parentElement.dataset.itemId;
        this._config.onTodoRemoved.call(this, id);
      }
    });
  }

  render() {
    this.$list.innerHTML = this.buildListHtml(this._todos);
  }

  buildListHtml(todos) {
    const inner = Object.keys(todos)
      .map(key => this.buildItemHtml(key, todos[key]))
      .join('');

    return `<ul id="todo-list">${inner}</ul>`;
  }

  buildItemHtml(id, todo) {
    return `
        <li data-item-id="${id}">
          <input type="checkbox"${todo.done ? ' checked' : ''}>
          <span class="text">${todo.text}</span>
          <span class="delete-icon">X</span>
        </li>`;
  }

  set todos(items) {
    this._todos = items;
    this.render();
  }

  get todos() {
    return this._todos;
  }
}

