async function caricaDati() {
  const pilotiRes = await fetch('piloti.json');
  const scuderieRes = await fetch('scuderie.json');

  const piloti = await pilotiRes.json();
  const scuderie = await scuderieRes.json();

  const coloriScuderie = {};
  const loghiScuderie = {};

  scuderie.forEach(s => {
    coloriScuderie[s.nome] = s.colore;
    loghiScuderie[s.nome] = s.logo;
  });

  piloti.sort((a, b) => b.punti - a.punti);

  const tbody = document.getElementById('classifica-body');
  tbody.innerHTML = '';

  piloti.forEach((pilota, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${pilota.nickname}</td>
      <td>${pilota.numero}</td>
      <td>
        <img src="${loghiScuderie[pilota.scuderia]}" class="logo-scuderia">
        <span class="badge-scuderia" style="background:${coloriScuderie[pilota.scuderia]}">
          ${pilota.scuderia}
        </span>
      </td>
      <td>${pilota.punti}</td>
      <td class="${
        pilota.trend === 'up' ? 'trend-up' :
        pilota.trend === 'down' ? 'trend-down' :
        'trend-same'
      }">
        ${
          pilota.trend === 'up' ? '▲' :
          pilota.trend === 'down' ? '▼' :
          '■'
        }
      </td>
    `;

    tbody.appendChild(tr);
  });
}

caricaDati();

/* ---------------------- */
/* TOGGLE TEMA            */
/* ---------------------- */

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});
