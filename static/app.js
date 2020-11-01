const BASE_URL = "http://127.0.0.1:5000/api";
const DIV = document.getElementById('cupcakesdiv');
const submit = document.querySelector('form');

class Cupcake {
    constructor(baseUrl, ul) {
        this.baseUrl = baseUrl
        this.ul = ul
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

    formHandler(e) {
        // e.preventDefault();
        const flavor = document.getElementById("flavor").value;
        const size = document.getElementById("size").value;
        const rating = document.getElementById("rating").value;
        const image = document.getElementById("image_url").value;
        this.addCupcake(flavor, size, rating, image)
        submit.reset()
        window.location.reload();
        return false;
    }
}

const cupcake = new Cupcake(BASE_URL, DIV);


submit.addEventListener('submit', function (e) { cupcake.formHandler(e); });


$('.remove').click(deleteCupcake)

async function deleteCupcake() {
  const id = $(this).data('id')
  await axios.delete(`/api/cupcakes/${id}`)
  $(this).parent().remove()
}
