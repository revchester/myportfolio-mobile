//  maven market project
function openMavenTab(evt, tabName) {
    // Hapus display semua tab content
    const tabContent = document.getElementsByClassName("maven-tabcontent");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Hapus kelas 'maven-active-tab' dari semua tombol tab
    const tabLinks = document.getElementsByClassName("maven-tablink");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("maven-active-tab");
    }

    // Tampilkan tab yang dipilih dan tambahkan kelas 'maven-active-tab'
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("maven-active-tab");
}

// Buka tab pertama sebagai default saat halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".maven-tablink").click();
});