import '../sass/style.scss';

class Doggos {
    constructor() {
        this.imgEl = document.querySelector('.doggos__img img');
        this.apiUrl = 'https://dog.ceo/api/';
        this.btnsBreeds = document.querySelector('.buttons__container');
        this.background = document.querySelector('.doggos__container');
        this.spinnerEl = document.querySelector('.spinner');

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
        this.showLoading();
        this.imgEl.setAttribute('src', img);
        this.hideLoading();
        // this.background.style.backgroundImage = `url("${img}")`;
    }

    init() {
        this.showLoading();
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
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
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

    showLoading() {
        this.spinnerEl.classList.add('spinner--visible');
    }

    hideLoading() {
        this.spinnerEl.classList.remove('spinner--visible');
    }


}

document.addEventListener('DOMContentLoaded', () => {
    new Doggos();
});