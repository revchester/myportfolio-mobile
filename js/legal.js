//  tab-container
function showTab(event, tabId) {
    // Hapus kelas 'active' dari semua tombol tab
    var tabButtons = document.getElementsByClassName("tab-button");
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    // Sembunyikan semua konten tab
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    // Tampilkan konten tab yang dipilih
    document.getElementById(tabId).style.display = "block";

    // Tambahkan kelas 'active' ke tombol tab yang dipilih
    event.currentTarget.classList.add("active");

    // Update nomor urut secara otomatis di tabel
    updateTableNumbering(tabId);
}

// Fungsi untuk memberikan nomor urut otomatis pada tabel
function updateTableNumbering(tabId) {
    var table = document.querySelector(`#${tabId} table tbody`);
    var rows = table.getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
        rows[i].getElementsByTagName('td')[0].innerText = i + 1;  // Set nomor urut
    }
}

// Tampilkan tab pertama secara default dan nomor otomatis
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("pt").style.display = "block";
    document.querySelector(".tab-button").classList.add("active");
    updateTableNumbering('pt');  // Set nomor otomatis untuk tab pertama
});

//  pencarian isi tabel
function searchTable() {
    // Ambil input pencarian
    var input = document.getElementById("searchInput");
    var filter = input.value.toLowerCase();
    
    // Ambil semua tabel dari tab yang sedang aktif
    var tabContent = document.querySelector('.tab-content[style="display: block;"]');
    var table = tabContent.getElementsByTagName("table")[0];
    var tr = table.getElementsByTagName("tr");

    // Loop melalui semua baris di dalam tabel
    for (var i = 1; i < tr.length; i++) {  // Mulai dari 1 untuk melewati header
        var tdArray = tr[i].getElementsByTagName("td");
        var match = false;

        // Loop melalui semua kolom dalam baris
        for (var j = 0; j < tdArray.length; j++) {
            if (tdArray[j]) {
                var txtValue = tdArray[j].textContent || tdArray[j].innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    match = true; // Jika ada kolom yang cocok, baris akan tampil
                }
            }
        }
        
        // Tampilkan atau sembunyikan baris sesuai hasil pencarian
        tr[i].style.display = match ? "" : "none";
    }
}

// Fungsi untuk menghapus isi kotak pencarian
function clearSearch() {
    document.getElementById('searchInput').value = ''; // Kosongkan input
    searchTable(); // Refresh hasil pencarian
    document.querySelector('.clear-icon').style.display = 'none'; // Sembunyikan ikon xmark
}

// Fungsi untuk menampilkan/menyembunyikan ikon xmark saat ada teks
document.getElementById('searchInput').addEventListener('input', function() {
    if (this.value.length > 0) {
        document.querySelector('.clear-icon').style.display = 'block'; // Tampilkan ikon xmark
    } else {
        document.querySelector('.clear-icon').style.display = 'none'; // Sembunyikan ikon xmark
    }
});