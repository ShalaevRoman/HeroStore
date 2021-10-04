class DataStore {
    constructor(){
        this.data = [];
    }
 
    getLastId() {
        return this.data.reduce((acc, obj) => {
                    if(obj.id > acc){
                        acc = obj.id;
                    }
                    return acc;
                }, 0);
    }

    add(obj){
        this.data.push({...obj, id: this.getLastId() + 1});
        dataStore.render();
    }

    delete(id){
       this.data = this.data.filter(obj => obj.id !== id)
       dataStore.render();
    }

    render(){
         let html = this.data.reduce((acc, obj) => {
                return  acc += `<tr>
                                    <td>${obj.name}</td>
                                    <td>${obj.comics}</td>
                                    <td>
                                        <label class="heroFavouriteInput">
                                            Favourite: <input type="checkbox" ${obj.favourite ? 'checked' : ''}>
                                        </label>
                                    </td>
                                    <td><button type="button" data-delete="${obj.id}">Delete</button></td>
                                </tr>`
        }, '')

        const tBody = document.querySelector('[name="tbody"]');
        tBody.innerHTML = html;

    }
}

const heroesForm = document.querySelector('#heroesForm');
const heroesTable = document.querySelector('#heroesTable');
const dataStore = new DataStore;

heroesForm.addEventListener("submit", e => {
    e.preventDefault();
    const obj = {
        name: e.target.querySelector('[data-name="heroName"]').value,
        comics: e.target.querySelector('[data-name="heroComics"]').value,
        favourite: e.target.querySelector('[data-name="heroFavourite"]').checked
    };

    dataStore.add(obj);
    heroesForm.reset();
})

heroesTable.addEventListener('click', event => {
    console.dir(event.target);
    if(event.target.type === "button"){
        dataStore.delete(+event.target.dataset.delete);
    }
});



