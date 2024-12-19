function toggleProfile() {
    const modal = document.getElementById('profileModal');
    const overlay = document.getElementById('overlay');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    }
}