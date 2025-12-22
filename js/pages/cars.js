var allCars = [];
var currentPage = 1;
var carsPerPage = 6;


function createCarCard(car) {
    var image = car.thumbnail;
    var title = car.title;
    var description = car.description.substring(0, 30) + '...';
    var price = '$' + car.price;
    var detailsUrl = '/pages/cars_landing/car-details.html?id=' + car.id;

    var html = '<div class="group flex flex-col bg-white dark:bg-[#1a202c] rounded-xl border border-[#dbdfe6] dark:border-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">';
    html += '<div class="relative h-48 w-full overflow-hidden">';
    html += '<img class="h-full w-full object-cover" src="' + image + '" />';
    html += '<div class="absolute top-3 right-3">';
    html += '<button class="flex items-center justify-center size-8 rounded-full bg-white/90 text-gray-500 hover:text-red-500">';
    html += '<span class="material-symbols-outlined text-[20px]">favorite</span>';
    html += '</button></div></div>';
    html += '<div class="p-4 flex flex-col flex-1">';
    html += '<h3 class="text-lg font-bold text-[#111318] dark:text-white mb-1">' + title + '</h3>';
    html += '<p class="text-sm text-[#616f89] mb-3">' + description + '</p>';
    html += '<div class="flex items-center gap-4 border-y border-[#f0f2f4] py-3 mb-4">';
    html += '<div class="flex flex-col items-center gap-1 flex-1">';
    html += '<span class="material-symbols-outlined text-gray-400 text-[18px]">calendar_month</span>';
    html += '<span class="text-xs font-medium">2023</span></div>';
    html += '<div class="flex flex-col items-center gap-1 flex-1">';
    html += '<span class="material-symbols-outlined text-gray-400 text-[18px]">settings</span>';
    html += '<span class="text-xs font-medium">Auto</span></div>';
    html += '<div class="flex flex-col items-center gap-1 flex-1">';
    html += '<span class="material-symbols-outlined text-gray-400 text-[18px]">local_gas_station</span>';
    html += '<span class="text-xs font-medium">Petrol</span></div></div>';
    html += '<div class="mt-auto flex items-center justify-between gap-3">';
    html += '<p class="text-xl font-black text-[#111318] dark:text-white">' + price + '</p>';
    html += '<a href="' + detailsUrl + '" class="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-lg">View Details</a>';
    html += '</div></div></div>';

    return html;
}


function renderCars() {
    var container = document.getElementById('cars-grid');


    var start = (currentPage - 1) * carsPerPage;
    var end = start + carsPerPage;
    var carsToShow = allCars.slice(start, end);

    var html = '';
    for (var i = 0; i < carsToShow.length; i++) {
        html = html + createCarCard(carsToShow[i]);
    }

    container.innerHTML = html;
    document.getElementById('results-count').textContent = allCars.length;
    document.getElementById('page-number').textContent = currentPage;


    var totalPages = Math.ceil(allCars.length / carsPerPage);
    document.getElementById('prev-btn').disabled = (currentPage === 1);
    document.getElementById('next-btn').disabled = (currentPage >= totalPages);
}


function prevPage() {
    if (currentPage > 1) {
        currentPage = currentPage - 1;
        renderCars();
    }
}


function nextPage() {
    var totalPages = Math.ceil(allCars.length / carsPerPage);
    if (currentPage < totalPages) {
        currentPage = currentPage + 1;
        renderCars();
    }
}


allCars = getAllCars();
renderCars();
