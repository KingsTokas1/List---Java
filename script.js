let currentID  = 3;

function addTask(){

    let task = document.getElementById("newtask");
    let taskvalue = task.value.trim();

    if (taskvalue === "") {
        Swal.fire({
            title: "Error!",
            text: "Task cannot be empty!",
            icon: "error"

        });
        return;
    }

    let newDate = new Date().toUTCString();

        let template = `<div class="taskcard" id="${currentID}">
                        <p class="task">${taskvalue} - ${newDate}</p>
                        <button onclick="deleteTask('${currentID}')" class="btn btn-danger">Delete</button>
                    </div>`


                    let taskobject = {
                        id: currentID,
                        task: taskvalue,
                        date: newDate

                    }

                    // Store in localStorage
                    let idAsAstring = currentID.toString();
                    let objectAsAstring = JSON.stringify(taskobject);
                    localStorage.setItem(idAsAstring, objectAsAstring);


        let parent = document.getElementById("tasklist");
        parent.innerHTML = parent.innerHTML + template;

        Swal.fire({
            title: "Good job!",
            text: "New task created!",
            icon: "success"
        });
        currentID++;
        task.value = "";
    }

    function deleteTask(id) {

        let element = document.getElementById(id);
        element.remove();

        Swal.fire({
            title: "Task removed!",
            icon: "warning"
        });

    }


    

    let deleteAll = document.getElementById("deleteAll");

    deleteAll.addEventListener("click", function(){
        let parent = document.getElementById("tasklist");
        parent.innerHTML = "";

        // IF YOU WANT TO CLEAR ALL THE STORAGE JUST ADD THIS BELOW
        localStorage.clear();




        Swal.fire({
            title: "All Task removed!",
            icon: "warning"
        });
    });




    function loadFromStorage(){
        // get all the stored task from localStorage
        for (let index = 0; index < localStorage.length; index++) {
            const key = localStorage.key(index);
            let value = localStorage.getItem(key);


        //  convert value String to Object
            let taskobject = JSON.parse(value);
            let id = taskobject.id;
            let task = taskobject.task;
            let date = taskobject.date;


            let template = `<div class="taskcard" id="${id}">
            <p class="task">${task} - ${date}</p>
            <button onclick="deleteTask('${id}')" class="btn btn-danger">Delete</button>
        </div>`


        // attack the template to the parent
        let parent = document.getElementById("tasklist");
        parent.innerHTML = parent.innerHTML + template;
            
        }
    }

    // run the load from the Storage function when the page done loading 
    window.addEventListener('load', function(){
        loadFromStorage();
    })