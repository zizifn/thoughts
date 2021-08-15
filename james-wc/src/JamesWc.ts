import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('james-wc')
export class JamesWc extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--james-wc-text-color, #000);
    }
  `;

  @property({ type: String }) title = 'Hey there';

  @property({ type: Number }) counter = 5;

  @property({ type: Number }) counter2 = 5;

  __increment() {
    this.counter += 1;
  }

  render() {
    return html`
      <h2>${this.title} james ${this.counter} count2 ${this.counter2}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
  }
}
