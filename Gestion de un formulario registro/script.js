const form = document.getElementById('registroForm');
const nombreInput = document.getElementById('nombre');
const telefonoInput = document.getElementById('telefono');
const contrasenaInput = document.getElementById('contrasena');
const confirmarContrasenaInput = document.getElementById('confirmarContrasena');
const aceptarCondicionesInput = document.getElementById('aceptarCondiciones');
const registrarBtn = document.getElementById('registrarBtn');

nombreInput.addEventListener('blur', validarNombre);
telefonoInput.addEventListener('blur', validarTelefono);
contrasenaInput.addEventListener('blur', validarContrasena);
confirmarContrasenaInput.addEventListener('blur', validarConfirmarContrasena);
aceptarCondicionesInput.addEventListener('change', habilitarBotonRegistrar);

    function validarNombre() {
        const nombreValue = nombreInput.value.trim();
        const regex = /^[a-zA-Z\s]{1,20}$/;
        if (regex.test(nombreValue)) {
            nombreInput.classList.remove('error');
            nombreInput.classList.add('success');
            return true;
        } else {
            nombreInput.classList.remove('success');
            nombreInput.classList.add('error');
            return false;
        }
    }

    function validarTelefono() {
        const telefonoValue = telefonoInput.value.trim();
        const regex = /^[0-9]{9}$/;
        if (regex.test(telefonoValue)) {
            telefonoInput.classList.remove('error');
            telefonoInput.classList.add('success');
            return true;
        } else {
            telefonoInput.classList.remove('success');
            telefonoInput.classList.add('error');
            return false;
        }
    }

    function validarContrasena() {
        const contrasenaValue = contrasenaInput.value;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (regex.test(contrasenaValue)) {
            contrasenaInput.classList.remove('error');
            contrasenaInput.classList.add('success');
            return true;
        } else {
            contrasenaInput.classList.remove('success');
            contrasenaInput.classList.add('error');
            return false;
        }
    }

    function validarConfirmarContrasena() {
        const contrasenaValue = contrasenaInput.value;
        const confirmarContrasenaValue = confirmarContrasenaInput.value;
        if (contrasenaValue === confirmarContrasenaValue) {
            confirmarContrasenaInput.classList.remove('error');
            confirmarContrasenaInput.classList.add('success');
            return true;
        } else {
            confirmarContrasenaInput.classList.remove('success');
            confirmarContrasenaInput.classList.add('error');
            return false;
        }
    }

    function habilitarBotonRegistrar() {
        if (validarNombre() && validarTelefono() && validarContrasena() && validarConfirmarContrasena() && aceptarCondicionesInput.checked) {
            registrarBtn.disabled = false;
        } else {
            registrarBtn.disabled = true;
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Registro exitoso');
    });