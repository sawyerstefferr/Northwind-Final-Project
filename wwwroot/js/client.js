﻿$(function () {
    // preload audio
    var toast = new Audio('/media/toast.wav');

    $('.code').on('click', function (e) {
        e.preventDefault();
        // first pause the audio (in case it is still playing)
        toast.pause();
        // reset the audio
        toast.currentTime = 0;
        // play audio
        toast.play();
        // display product data
        $('#product').html($(this).data('product'));
        $('#code').html($(this).data('code'));
        $('#toast').toast({ autohide: false }).toast('show');
    });

    $('#shoppingCart').on('click', function (e) {
        e.preventDefault();
        console.log("click worked")
        //var email = $('#CurrentUser').data('email');
        //console.log("this email: ", email)
        getCartItems();
        $('#shoppingModal').modal();
    });

    //todo woking here
    function getCartItems() {
        var email = $('#User').data('email');
        console.log("this email: ", email);
        $.getJSON({
            url: "api/cartitem/show-cart-items/" + email,
            success: function (response, textStatus, jqXhr) {
                console.log("response: ", response);
                //todo cartitemid, customer, customerid, product, productid, quantity

                //todo figure out how to add info to the modal
                //$('#product_rows').html("");
                //for (var i = 0; i < response.length; i++) {
                //    var row = "<tr" + css + " data-id=\"" + response[i].productId + "\" data-name=\"" + response[i].productName + "\" data-price=\"" + response[i].unitPrice + "\">"
                //        + "<td>" + response[i].productName + "</td>"
                //        + "<td class=\"text-right\">$" + response[i].unitPrice.toFixed(2) + "</td>"
                //        + "<td class=\"text-right\">" + response[i].unitsInStock + "</td>"
                //        + "</tr>";
                //    $('#product_rows').append(row);
                //}
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // log the error to the console
                console.log("The following error occured: " + textStatus, errorThrown);
            }
        })
    };

    $(document).on('keyup', function (e) {
        if (e.key === "Escape") {
            $('#toast').toast('hide');
        }
    });
});
