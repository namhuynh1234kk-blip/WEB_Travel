const API = 'http://localhost:3000/api/tours';

const token = localStorage.getItem('token');

let editingId = null;

async function loadTours() {

    const res = await fetch(API);

    const tours = await res.json();

    renderTours(tours);
}

function renderTours(tours) {

    const box =
        document.getElementById('tour-list');

    box.innerHTML = tours.map(tour => `

        <div class="bg-white rounded-3xl overflow-hidden shadow-lg">

            <img
                src="${tour.image}"
                class="w-full h-64 object-cover">

            <div class="p-6">

                <h2 class="text-2xl font-bold mb-2">
                    ${tour.title}
                </h2>

                <p class="text-zinc-600 mb-5">
                    ${tour.subtitle}
                </p>

                <div class="flex gap-3">

                    <button
                        onclick='editTour(${JSON.stringify(tour)})'
                        class="flex-1 bg-blue-500 text-white py-3 rounded-2xl">

                        Sửa

                    </button>

                    <button
                        onclick='deleteTour(${tour.id})'
                        class="flex-1 bg-red-500 text-white py-3 rounded-2xl">

                        Xóa

                    </button>

                </div>

            </div>

        </div>

    `).join('');
}

function openCreateModal() {

    editingId = null;

    document
        .getElementById('tour-form')
        .reset();

    document
        .getElementById('tour-modal')
        .classList.remove('hidden');

    document
        .getElementById('tour-modal')
        .classList.add('flex');
}

function closeModal() {

    document
        .getElementById('tour-modal')
        .classList.add('hidden');
}

function editTour(tour) {

    editingId = tour.id;

    title.value = tour.title;
    subtitle.value = tour.subtitle;
    description.value = tour.description;
    country.value = tour.country;
    price.value = tour.price;
    image.value = tour.image;
    date.value = tour.date;

    document
        .getElementById('tour-modal')
        .classList.remove('hidden');

    document
        .getElementById('tour-modal')
        .classList.add('flex');
}

async function deleteTour(id) {

    const confirmDelete =
        confirm('Xóa tour này?');

    if (!confirmDelete) return;

    await fetch(`${API}/${id}`, {
        method: 'DELETE',

        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    loadTours();
}

document
    .getElementById('tour-form')
    .addEventListener(
        'submit',
        async (e) => {

            e.preventDefault();

            const data = {
                title: title.value,
                subtitle: subtitle.value,
                description: description.value,
                country: country.value,
                price: price.value,
                image: image.value,
                date: date.value
            };

            if (editingId) {

                await fetch(
                    `${API}/${editingId}`,
                    {
                        method: 'PUT',

                        headers: {
                            'Content-Type':
                                'application/json',

                            Authorization:
                                `Bearer ${token}`
                        },

                        body: JSON.stringify(data)
                    }
                );

            } else {

                await fetch(API, {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json',

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify(data)
                });
            }

            closeModal();

            loadTours();
        }
    );

loadTours();