class CounterDisplay extends HTMLElement {
  // 1. Tambahkan observedAttributes untuk memantau perubahan atribut 'value'
  static get observedAttributes() {
    return ['value'];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    // 'title' sekarang akan ditangani oleh slot
    // Kita tetap perlu 'value' untuk nilai awal
    this.value = parseInt(this.getAttribute('value')) || 0;

    this.shadowRoot.innerHTML = `
      <style>
        .display {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: #ffffff;
          border: var(--internal-border, 1px solid #e1e8ed);
          border-radius: var(--internal-border-radius, 12px); 
          padding: 20px;
          box-shadow: var(--internal-shadow, 0 4px 12px rgba(0, 0, 0, 0.06));
          width: 140px; 
          text-align: left;
        }
        .title {
          font-size: 0.9rem;
          margin-bottom: 8px;
          color: #657786;
          /* Style tambahan agar slot berfungsi baik */
          display: block;
          min-height: 1.1em; /* Jaga ketinggian jika slot kosong */
        }
        .value {
          font-size: 1.1rem;
          color: #14171A;
          font-weight: 500;
        }
        .number {
          font-weight: bold;
          font-style: normal;
          font-size: 2.5rem;
          color: #1b95e0;
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
  // Ini akan dipanggil jika 'value' di HTML diubah (misal: via DevTools)
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
      const numericValue = parseInt(newValue) || 0;
      // Cek agar tidak terjadi loop tak terbatas
      if (this.value !== numericValue) {
        this.count = numericValue;
      }
    }
  }

  // 4. Modifikasi 'set count' untuk menyinkronkan properti ke atribut
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

customElements.define('counter-display', CounterDisplay);