// --- 1. SETUP ANIMASI MATRIX PINK ---
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "1010101010♥♡*".split(""); 
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) { drops[x] = 1; }

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff3399"; 
    ctx.font = fontSize + "px arial";
    
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);

// Biar responsif kalau layar di-resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// --- 2. SETUP TEKS BERJALAN ---
const textElement = document.getElementById('countdown-number');
const countdownContainer = document.getElementById('countdown-container');
const mainContent = document.getElementById('main-content');

const kataKata = ["3", "2", "1", "HAPPY", "BIRTHDAY", "KOH", "ISNA"];
let indexKata = 0;

textElement.innerText = kataKata[indexKata];

const textInterval = setInterval(() => {
    indexKata++; 
    
    if (indexKata < kataKata.length) {
        textElement.innerText = kataKata[indexKata];
    } else {
        clearInterval(textInterval); 
        
        // Hapus teks matrix & ganti ke background bintang
        countdownContainer.classList.add('hidden'); 
        
        
        // Munculkan kontainer Buku & Galeri
        mainContent.classList.remove('hidden'); 
    }
}, 1000);


// --- 3. LOGIKA INTERAKSI BUKU 3D ---
const stageBuku = document.getElementById('stage-buku');
const stageGaleriHeap = document.getElementById('stage-spam-heap');
const book = document.getElementById('my-book');

const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const btnTutupBuku = document.getElementById('btn-tutup-buku');

const pesanUltraman = document.getElementById('pesan-ultraman');

let bookState = 0; // 0: Cover, 1: Hal 1 Terbuka, 2: Hal 2 Terbuka

// Klik Lembar 1 (Cover)
p1.addEventListener('click', () => {
    if (bookState === 0) {
        p1.classList.add('flipped');
        book.classList.add('open'); 
        bookState = 1;
        pesanUltraman.classList.remove('hidden');

        // JEDA Z-INDEX: Biar covernya muter melayang dulu, baru pindah ke urutan bawah
        setTimeout(() => {
            p1.style.zIndex = 1; 
        }, 400); // 400ms = setengah perjalanan animasi

    } else if (bookState === 1) {
        // Pas nutup, balikin z-index ke atas DULU biar nutupnya nutupin halaman 2
        p1.style.zIndex = 3; 
        p1.classList.remove('flipped');
        book.classList.remove('open');
        bookState = 0;
        pesanUltraman.classList.add('hidden');
    }
});

// Klik Lembar 2
p2.addEventListener('click', () => {
    if (bookState === 1) {
        p2.classList.add('flipped');
        p2.style.zIndex = 2; 
        bookState = 2;
    } else if (bookState === 2) {
        p2.classList.remove('flipped');
        p2.style.zIndex = 2; 
        bookState = 1;
    }
});

// Klik Tombol Tutup & Buka Kado Terakhir
// Klik Tombol Tutup & Buka Kado Terakhir
btnTutupBuku.addEventListener('click', (e) => {
    e.stopPropagation(); // Biar halaman nggak ikutan nge-klik
    stageBuku.classList.add('hidden'); // Sembunyikan buku
    pesanUltraman.classList.add('hidden');
    stageGaleriHeap.classList.remove('hidden'); // Ledakkan spam foto yang padat
});