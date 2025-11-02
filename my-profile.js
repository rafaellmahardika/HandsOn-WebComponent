class MyProfile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const name = this.getAttribute('name') || 'Rafael Mahardika Arya Dewamurti';
    const nim = this.getAttribute('nim') || '24/536279/PA/22755';
    const specialization = this.getAttribute('specialization') || 'Computer Science Student';

    this.shadowRoot.innerHTML = `
      <style>
        .profile-container {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #333;
          text-align: center;
          padding: 20px;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          width: fit-content;
          margin: 0 auto;
        }
        .profile-name {
          font-size: 2em;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .profile-nim {
          font-size: 1.1em;
          color: #555;
          margin-bottom: 15px;
        }
        .profile-specialization { /* Style untuk spesialisasi */
          font-size: 1.3em;
          font-weight: 600;
          color: #1a73e8; /* Warna khas untuk spesialisasi */
          text-transform: uppercase;
        }

        /* Styling for the hero section, mostly moved to index.html */
        .hero-title {
            font-size: 4em;
            font-weight: 800;
            line-height: 1;
            margin-bottom: 10px;
            color: #1f2937;
        }
        .hero-subtitle {
            font-size: 1.5em;
            font-weight: 500;
            color: #4b5563;
        }
      </style>
      <div class="profile-container" style="display:none;">
        <div class="profile-name">${name}</div>
        <div class="profile-nim">${nim}</div>
        <div class="profile-specialization">${specialization}</div>
      </div>
      `;
  }
}

customElements.define('my-profile', MyProfile);