document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-contato');
  const msg = document.getElementById('mensagem-envio');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !telefone || !mensagem) {
      msg.textContent = 'Por favor, preencha todos os campos.';
      msg.style.color = 'red';
      msg.style.opacity = '1';
      setTimeout(() => {
        msg.style.opacity = '0';
      }, 4000);
      return;
    }

    const formData = new FormData(form);

    fetch('salvar_contato.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.text())
    .then(response => {
      msg.textContent = 'Orçamento enviado com sucesso! Entraremos em contato.';
      msg.style.color = 'green';
      form.reset();
    })
    .catch(error => {
      msg.textContent = 'Erro ao enviar. Tente novamente.';
      msg.style.color = 'red';
    })
    .finally(() => {
      msg.style.opacity = '1';
      setTimeout(() => {
        msg.style.opacity = '0';
      }, 4000);
    });
  });
});
