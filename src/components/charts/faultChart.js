//Import
import { supabase } from "../supabaseClient";

//Component Function
export const faultChart = {
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

        // Checking how many bookings there are for each fault type
        const faultLabels = [...new Set(this.data.map(b => b.fault_category))];
        const faultValues = faultLabels.map(label => this.data.filter(b => b.fault_category === label).length);

        //Removes any existing chart before creating a new one (as react can have issues with re-rendering the same chart)
        this.destroy();

        //Bar Chart: Fault Type Distribution
        this.chart = new window.Chart(document.getElementById(chartID), {
            type: 'bar',
            data: {
                labels: faultLabels,
                datasets: [{
                    data: faultValues,
                    backgroundColor: ['#4bb859', '#FF6384', '#FFCE56', '#36A2EB', '#9966FF', '#FF9F40']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Fault Type'
                    },
                    legend: {
                        display: false
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