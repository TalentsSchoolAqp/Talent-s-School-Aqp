/* main.js - UI helpers: menu mobile, lightbox, registro local y mensajes */

document.addEventListener('DOMContentLoaded', ()=> {

  // Mobile menu
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if(navToggle && mobileNav){
    navToggle.addEventListener('click', ()=> {
      mobileNav.style.display = mobileNav.style.display === 'flex' ? 'none' : 'flex';
      mobileNav.style.flexDirection = 'column';
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=> mobileNav.style.display = 'none'));
  }

  // Lightbox gallery
  const lightbox = document.getElementById('lightbox');
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', ()=> {
      lightbox.innerHTML = '';
      const big = document.createElement('img');
      big.src = img.src;
      lightbox.appendChild(big);
      lightbox.style.display = 'flex';
    });
  });
  if(lightbox) lightbox.addEventListener('click', ()=> lightbox.style.display = 'none');

  // Registro: guarda en localStorage
  const regForm = document.getElementById('registro-form');
  if(regForm){
    regForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = {
        alumno: regForm.alumno.value.trim(),
        dni: regForm.dni.value.trim(),
        grado: regForm.grado.value,
        padre: regForm.padre.value.trim(),
        correo: regForm.correo.value.trim(),
        fecha: new Date().toISOString()
      };
      if(!data.alumno || !data.correo) return alert('Completa los campos obligatorios.');
      const list = JSON.parse(localStorage.getItem('registros')||'[]');
      list.push(data);
      localStorage.setItem('registros', JSON.stringify(list));
      alert('Registro enviado (guardado localmente).');
      regForm.reset();
    });
  }

  // Mensajes: panel simple (local)
  const msgForm = document.getElementById('msg-form');
  const panel = document.getElementById('messages-list');
  function renderMessages(){
    if(!panel) return;
    const msgs = JSON.parse(localStorage.getItem('mensajes')||'[]').reverse();
    panel.innerHTML = msgs.map(m => `<div class="message-item"><div class="meta">${m.nombre} · ${new Date(m.fecha).toLocaleString()}</div><p>${m.texto}</p></div>`).join('');
  }
  renderMessages();
  if(msgForm){
    msgForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const nuevo = {
        nombre: msgForm.nombre.value.trim() || 'Padre',
        texto: msgForm.texto.value.trim(),
        fecha: new Date().toISOString()
      };
      if(!nuevo.texto) return alert('Escribe tu mensaje.');
      const arr = JSON.parse(localStorage.getItem('mensajes')||'[]');
      arr.push(nuevo);
      localStorage.setItem('mensajes', JSON.stringify(arr));
      msgForm.reset();
      renderMessages();
      alert('Mensaje publicado (vista local).');
    });
  }

});
