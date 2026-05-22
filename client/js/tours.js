async function loadTours() {

    try {

        const res = await fetch('http://localhost:3000/api/tours');

        const tours = await res.json();

        renderTours(tours);

    } catch (error) {

        console.log(error);

    }
}

function renderTours(tours) {

    const grid = document.getElementById('tour-grid');

    grid.innerHTML = tours.map(tour => `

        <div class="tour-card bg-white rounded-3xl overflow-hidden">

          <div class="relative">

            <img src="${tour.image}" 
                 class="w-full h-64 object-cover" 
                 alt="${tour.title}">

            <div class="absolute top-4 right-4 bg-white px-4 py-1 rounded-full text-sm font-medium shadow">
              ${tour.date}
            </div>

          </div>

          <div class="p-8">

            <h3 class="text-2xl font-semibold mb-2">
              ${tour.title}
            </h3>

            <p class="text-teal-700 mb-6">
              ${tour.subtitle}
            </p>

            <div class="flex items-end justify-between">

              <div>
                <span class="text-3xl font-bold text-teal-800">
                  ${Number(tour.price).toLocaleString('vi-VN')}
                </span>

                <span class="text-sm text-zinc-500"> ₫</span>
              </div>

              <a href="./pages/tour-detail.html?id=${tour.id}"
                 class="bg-teal-700 text-white px-8 py-3 rounded-2xl hover:bg-teal-800 transition">
                 Đặt ngay
              </a>

            </div>

          </div>

        </div>

    `).join('');
}

loadTours();