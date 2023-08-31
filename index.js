const loadCard = async () => {
    const res = await fetch (`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await res.json()
    const categories = data.data;
    console.log(categories);
    displayCategory(categories);
}

const displayCategory = (categories) =>{
    const categoryContainer = document.getElementById('category-container');
        const categoryTab = document.createElement('div');
        categoryTab.classList = `flex items-center justify-center gap-3`;
        // 3: set inner html
        categoryTab.innerHTML = `
        <h2 onclick = "catagoryLoader('${categories[0].category_id=1000}')" class="py-1 bg-slate-300 hover:bg-red-600 hover:text-white px-5  transition-all text-black rounded">${categories[0]?.category}</h2>
        <h2 onclick = "catagoryLoader('${categories[1].category_id}')" class="py-1 bg-slate-300 hover:bg-red-600 hover:text-white px-5  transition-all text-black rounded">${categories[1]?.category}</h2>
        <h2 onclick = "catagoryLoader('${categories[2].category_id}')" class="py-1 bg-slate-300 hover:bg-red-600 hover:text-white px-5  transition-all text-black rounded">${categories[2]?.category}</h2>
        <h2 onclick = "catagoryLoader('${categories[3].category_id}')" class="py-1 bg-slate-300 hover:bg-red-600 hover:text-white px-5  transition-all text-black rounded">${categories[3]?.category}</h2>
        `;
        // 4 append child
        categoryContainer.appendChild(categoryTab);

}

const catagoryLoader = async (id) =>{
//    console.log(id);
        // console.log("clicked show detail",id);
        const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        const data = await res.json()
        // console.log(data.data);
        showCatagoryCard(data.data)
}

const showCatagoryCard = showcatagory => {
    const showCategoryDetails = document.getElementById('show-category-details');
    showCategoryDetails.textContent = '';
    showcatagory.forEach(catagorydetails => {
        console.log(catagorydetails.authors.profile_picture);
        // 2 create a div
        const catagoryCard = document.createElement('div');
        catagoryCard.classList = `card card-compact bg-base-100 relative `;
        // 3: set inner html
        catagoryCard.innerHTML = `
        <img class="relative rounded-lg" src="${catagorydetails.thumbnail}" alt="Shoes" />
                <div class="card-body">
                <div class="flex gap-3 ">
                  <div><img class="w-14 rounded-full" src="${catagorydetails.authors[0].profile_picture}" alt=""></div>
                  <div class="flex-1 space-y-1"><h2 class="card-title">${catagorydetails.title}</h2>
                    <p class="text-[14px]">${catagorydetails.authors[0].profile_name}</p>
                    <p>${catagorydetails.others.views} Views</p></div>
        </div>
        </div>
        `;
        // 4 append child
        showCategoryDetails.appendChild(catagoryCard);
    });
}
loadCard();
catagoryLoader(1000)