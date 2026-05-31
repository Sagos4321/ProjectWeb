@extends('layouts.app')

@section('content')
    <div id="home-view" class="transition-opacity duration-300">
        
        <section class="relative w-full max-w-[1440px] mx-auto min-h-[55vh] md:min-h-[85vh] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl group">
            <div class="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBpcneqE-NoHPZv0FDkDXkOboiOG75CHZ5yKBRTg8HCuWuctLCtjotwkNXEtL4zPEKy4r6gIOLEuf_P4y3T9aqQJmDG0O9UPwwNf1RBYRamxaB2QcROPxPjvNGkCHHonrWKlpY07ODntO_INfSa2UPSpC2zPF3vTP5yVJa_6p0DKmnopeg1a1KMxKJbCmFeYTn67lTaz6iPMjYurDCgeH1BS1gd4HFQfcJengoZ3GwLZXSCcKJUAxzvIW01kwUZtkIyPESgEqlALY_v');"></div>
            <div class="absolute inset-0 bg-black/30 hero-gradient"></div>
            <div class="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 md:px-6 py-10 md:py-20 text-center">
                <div class="max-w-4xl flex flex-col items-center gap-4 md:gap-8">
                    <span class="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-bold text-white shadow-sm backdrop-blur-md border border-white/20">
                        <span class="material-symbols-outlined text-base">verified</span>
                        Inisiatif Global 2026
                    </span>
                    <h2 class="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg">
                        Membela Bumi,<br />
                        <span class="italic font-serif text-[#D4E8C2]">Menjaga Masa Depan</span>
                    </h2>
                    <p class="max-w-2xl text-sm sm:text-base md:text-xl leading-relaxed text-white/90 drop-shadow-md">
                        Eco-Report merupakan platform digital yang berfungsi sebagai sarana partisipasi publik dalam menanggapi dampak lingkungan.
                    </p>
                    <button onclick="document.getElementById('report').scrollIntoView({behavior: 'smooth'})" class="group flex h-12 md:h-14 w-full sm:w-auto min-w-[160px] items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white transition-all hover:bg-[#9aac7d] hover:-translate-y-1 mt-4">
                        Bergabung <span class="material-symbols-outlined group-hover:translate-x-1">arrow_forward</span>
                    </button>
                </div>
            </div>
        </section>

        </div>

    <div id="dynamic-view" class="hidden w-full max-w-[1280px] mx-auto min-h-screen">
      </div>
@endsection