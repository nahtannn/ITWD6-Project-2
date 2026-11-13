//Import
import { supabase } from "../supabaseClient";

//Component Function
export const courtesyPhoneChart = {
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

        // Checking how many bookings there are for each courtesy phone
        const phoneLabels = [...new Set(this.data.map(b => b.phone))];
        const phoneValues = phoneLabels.map(label => this.data.filter(b => b.phone === label).length);

        //Removes any existing chart before creating a new one (as react can have issues with re-rendering the same chart)
        this.destroy();

        //Pie Chart: Courtesy Phone Usage
        this.chart = new window.Chart(document.getElementById(chartID), {
            type: 'pie',
            data: {
                labels: phoneLabels,
                datasets: [{
                    data: phoneValues,
                    backgroundColor: ['#4bb859', '#FF6384', '#36A2EB', '#FFCE56', '#9966FF', '#FF9F40']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Courtesy Phone Bookings'
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