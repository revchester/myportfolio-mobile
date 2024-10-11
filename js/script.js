// JavaScript code can go here if needed in the future.
console.log('Website Layout with Sidebar Loaded');

//  date and time function
function updateDateTime () {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const now = new Date();
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

    const dateString = `${dayName} | ${day} ${month} ${year}`;
    const timeString = `${hours} - ${minutes} - ${seconds} / ${milliseconds}`;

    document.getElementById('date').textContent = dateString;
    document.getElementById('time').textContent = timeString;
}

// update date and time every second
setInterval (updateDateTime, 1);

//  ---
// Function to open the modal and display the clicked image
function openModal(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    modal.style.display = 'flex';  // Set modal to flex to center content
    modalImg.src = imgElement.querySelector('img').src;  // Get the image src
    modalImg.classList.add('normal');  // Set initial zoom level to normal

    // Reset previous zoom listeners to avoid adding multiple event listeners
    modalImg.removeEventListener('click', toggleZoom);
    modalImg.addEventListener('click', toggleZoom);
}

// Function to toggle between zoom-in and zoom-out
function toggleZoom(event) {
    const modalImg = document.getElementById('modalImage');

    if (modalImg.classList.contains('normal')) {
        zoomIn(event);  // Perform zoom in at the clicked position
    } else {
        zoomOut();  // Reset to normal zoom
    }
}

// Zoom-in function
function zoomIn(event) {
    const modalImg = document.getElementById('modalImage');
    const rect = modalImg.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;  // Get X position relative to image
    const offsetY = event.clientY - rect.top;   // Get Y position relative to image
    
    const percentX = (offsetX / rect.width) * 100;  // Calculate the percentage of click position
    const percentY = (offsetY / rect.height) * 100;
    
    modalImg.style.transformOrigin = `${percentX}% ${percentY}%`;  // Set zoom origin based on click position
    modalImg.classList.remove('normal');
    modalImg.classList.add('zoomed');
    modalImg.style.transform = 'scale(5)';  // Zoom in (adjust scale as needed)
}

// Zoom-out function
function zoomOut() {
    const modalImg = document.getElementById('modalImage');
    modalImg.classList.remove('zoomed');
    modalImg.classList.add('normal');
    modalImg.style.transform = 'scale(1)';  // Reset to original size
    modalImg.style.transformOrigin = 'center center';  // Reset origin to center
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'none';

    // Reset the zoom level and position when closing the modal
    modalImg.classList.remove('zoomed');
    modalImg.classList.add('normal');
    modalImg.style.transform = 'scale(1)';
    modalImg.style.transformOrigin = 'center center';  // Reset to center
}

//  menutup halaman web
document.addEventListener('DOMContentLoaded', function () {
    // Tombol penutup
    const closeDashboardBtn = document.getElementById('close-dashboard-btn');
    if (closeDashboardBtn) {
        closeDashboardBtn.addEventListener('click', function () {
            // Redirect kembali ke halaman project.html
            window.location.href = '../../project/index.html';
        });
    }
});

//  membuat tooltip
document.addEventListener('DOMContentLoaded', function() {
    // Temukan semua elemen dengan class tooltip
    const tooltips = document.querySelectorAll('.tooltip');
    const tooltipContainer = document.createElement('div');
    
    // Buat elemen container tooltip
    tooltipContainer.classList.add('tooltip-container');
    tooltipContainer.innerHTML = `
        <div class="tooltip-title"></div>
        <div class="tooltip-description"></div>
    `;
    
    // Tambahkan container ke dalam body
    document.body.appendChild(tooltipContainer);
    
    // Tambahkan event listener untuk mouseover dan mouseout pada elemen tooltip
    tooltips.forEach(function(tooltip) {
        tooltip.addEventListener('mouseover', function() {
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            
            // Isi judul dan deskripsi tooltip
            tooltipContainer.querySelector('.tooltip-title').textContent = title;
            tooltipContainer.querySelector('.tooltip-description').textContent = description;
            
            // Tampilkan tooltip
            tooltipContainer.classList.add('show');
        });
        
        tooltip.addEventListener('mouseout', function() {
            // Sembunyikan tooltip
            tooltipContainer.classList.remove('show');
        });
    });
});

//  preview image
// Ambil elemen preview
const previewImg = document.getElementById('preview-img');

// Ambil semua gambar di dalam ndt-project-item-gallery
const galleryImgs = document.querySelectorAll('.ndt-project-item-gallery img');

// Iterasi melalui setiap gambar di galeri
galleryImgs.forEach(img => {
    // Ketika mouse berada di atas gambar
    img.addEventListener('mouseover', function() {
        // Ubah src dari gambar preview dengan src dari gambar yang di-hover
        previewImg.src = this.src;
    });

    // Ketika mouse meninggalkan gambar, kembali ke gambar default
    img.addEventListener('mouseout', function() {
        previewImg.src = '../../../image/project/ndt/ndt-01.jpg'; // Gambar default
    });
});