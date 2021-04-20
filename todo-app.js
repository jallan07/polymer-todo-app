import { LitElement } from 'https://unpkg.com/lit-element?module';
import { html } from 'https://unpkg.com/lit-element?module';
import "./todos-list.js";

const author = "Josh Allan"
const homepage = "https://joshallan.dev"
const footerTemplate = html`
    <footer>Made with love by <a href="${homepage}" target="_blank">${author}<a/></footer>
`

class TodoApp extends LitElement {
    // Let LitElement observe data changes for us and, trigger updates when necessary
    // We can do this by defining todos as a property of our element.
    static get properties() {
        return {
            todos: { type: Array }
        };
    }

    constructor() {
        super()
        this.todos = [
            { text: "Task 1", finished: true },
            { text: "Task 2", finished: true },
            { text: "Task 3", finished: false }
        ]

    }

    render() {

        // used for displaying totals
        const finishedCount = this.todos.filter(e => e.finished).length;
        const unfinishedCount = this.todos.length - finishedCount;

        return html`
            <h1>Todo App</h1>

            <input id="addTodoInput" placeholder="Name" />
            <button @click="${this._addTodo}">Add</button>

            <todo-list 
                .todos=${this.todos}
                @change-todo-finished="${this._changeTodoFinished}"
                @remove-todo="${this._removeTodo}"
            ></todo-list>
            
            <div>Total finished: ${finishedCount}</div>
            <div>Total unfinished: ${unfinishedCount}</div>

            <br />
            ${footerTemplate}
            `
    }

    // ===============
    // event listeners
    // ===============
    _addTodo() {
        const input = this.shadowRoot.getElementById('addTodoInput');
        const text = input.value;
        input.value = '';

        this.todos = [
            ...this.todos,
            { text, finished: false }
        ];
    }
    _removeTodo(e) {
        this.todos = this.todos.filter(todo => todo !== e.detail)
    }
    _changeTodoFinished(e) {
        const { changedTodo, finished } = e.detail

        this.todos = this.todos.map((todo) => {
            if (todo !== changedTodo) {
                return todo
            }
            return { ...changedTodo, finished }
        })
    }
}


customElements.define('todo-app', TodoApp);


