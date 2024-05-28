document.addEventListener('DOMContentLoaded', function () {
    const toggle_hamburger = document.getElementById("toggle-sidebar")


    toggle_hamburger.addEventListener("click", (event) => {
        toggleSidebar()
    })

    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        //const mainContent = document.querySelector('.main-content');
        
        if (sidebar.classList.contains('go-left-transition')) {
            sidebar.classList.remove('go-left-transition')
            
        } else {
            
            sidebar.classList.add('go-left-transition')
        }
    }

})