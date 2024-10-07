// 1. Fetch, load and show catagories in html


// create loadCatagories

const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
};


// create LoadVideos

const loadvideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}


// create displayCatagories

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');

    categories.forEach(item => {
        console.log(item);

        const button = document.createElement('button');
        button.classList = 'btn focus:bg-red-400 text-black';
        button.innerText = item.category;

        categoryContainer.append(button)
    })
};




loadCategories();
loadvideos();