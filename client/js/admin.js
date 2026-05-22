const token = localStorage.getItem('token');

if (!token) {

    alert('Vui lòng đăng nhập');

    window.location.href = './login.html';
}

async function loadBookings() {

    try {

        const res = await fetch(
            'http://localhost:3000/api/bookings',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await res.json();

        if (!res.ok) {

            alert(data.message);

            return;
        }

        renderBookings(data);

    } catch (error) {

        console.log(error);
    }
}

function renderBookings(bookings) {

    const box =
        document.getElementById('booking-list');

    box.innerHTML = bookings.map(item => `

        <div class="bg-white rounded-3xl p-6 shadow">

            <div class="flex gap-6">

                <img
                    src="${item.image}"
                    class="w-52 h-40 rounded-2xl object-cover">

                <div class="flex-1">

                    <h2 class="text-3xl font-bold mb-3">
                        ${item.title}
                    </h2>

                    <p class="mb-2">
                        User:
                        ${item.user_name}
                    </p>

                    <p class="mb-2">
                        Họ tên:
                        ${item.full_name}
                    </p>

                    <p class="mb-2">
                        SĐT:
                        ${item.phone}
                    </p>

                    <p class="mb-2">
                        Số người:
                        ${item.people_count}
                    </p>

                    <p class="mb-5">
                        Note:
                        ${item.note || 'Không có'}
                    </p>

                    <div class="flex justify-between">

                        <h3 class="text-3xl
                                   font-bold
                                   text-teal-700">

                            ${Number(item.price)
                                .toLocaleString('vi-VN')} ₫
                        </h3>

                        <span
                            class="bg-green-100
                                   text-green-700
                                   px-5 py-2
                                   rounded-full">

                            Đã thanh toán

                        </span>

                    </div>

                </div>

            </div>

        </div>

    `).join('');
}

loadBookings();