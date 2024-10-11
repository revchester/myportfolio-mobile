//  NHTSA format
// JavaScript for tab functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabItems = document.querySelectorAll('.nhtsa-tab-item');
    const tabPanels = document.querySelectorAll('.nhtsa-tab-panel');

    tabItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove active class from all tabs and panels
            tabItems.forEach(tab => tab.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked tab and corresponding panel
            const tabTarget = this.getAttribute('data-tab');
            this.classList.add('active');
            document.getElementById(tabTarget).classList.add('active');
        });
    });
});