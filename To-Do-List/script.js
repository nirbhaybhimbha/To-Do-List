let records = JSON.parse(localStorage.getItem("dataa")) || [];
let isEdit = -1;
let isSelectAll = false;



const submit = () => {
    const task = document.getElementById("task").value;
    const all = {
        task: task
    };

    if (isEdit === -1) {
        records.push(all);
    }
    else {
        const update = records.map((item, index) => {
            if (isEdit === index) {
                return all;
            }
            else return item;
        })
        records = update;
    }

    localStorage.setItem("dataa", JSON.stringify(records));
    displayrecords();
};

const displayrecords = () => {

    document.getElementById("table").innerHTML = records.map((item, index) => {
        return (`           
            <tr>
                <td>${item.task}</td>
                <td>
                    <button  onclick="edit1(${index})">Edit</button>    
                    <button  onclick="delete1(${index})">Delete</button>
                   <td><input type="checkbox" class="checkbox-data" data-index='${index}'/></td>
                </td>
            </tr>
        `);
    }).join("");

    document.querySelectorAll(".checkbox-data").forEach(cb => {
        cb.addEventListener("change", () => {
            // TRUE AND FLASE//
            if (!cb.checked) {
                document.getElementById("checkbox").checked = false;
                isSelectAll = false;
            } else {
                const allChecked = document.querySelectorAll(".checkbox-data:checked").length === records.length;
                document.getElementById("checkbox").checked = allChecked;
                isSelectAll = allChecked;
            }
        });
    });
};
displayrecords();



const search = () => {
    const searchinput = document.getElementById("search").value;
    const searching = records.filter((item) => {
        return item.task.toLowerCase().includes(searchinput)

    });
    records = searching;
    displayrecords();
}
const edit1 = (indexx) => {

    isEdit = indexx;
    const editrecord = records.find((item, index) => index === indexx);

    document.getElementById("task").value = editrecord.task;

    displayrecords();

};

const delete1 = (indexs) => {

    const deleterecord = records.filter((item, index) => {
        return (index !== indexs);
    })
    records = deleterecord;
    localStorage.setItem("dataa", JSON.stringify(records));
    displayrecords();
};


const sortTasks = () => {
    records.sort((a, b) => a.task.localeCompare(b.task));
    localStorage.setItem("dataa", JSON.stringify(records));
    displayrecords();
};

displayrecords();


//  document.getElementById("checkbox").addEventListener("change",function(){
//     document.querySelectorAll(".checkbox-data").forEach(cb=>cb.checked=this.checked);
// });

// const deleteall=()=>{
//     const checkboxes=document.querySelectorAll(".checkbox-data:checked");
//     const remove=Array.from(checkboxes).map(cb=>Number(cb.dataset.index));


//     records=records.filter((_,index)=>!remove.includes(index));
//     localStorage.setItem("dataa",JSON.stringify(records));
//     displayrecords();
// };


document.getElementById("checkbox").addEventListener("change", function () {
    isSelectAll = this.checked;
    document.querySelectorAll(".checkbox-data").forEach(cb => cb.checked = isSelectAll);
});


const deleteall = () => {
    const checkboxes = document.querySelectorAll(".checkbox-data:checked");
    const indexesToRemove = Array.from(checkboxes).map(cb => Number(cb.dataset.index));


    records = records.filter((_, index) => !indexesToRemove.includes(index));
    localStorage.setItem("dataa", JSON.stringify(records));
    secondStep();
};