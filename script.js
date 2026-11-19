// Запуск единственной анимации: прорисовка плана на первом экране.
window.addEventListener('load', function () {
  requestAnimationFrame(function () {
    document.documentElement.classList.add('drawn');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
