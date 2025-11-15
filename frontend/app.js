// -----------------------------------------------------
// SPA Barber Elite — Frontend Completo Integrado ao Backend
// -----------------------------------------------------

let services = [];
let pros = [];

let appState = {
  view: "home",
  selectedService: null,
  selectedPro: null,
  selectedDate: null,
  selectedTime: null,
  bookings: [],   // agendamentos do usuário
  user: null      // dados do usuário logado
};

const $views = document.getElementById("views");

// Navegação principal
document.getElementById("nav-services").addEventListener("click", () => navigate("services"));
document.getElementById("nav-bookings").addEventListener("click", () => navigate("bookings"));
document.getElementById("nav-admin").addEventListener("click", () => navigate("admin"));
document.getElementById("go-home").addEventListener("click", () => navigate("home"));
document.getElementById("btn-login").addEventListener("click", () => navigate("login"));

document.getElementById("footer-contact").addEventListener("click", () => navigate("contato"));
document.getElementById("footer-how").addEventListener("click", () => navigate("comoChegar"));

// Controle de navegação
function navigate(view, payload) {
  appState.view = view;
  if (payload) Object.assign(appState, payload);
  render();
}

// Render principal
function render() {
  $views.innerHTML = "";
  const v = appState.view;

  if (v === "home") renderHome();
  if (v === "services") renderServices();
  if (v === "serviceDetail") renderServiceDetail();
  if (v === "booking") renderBookingSimulation();
  if (v === "confirm") renderBookingConfirmation();
  if (v === "bookings") renderMyBookings();
  if (v === "admin") renderAdmin();
  if (v === "login") renderLogin();
  if (v === "contato") renderContato();
  if (v === "comoChegar") renderComoChegar();
}

/* =======================================================
                     HOME
======================================================= */
function renderHome() {
  const el = document.createElement("div");

  el.innerHTML = `
    <section class="hero card">
      <div class="title">Barber Elite</div>
      <div class="subtitle">Agende seu horário com rapidez e estilo.</div>
      <div><button class="btn btn-primary" id="hero-schedule">AGENDAR AGORA</button></div>
    </section>

    <section class="card">
      <h3>Nossos Serviços</h3>
      <div class="grid grid-3" id="home-services"></div>
      <div class="center" style="margin-top:12px;"><button class="btn btn-secondary" id="see-all">VER TODOS OS SERVIÇOS</button></div>
    </section>
  `;

  $views.appendChild(el);

  const list = el.querySelector("#home-services");

  services.slice(0, 3).forEach((s) => {
    const card = document.createElement("div");
    card.className = "service-card card";
    card.innerHTML = `
      <div class="service-thumb">${s.name}</div>
      <div>
        <div class="service-name">${s.name}</div>
        <div class="service-meta"><span>${s.duration} min</span>
        <strong>R$ ${s.price.toFixed(2)}</strong></div>
      </div>
      <div class="row" style="margin-top:auto">
        <button class="btn btn-outline" data-id="${s._id}">Detalhes</button>
        <button class="btn btn-primary" data-book="${s._id}">Agendar</button>
      </div>
    `;
    list.appendChild(card);
  });

  el.querySelectorAll("[data-id]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const svc = services.find((x) => x._id === e.currentTarget.dataset.id);
      navigate("serviceDetail", { selectedService: svc });
    })
  );

  el.querySelectorAll("[data-book]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const svc = services.find((x) => x._id === e.currentTarget.dataset.book);
      navigate("booking", { selectedService: svc });
    })
  );

  el.querySelector("#see-all").addEventListener("click", () => navigate("services"));
  el.querySelector("#hero-schedule").addEventListener("click", () => navigate("services"));
}

/* =======================================================
                     SERVICES LIST
======================================================= */
function renderServices() {
  const el = document.createElement("div");
  el.innerHTML = `
    <section class="card">
      <h2>Catálogo de Serviços</h2>
      <div class="center" style="margin:8px 0;color:var(--muted)">
        Busque e escolha o serviço desejado.
      </div>
    </section>

    <section class="card grid grid-3" id="catalog-grid"></section>
  `;

  $views.appendChild(el);

  const grid = el.querySelector("#catalog-grid");

  services.forEach((s) => {
    const c = document.createElement("div");

    c.className = "service-card";
    c.innerHTML = `
      <div class="service-thumb">${s.name}</div>
      <div>
        <div class="service-name">${s.name}</div>
        <div class="service-meta"><span>${s.duration} min</span>
        <strong>R$ ${s.price.toFixed(2)}</strong></div>
      </div>
      <div class="row" style="margin-top:auto">
        <button class="btn btn-outline" data-id="${s._id}">Detalhes</button>
        <button class="btn btn-primary" data-book="${s._id}">Agendar</button>
      </div>
    `;
    grid.appendChild(c);
  });

  grid.querySelectorAll("[data-id]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const svc = services.find((x) => x._id === e.currentTarget.dataset.id);
      navigate("serviceDetail", { selectedService: svc });
    })
  );

  grid.querySelectorAll("[data-book]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const svc = services.find((x) => x._id === e.currentTarget.dataset.book);
      navigate("booking", { selectedService: svc });
    })
  );
}

/* =======================================================
                     SERVICE DETAIL
======================================================= */
function renderServiceDetail() {
  const s = appState.selectedService;

  const el = document.createElement("div");

  el.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content:space-between">
        <div class="kv">Serviços › Cortes › <strong>${s.name}</strong></div>
        <button class="btn btn-outline" id="back-services">Voltar</button>
      </div>
    </div>

    <div class="columns columns-2">
      <div class="card">
        <div style="height:300px;background:#eee;border-radius:10px;
          display:flex;align-items:center;justify-content:center">
          ${s.name} — imagem
        </div>
      </div>

      <div class="card">
        <div class="service-name" style="font-size:20px">${s.name}</div>

        <div class="card" style="background:#fafafa;padding:12px;margin-top:12px">
          <div class="kv">Duração</div>
          <strong>${s.duration} min</strong>

          <div class="kv" style="margin-top:8px">Preço</div>
          <strong>R$ ${s.price.toFixed(2)}</strong>
        </div>

        <div style="margin-top:12px;color:var(--muted)">
          ${s.description}
        </div>

        <div style="margin-top:12px">
          <div class="kv">Escolher barbeiro</div>
          <div style="display:flex;gap:8px;margin-top:8px">
            ${pros
              .map((p) => `<button class="btn" data-pro="${p._id}">${p.name}</button>`)
              .join("")}
          </div>
        </div>

        <div style="margin-top:16px" class="row">
          <button class="btn btn-primary" id="book-service">AGENDAR ESTE SERVIÇO</button>
        </div>
      </div>
    </div>
  `;

  $views.appendChild(el);

  el.querySelector("#back-services")
    .addEventListener("click", () => navigate("services"));

  el.querySelector("#book-service")
    .addEventListener("click", () => navigate("booking", { selectedService: s }));

  el.querySelectorAll("[data-pro]").forEach((b) => {
    b.addEventListener("click", (e) => {
      const pid = e.currentTarget.dataset.pro;
      appState.selectedPro = pros.find((x) => x._id === pid);
    });
  });
}

/* =======================================================
                     BOOKING SIMULATION
======================================================= */
function renderBookingSimulation() {
  const s = appState.selectedService;

  const el = document.createElement("div");
  el.innerHTML = `
    <div class="card">
      <h2>Agendar: ${s.name}</h2>
      <p class="kv">Selecione o profissional e o horário desejado.</p>

      <div class="kv">Profissional</div>
      <select id="select-pro" class="form-field">
        <option value="">Selecione...</option>
        ${pros.map((p) => `<option value="${p._id}">${p.name}</option>`).join("")}
      </select>

      <div class="kv" style="margin-top:12px;">Data</div>
      <input type="date" id="select-date" class="form-field">

      <div class="kv" style="margin-top:12px;">Horário</div>
      <select id="select-time" class="form-field">
        <option>09:00</option>
        <option>10:00</option>
        <option>11:00</option>
        <option>14:00</option>
        <option>15:00</option>
        <option>16:00</option>
      </select>

      <div class="row" style="margin-top:20px">
        <button class="btn btn-secondary" id="back-detail">Voltar</button>
        <button class="btn btn-primary" id="go-confirm">Confirmar</button>
      </div>
    </div>
  `;

  $views.appendChild(el);

  const proSel = el.querySelector("#select-pro");
  const dateSel = el.querySelector("#select-date");
  const timeSel = el.querySelector("#select-time");

  el.querySelector("#back-detail")
    .addEventListener("click", () => navigate("serviceDetail"));

  el.querySelector("#go-confirm")
    .addEventListener("click", () => {

      if (!proSel.value || !dateSel.value || !timeSel.value) {
        alert("Preencha todos os campos.");
        return;
      }

      appState.selectedPro = pros.find((p) => p._id === proSel.value);
      appState.selectedDate = dateSel.value;
      appState.selectedTime = timeSel.value;

      navigate("confirm");
    });
}

/* =======================================================
                   BOOKING CONFIRMATION
======================================================= */
function renderBookingConfirmation() {
  const s = appState.selectedService;
  const p = appState.selectedPro;

  const el = document.createElement("div");

  el.innerHTML = `
    <div class="card">
      <h2>Confirmar Agendamento</h2>

      <p><strong>Serviço:</strong> ${s.name}</p>
      <p><strong>Profissional:</strong> ${p?.name || "Não selecionado"}</p>
      <p><strong>Data:</strong> ${appState.selectedDate}</p>
      <p><strong>Horário:</strong> ${appState.selectedTime}</p>

      <div class="row" style="margin-top:20px">
        <button class="btn btn-secondary" id="back-booking">Voltar</button>
        <button class="btn btn-primary" id="final-confirm">Confirmar</button>
      </div>
    </div>
  `;

  $views.appendChild(el);

  el.querySelector("#back-booking")
    .addEventListener("click", () => navigate("booking"));

  el.querySelector("#final-confirm")
    .addEventListener("click", async () => {
      try {
        const newBooking = await apiPost("/bookings", {
          service: s._id,
          professional: p._id,
          date: appState.selectedDate,
          time: appState.selectedTime
        });

        alert("Agendamento realizado com sucesso!");
        appState.bookings.push(newBooking);
        navigate("bookings");

      } catch (err) {
        alert("Erro ao agendar: " + err.message);
      }
    });
}

/* =======================================================
                     USER BOOKINGS
======================================================= */
async function renderMyBookings() {
  const el = document.createElement("div");

  let items = [];
  try {
    items = await apiGet("/bookings");
  } catch (e) {
    items = [];
  }

  el.innerHTML = `
    <div class="card">
      <h2>Meus Agendamentos</h2>
      ${
        items.length === 0
          ? `<p style="color:var(--muted)">Nenhum agendamento encontrado.</p>`
          : `<div id="booking-list"></div>`
      }
    </div>
  `;

  $views.appendChild(el);

  const list = el.querySelector("#booking-list");

  if (list) {
    items.forEach((bk) => {
      const block = document.createElement("div");
      block.className = "card";
      block.style.marginTop = "10px";
      block.innerHTML = `
        <strong>${bk.service?.name}</strong><br>
        Profissional: ${bk.professional?.name}<br>
        Data: ${bk.date}<br>
        Hora: ${bk.time}
      `;
      list.appendChild(block);
    });
  }
}

/* =======================================================
                      LOGIN
======================================================= */
function renderLogin() {
  const el = document.createElement("div");

  el.innerHTML = `
    <div class="card" style="max-width:400px;margin:auto">
      <h2>Login</h2>

      <input id="login-email" class="form-field" placeholder="Email" type="email">
      <input id="login-pass" class="form-field" placeholder="Senha" type="password">

      <button class="btn btn-primary" id="do-login" style="margin-top:10px">
        Entrar
      </button>
    </div>
  `;

  $views.appendChild(el);

  el.querySelector("#do-login").addEventListener("click", async () => {
    const email = el.querySelector("#login-email").value;
    const pass = el.querySelector("#login-pass").value;

    try {
      const result = await apiPost("/auth/login", { email, password: pass });
      localStorage.setItem("token", result.token);

      alert("Login realizado!");
      navigate("home");

    } catch (err) {
      alert("Erro no login: " + err.message);
    }
  });
}

/* =======================================================
                    ADMIN AREA (SIMPLES)
======================================================= */
function renderAdmin() {
  const el = document.createElement("div");

  el.innerHTML = `
    <div class="card">
      <h2>Painel Administrativo</h2>
      <p style="color:var(--muted)">(Protótipo — apenas exibe serviços e barbeiros)</p>

      <h3>Serviços</h3>
      ${services.map((s) => `<div class="card">${s.name} — R$ ${s.price}</div>`).join("")}

      <h3 style="margin-top:12px">Profissionais</h3>
      ${pros.map((p) => `<div class="card">${p.name}</div>`).join("")}
    </div>
  `;

  $views.appendChild(el);
}

/* =======================================================
                PÁGINAS EXTRAS (rodapé)
======================================================= */
function renderContato() {
  const el = document.createElement("div");

  el.innerHTML = `
    <div class="card">
      <h2>Contato</h2>
      <p>Email: contato@barberelite.com</p>
      <p>Telefone: (11) 99999-9999</p>
    </div>
  `;

  $views.appendChild(el);
}

function renderComoChegar() {
  const el = document.createElement("div");

  el.innerHTML = `
    <div class="card">
      <h2>Como Chegar</h2>
      <p>Rua Exemplo, 123 — Centro</p>
    </div>
  `;

  $views.appendChild(el);
}

/* =======================================================
                       INIT
======================================================= */
async function loadInitialData() {
  try {
    services = await apiGet("/services");
    pros = await apiGet("/professionals");
  } catch (err) {
    console.error("Erro ao carregar dados:", err);
  }
}

loadInitialData().then(() => render());
