class CounterControls extends HTMLElement {
  constructor() {
    super();
    
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        .controls {
          display: flex;
          width: 180px; 
          border-radius: var(--internal-border-radius, 12px);
          overflow: hidden; 
          box-shadow: var(--internal-shadow, 0 4px 12px rgba(0, 0, 0, 0.06));
          border-top: var(--internal-border-top, var(--internal-border, 1px solid #e1e8ed));
          border-bottom: var(--internal-border-bottom, var(--internal-border, 1px solid #e1e8ed));
          border-left: var(--internal-border-left, var(--internal-border, 1px solid #e1e8ed));
          border-right: var(--internal-border-right, var(--internal-border, 1px solid #e1e8ed));
        }
        button {
          flex: 1; 
          background-color: #ffffff;
          border: none; 
          font-size: 1.8rem;
          font-weight: bold;
          cursor: pointer;
          height: 50px;
          transition: all 0.2s ease-out;
        }
        button:not(:last-child) {
          border-right: 1px solid #e1e8ed;
        }
        #minus {
          color: #e0245e;
        }
        #minus:hover {
          background-color: #fdeef2;
        }
        #plus {
          color: #1b95e0;
        }
        #plus:hover {
          background-color: #e8f5fe;
        }
      </style>

      <div class="controls">
        <button id="minus">-</button>
        <button id="plus">+</button>
      </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot.getElementById('plus').addEventListener('click', () => this.emitChange(1));
    this.shadowRoot.getElementById('minus').addEventListener('click', () => this.emitChange(-1));
  }

  emitChange(delta) {
    this.dispatchEvent(new CustomEvent('count-change', {
      detail: { delta },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('counter-controls', CounterControls);