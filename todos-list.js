import { LitElement, css } from 'https://unpkg.com/lit-element?module';
import { html } from 'https://unpkg.com/lit-element?module';

class TodoList extends LitElement {
  static get properties() {
    return {
      todos: { type: Array },
    };
  }

  static get styles() {
    //:host is a special selector, which selects the host of the shadow root that these styles are associated with. In our case that's our own custom element.
    return css`

    :host {
      color: blue;
    }

    ul {
        list-style: none;
        padding: 0;
      }

    button {
        background-color: purple;
        border: none;
        color: white;
        cursor: pointer;
      }
    `;
  }

  render() {
    if (!this.todos) {
      return html``;
    }

    return html`
      <ol>
        ${this.todos.map(
          todo => html`
            <li>
              <input
                type="checkbox"
                .checked=${todo.finished}
                @change=${e => this._changeTodoFinished(e, todo)}
              />
              ${todo.text}
              <button @click=${() => this._removeTodo(todo)}>X</button>
            </li>
          `,
        )}
      </ol>
    `;
  }

  _changeTodoFinished(e, changedTodo) {
    const eventDetails = { changedTodo, finished: e.target.checked };
    this.dispatchEvent(new CustomEvent("change-todo-finished", { detail: eventDetails }));
  }

  _removeTodo(item) {
    this.dispatchEvent(new CustomEvent("remove-todo", { detail: item }));
  }

}

customElements.define("todo-list", TodoList);

