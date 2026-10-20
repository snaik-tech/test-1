const form = document.getElementById('registerForm');
const message = document.getElementById('message');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('terms').checked;

  message.textContent = '';
  message.className = 'message';

  if (!fullName || !email || !password || !confirmPassword) {
    message.textContent = 'Please fill in all fields.';
    message.classList.add('error');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    message.textContent = 'Please enter a valid email address.';
    message.classList.add('error');
    return;
  }

  if (password.length < 6) {
    message.textContent = 'Password must be at least 6 characters long.';
    message.classList.add('error');
    return;
  }

  if (password !== confirmPassword) {
    message.textContent = 'Passwords do not match.';
    message.classList.add('error');
    return;
  }

  if (!terms) {
    message.textContent = 'You must agree to the terms and conditions.';
    message.classList.add('error');
    return;
  }

  message.textContent = `Registration successful for ${fullName}!`;
  message.classList.add('success');
  form.reset();
});
