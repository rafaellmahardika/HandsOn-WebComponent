class CombinedCounter extends HTMLElement {
  constructor() {
    super();
    
    this.attachShadow({ mode: 'open' });

    // Ambil atribut seperti biasa
    const title = this.getAttribute('title') || 'Combined Counter';
    const value = parseInt(this.getAttribute('value')) || 30;

    this.shadowRoot.innerHTML = `
      <style>
        .wrapper {
          width: 180px; 
          font-family: sans-serif;
          border-radius: 12px;
          overflow: hidden; 
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        counter-display {
          display: block;
          --internal-border-radius: 0;
          --internal-shadow: none;
          --internal-border: 1px solid #e1e8ed;
        }
        
        counter-controls {
          display: block;
          --internal-border-radius: 0;
          --internal-shadow: none;
          --internal-border: 1px solid #e1e8ed;
          --internal-border-top: none;
        }
      </style>

      <div class="wrapper">
        <counter-display id="display" value="${value}">
          <span slot="title">${title}</span>
        </counter-display>
        
        <counter-controls id="controls"></counter-controls>
      </div>
    `;
  }

  connectedCallback() {
    // Fungsi ini tidak perlu diubah, sudah benar
    const display = this.shadowRoot.getElementById('display');
    const controls = this.shadowRoot.getElementById('controls');
    
    controls.addEventListener('count-change', e => {
      display.count += e.detail.delta;
    });
  }
}

customElements.define('combined-counter', CombinedCounter);