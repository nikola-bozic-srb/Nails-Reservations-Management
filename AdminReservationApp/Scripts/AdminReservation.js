
$(document).ready(function () {
    var host = "https://" + window.location.host;
    var token = null;
    var headers = {};
    var categoryEndPoint = "/api/categories";
    var reservationsEndPoint = "/api/reservations";
    var editingId;
    var formAction = "Create";

    $("body").on("click", "#btnDelete", deleteReservation);
    $("body").on("click", "#btnEdit", editReservation);

    loadReservationsAdmin();

    // user registration
    $("#registerForm").submit(function (e) {
        e.preventDefault();

        var email = $("#registerEmail").val();
        var password = $("#registerPassword").val();
        var password2 = $("#registerPassword2").val();

        // object for sending
        var sendData = {
            "Email": email,
            "Password": password,
            "ConfirmPassword": password2
        };

        $.ajax({
            type: "POST",
            url: host + "/api/Account/Register",
            data: sendData

        }).done(function (data) {

            $("#registerEmail").val("");
            $("#registerPassword").val("");
            $("#registerPassword2").val("");
            $("#registerDiv").attr("hidden", true);
            $("#logInDiv").attr("hidden", false);

            $.notify("Registration successful", { globalPosition: "top center", className: "info" });

        }).fail(function (data) {
            $.notify("An error has occurred", { globalPosition: "top center", className: "error" });
        });
    });

    // user log in
    $("#logInForm").submit(function (e) {
        e.preventDefault();

        var email = $("#logInEmail").val();
        var loz = $("#logInPassword").val();

        // object for sending
        var sendData = {
            "grant_type": "password",
            "username": email,
            "password": loz
        };

        $.ajax({
            "type": "POST",
            "url": host + "/Token",
            "data": sendData

        }).done(function (data) {
            $("#info").empty().text(data.userName);
            token = data.access_token;
            $("#logInDiv").attr("hidden", true);
            $("#registerDiv").attr("hidden", true);
            $("#logInEmail").val("");
            $("#logInPassword").val("");

            //show only if user is logged in
            if (token) {
                loadReservationsAdmin();
                loadBarChart();
                loadAreaChart();
                $("#navBar").attr("hidden", false);
                $("#statisticsCharts").attr("hidden", false);

                $(".table-responsive").attr("hidden", false);
                $(".tableBorder").attr("hidden", false);
                $("#searchDiv").attr("hidden", false);
                $("#btnNewReservation").attr("hidden", false);

            }

            $.notify("Log in successful", { globalPosition: "top center", className: "info" });
        }).fail(function (data) {
            $.notify("An error has occurred", { globalPosition: "top center", className: "error" });
        });
    });

    $("#exitBtn").on("click", function () {
        location.reload();
    });

    $("#exitBtn2").on("click", function () {
        location.reload();
    });

    //button to clear values from edit form
    $("#clear").click(function (e) {
        e.preventDefault();

        $("#category").val("");
        $("#client").val("");
        $("#date").val("");
        $("#contact").val("");
    });

    // Log out
    $("#logOut").click(function () {
        token = null;
        headers = {};
        location.reload();
    });


    function loadReservationsAdmin() {
        var requestUrl = host + reservationsEndPoint;
        $.getJSON(requestUrl, setReservations);
    }


    //admin table
    function setReservations(data, status) {

        var containerDiv = $("#adminView")
        var table = $("#tableAdmin");
        table.empty();
        $(".pagination").empty();

        var formatDate; //moment.js to format date

        if (status === "success") {

            if (token) {
                header = $("<thead style='background-color:lightgrey;color:black'><tr><td>Client</td><td>Category</td><td>Price</td><td>Date</td><td>Contact</td><td colspan='2' >Action</td></tr></thead>");
            } else {
                header = $("<thead style='background-color:lightgrey;color:black'><tr><td>Client</td><td>Category</td><td>Price</td><td>Date</td><td>Contact</td></tr></thead>");
            }
            table.append(header);
            tbody = $("<tbody></tbody>");


            for (i = 0; i < data.length; i++) {
                formatDate = moment(data[i].Date).format('llll');

                // new row in table
                var row = "<tr class='list-row'>";
                // prikaz podataka
                var displayData = "<td>" + data[i].Client + "</td><td>" + data[i].Category.Name + "</td><td>" + data[i].Category.Price + "</td><td>" + formatDate + "</td><td>" + data[i].Contact + "</td>";
                // show buttons
                var stringId = data[i].Id.toString();
                var displayEdit = "<td><button class='btn btn-info badge-pill' id=btnEdit name=" + stringId + "><i class='fas fa-edit'></i>Edit</button></td>";
                var displayDelete = "<td><button class='btn btn-danger badge-pill' id=btnDelete name=" + stringId + "><i class='fas fa-trash'></i>delete</button></td>";
                //show only if user is logged in
                if (token) {
                    row += displayData + displayEdit + displayDelete + + "</tr>";
                } else {
                    row += displayData + "</tr>";
                }

                // dodati red
                tbody.append(row);

            }
            table.append(tbody);
            containerDiv.append(table)
            pagination();
        }
    }

    $("#btnNewReservation").on("click", function () {

        if (!token) {
            $("#layoutError").attr("hidden", false);
            $(".table-responsive").attr("hidden", true);
            $(".tableBorder").attr("hidden", true);
            $("#buttonsRegAndLogin").attr("hidden", true);
        }
        else {
            $("#client").val("");
            $("#date").val("");
            $("#contact").val("");
            $("#category").val("");
            $("#exampleModalLabel").text("Add new Reservation");
            $("#btnNewReservation").attr("data-target", "#exampleModal")
        }

    });

    $("#regBtn").click(function () {
        $("#logInDiv").attr("hidden", true);
        $("#registerDiv").attr("hidden", false);

    })

    $("#backToLogin").click(function () {
        $("#logInDiv").attr("hidden", false);
        $("#registerDiv").attr("hidden", true);

        $("#registerEmail").val("");
        $("#registerPassword").val("");
        $("#registerPassword2").val("");

        $("#logInEmail").val("");
        $("#logInPassword").val("");
    })

    $("#homeBtnLogin").on("click", function () {
        $(".table-responsive").attr("hidden", true);
        $(".tableBorder").attr("hidden", true);
        $("#logInDiv").attr("hidden", false);
        $("#buttonsRegAndLogin").attr("hidden", true);

    });

    $("#homeBtnRegistration").on("click", function () {
        $("#logInDiv").attr("hidden", true);
        $("#registerDiv").attr("hidden", false);
        $("#buttonsRegAndLogin").attr("hidden", true);
        $(".table-responsive").attr("hidden", true);
        $(".tableBorder").attr("hidden", true);
    });

    //filling the categery select option
    $.ajax({
        "type": "GET",
        "url": host + categoryEndPoint
    }).done(function (data, status) {
        var select = $("#category");
        for (var i = 0; i < data.length; i++) {
            var option = "<option value='" + data[i].Id + "'>" + data[i].Name + " - " + data[i].Price + "</option>";
            select.append(option);
        }
    });

    // add new reservation
    $("#addForm").submit(function (e) {
        e.preventDefault();

        if (token) {
            headers.Authorization = "Bearer " + token;
        }

        var client = $("#client").val();
        var date = $("#date").val();
        var contact = $("#contact").val();
        var category = $("#category").val();

        var httpAction;
        var sendData;
        var url;


        // seting the object depending on formAction
        if (formAction === "Create") {
            httpAction = "POST";

            url = host + reservationsEndPoint;
            sendData = {
                "Client": client,
                "Date": date,
                "Contact": contact,
                "CategoryId": category
            };
        } else {

            httpAction = "PUT";
            url = host + reservationsEndPoint + "/" + editingId.toString();
            sendData = {
                "Id": editingId,
                "Client": client,
                "Date": date,
                "Contact": contact,
                "CategoryId": category
            };
        }
        $.ajax({
            url: url,
            type: httpAction,
            headers: headers,
            data: sendData
        })
            .done(function (data, status) {
                $("#category").val("");
                $("#client").val("");
                $("#date").val("");
                $("#contact").val("");
                $('#exampleModal').modal('hide');

                if (formAction === "Update") {
                    $.notify("Successfully updated", { globalPosition: "top center", className: "success" });
                } else {
                    $.notify("Successfully added", { globalPosition: "top center", className: "success" });
                }

                formAction = "Create"
                loadReservationsAdmin();
                loadBarChart();
                loadAreaChart();

            })
            .fail(function (data, status) {
                $.notify("An error has occurred", { globalPosition: "top center", className: "error" });
            });
    });

    //delete reservation
    function deleteReservation() {

        if (confirm("Are you sure you want to delete?")) {
            var deleteId = this.name;

            if (token) {
                headers.Authorization = "Bearer " + token;
            }

            $.ajax({
                url: host + reservationsEndPoint + "/" + deleteId.toString(),
                type: "DELETE",
                headers: headers
            })
                .done(function (data, status) {

                    loadReservationsAdmin();
                    $.notify("Successfully deleted", { globalPosition: "top center", className: "success" });
                    loadBarChart();
                    loadAreaChart();

                })
                .fail(function (data, status) {
                    $.notify("An error has occurred", { globalPosition: "top center", className: "error" });
                });
        }
        return false;

    }

    //modal pop up
    $('#exampleModal').on('shown.bs.modal', function () {
        $('#client').trigger('focus')
    })

    //edit reservation
    function editReservation(e) {
        e.preventDefault();

        $("#exampleModalLabel").text("Edit Reservation");

        //get id
        var editId = this.name;

        //user must be logged in
        if (token) {
            headers.Authorization = "Bearer " + token;
        }


        // ajax request for geting specific reservation
        $.ajax({
            url: host + reservationsEndPoint + "/" + editId.toString(),
            type: "GET",
            headers: headers
        })
            .done(function (data, status) {
                $("#client").val(data.Client)
                $("#category").val(data.CategoryId);
                $("#date").val(data.Date);
                $("#contact").val(data.Contact);
                editingId = data.Id;
                formAction = "Update";
                $('#exampleModal').modal('show');


            })
            .fail(function (data, status) {
                formAction = "Create";
                $.notify("An error has occurred", { globalPosition: "top center", className: "error" });
            });

    };

    //function for pagination
    function Contains(text_one, text_two) {
        if (text_one.indexOf(text_two) != -1) {
            return true;
        }
    }

    $("#search").keyup(function () {
        var searchText = $("#search").val().toLowerCase();
        $(".list-row").each(function () {
            if (!Contains($(this).text().toLowerCase(), searchText)) {
                $(this).hide();
            } else {
                $(this).show();
            }

        })

    })

    //admin table pagination
    function pagination() {
        var numberOfItems = $("#tableAdmin .list-row").length + 1;
        var limitPerPage = 8;
        var previousButton = " <li id='previous-page' style='margin-left:1px'><a href='javascript:void(0)' class='page-link'>Previous</a></li>";
        $(".pagination").append(previousButton);
        $("#tableAdmin .list-row:gt(" + (limitPerPage - 1) + ")").hide();

        var totalPages = Math.round(numberOfItems / limitPerPage);
        $(".pagination").append("<li class='page-item active'><a href='javascript:void(0)' class='page-link' >" + 1 + "</a></li>"); //1

        for (var i = 2; i <= totalPages; i++) {
            $(".pagination").append("<li class='page-item'><a href='javascript:void(0)' class='page-link' >" + i + "</a></li>");

        }

        $(".pagination").append("<li id='next-page'><a href='javascript:void(0)' class='page-link'>Next</a></li>"); //next


        $(".pagination li.page-item").on("click", function () {

            if ($(this).hasClass("active")) {
                return false;
            } else {
                var currentPage = $(this).index();
                $(".pagination li").removeClass("active");
                $(this).addClass("active");
                $("#tableAdmin .list-row").hide();

                var grandTotal = limitPerPage * currentPage;

                for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {

                    $("#tableAdmin .list-row:eq(" + i + ")").show();
                }
            }

        });

        //next button
        $("#next-page").on("click", function () {
            var currentPage = $(".pagination li.active").index();
            if (currentPage === totalPages) {
                return false;
            } else {
                currentPage++;
                $(".pagination li").removeClass("active");
                $("#tableAdmin .list-row").hide();
                var grandTotal = limitPerPage * currentPage;

                for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {

                    $("#tableAdmin .list-row:eq(" + i + ")").show();
                }

                $(".pagination li.page-item:eq(" + (currentPage - 1) + ")").addClass("active");
            }
        })

        //previous button
        $("#previous-page").on("click", function () {
            var currentPage = $(".pagination li.active").index();
            if (currentPage === 1) {
                return false;
            } else {
                currentPage--;
                $(".pagination li").removeClass("active");
                $("#tableAdmin .list-row").hide();
                var grandTotal = limitPerPage * currentPage;

                for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {

                    $("#tableAdmin .list-row:eq(" + i + ")").show();
                }

                $(".pagination li.page-item:eq(" + (currentPage - 1) + ")").addClass("active");
            }
        })

    }


    //charts for statistics

    // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

    //weekly statistics
    function loadAreaChart() {
        var arrayReservationDate = [];
        var arrayReservationPrice = [];
        var formatDate; //moment.js to format date

        $("#myAreaChart").remove();

        $("#areachart").append("<canvas id='myAreaChart' width='100%' height='40'>");

        $.getJSON(host + "/api/WeekStatistics", function (data, status) {

            if (status === "success") {

                for (var i = 0; i < data.length; i++) {
                    formatDate = moment(data[i].Date).format('ll');
                    arrayReservationDate.push(formatDate);
                    arrayReservationPrice.push(data[i].Price);

                }
                // Area Chart Example
                var ctx = document.getElementById("myAreaChart");
                var myAreaChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: arrayReservationDate,
                        datasets: [{
                            label: "Total",
                            lineTension: 0.3,
                            backgroundColor: "rgba(2,117,216,0.2)",
                            borderColor: "rgba(2,117,216,1)",
                            pointRadius: 5,
                            pointBackgroundColor: "rgba(2,117,216,1)",
                            pointBorderColor: "rgba(255,255,255,0.8)",
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(2,117,216,1)",
                            pointHitRadius: 50,
                            pointBorderWidth: 2,
                            data: arrayReservationPrice,
                        }],
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                time: {
                                    unit: 'month'
                                },
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    maxTicksLimit: 7
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                    max: 15000,
                                    maxTicksLimit: 5
                                },
                                gridLines: {
                                    color: "rgba(0, 0, 0, .125)",
                                }
                            }],
                        },
                        legend: {
                            display: false
                        }

                    }
                });

            }

        });


    }

    //category statistics
    function loadBarChart() {
        var arrayCategoryName = [];
        var arrayCategoryPrice = [];
        var count;

        $("#myBarChart").remove();

        $("#barchart").append("<canvas id='myBarChart' width='100%' height='40'>");

        $.getJSON(host + "/api/statistics", function (data, status) {

            if (status === "success") {

                for (var i = 0; i < data.length; i++) {
                    arrayCategoryName.push(data[i].Name);
                    arrayCategoryPrice.push(data[i].Price);

                }
                count = arrayCategoryName.length;
                // Bar Chart Example
                var ctx = document.getElementById("myBarChart");
                var myBarChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: arrayCategoryName,
                        datasets: [{
                            label: "Total",
                            backgroundColor: "rgba(2,117,216,1)",
                            borderColor: "rgba(2,117,216,1)",
                            data: arrayCategoryPrice,
                        }],
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                time: {
                                    unit: 'month'
                                },
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    maxTicksLimit: count
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                    max: 15000,
                                    maxTicksLimit: 4
                                },
                                gridLines: {
                                    display: true
                                }
                            }],
                        },
                        legend: {
                            display: false
                        }

                    }
                });
            }

        });

    }


});