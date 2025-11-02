class CounterDisplayB extends HTMLElement {
  // 1. Tambahkan observedAttributes
  static get observedAttributes() {
    return ['value'];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    // 'title' akan ditangani oleh slot
    this.value = parseInt(this.getAttribute('value')) || 0;

    this.shadowRoot.innerHTML = `
      <style>
        .display {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: #ffffff;
          border: 1px solid #c8e6c9; 
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          width: 140px;
          text-align: left;
        }
        .title {
          font-size: 0.9rem;
          margin-bottom: 8px;
          color: #388e3c;
          /* Style tambahan agar slot berfungsi baik */
          display: block;
          min-height: 1.1em;
        }
        .value {
          font-size: 1.1rem;
          color: #1b5e20;
          font-weight: 500;
        }
        .number {
          font-weight: bold;
          font-style: normal;
          font-size: 2.5rem;
          color: #4caf50; 
          margin-left: 4px;
        }
      </style>
      <div class="display">
        <div class="title"><slot name="title"></slot></div>
        <div class="value">Value: <span class="number">${this.value}</span></div>
      </div>
    `;
  }
  
  // 3. Tambahkan attributeChangedCallback
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
      const numericValue = parseInt(newValue) || 0;
      if (this.value !== numericValue) {
        this.count = numericValue;
      }
    }
  }

  // 4. Modifikasi 'set count'
  set count(val) {
    this.value = val;
    this.shadowRoot.querySelector('.number').textContent = val;

    // Sinkronisasi: Ubah properti .count juga akan mengubah atribut 'value'
    if (parseInt(this.getAttribute('value')) !== val) {
      this.setAttribute('value', val);
    }
  }

  get count() {
    return this.value;
  }
}

customElements.define('counter-display-b', CounterDisplayB);