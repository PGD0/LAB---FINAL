document.getElementById('alert').style.display = 'none';

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value,
    password = document.getElementById('password').value;
    
    const alertDiv = document.getElementById('alert'),
    alertMessage = document.getElementById('alertMessage'),
    alertTitle = document.getElementById('alertTitle');

    try {
        const response = await fetch('http://localhost:3000/validar', {
           method: 'POST',
           headers: {
                'Content-Type': 'application/json'
           },
           body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (result.err) {
            alertDiv.style.backgroundColor = '#f44336';
            alertTitle.innerText = 'Peligro!';
            alertMessage.innerText = 'USUARIO Y/O CONTRASEÑA INCORRECTOS';
        } else {
            alertDiv.style.backgroundColor = '#4CAF50';
            alertTitle.innerText = 'Éxito!';
            alertMessage.innerText = 'Operación realizada con éxito.';
        }
        alertDiv.style.display = 'block';
    } catch (err) {
        console.error('Error al enviar la solicitud:', err);
    }
})

function closeAlert() {
    const alertDiv = document.getElementById('alert');
    alertDiv.style.display = 'none';
}