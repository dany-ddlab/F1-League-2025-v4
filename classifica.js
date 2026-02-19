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

    const tdPos = document.createElement('td');
    tdPos.textContent = index + 1;

    const tdNick = document.createElement('td');
    tdNick.textContent = pilota.nickname;

    const tdNum = document.createElement('td');
    tdNum.textContent = pilota.numero;

    const tdScuderia = document.createElement('td');

    const imgLogo = document.createElement('img');
    imgLogo.src = loghiScuderie[pilota.scuderia];
    imgLogo.alt = pilota.scuderia;
    imgLogo.className = 'logo-scuderia';

    const spanScuderia = document.createElement('span');
    spanScuderia.textContent = pilota.scuderia;
    spanScuderia.className = 'badge-scuderia';
    spanScuderia.style.backgroundColor = coloriScuderie[pilota.scuderia];

    tdScuderia.appendChild(imgLogo);
    tdScuderia.appendChild(spanScuderia);

    const tdPunti = document.createElement('td');
    tdPunti.textContent = pilota.punti;

    const tdTrend = document.createElement('td');
    if (pilota.trend === 'up') {
      tdTrend.textContent = '▲';
      tdTrend.className = 'trend-up';
    } else if (pilota.trend === 'down') {
      tdTrend.textContent = '▼';
      tdTrend.className = 'trend-down';
    } else {
      tdTrend.textContent = '■';
      tdTrend.className = 'trend-same';
    }

    tr.appendChild(tdPos);
    tr.appendChild(tdNick);
    tr.appendChild(tdNum);
    tr.appendChild(tdScuderia);
    tr.appendChild(tdPunti);
    tr.appendChild(tdTrend);

    tbody.appendChild(tr);
  });
}

caricaDati();
