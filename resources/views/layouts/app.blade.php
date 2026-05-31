<!DOCTYPE html>
<html class="light" lang="id">
<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Eco-Report - Lapor & Jaga Bumi Kita</title>
    
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
    
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              primary: "#88976d",
              "primary-dark": "#5e694b",
              "earth-light": "#E7F5DC",
              "background-light": "#E7F5DC",
              "background-dark": "#191b17",
              surface: "#ffffff",
            },
            fontFamily: {
              display: ["Plus Jakarta Sans", "sans-serif"],
              handwriting: ["Indie Flower", "cursive"],
            },
          },
        },
      };
    </script>

    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body class="relative flex h-auto min-h-screen w-full flex-col bg-earth-light dark:bg-background-dark text-[#151613] dark:text-white font-display overflow-x-hidden selection:bg-primary/30">
    
    <div class="fixed top-3 md:top-6 left-0 right-0 z-50 flex justify-center px-2 md:px-4 w-full pointer-events-none">
      <nav class="glass-nav pointer-events-auto flex w-full max-w-[960px] items-center justify-between rounded-full px-4 py-2 md:px-6 md:py-3 shadow-soft transition-all hover:shadow-lg hover:bg-white/95 relative">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center size-10 rounded-full bg-primary/20 text-primary">
            <span class="material-symbols-outlined text-2xl">eco</span>
          </div>
          <h1 class="text-lg font-bold tracking-tight text-[#151613] dark:text-white">Eco-Report</h1>
        </div>
        <div class="hidden md:flex items-center gap-8">
          <a class="text-sm font-medium text-[#151613]/80 hover:text-primary transition-colors" href="#">Beranda</a>
          <a class="text-sm font-medium text-[#151613]/80 hover:text-primary transition-colors" href="#explore">Jelajah</a>
          <a class="text-sm font-medium text-[#151613]/80 hover:text-primary transition-colors" href="#report">Lapor</a>
        </div>
        <div class="flex items-center gap-4">
          <button id="loginBtn" class="hidden md:flex text-sm font-bold text-[#151613] hover:text-primary transition-colors">Masuk</button>
          <button class="flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:scale-105 active:scale-95">Bertindak Sekarang</button>
          <button id="mobileMenuBtn" class="md:hidden flex items-center justify-center p-2 text-[#151613]">
            <span class="material-symbols-outlined">menu</span>
          </button>
        </div>

        <div id="mobileMenu" class="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl p-6 shadow-xl border border-neutral-100 hidden flex-col gap-4 md:hidden origin-top transition-all duration-300 transform scale-95 opacity-0">
          <a class="text-lg font-medium text-[#151613] py-2 border-b border-neutral-100" href="#">Beranda</a>
          <a class="text-lg font-medium text-[#151613] py-2 border-b border-neutral-100" href="#explore">Jelajah</a>
          <a class="text-lg font-medium text-[#151613] py-2 border-b border-neutral-100" href="#report">Lapor</a>
          <button id="mobileLoginBtn" class="w-full bg-neutral-100 text-[#151613] font-bold py-3 rounded-xl mt-2">Masuk / Daftar</button>
        </div>
      </nav>
    </div>

    <div class="layout-container flex h-full grow flex-col pt-16 md:pt-24 px-2 md:px-4 pb-4">
        @yield('content')
    </div>

    <footer class="bg-[#191b17] text-white rounded-[1.5rem] md:rounded-[3rem] mt-4 overflow-hidden relative mx-2 md:mx-4 mb-4">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-50"></div>
        <div class="flex flex-col px-6 py-8 md:py-16 lg:px-24 max-w-[1440px] mx-auto">
          <div class="flex items-center gap-3 mb-4">
              <div class="flex items-center justify-center size-10 rounded-full bg-primary text-white shadow-[0_0_20px_rgba(136,151,109,0.4)]">
                <span class="material-symbols-outlined text-xl">eco</span>
              </div>
              <h3 class="text-2xl font-bold tracking-tight">Eco-Report</h3>
          </div>
          <p class="text-neutral-400 leading-relaxed max-w-sm text-base">Eco-Report adalah platform digital bagi warga untuk melaporkan dampak pemanasan global secara langsung.</p>
          <div class="flex flex-col md:flex-row justify-between items-center pt-10 text-xs font-medium text-neutral-500 gap-6 mt-8 border-t border-white/10">
            <span>© 2026 Eco-Report</span>
          </div>
        </div>
    </footer>

    <div id="authModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4 opacity-0 pointer-events-none transition-opacity duration-300">
        </div>

    <script src="{{ asset('js/script.js') }}"></script>
</body>
</html>