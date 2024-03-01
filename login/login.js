
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const signUpForm = document.querySelector('.sign-up-container form');
const signInForm = document.querySelector('.sign-in-container form');

const signupNameInput = document.getElementById('signupName');
const signupEmailInput = document.getElementById('signupEmail');
const signupPasswordInput = document.getElementById('signupPassword');
const signupButton = document.getElementById('signupButton');
const signupMessage = document.getElementById('signupMessage');

const signinEmailInput = document.getElementById('signinEmail');
const signinPasswordInput = document.getElementById('signinPassword');
const signinButton = document.getElementById('signinButton');
const signinMessage = document.getElementById('signinMessage');

signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

signupButton.addEventListener('click', () => {
  const newUser = {
    name: signupNameInput.value,
    email: signupEmailInput.value,
    password: signupPasswordInput.value,
  };

  registerUser(newUser)
    .then(() => {
      signupMessage.innerHTML = 'Usuario registrado con éxito';
      // Redirige al usuario después de registrar
      window.location.href = '../carrito/carrito.html';
    })
    .catch((error) => {
      signupMessage.innerHTML = `Error al registrar usuario: ${error.message}`;
    });
});

signinButton.addEventListener('click', () => {
  const userEmail = signinEmailInput.value;
  const userPassword = signinPasswordInput.value;

  authenticateUser(userEmail, userPassword)
    .then(() => {
      signinMessage.innerHTML = 'Inicio de sesión exitoso. Vamos a la Plataforma!';
      // Redirige al usuario después de iniciar sesión
      window.location.href = '../carrito/carrito.html';
    })
    .catch((error) => {
      signinMessage.innerHTML = `Error al iniciar sesión: ${error.message}`;
    });
});



// Función para validar a un usuario existente con API ficticia para simular la validación
function authenticateUser(email, password) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la validacion');
    }
    return response.json();
  })
  .then(data => {
    if (data.id) {
      console.log('validacion exitosa.');
      // Redirige al usuario después de iniciar sesión
      window.location.href = '../carrito/carrito.html';
    } else {
      throw new Error('validacion fallida');
    }
  })
  .catch(error => {
    // Manejo de errores
    console.error('Error de validacion:', error.message);
    throw error;
  });
}


// Función para registrar un nuevo usuario
function registerUser(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = obtenerDatos();
      // Verificar si el correo electrónico ya está registrado
      if (data.users.some(existingUser => existingUser.email === user.email)) {
        reject(new Error('El correo electrónico ya está registrado.'));
        return;
      }

      // Agregar nuevo usuario
      data.users.push(user);
      resolve();
    }, 1000);
  });
}

function displayMessage(message) {
  messageContainer.innerHTML = `<p>${message}</p>`;
  setTimeout(() => {
      messageContainer.innerHTML = '';
  }, 3000);
}



/* para guardar datos en el Local Storage


function authenticateUser(email, password) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la validacion');
    }
    return response.json();
  })
  .then(data => {
    if (data.id) {
      // Validación exitosa
      console.log('validacion exitosa');

      // Almacena en el localStorage
      const userInfo = {
        id: data.id,
        email: email,
      };

      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      // Redirige al usuario después de iniciar sesión
      window.location.href = '../carrito/carrito.html';
    } else {
      // Validación fallida
      throw new Error('validación fallida');
    }
  })
  .catch(error => {
    console.error('Error de validación:', error.message);
    throw error;
  });
}

 */
