// Script minimale per interazioni
// - Evidenzia link attivo
// - Gestione invio form contatti (mailto) come fallback

(function(){
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('a[data-nav]')?.forEach(a => {
    const href = a.getAttribute('href');
    if(href && (href === here || (here === 'index.html' && href === './'))){
      a.classList.add('active');
    }
  });

  const form = document.querySelector('#contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const nome = (data.get('nome')||'').toString().trim();
      const email = (data.get('email')||'').toString().trim();
      const tel = (data.get('telefono')||'').toString().trim();
      const msg = (data.get('messaggio')||'').toString().trim();
      const ok = form.querySelector('#accetto');
      if(!ok?.checked){
        alert('Per inviare il messaggio è necessario accettare la Privacy Policy.');
        return;
      }
      if(!nome || !email || !msg){
        alert('Compila i campi obbligatori (Nome, Email, Messaggio).');
        return;
      }
      const subject = encodeURIComponent('Richiesta dal sito – Calcoli Strutturali');
      const body = encodeURIComponent(
        `Nome: ${nome}\nEmail: ${email}\nTelefono: ${tel}\n\nMessaggio:\n${msg}`
      );
      // TODO: sostituisci con la tua email
      const to = 'info@tuodominio.it';
      location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      form.reset();
      alert('Grazie! Il tuo client email si aprirà per finalizzare l’invio.');
    });
  }
})();