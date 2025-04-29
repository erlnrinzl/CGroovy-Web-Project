class logo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <div class="logo">
        <h1>
          <span style="color: #ff1212">C</span
            ><span style="color: #bba3f4">'</span
            ><span style="color: white">Gr</span
            ><span style="color: #bba3f4">oo</span
            ><span style="color: white">vy</span>
        </h1>
      </div>
    `;
  }
}

customElements.define('app-logo', logo);