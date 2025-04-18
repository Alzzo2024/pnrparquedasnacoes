// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Form submission
const joinForm = document.querySelector('.join-form');

joinForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    
    // Simple validation
    if (!nome || !email) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A PROCESSAR...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Reset form
        this.reset();
        
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> ENVIADO COM SUCESSO!';
        submitBtn.style.backgroundColor = '#28a745';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
});

// Add active class to current section in navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Inicialização do EmailJS
(function() {
    emailjs.init('yQPtZfV4xHZj86YOD');
})();

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para validar o formulário
function validateForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const interest = document.getElementById('interest');
    
    // Validação do nome
    if (name.value.trim() === '') {
        showError(name, 'Por favor, informe seu nome');
        isValid = false;
    } else {
        removeError(name);
    }
    
    // Validação do email
    if (email.value.trim() === '') {
        showError(email, 'Por favor, informe seu email');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Por favor, informe um email válido');
        isValid = false;
    } else {
        removeError(email);
    }
    
    // Validação do telefone (opcional)
    if (phone.value.trim() !== '' && !/^\d{9,15}$/.test(phone.value.replace(/\D/g, ''))) {
        showError(phone, 'Por favor, informe um telefone válido');
        isValid = false;
    } else {
        removeError(phone);
    }
    
    // Validação do interesse
    if (interest.value === '') {
        showError(interest, 'Por favor, selecione seu interesse');
        isValid = false;
    } else {
        removeError(interest);
    }
    
    return isValid;
}

// Função para mostrar erro
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    
    formGroup.classList.add('error');
    input.classList.add('input-error');
}

// Função para remover erro
function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
    
    formGroup.classList.remove('error');
    input.classList.remove('input-error');
}

// Função para mostrar mensagem de sucesso
function showSuccessMessage() {
    const form = document.querySelector('.join-form');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.';
    
    // Esconde o formulário e mostra a mensagem
    form.style.display = 'none';
    form.parentElement.appendChild(successMessage);
    
    // Após 5 segundos, restaura o formulário
    setTimeout(() => {
        form.reset();
        form.style.display = 'flex';
        form.parentElement.removeChild(successMessage);
    }, 5000);
}

// Função para mostrar mensagem de erro
function showErrorMessage(error) {
    const form = document.querySelector('.join-form');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message-global';
    errorMessage.textContent = 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde ou entre em contato diretamente pelo email.';
    
    console.error('Erro ao enviar email:', error);
    
    form.parentElement.insertBefore(errorMessage, form);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        form.parentElement.removeChild(errorMessage);
    }, 5000);
}

// Adiciona o evento de submit ao formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.join-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Valida o formulário antes de enviar
            if (validateForm()) {
                // Mostra indicador de carregamento
                const submitButton = form.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitButton.disabled = true;
                
                // Prepara os parâmetros para o EmailJS
                const templateParams = {
                    from_name: document.getElementById('name').value,
                    from_email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    interest: document.getElementById('interest').value,
                    message: document.getElementById('message') ? document.getElementById('message').value : 'Interesse em participar',
                    to_email: 'pnrparquedasnacoes@gmail.com'
                };
                
                emailjs.send('service_zuc76cr', 'template_y7z20fo', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        submitButton.innerHTML = originalButtonText;
                        submitButton.disabled = false;
                        showSuccessMessage();
                        form.reset();
                    })
                    .catch(function(error) {
                        console.log('FAILED...', error);
                        submitButton.innerHTML = originalButtonText;
                        submitButton.disabled = false;
                        showErrorMessage(error);
                    });
            }
        });
    }
    
    // Adiciona validação em tempo real
    const inputs = document.querySelectorAll('.join-form input, .join-form select, .join-form textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (input.id === 'name' && input.value.trim() === '') {
                showError(input, 'Por favor, informe seu nome');
            } else if (input.id === 'email') {
                if (input.value.trim() === '') {
                    showError(input, 'Por favor, informe seu email');
                } else if (!isValidEmail(input.value)) {
                    showError(input, 'Por favor, informe um email válido');
                } else {
                    removeError(input);
                }
            } else if (input.id === 'phone' && input.value.trim() !== '' && 
                      !/^\d{9,15}$/.test(input.value.replace(/\D/g, ''))) {
                showError(input, 'Por favor, informe um telefone válido');
            } else if (input.id === 'interest' && input.value === '') {
                showError(input, 'Por favor, selecione seu interesse');
            } else {
                removeError(input);
            }
        });
    });
});
