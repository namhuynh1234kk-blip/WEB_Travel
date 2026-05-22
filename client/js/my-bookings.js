const token = localStorage.getItem('token');

if (!token) {

    alert('Vui lòng đăng nhập');

    window.location.href = './login.html';
}

async function loadBookings() {

    try {

        const res = await fetch(
            'http://localhost:3000/api/bookings/my',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const bookings = await res.json();

        renderBookings(bookings);

    } catch (error) {

        console.log(error);
    }
}

function renderBookings(bookings) {

    const box =
        document.getElementById('booking-list');

    if (bookings.length === 0) {

        box.innerHTML = `

            <div class="bg-white p-10 rounded-3xl text-center">

                <h2 class="text-3xl font-bold mb-4">
                    Chưa có booking nào
                </h2>

            </div>
        `;

        return;
    }

    box.innerHTML = bookings.map(item => `

        <div class="bg-white rounded-3xl overflow-hidden shadow-lg">

            <div class="grid grid-cols-1 md:grid-cols-3">

                <img
                    src="${item.image}"
                    class="w-full h-full object-cover">

                <div class="md:col-span-2 p-8">

                    <h2 class="text-3xl font-bold mb-3">
                        ${item.title}
                    </h2>

                    <p class="text-zinc-600 mb-2">
                        Người đặt:
                        ${item.full_name}
                    </p>

                    <p class="text-zinc-600 mb-2">
                        SĐT:
                        ${item.phone}
                    </p>

                    <p class="text-zinc-600 mb-2">
                        Số người:
                        ${item.people_count}
                    </p>

                    <p class="text-zinc-600 mb-6">
                        Ghi chú:
                        ${item.note || 'Không có'}
                    </p>

                    <div class="flex items-center justify-between">

                        <h3 class="text-4xl font-bold text-teal-700">
                            ${Number(item.price)
                                .toLocaleString('vi-VN')} ₫
                        </h3>

                        <span class="bg-green-100
                                     text-green-700
                                     px-5 py-2
                                     rounded-full">

                            Đã đặt

                        </span>

                    </div>

                </div>

            </div>

        </div>

    `).join('');
}

loadBookings();