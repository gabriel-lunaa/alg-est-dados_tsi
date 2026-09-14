import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <main class="min-h-screen bg-slate-100 text-slate-900">
        <header class="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-5">
            <div class="rounded-2xl bg-white/95 px-5 py-3 shadow-lg backdrop-blur">
                <h1 class="text-xl font-bold tracking-tight text-slate-900">
                    Waze Particular
                </h1>
                <p class="text-xs text-slate-500">
                    Seu navegador de rotas
                </p>
            </div>

            <button
                id="botao-tema"
                class="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-xl shadow-lg backdrop-blur transition hover:scale-105"
                aria-label="Alternar tema"
            >
                ☀️
            </button>
        </header>

        <section class="relative min-h-screen overflow-hidden">
            <div class="absolute inset-0 bg-slate-200">
                <div class="absolute inset-0 opacity-40"
                    style="
                        background-image:
                            linear-gradient(to right, #cbd5e1 1px, transparent 1px),
                            linear-gradient(to bottom, #cbd5e1 1px, transparent 1px);
                        background-size: 70px 70px;
                    ">
                </div>

                <div class="absolute left-[12%] top-[18%] h-3 w-3 rounded-full bg-slate-400"></div>
                <div class="absolute left-[32%] top-[38%] h-3 w-3 rounded-full bg-slate-400"></div>
                <div class="absolute left-[68%] top-[27%] h-3 w-3 rounded-full bg-slate-400"></div>
                <div class="absolute left-[78%] top-[63%] h-3 w-3 rounded-full bg-slate-400"></div>

                <div class="absolute left-[15%] top-[55%] h-1 w-[70%] rotate-[-8deg] rounded-full bg-white shadow-sm"></div>
                <div class="absolute left-[25%] top-[30%] h-1 w-[55%] rotate-[28deg] rounded-full bg-white shadow-sm"></div>
                <div class="absolute left-[8%] top-[70%] h-1 w-[60%] rotate-[12deg] rounded-full bg-white shadow-sm"></div>

                <div class="absolute left-[20%] top-[42%] h-1.5 w-[50%] rotate-[-20deg] rounded-full bg-slate-300"></div>
            </div>

            <div class="absolute left-5 top-28 z-10 w-[calc(100%-2.5rem)] max-w-sm">
                <div class="rounded-3xl bg-white/95 p-5 shadow-2xl backdrop-blur">
                    <div class="mb-5">
                        <h2 class="text-lg font-bold text-slate-900">
                            Planeje sua rota
                        </h2>
                        <p class="mt-1 text-sm text-slate-500">
                            Escolha onde você está e para onde deseja ir.
                        </p>
                    </div>

                    <div class="space-y-3">
                        <div class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                ●
                            </div>

                            <div class="min-w-0">
                                <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Origem
                                </p>
                                <p class="truncate text-sm font-semibold text-slate-700">
                                    Praça Central
                                </p>
                            </div>
                        </div>

                        <div class="ml-7 h-4 border-l-2 border-dashed border-slate-300"></div>

                        <div class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                                ●
                            </div>

                            <div class="min-w-0">
                                <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Destino
                                </p>
                                <p class="truncate text-sm font-semibold text-slate-700">
                                    Hospital
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        id="botao-calcular-rota"
                        class="mt-5 w-full rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0"
                    >
                        Calcular rota
                    </button>
                </div>
            </div>

            <div class="absolute bottom-6 left-1/2 z-10 w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2">
                <div class="rounded-3xl bg-white/95 p-5 shadow-2xl backdrop-blur">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Melhor rota
                            </p>
                            <p class="mt-1 text-2xl font-bold text-slate-900">
                                2,4 km
                            </p>
                        </div>

                        <div class="h-10 w-px bg-slate-200"></div>

                        <div>
                            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Tempo estimado
                            </p>
                            <p class="mt-1 text-2xl font-bold text-slate-900">
                                6 min
                            </p>
                        </div>
                    </div>

                    <div class="mt-4 flex items-center gap-2 text-sm text-slate-500">
                        <span class="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                        Rota mais curta encontrada
                    </div>
                </div>
            </div>

            <div class="absolute left-[25%] top-[28%] z-10 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg ring-4 ring-white">
                <span class="text-sm">A</span>
            </div>

            <div class="absolute right-[24%] top-[57%] z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg ring-4 ring-white">
                <span class="text-sm">B</span>
            </div>
        </section>
    </main>
`;

const botaoCalcularRota =
    document.querySelector<HTMLButtonElement>("#botao-calcular-rota");

botaoCalcularRota?.addEventListener("click", () => {
    console.log("Cálculo de rota solicitado.");
});