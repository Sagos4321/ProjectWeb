// --- KONFIGURASI & DATA MOCK ---

const API_KEY = ""; // Masukkan API Key Gemini Anda di sini jika ada

const AVATARS = [
  "https://api.dicebear.com/7.x/bottts/svg?seed=Felix",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Aria",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Luna",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Milo",
];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=1200";

// --- STATE MANAGEMENT DENGAN LOCALSTORAGE ---

const DEFAULT_REPORTS = [
  {
    id: "1",
    title: "Proyek Suaka Kalimantan",
    description:
      "Relawan menanam lebih dari 500 bibit pohon di zona penyangga yang rusak hari ini, memulihkan habitat kritis bagi orangutan yang terancam punah.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2pBN2xsI-WETN9ZReivhcKUAw6FzPRp0W3iZIWf-49zlOO7r9HgVQSaC4lE3XKTl_cy23g5X-r12A4QftzaR3T5GYEzqxD1XNUG8HGjTN_MHCZPiRMYNB-Z6-gbYR1n7h_wuC2zU0UmQ38FfJDBKkkpczAbfCD-V9Q18pM7NZ9F78ZCgaeri_p9x2zEF3RLg6LiouzBVhjqKRwGNLmDG8XgoxwCW7HduXdqaZC1E3qyX809fdigBHtU3e5nSxOSJ66k8KHLcZBsnA",
    location: "Kalimantan, Indonesia",
    userId: "u1",
    userName: "Tim Reboisasi",
    userAvatar: AVATARS[0],
    createdAt: new Date().toISOString(),
    category: "Hutan",
    status: "Sedang Berlangsung",
    likes: 124,
    comments: [],
  },
  {
    id: "2",
    title: "Pembersihan Plastik Pesisir",
    description:
      "Upaya komunitas berhasil mengangkat 2 ton mikroplastik dari garis pantai sebelum musim pasang besar. Kami membutuhkan lebih banyak relawan untuk minggu depan.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXCAGJQvVdUQXoRXiARkZL7Fn8ThU45bqAwTSA-7jiXIkqVjDtNnqep3OLdtqTjwUWwZcnChhHHQmZAsKivPgxjzEEl9FA-yFEZOZxY9OBLI_7U5-ePftatAS0GK7QTvRCKGfojwMhizqIB5xYaXq7TXm1ubTqx3WQEUL_pjU-ytfvY9SqHRHGjsTwsb0jwN_JFXUTumTcKDaYPt81n5DpbhzgjTRuZxhmKpw_efqZF3i6wOu0HSvBXyukwwAPkdcUcJVN2QO5QliF",
    location: "Pesisir Pasifik, AS",
    userId: "u2",
    userName: "Ocean Guardians",
    userAvatar: AVATARS[1],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    category: "Laut",
    status: "Selesai",
    likes: 89,
    comments: [],
  },
  {
    id: "3",
    title: "Taman Vertikal",
    description:
      "Menerapkan kebijakan arsitektur gedung tinggi berkelanjutan baru untuk meningkatkan kadar oksigen perkotaan dan mengurangi efek pulau panas (heat island).",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCDLZGCMndF9PjDnhSLFTmKXKtslzYoeXYGEzrS_mwhxvNPMvF7gLK9GWlgEyg2BVZSsAg6tb5i3ixgau1QYlb4nzRIKZM0e-8drFDFStvoRHqbYNghAcJtxmiBkRIllWDUo9GS0JQkX-0JQpKMn5QOL_YZVHrZbpxAs_fw-Z_1CwYty4ucbYhnXvJkw2tFkulvbKqn6N106UqO-FyksZm9gAedOoGFv1wzlyipVcGY5-QCxUb_2eFZ5zQHwf_mfXTHFOTxV8ANdXK",
    location: "Singapura",
    userId: "u3",
    userName: "Urban Green",
    userAvatar: AVATARS[3],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    category: "Perkotaan",
    status: "Baru",
    likes: 210,
    comments: [],
  },
];

function loadState() {
  const saved = localStorage.getItem("ecoState");
  let parsed = {
    view: "home",
    isLoggedIn: false,
    selectedReportId: null,
    currentUser: {
      id: "u_curr",
      name: "Pengguna Baru",
      email: "",
      avatar: AVATARS[2],
      isLoggedIn: false,
    },
    reports: [...DEFAULT_REPORTS],
  };

  if (saved) {
    try {
      const savedState = JSON.parse(saved);
      // Merge saved state with default structure
      parsed = { ...parsed, ...savedState };
      parsed.view = "home"; // Reset view

      // Pastikan laporan default (ID 1, 2, 3) selalu ada dan terupdate jika hilang
      // Ini penting agar kartu statis di HTML selalu bisa dibuka
      DEFAULT_REPORTS.forEach((defReport) => {
        const exists = parsed.reports.find((r) => r.id === defReport.id);
        if (!exists) {
          parsed.reports.push(defReport);
        }
      });
    } catch (e) {
      console.error("Gagal memuat state, reset ke default", e);
      localStorage.removeItem("ecoState");
    }
  }
  return parsed;
}

function saveState() {
  localStorage.setItem("ecoState", JSON.stringify(state));
}

const state = loadState();

// --- UTILITIES ---

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " tahun lalu";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " bulan lalu";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " hari lalu";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " jam lalu";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " menit lalu";
  return "Baru saja";
}

function showToast(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span class="material-symbols-outlined text-sm">check_circle</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- Helper Functions untuk Auth (Scope Global) ---
const getUsers = () => JSON.parse(localStorage.getItem("eco_users") || "[]");
const saveUserToDB = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("eco_users", JSON.stringify(users));
};
const setCurrentUser = (user) => {
  localStorage.setItem("eco_current_user", JSON.stringify(user));
  updateAuthUI(user);
};
const getCurrentUser = () =>
  JSON.parse(localStorage.getItem("eco_current_user"));
const logout = () => {
  localStorage.removeItem("eco_current_user");
  updateAuthUI(null);
  showToast("Anda telah keluar.");
};

// Update UI based on auth state
function updateAuthUI(user) {
  const desktopLoginBtn = document.getElementById("loginBtn");
  const mobileLoginBtn = document.getElementById("mobileLoginBtn");

  if (user) {
    // State: Logged In
    if (desktopLoginBtn) {
      desktopLoginBtn.innerHTML = `<span class="material-symbols-outlined">account_circle</span> ${user.name}`;
      // Override click to logout confirm
      desktopLoginBtn.onclick = (e) => {
        e.preventDefault();
        if (confirm(`Halo ${user.name}, ingin keluar akun?`)) logout();
      };
    }
    if (mobileLoginBtn) {
      mobileLoginBtn.innerHTML = `<span class="material-symbols-outlined align-middle mr-1">logout</span> Keluar (${user.name})`;
      mobileLoginBtn.onclick = (e) => {
        e.preventDefault();
        logout();
      };
    }
  } else {
    // State: Logged Out
    if (desktopLoginBtn) {
      desktopLoginBtn.innerText = "Masuk";
    }
    if (mobileLoginBtn) {
      mobileLoginBtn.innerText = "Masuk / Daftar";
    }
  }
}

// --- SERVICES (GEMINI AI MOCK/FALLBACK) ---
async function getEnvironmentalAdvice(reportTitle, reportDesc) {
  if (!API_KEY) {
    return Promise.resolve(
      "Tetap waspada dan terus dokumentasikan perubahan lingkungan. Bersama-sama kita bisa membuat perbedaan."
    );
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Sebagai pakar lingkungan, berikan nasihat singkat (2-3 kalimat) bahasa Indonesia tentang: Judul: "${reportTitle}", Deskripsi: "${reportDesc}".`,
              },
            ],
          },
        ],
      }),
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tetap waspada dan terus dokumentasikan perubahan lingkungan. Bersama-sama kita bisa membuat perbedaan.";
  }
}

// --- FUNGSI RENDER UTAMA ---
function render() {
  const homeView = document.getElementById("home-view");
  const dynamicView = document.getElementById("dynamic-view");

  if (!homeView || !dynamicView) return;

  // Cek session user untuk update UI header
  const sessionUser = getCurrentUser();
  updateAuthUI(sessionUser);

  if (state.view === "home") {
    homeView.classList.remove("hidden");
    dynamicView.classList.add("hidden");
    // Pastikan scroll ke atas jika baru load
  } else if (state.view === "detail") {
    homeView.classList.add("hidden");
    dynamicView.classList.remove("hidden");
    dynamicView.innerHTML = renderReportDetail();
    window.scrollTo(0, 0);
  }
}

// --- FUNGSI RENDER DETAIL LAPORAN ---
function renderReportDetail() {
  const report = state.reports.find((r) => r.id === state.selectedReportId);
  if (!report)
    return '<div class="text-center py-20 text-xl font-bold">Laporan tidak ditemukan. <button onclick="navigate(\'home\')" class="text-primary underline">Kembali</button></div>';

  return `
    <div class="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl overflow-hidden border border-neutral-100 fade-in">
        <div class="relative h-[40vh] md:h-[60vh]">
            <img src="${
              report.imageUrl
            }" class="w-full h-full object-cover" alt="${report.title}">
            <div class="absolute inset-0 bg-black/30"></div>
            <button onclick="navigate('home')" class="absolute top-6 left-6 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-all z-10">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-black/80 to-transparent">
                <span class="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold mb-4 inline-block">${
                  report.category
                }</span>
                <h1 class="text-3xl md:text-5xl font-bold text-white mb-2">${
                  report.title
                }</h1>
                <div class="flex items-center gap-4 text-white/90 text-sm md:text-base">
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-lg">location_on</span> ${
                      report.location
                    }</span>
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-lg">calendar_today</span> ${new Date(
                      report.createdAt
                    ).toLocaleDateString("id-ID")}</span>
                </div>
            </div>
        </div>
        <div class="p-6 md:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div class="lg:col-span-2 space-y-6">
                <h3 class="text-2xl font-bold text-[#151613]">Tentang Laporan Ini</h3>
                <p class="text-[#151613]/80 leading-relaxed text-lg">${
                  report.description
                }</p>
                
                <div class="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mt-8">
                    <div class="flex items-center gap-2 mb-3 text-indigo-700 font-bold">
                        <span class="material-symbols-outlined">psychology</span>
                        <span>Analisis AI Eco Justice</span>
                    </div>
                    <p class="text-indigo-900/80 text-sm leading-relaxed italic">
                        "Berdasarkan data visual, inisiatif ini memberikan dampak positif signifikan terhadap ekosistem lokal. Diperlukan pemantauan berkelanjutan untuk memastikan keberhasilan jangka panjang."
                    </p>
                </div>

                <div class="pt-10 border-t border-neutral-100 mt-10">
                    <h3 class="text-xl font-bold text-[#151613] mb-6">Diskusi (${
                      report.comments.length
                    })</h3>
                    <div class="space-y-6 mb-8">
                        ${
                          report.comments.length === 0
                            ? '<p class="text-neutral-400 italic">Belum ada komentar. Jadilah yang pertama!</p>'
                            : report.comments
                                .map(
                                  (c) => `
                            <div class="flex gap-4">
                                <div class="size-10 rounded-full bg-neutral-200 flex-shrink-0 overflow-hidden">
                                    <img src="${
                                      c.userAvatar
                                    }" class="w-full h-full object-cover">
                                </div>
                                <div>
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="font-bold text-sm">${
                                          c.userName
                                        }</span>
                                        <span class="text-xs text-neutral-400">${timeAgo(
                                          c.createdAt
                                        )}</span>
                                    </div>
                                    <p class="text-sm text-neutral-600">${
                                      c.text
                                    }</p>
                                </div>
                            </div>
                        `
                                )
                                .join("")
                        }
                    </div>
                    <form onsubmit="handleSubmitComment(event, '${
                      report.id
                    }')" class="flex gap-3">
                        <input type="text" id="commentInput" placeholder="Tulis tanggapan Anda..." class="flex-1 bg-neutral-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary" required>
                        <button type="submit" class="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors">Kirim</button>
                    </form>
                </div>
            </div>
            <div class="lg:col-span-1">
                <div class="bg-neutral-50 p-6 rounded-3xl sticky top-24">
                    <h4 class="font-bold text-[#151613] mb-4">Dukungan Komunitas</h4>
                    <div class="flex items-center gap-4 mb-6">
                        <button onclick="handleLike('${
                          report.id
                        }')" class="flex-1 flex items-center justify-center gap-2 bg-white border border-neutral-200 py-3 rounded-xl font-bold text-sm hover:border-primary hover:text-primary transition-all ${
    report.likes > 0 ? "text-primary border-primary bg-primary/5" : ""
  }">
                            <span class="material-symbols-outlined ${
                              report.likes > 0 ? "fill-current" : ""
                            }">favorite</span>
                            ${report.likes} Dukungan
                        </button>
                        <button onclick="showToast('Tautan disalin ke clipboard!')" class="size-12 flex items-center justify-center bg-white border border-neutral-200 rounded-xl hover:bg-neutral-100">
                            <span class="material-symbols-outlined">share</span>
                        </button>
                    </div>
                    <div class="space-y-4">
                        <div class="flex items-center gap-3">
                            <div class="size-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-primary">
                                <span class="material-symbols-outlined">person</span>
                            </div>
                            <div>
                                <p class="text-xs text-neutral-400">Dilaporkan oleh</p>
                                <p class="font-bold text-sm">${
                                  report.userName
                                }</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="size-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-primary">
                                <span class="material-symbols-outlined">verified</span>
                            </div>
                            <div>
                                <p class="text-xs text-neutral-400">Status Laporan</p>
                                <p class="font-bold text-sm text-green-600">${
                                  report.status
                                }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

// --- LOGIC HANDLERS ---

function navigate(view) {
  state.view = view;
  saveState();
  render();
}

function openReport(id) {
  state.selectedReportId = id;
  navigate("detail");
}

function filterReports(category) {
  const cards = document.querySelectorAll(".report-card");
  const buttons = document.querySelectorAll(".filter-btn");

  // Update tombol aktif
  buttons.forEach((btn) => {
    if (
      btn.textContent.toLowerCase().includes(category) ||
      (category === "all" && btn.textContent.includes("Semua"))
    ) {
      btn.classList.remove("bg-white", "text-[#151613]");
      btn.classList.add("bg-[#151613]", "text-white");
    } else {
      btn.classList.add("bg-white", "text-[#151613]");
      btn.classList.remove("bg-[#151613]", "text-white");
    }
  });

  // Filter kartu
  cards.forEach((card) => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "block";
      card.classList.add("fade-in");
    } else {
      card.style.display = "none";
    }
  });
}

function handleStaticReportSubmit(e) {
  e.preventDefault();
  const type = document.getElementById("incident-type").value;
  const location = document.getElementById("location").value;
  const desc = document.getElementById("description").value;
  const isAnonymous = document.getElementById("isAnonymous")?.checked;

  if (!location || !desc) {
    showToast("Mohon lengkapi lokasi dan deskripsi.");
    return;
  }

  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = `<span class="animate-spin material-symbols-outlined">refresh</span> Mengirim...`;
  btn.disabled = true;

  setTimeout(() => {
    try {
      // Ambil gambar dari localStorage jika ada
      const uploadedImage = localStorage.getItem("");
      
      // Tambahkan ke state (mock)
      const newReport = {
        id: Date.now().toString(),
        title: type !== "Pilih tipe..." ? type : "Laporan Warga",
        description: desc,
        location: location,
        imageUrl: uploadedImage || "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=1200",
        category: "Lainnya",
        userId: isAnonymous ? "anon" : state.currentUser.id || "anon",
        userName: isAnonymous
          ? "Anonim"
          : state.currentUser.name || "Pengguna Baru",
        userAvatar: isAnonymous
          ? "https://api.dicebear.com/7.x/bottts/svg?seed=Anon"
          : state.currentUser.avatar || AVATARS[2],
        createdAt: new Date().toISOString(),
        status: "Menunggu Verifikasi",
        likes: 0,
        comments: [],
      };

      state.reports.unshift(newReport);
      saveState();

      e.target.reset();
      
      // Reset checkbox dan gambar preview
      const anonCheckbox = document.getElementById("isAnonymous");
      if (anonCheckbox) anonCheckbox.checked = false;
      
      document.getElementById("imagePreview").classList.add("hidden");
      document.getElementById("file-upload").value = "";
      localStorage.removeItem("uploadedReportImage");

      showToast("Laporan berhasil dikirim! Terima kasih.");

    } catch (error) {
      console.error("Error submitting report:", error);
      showToast("Terjadi kesalahan saat mengirim laporan.");
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }, 1500);
}

// --- FUNGSI UNTUK HANDLE LIKE ---
function handleLike(reportId) {
  const report = state.reports.find((r) => r.id === reportId);
  if (report) {
    report.likes = (report.likes || 0) + 1;
    saveState();
    render();
    showToast("Terima kasih atas dukungan Anda!");
  }
}

// --- FUNGSI UNTUK HANDLE KOMENTAR ---
function handleSubmitComment(e, reportId) {
  e.preventDefault();
  const input = document.getElementById("commentInput");
  const text = input.value.trim();

  if (!text) {
    showToast("Mohon tulis komentar terlebih dahulu.");
    return;
  }

  const report = state.reports.find((r) => r.id === reportId);
  if (!report) {
    showToast("Laporan tidak ditemukan.");
    return;
  }

  const comment = {
    id: Date.now().toString(),
    userId: state.currentUser.id || "anon",
    userName: state.currentUser.name || "Anonim",
    userAvatar: state.currentUser.avatar || AVATARS[2],
    text: text,
    createdAt: new Date().toISOString(),
  };

  report.comments.push(comment);
  saveState();
  input.value = "";

  // Re-render detail
  if (state.view === "detail" && state.selectedReportId === reportId) {
    render();
  }

  showToast("Komentar berhasil ditambahkan!");
}

// --- EVENT LISTENERS ---

document.addEventListener("DOMContentLoaded", () => {
  // --- FITUR BARU: MOBILE MENU ---
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");
      if (isHidden) {
        mobileMenu.classList.remove("hidden");
        // Sedikit delay agar transisi CSS berjalan
        setTimeout(() => {
          mobileMenu.classList.remove("scale-95", "opacity-0");
          mobileMenu.classList.add("scale-100", "opacity-100");
        }, 10);
      } else {
        mobileMenu.classList.remove("scale-100", "opacity-100");
        mobileMenu.classList.add("scale-95", "opacity-0");
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 300);
      }
    });

    // Tutup menu saat link diklik
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("scale-100", "opacity-100");
        mobileMenu.classList.add("scale-95", "opacity-0");
        setTimeout(() => mobileMenu.classList.add("hidden"), 300);
      });
    });
  }

  // --- FITUR BARU: AUTH MODAL (LOGIN/REGISTER) ---
  const authModal = document.getElementById("authModal");
  const authContent = document.getElementById("authContent");
  const loginBtns = [
    document.getElementById("loginBtn"),
    document.getElementById("mobileLoginBtn"),
  ];
  const closeAuthBtn = document.getElementById("closeAuthBtn");
  const authOverlay = document.getElementById("authOverlay");

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const toRegisterBtn = document.getElementById("toRegisterBtn");
  const toLoginBtn = document.getElementById("toLoginBtn");

  function openModal() {
    authModal.classList.remove("pointer-events-none", "opacity-0");
    authContent.classList.remove("scale-95");
    authContent.classList.add("scale-100");
    // Reset ke login form setiap buka
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
  }

  function closeModal() {
    authModal.classList.add("opacity-0");
    authContent.classList.remove("scale-100");
    authContent.classList.add("scale-95");
    setTimeout(() => {
      authModal.classList.add("pointer-events-none");
    }, 300);
  }

  loginBtns.forEach((btn) => {
    if (btn) btn.addEventListener("click", openModal);
  });

  if (closeAuthBtn) closeAuthBtn.addEventListener("click", closeModal);
  if (authOverlay) authOverlay.addEventListener("click", closeModal);

  // Switch antara Login & Register
  if (toRegisterBtn) {
    toRegisterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
      registerForm.classList.add("fade-in");
    });
  }

  if (toLoginBtn) {
    toLoginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
      loginForm.classList.add("fade-in");
    });
  }

  // --- FITUR BARU: PASSWORD VISIBILITY ---
  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.previousElementSibling;
      const icon = button.querySelector("span");
      if (input.type === "password") {
        input.type = "text";
        icon.innerText = "visibility_off";
      } else {
        input.type = "password";
        icon.innerText = "visibility";
      }
    });
  });

  // Check session on load
  const sessionUser = getCurrentUser();
  updateAuthUI(sessionUser);

  // Handle Register Submit
  const regFormEl = document.querySelector("#registerForm form");
  if (regFormEl) {
    regFormEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("regName").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;
      const btn = regFormEl.querySelector('button[type="submit"]');

      if (!name || !email || !password) {
        showToast("Mohon lengkapi semua data.");
        return;
      }

      const users = getUsers();
      if (users.find((u) => u.email === email)) {
        showToast("Email sudah terdaftar. Silakan masuk.");
        return;
      }

      const originalText = btn.innerText;
      btn.innerHTML =
        '<span class="material-symbols-outlined animate-spin text-sm">refresh</span> Mendaftar...';
      btn.disabled = true;

      setTimeout(() => {
        const newUser = { name, email, password };
        saveUserToDB(newUser);
        setCurrentUser(newUser);

        btn.innerText = originalText;
        btn.disabled = false;
        closeModal();
        showToast("Pendaftaran berhasil! Anda telah masuk.");
        regFormEl.reset();
      }, 1500);
    });
  }

  // Handle Login Submit
  const loginFormEl = document.querySelector("#loginForm form");
  if (loginFormEl) {
    loginFormEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const passwordInput = document.getElementById("loginPassword"); // Ambil elemen inputnya
      const password = passwordInput.value;
      const btn = loginFormEl.querySelector('button[type="submit"]');
      const errorMsg = document.getElementById("loginErrorMsg"); // Ambil elemen pesan error

      const originalText = btn.innerText;
      btn.innerHTML =
        '<span class="material-symbols-outlined animate-spin text-sm">refresh</span> Masuk...';
      btn.disabled = true;

      // Sembunyikan error dulu setiap kali tombol ditekan
      if (errorMsg) errorMsg.classList.add("hidden");
      passwordInput.classList.remove("ring-red-500");

      setTimeout(() => {
        const users = getUsers();
        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        btn.innerText = originalText;
        btn.disabled = false;

        if (user) {
          setCurrentUser(user);
          closeModal();
          showToast(`Selamat datang kembali, ${user.name}!`);
          loginFormEl.reset();
        } else {
          // --- PERUBAHAN DI SINI ---
          if (errorMsg) {
            errorMsg.classList.remove("hidden"); // Munculkan pesan merah
          }
          passwordInput.classList.add("ring-1", "ring-red-500"); // Beri border merah
          
          // Opsional: berikan toast juga agar lebih jelas
          showToast("Gagal masuk. Periksa email atau password Anda.");
        }
      }, 1500);
    });
  }

  // 4. Handle Newsletter Subscription (Footer)
  const newsletterForm = document.querySelector("footer form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector("input");
      if (input.value) {
        showToast("Terima kasih telah berlangganan!");
        input.value = "";
      }
    });
  }

  // 5. Smooth Scroll untuk Link Navigasi
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

// Init Pertama Kali
render();