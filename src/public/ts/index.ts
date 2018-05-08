const loginForm = (document.getElementById('login') as HTMLFormElement);

if (loginForm) {
    loginForm.addEventListener('change', (event) => {
        event.preventDefault();
    });
}
