class Doggos {
    constructor() {
        this.imgEl = document.querySelector('.doggos__img img');
        this.apiUrl = 'https://dog.ceo/api/';
        this.btnsBreeds = document.querySelector('.buttons__container');

        this.init()
    }

    getRandomDoggoImg() {

        return fetch(`${this.apiUrl}breeds/image/random`)
            .then(res => res.json())
            .then(data => data.message)
            .catch(err => console.log('Coś poszło nie tak!', err));
    }

    getDoggoImgByBreed(breed) {
        return fetch(`${this.apiUrl}breed/${breed}/images/random`)
            .then(res => res.json())
            .then(res => res.message)
            .catch(err => console.log('Coś poszło nie tak!', err));
    }

    getDoggosBreedList() {
        return fetch(`${this.apiUrl}breeds/list/all`)
            .then(res => res.json())
            .then(res => res.message)
            .catch(err => console.log('Coś poszło nie tak!', err));
    }

    showDoggo(img) {
        this.imgEl.setAttribute('src', img);
    }

    init() {
        this.getRandomDoggoImg()
            .then(img => this.showDoggo(img))

        this.showBreedButtons();
    }

    addBreed(breed, subBreed) {
        console.log(breed);
        let name;
        let type;
        if (typeof subBreed === 'undefined') {
            name = breed;
            type = breed;
        } else {
            name = `${breed} ${subBreed}`;
            type = `${breed}/${subBreed}`;
        }

        const btn = document.createElement('button');
        btn.classList.add('buttons__btn');
        btn.innerHTML = name;
        btn.addEventListener('click', () => {
            window.scrollTo(0, 0);
            this.getDoggoImgByBreed(type)
                .then(img => this.showDoggo(img))
        })

        this.btnsBreeds.appendChild(btn)
    }

    showBreedButtons() {
        this.getDoggosBreedList()
            .then(breeds => {
                for (const breed in breeds) {
                    if (breeds[breed] === 0) {
                        this.addBreed(breed)
                    } else {
                        for (const subBreed of breeds[breed]) {
                            this.addBreed(breed, subBreed);
                        }
                    }
                }
            })
    }


}

document.addEventListener('DOMContentLoaded', () => {
    new Doggos();
});