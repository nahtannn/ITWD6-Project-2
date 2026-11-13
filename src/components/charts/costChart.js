//Import
import { supabase } from "../supabaseClient";

//Component Function
export const costChart = {
    //Data
    data: [],
    chart: null,

    //Building the chart UI
    async renderUI(chartID) {
        const { data, error } = await supabase.from("bookings").select("*").order("repair_date", { ascending: true }); // Fetch all booking data from Supabase
        if (error) {
            console.error("Error loading chart data:", error);
            return;
        }
        this.data = data;

        // Checking how many bookings there are for each fault type
        const costLabels = this.data.map(b => 
            new Date(b.repair_date).toLocaleDateString("en-NZ", { year: 'numeric', month: 'short', day: 'numeric' }));
        const costValues = this.data.map(b => Number(b.cost_total_and_gst || 0));

        //Removes any existing chart before creating a new one (as react can have issues with re-rendering the same chart)
        this.destroy();

        //Line Chart: Cost Over Repair Date
        this.chart = new window.Chart(document.getElementById(chartID), {
            type: 'line',
            data: {
                labels: costLabels,
                datasets: [{
                    label: 'Cost to Customer (including GST)',
                    data: costValues,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Customer Payments'
                    },
                    legend: {
                        position: 'bottom',
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { callback: value => '$' + value }
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