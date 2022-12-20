//function autoCompletar() {
$(document).ready(function () {

    $(".autocomplete").each(function (index, element) {

        var dataSource = $(element).attr("data-source");
        var dataValueField = $(element).attr("data-value-field");
        var dataTextField = $(element).attr("data-text-field");
        var dataHidden = $(element).attr("data-hidden");
        var dataFilter = $(element).attr("data-filter");
        //var refLocalidad = $('#hidLocalidad').val();
        var dataCalle = $(element).attr("data-calle");

        $(element).autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: dataSource,
                    minLength: 4,
                    data: "{ '" + dataFilter + "': '" + request.term + "' }",
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataFilter: function (data) { return data; },
                    success: function (data) {
                        if (request.term.length > 3) {
                            var lista = $.parseJSON(data.d);
                            response($.map(lista, function (item) {
                                $(".autocomplete").removeClass("ui-autocomplete-loading");
                                return {
                                    label: item.label,
                                    id: item.id
                                }
                            }))
                        } else {
                            $(".autocomplete").removeClass("ui-autocomplete-loading");
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $(".autocomplete").removeClass("ui-autocomplete-loading");
                        alert(XMLHttpRequest.responseText);
                    }
                });
            },
            select: function (event, ui) {
                if (ui.item) {
                    $("#" + dataHidden).val(ui.item.id);
                    // document.getElementById('txtBuscaCalle').removeAttribute('disablede', 'False');
                    if (dataCalle != "") { $("#" + dataCalle).removeAttr('disabled'); }
                    
                }
            },
            change: function (event, ui) {
                if (!ui.item) {
                    $("#" + dataHidden).val("");
                    if (dataCalle != "") { $("#" + dataCalle).attr('disabled', 'disabled'); }
                }
            },
            search: function (event, ui) {
                $("#" + dataHidden).val("");
                if (dataCalle != "") { $("#" + dataCalle).attr('disabled', 'disabled'); }
                $(".autocomplete").removeClass("ui-autocomplete-loading");
            },
            minLength: 3

        });


    });

    $(".autocompleteLocalidad").each(function (index, element) {
        var dataSource = $(element).attr("data-source");
        var dataValueField = $(element).attr("data-value-field");
        var dataTextField = $(element).attr("data-text-field");
        var dataHidden = $(element).attr("data-hidden");
        var dataFilter = $(element).attr("data-filter");
        var dataTextBox = $(element).attr("data-textbox");
        var refLocalidad = $(element).attr("data-parameter");
        var text = '#' + refLocalidad;
        $(element).autocomplete({

            source: function (request, response) {
                var hidLocalidad = $(text).val();
                var prueba = "{ '" + refLocalidad + "': '" + hidLocalidad + "' }";
                console.log(prueba);
                $.ajax({
                    url: dataSource,
                    minLength: 4,
                    data: "{ '" + dataFilter + "': '" + request.term + "', '" + refLocalidad + "': '" + hidLocalidad + "' }",
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataFilter: function (data) { return data; },
                    success: function (data) {
                        console.log("success");
                        if (request.term.length > 3) {
                            console.log(request.term.length);
                            var lista = $.parseJSON(data.d);
                            $(".autocompleteLocalidad").removeClass("ui-autocomplete-loading");
                            if (lista == "") {
                                //console.log("No hay lista");
                            } else {
                                //console.log("hay lista");
                            }
                            response($.map(lista, function (item) {
                                return {
                                    label: item.label,
                                    id: item.id
                                }
                            }))
                        } else {
                            $(".autocompleteLocalidad").removeClass("ui-autocomplete-loading");
                            return;
                        }

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log("ERROR");
                        $(".autocompleteLocalidad").removeClass("ui-autocomplete-loading");
                        alert(XMLHttpRequest.responseText);
                    }
                });
            },
            select: function (event, ui) {
                if (ui.item) {
                    $("#" + dataHidden).val(ui.item.id);
                    console.log(dataTextBox);
                    $("#" + dataTextBox).val('ssss');
                    console.log(ui.item.label);
                    $(".autocompleteLocalidad").removeClass("ui-autocomplete-loading");
                }
            },
            change: function (event, ui) {
                if (!ui.item) {
                    $("#" + dataHidden).val("");
                    $(".autocompleteLocalidad").removeClass("ui-autocomplete-loading");
                }
                console.log("change");
            },
            search: function (event, ui) {
                $("#" + dataHidden).val("");
                console.log("search");
            }
        });


    });


});
