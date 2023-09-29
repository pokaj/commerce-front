import swal from 'sweetalert';

export const successMessage = (message) => {
    swal({
        title: 'Success',
        text: message,
        icon: 'success',
    });
}

export const errorMessage = (message) => {
    swal({
        title: 'Error',
        text: message,
        icon: 'error',
    });
}

export const warningMessage = (message) => {
    swal({
        title: 'Warning',
        text: message,
        icon: 'warning',
    });
}

export const validateEmail = (email) => {
    const pattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return pattern.test(email);
}

export const strongPasswordCheck = (password) => {
    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{3,100}$/;
    return pattern.test(password);
}
