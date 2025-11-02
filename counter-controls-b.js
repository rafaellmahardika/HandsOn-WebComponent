class CounterControlsB extends HTMLElement {
  constructor() {
    // WAJIB: panggil super() di baris PERTAMA
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        .controls {
          display: flex;
          width: 180px; 
          border-radius: 12px; 
          overflow: hidden; 
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #c8e6c9; 
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
          border-right: 1px solid #c8e6c9;
        }
        #minus { color: #e0245e; }
        #minus:hover { background-color: #fdeef2; }
        
        #plus { color: #4caf50; }
        #plus:hover { background-color: #ebf7ec; }
      </style>
      <div class="controls">
        <button id="minus">-</button>
        <button id="plus">+</button>
      </div>
    `;
  }

  connectedCallback() {
    this.targetId = this.getAttribute('target');
    
    this.shadowRoot.getElementById('plus').addEventListener('click', () => this.updateTarget(1));
    this.shadowRoot.getElementById('minus').addEventListener('click', () => this.updateTarget(-1));
  }

  updateTarget(delta) {
    if (!this.targetId) return;
    
    const target = document.getElementById(this.targetId);
    
    if (target && typeof target.count !== 'undefined') {
      target.count += delta; 
    }
  }
}

customElements.define('counter-controls-b', CounterControlsB);