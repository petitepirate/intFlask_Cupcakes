const BASE_URL = "http://127.0.0.1:5000/api";
const UL = document.querySelector('UL');
const submit = document.querySelector('form');
const delbtn = document.querySelector('.del-btn');
class Cupcake {
    constructor(baseUrl, ul) {
        this.baseUrl = baseUrl
        this.ul = ul
    }

    cupcakeElement(cupcake) {
        const li = document.createElement('LI');
        li.setAttribute("cupcake-id", cupcake.id);
        li.innerHTML = `<img class="Cupcake-img"
		src="${cupcake.image}" height=200>
        ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
        <button class="del-btn">X</button>`  //probably will need to do the delete button differently
        return li;
    }


    async showCupcakes() {
        const response = await axios.get(`${this.baseUrl}/cupcakes`)
        for (let cupcake of response.data) {
            let newCupcake = this.cupcakeElement(cupcake);
            this.ul.append(newCupcake)
        }
    }

    async addCupcake(flavor, size, rating, image) {
        const response = await axios.post(`${this.baseUrl}/cupcakes`, {
            flavor: flavor,
            size: size,
            rating: rating,
            image: image
        })
        console.log(response)
    }

    clearCupcakes() {
        this.ul.innerHTML = '';
    }

    formHandler(e) {
        e.preventDefault();
        const flavor = document.getElementById("flavor").value;
        const size = document.getElementById("size").value;
        const rating = document.getElementById("rating").value;
        const image = document.getElementById("image_url").value;
        this.addCupcake(flavor, size, rating, image)
        submit.reset()
        this.clearCupcakes()
        this.showCupcakes()
    }
}

const cupcake = new Cupcake(BASE_URL, UL);
cupcake.showCupcakes();

submit.addEventListener('submit', function (e) { cupcake.formHandler(e); });


//started but not finished.  returning null at the moment
delbtn.addEventListener('click', function() {
    print('you clicked');
})

