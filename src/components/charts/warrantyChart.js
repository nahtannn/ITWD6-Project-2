//Import
import { supabase } from "../supabaseClient";

//Component Function
export const warrantyChart = {
    //Data
    data: [],
    chart: null,

    //Building the chart UI
    async renderUI(chartID) {
        const { data, error } = await supabase.from("bookings").select("*"); // Fetch all booking data from Supabase
        if (error) {
            console.error("Error loading chart data:", error);
            return;
        }
        this.data = data;

        // Checking how many bookings have warranty vs no warranty
        const underWarrantyCount = this.data.filter(b => b.warranty).length;
        const noWarrantyCount = this.data.length - underWarrantyCount;

        //Removes any existing chart before creating a new one (as react can have issues with re-rendering the same chart)
        this.destroy();

        //Pie Chart: Warranty vs No Warranty
        this.chart = new window.Chart(document.getElementById(chartID), {
            type: 'pie',
            data: {
                labels: ['Under Warranty', 'No Warranty'],
                datasets: [{
                    data: [underWarrantyCount, noWarrantyCount],
                    backgroundColor: ['#4bb859', '#FF6384']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Warranty Status of Bookings'
                    },
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    },

    //Destroy the chart
    destroy() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }
}