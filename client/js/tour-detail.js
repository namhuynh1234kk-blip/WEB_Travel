const params = new URLSearchParams(window.location.search);

const id = params.get('id');

async function loadTourDetail() {

    try {

        const res = await fetch(`http://localhost:3000/api/tours/${id}`);

        const tour = await res.json();

        renderTour(tour);

    } catch (error) {

        console.log(error);

    }
}

function renderTour(tour) {

    const box = document.getElementById('tour-detail');

    box.innerHTML = `

        <div class="max-w-6xl mx-auto py-20 px-8">

            <img src="${tour.image}"
                 class="w-full h-[500px] object-cover rounded-3xl mb-10">

            <h1 class="text-5xl font-bold mb-4">
                ${tour.title}
            </h1>

            <p class="text-2xl text-teal-700 mb-8">
                ${tour.subtitle}
            </p>

            <p class="text-zinc-700 leading-8 text-lg mb-10">
                ${tour.description}
            </p>

            <div class="flex items-center justify-between">

                <div>
                    <p class="text-zinc-500">Giá từ</p>

                    <h2 class="text-5xl font-bold text-teal-700">
                        ${Number(tour.price).toLocaleString('vi-VN')} ₫
                    </h2>
                </div>

               <button
    onclick="openBookingModal()"
    class="bg-teal-700 text-white px-10 py-5 rounded-2xl text-xl">

    Đặt tour ngay

</button>

            </div>

        </div>

    `;
}
function openBookingModal() {

    const token = localStorage.getItem('token');

    if (!token) {

        alert('Vui lòng đăng nhập');

        window.location.href = './login.html';

        return;
    }

    document
        .getElementById('booking-modal')
        .classList.remove('hidden');

    document
        .getElementById('booking-modal')
        .classList.add('flex');
}

function closeBookingModal() {

    document
        .getElementById('booking-modal')
        .classList.add('hidden');
}

const bookingForm =
    document.getElementById('booking-form');

bookingForm.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        const token =
            localStorage.getItem('token');

        const full_name =
            document.getElementById('full_name').value;

        const phone =
            document.getElementById('phone').value;

        const people_count =
            document.getElementById('people_count').value;

        const note =
            document.getElementById('note').value;

        try {

            const res = await fetch(
                'http://localhost:3000/api/bookings',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        tour_id: id,
                        full_name,
                        phone,
                        people_count,
                        note
                    })
                }
            );

            const data = await res.json();

            if (!res.ok) {

                alert(data.message);

                return;
            }

            alert('Đặt tour thành công');

            closeBookingModal();

        } catch (error) {

            console.log(error);
        }
    }
);
loadTourDetail();