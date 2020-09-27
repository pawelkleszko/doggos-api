const imgEl = document.querySelector('.doggos__img img');

const getRandomDoggoImg = () => {

    fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(res => console.log(res.message))
        .catch(err => console.log('Coś poszło nie tak!', err));
}

const getDoggoImgByBreed = (breed) => {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(res => res.json())
        .then(res => console.log(res.message))
        .catch(err => console.log('Coś poszło nie tak!', err));
}

const getDoggosBreedList = () => {
    fetch(`https://dog.ceo/api/breeds/list/all`)
        .then(res => res.json())
        .then(res => console.log(res.message))
        .catch(err => console.log('Coś poszło nie tak!', err));
}

getRandomDoggoImg()
getDoggoImgByBreed('boxer')
getDoggosBreedList()