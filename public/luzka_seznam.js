document.addEventListener('DOMContentLoaded', function () {
    const table_beds = document.getElementById("table-beds")
    const search_bar_beds = document.getElementById("search-bar-beds")

    window.addEventListener("load", (event) => {
        fetchData_beds()
    })

    search_bar_beds.addEventListener("keyup", (event) =>{
        filterTable()
    })


    function fetchData_beds() {
        table_beds.innerHTML = 'loading ...'
        fetch('/data')
            .then(response => response.json())
            .then(data => {
                table_beds.innerHTML = ''
                data.forEach(item => {
                    table_beds.appendChild(createTableRow(item));
                    //console.log(table_beds.innerHTML)
                });
            })
            .catch(error => {
                table_beds.innerHTML = 'error while loading'
                console.error('Error fetching data:', error)
            })
    }



    function createTableRow(item) {
        const row = document.createElement('tr')

        const cellBedId = document.createElement('td')
        cellBedId.textContent = item.id_bed
        row.appendChild(cellBedId)

        const cellRoomId = document.createElement('td')
        cellRoomId.textContent = item.id_room
        row.appendChild(cellRoomId)

        const cellDepartment = document.createElement('td')
        cellDepartment.textContent = item.department;
        cellDepartment.classList.add("remove-from-table-upon-resize")
        row.appendChild(cellDepartment)

        const cellAction = document.createElement('td')
        cellAction.className = 'align-right'
        const button = document.createElement('button')
        button.textContent = 'info'
        button.addEventListener('click', () => {
            //alert(`Bed ID: ${item.id_bed}\nRoom ID: ${item.id_room}\nDepartment: ${item.department}`)
            window.location.href = `/luzko?bedid=${item.id_bed}`
        })
        cellAction.appendChild(button)
        row.appendChild(cellAction)
        return row
    }


    function filterTable() {
        const searchValue = search_bar_beds.value.toLowerCase()
        const tableRows = document.querySelectorAll('#table-beds tr')
    
        tableRows.forEach(row => {
            const cells = row.getElementsByTagName('td')
            const bedId = cells[0].textContent.toLowerCase()
            const roomId = cells[1].textContent.toLowerCase()
            const department = cells[2].textContent.toLowerCase()
    
            if (bedId.includes(searchValue) || roomId.includes(searchValue) || department.includes(searchValue)) {
                row.style.display = ''
            } else {
                row.style.display = 'none'
            }
        });
    }


})