// Registro do Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('SW registrado'))
    .catch((err) => console.error('Erro SW:', err));
}

// Estados do Cronograma
const steps = [
  { name: 'Hidratação', desc: 'Reposição hídrica com babosa ou d-pantenol.' },
  { name: 'Nutrição', desc: 'Reposição lipídica com óleos vegetais ou manteigas.' },
  { name: 'Reconstrução', desc: 'Reposição proteica à base de queratina.' }
];

let currentIndex = 0;

const todayTitle = document.getElementById('today-title');
const stepName = document.getElementById('current-step-name');
const stepDesc = document.getElementById('current-step-details');
const btnComplete = document.getElementById('btn-complete');
const historyList = document.getElementById('history-list');

function updateUI() {
  const current = steps[currentIndex];
  todayTitle.textContent = current.name;
  stepName.textContent = current.name;
  stepDesc.textContent = current.desc;
}

// Ação de polegar: Alternar etapa concluída
btnComplete.addEventListener('click', () => {
  const completed = steps[currentIndex].name;
  
  // Adiciona ao histórico
  const li = document.createElement('li');
  li.textContent = `${completed} — Concluído agora`;
  historyList.prepend(li);

  // Avança para o próximo ciclo
  currentIndex = (currentIndex + 1) % steps.length;
  updateUI();
});

// Navegação rápida inferior
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Inicialização
updateUI();