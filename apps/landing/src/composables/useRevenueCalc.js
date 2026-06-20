import { ref, computed } from 'vue';
export function useRevenueCalc() {
    const monthlyVolume = ref(100000);
    const markupPct = ref(0.5);
    const monthlyRevenue = computed(() => monthlyVolume.value * (markupPct.value / 100));
    const yearlyRevenue = computed(() => monthlyRevenue.value * 12);
    const perTransaction = computed(() => monthlyVolume.value / 200 * (markupPct.value / 100));
    return { monthlyVolume, markupPct, monthlyRevenue, yearlyRevenue, perTransaction };
}
