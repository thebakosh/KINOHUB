document.addEventListener('DOMContentLoaded', function() {
        const tabs = document.querySelectorAll('.profile-nav li');
        const tabPanes = document.querySelectorAll('.tab-pane');

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                tabPanes.forEach(pane => pane.classList.remove('active'));
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
        if (tabs.length > 0 && !document.querySelector('.profile-nav li.active')) {
            tabs[0].classList.add('active');
            tabPanes[0].classList.add('active');
        }
    });
