document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const dataForm = document.getElementById('input-form');
    const logoutBtn = document.getElementById('logout-btn');
    const loginContainer = document.getElementById('login-container');
    const dataContainer = document.getElementById('data-form');
    const statusMessage = document.getElementById('status-message');
    
    // Hardcoded credentials (in production, use proper authentication)
    const validCredentials = {
        username: 'admin',
        password: 'password123'
    };
    
    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showDataForm();
    }
    
    // Login Form Submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === validCredentials.username && password === validCredentials.password) {
            localStorage.setItem('isLoggedIn', 'true');
            showDataForm();
        } else {
            alert('Username atau password salah!');
        }
    });
    
    // Logout Button
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        showLoginForm();
        loginForm.reset();
    });
    
    // Data Form Submission
    dataForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const checkedBy = document.getElementById('checked-by').value;
        const checkDate = document.getElementById('check-date').value;
        const staffName = document.getElementById('staff-name').value;
        const sheetName = document.getElementById('sheet-name').value;
        const ssLink = document.getElementById('ss-link').value;
        const chatId = document.getElementById('chat-id').value;
        
        // Here you would typically send this data to your Google Apps Script
        // For this example, we'll just show a success message
        submitToGoogleSheet({
            checkedBy,
            checkDate,
            staffName,
            sheetName,
            ssLink,
            chatId
        });
    });
    
    // Helper functions
    function showDataForm() {
        loginContainer.classList.remove('active');
        dataContainer.classList.add('active');
    }
    
    function showLoginForm() {
        dataContainer.classList.remove('active');
        loginContainer.classList.add('active');
        dataForm.reset();
    }
    
    function submitToGoogleSheet(data) {
        // In a real implementation, you would call your Google Apps Script here
        // This is just a simulation
        
        // Show loading state
        statusMessage.textContent = 'Mengirim data...';
        statusMessage.className = 'alert alert-info';
        statusMessage.style.display = 'block';
        
        // Simulate API call
        setTimeout(() => {
            statusMessage.textContent = 'Data berhasil dikirim!';
            statusMessage.className = 'alert alert-success';
            
            // Clear form
            dataForm.reset();
            
            // Hide message after 3 seconds
            setTimeout(() => {
                statusMessage.style.display = 'none';
            }, 3000);
        }, 1500);
        
        // In a real implementation, you would use something like this:
        /*
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwtYkNcMilVQVrHh_o4N5gvrsyq2nSrp6YH8rhFhLH4faxsZsOzx3oQqdB0KFIxj_d6/exec';
        
        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                statusMessage.textContent = 'Data berhasil dikirim!';
                statusMessage.className = 'alert alert-success';
                dataForm.reset();
            } else {
                throw new Error('Gagal mengirim data');
            }
        })
        .catch(error => {
            statusMessage.textContent = 'Error: ' + error.message;
            statusMessage.className = 'alert alert-danger';
        })
        .finally(() => {
            setTimeout(() => {
                statusMessage.style.display = 'none';
            }, 3000);
        });
        */
    }
});
