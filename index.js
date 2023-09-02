const loadCard = async (sort) => {
  const res = await fetch (`https://openapi.programming-hero.com/api/videos/categories`)
  const data = await res.json()
  const categories = data.data;
  displayCategory(categories,sort);
}

const displayCategory = (categories,sort) =>{
  const categoryContainer = document.getElementById('category-container');
      for (const category of categories){
        const categoryTab = document.createElement('div');
        categoryTab.classList = `flex items-center justify-center gap-3`;
        categoryTab.innerHTML = `
        <button id="category-item"  onclick = "catagoryLoader('${category.category_id}',${sort})" class="py-1 bg-slate-300 hover:bg-red-600 hover:text-white px-5  transition-all text-black rounded">${category?.category}</button>
        `
        if(!sort){
          categoryContainer.appendChild(categoryTab);
        }   
      }
}

const catagoryLoader = async (id,sort) =>{
      console.log(sort);
      const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
      const data = await res.json()
      const category = data.data
        category.forEach((item) => {
          item.others.views = parseFloat(item.others.views); // Convert to integer if necessary
        });
      
        // Sort the category array based on views in descending order
        category.sort((a, b) => b.others.views - a.others.views);
      showCatagoryCard(category)
     
     
}

const showCatagoryCard = (showcatagory) => {
  const showCategoryDetails = document.getElementById('show-category-details');
  showCategoryDetails.textContent = '';
  const noDataMessage = document.getElementById('no-data-message');
  noDataMessage.textContent = '';

  if(showcatagory == false){
      noDataMessage.innerHTML = `
      <div class="text-center space-y-6 my-10">
      <div class="flex justify-center"><img src="./img/Icon.png" alt=""></div>
      <h2 class="text-3xl">Oops!! Sorry, There is no content here</h2>
      </div>
      `
  }
  

  showcatagory.forEach(catagorydetails => {
      // 2 create a div
      const catagoryCard = document.createElement('div');
      catagoryCard.classList = `card card-compact bg-base-100 relative shadow-lg`;
      const seconds = catagorydetails.others.posted_date;
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      console.log(catagorydetails.others.views);


      catagoryCard.innerHTML = `
      <img class="relative rounded-lg rounded-b-none h-72 " src="${catagorydetails.thumbnail}" alt="Shoes" />
      <h2 id="time" class="absolute right-4 bottom-32 bg-black text-white px-2 rounded-lg">${hours?hours+' hrs':""} ${minutes?minutes+' min':""} </h2>
      <div class="card-body">
              <div class="flex gap-3 ">
                <div><img class="w-14 h-14 rounded-full" src="${catagorydetails.authors[0].profile_picture}" alt=""></div>
                <div class="flex-1 space-y-1"><h2 class="card-title">${catagorydetails.title}</h2>
                  <p class="text-[14px]">${catagorydetails.authors[0].profile_name} ${catagorydetails.authors[0].verified ?'<i class="fa-solid fa-circle-check" style="color: #0b6eef;"></i>':"" } </p>
                  <p>${catagorydetails.others.views+"K"} Views</p>
      </div>
      </div>
      </div>
      `;
      // 4 append child
      showCategoryDetails.appendChild(catagoryCard);
  });

}
loadCard();
catagoryLoader(1000)