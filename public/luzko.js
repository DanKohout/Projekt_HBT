document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const bedId = urlParams.get('bedid');
    const id_show = document.getElementById("id-show")
    const department_show = document.getElementById("department-show")
    const room_show = document.getElementById("room-show")
    const building_show = document.getElementById("building-show")
    const floor_show = document.getElementById("floor-show")

    const bed_in_room_container = document.getElementById("bed-in-room-container")

    const bed_type = document.getElementById("bed-type")
    const wash_date = document.getElementById("wash-date")
    const wash_cycles = document.getElementById("wash-cycles")



    window.addEventListener("load", (event) => {
        if (bedId) {
            fetchBedDetails(bedId);
        }
    })


    function fetchBedDetails(bedId) {
        fetch(`/data/${bedId}`)
            .then(response => response.json())
            .then(bed => {
                displayBedDetails(bed);
                return fetch(`/data/room/${bed.id_room}`);
            })
            .then(response => response.json())
            .then(bedsInRoom => {
                displayBedsInRoom(bedsInRoom);
            })
            .catch(error => console.error('Error fetching bed details:', error));
    }

    function displayBedDetails(bed) {
        id_show.innerHTML = `ID: ${bed.id_bed}`
        department_show.innerHTML = `${bed.department}`
        room_show.innerHTML = `${bed.id_room}`
        building_show.innerHTML = `${bed.building}`
        floor_show.innerHTML = `${bed.floor}`

        bed_type.innerHTML = `${bed.bed_type}`
        wash_date.innerHTML = `${bed.date_last_wash}`
        wash_cycles.innerHTML = `${bed.number_of_wash_cycles}`
    }

    function displayBedsInRoom(beds) {

        bed_in_room_container.innerHTML = '<h4>Obsazenost lůžek v pokoji</h4>';
        beds.forEach(bed => {
            const bedDiv = document.createElement('div')
            bedDiv.textContent = `${bed.id_bed}`
            
            if(bed.occupied){
                bedDiv.classList.add('bed-red')
            }else{
                bedDiv.classList.add('bed-green')
            }

            //const button = document.createElement('button')
            //button.textContent = 'info'
            bedDiv.addEventListener('click', () => {
                window.location.href = `/luzko?bedid=${bed.id_bed}`
            })
            //bedDiv.appendChild(button)

            bed_in_room_container.appendChild(bedDiv)
        })
    }





})