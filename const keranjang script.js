const keranjang = [];

function tambahKeKeranjang(nama, harga) {
  keranjang.push({ nama, harga });
  updateKeranjang();
}

function updateKeranjang() {
  const keranjangList = document.getElementById('keranjang-list');
  if (keranjang.length === 0) {
    keranjangList.innerHTML = '<p>Belum ada produk dipilih.</p>';
    return;
  }

  let total = 0;
  keranjangList.innerHTML = '<ul>' + keranjang.map(item => {
    total += item.harga;
    return <li>${item.nama} - Rp${item.harga.toLocaleString()}</li>;
  }).join('') + </ul><p><strong>Total: Rp${total.toLocaleString()}</strong></p>;
}

<script>
  // Ambil semua tombol "Add to bag"
  const buttons = document.querySelectorAll('.add-to-bag');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const nama = button.getAttribute('data-nama');
      const harga = parseInt(button.getAttribute('data-harga'));

      // Ambil keranjang dari localStorage atau buat baru
      let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

      // Cek apakah produk sudah ada, kalau ada tambahkan jumlah
      const existing = keranjang.find(item => item.nama === nama);
      if (existing) {
        existing.jumlah += 1;
      } else {
        keranjang.push({ nama, harga, jumlah: 1 });
      }

      // Simpan kembali ke localStorage
      localStorage.setItem('keranjang', JSON.stringify(keranjang));

      alert(`${nama} ditambahkan ke keranjang! 🛒`);
    });
  });
</script>
</body>