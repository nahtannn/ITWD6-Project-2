//Import
import { supabase } from "../supabaseClient";

//Component Function
export const phoneMakeChart = {
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

        // Checking how many bookings there are for each phone make
        const makeLabels = [...new Set(this.data.map(b => b.make))];
        const makeValues = makeLabels.map(label => this.data.filter(b => b.make === label).length);

        //Removes any existing chart before creating a new one (as react can have issues with re-rendering the same chart)
        this.destroy();

        //Bar Chart: Phone Make Repairs
        this.chart = new window.Chart(document.getElementById(chartID), {
            type: 'bar',
            data: {
                labels: makeLabels,
                datasets: [{
                    data: makeValues,
                    backgroundColor: ['#4bb859', '#FF6384', '#FFCE56', '#36A2EB', '#9966FF', '#FF9F40']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Phone Make Repairs'
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