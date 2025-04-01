import Swal from 'sweetalert2';

export const showAlert = async (text: string, type: 'error' | 'success') => {
    Swal.fire({
        icon: type,
        text,
        padding: '2em',
        customClass: { popup: 'sweet-alerts' },
    });
};
