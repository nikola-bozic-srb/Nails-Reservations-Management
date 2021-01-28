
// Set new default font family and font color to mimic Bootstrap's default styling
//Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
//Chart.defaults.global.defaultFontColor = '#292b2c';

//var host = "https://" + window.location.host;
//var arrayCategoryName = [];
//var arrayCategoryPrice = [];
//var count;

//$.getJSON(host + "/api/statistics", function (data, status) {


//    if (status === "success") {

//        for (var i = 0; i < data.length; i++) {
//            arrayCategoryName.push(data[i].Name);
//            arrayCategoryPrice.push(data[i].Price);
//        }
//    }
//    count = arrayCategoryName.length;
//});




// Area Chart Example
//var ctx = document.getElementById("myAreaChart");
//var myAreaChart = new Chart(ctx, {
//    type: 'line',
//    data: {
//        labels: ["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"],
//        datasets: [{
//            label: "Earned",
//            lineTension: 0.3,
//            backgroundColor: "rgba(2,117,216,0.2)",
//            borderColor: "rgba(2,117,216,1)",
//            pointRadius: 5,
//            pointBackgroundColor: "rgba(2,117,216,1)",
//            pointBorderColor: "rgba(255,255,255,0.8)",
//            pointHoverRadius: 5,
//            pointHoverBackgroundColor: "rgba(2,117,216,1)",
//            pointHitRadius: 50,
//            pointBorderWidth: 2,
//            data: [10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
//        }],
//    },
//    options: {
//        scales: {
//            xAxes: [{
//                time: {
//                    unit: 'month'
//                },
//                gridLines: {
//                    display: false
//                },
//                ticks: {
//                    maxTicksLimit: 7
//                }
//            }],
//            yAxes: [{
//                ticks: {
//                    min: 0,
//                    max: 40000,
//                    maxTicksLimit: 5
//                },
//                gridLines: {
//                    color: "rgba(0, 0, 0, .125)",
//                }
//            }],
//        },
//        legend: {
//            display: false
//        }

//    }


//});


// Bar Chart Example
//var ctx = document.getElementById("myBarChart");
//var myBarChart = new Chart(ctx, {
//    type: 'bar',
//    data: {
//        labels: arrayCategoryName,
//        datasets: [{
//            label: "Total",
//            backgroundColor: "rgba(2,117,216,1)",
//            borderColor: "rgba(2,117,216,1)",
//            data: arrayCategoryPrice,
//        }],
//    },
//    options: {
//        scales: {
//            xAxes: [{
//                time: {
//                    unit: 'month'
//                },
//                gridLines: {
//                    display: false
//                },
//                ticks: {
//                    maxTicksLimit: count
//                }
//            }],
//            yAxes: [{
//                ticks: {
//                    min: 0,
//                    max: 15000,
//                    maxTicksLimit: 4
//                },
//                gridLines: {
//                    display: true
//                }
//            }],
//        },
//        legend: {
//            display: false
//        }

//    }

//});