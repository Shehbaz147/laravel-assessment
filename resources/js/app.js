import axios from "axios";
import "./bootstrap";

import jquery from "jquery";

jquery(document).ready(function () {
    const $ = jquery;

    $("#product-form").on("submit", function (e) {
        e.preventDefault();
        const data = $(this).serialize();
        const form = this;
        $('#response-message').removeClass('bg-green-300').removeClass('bg-red-300').slideUp();
        $('input, button', form).attr('disabled', true);
        axios
            .post("/submit-product", data)
            .then((res) => {
                if (res.data.item) {
                    let { item } = res.data;
                    let html = `<tr><td class="py-2 pl-2">${item.product_name}</td><td>${item.quantity_in_stock}</td><td>${item.price_per_item}</td></tr>`;

                    $("#products-list > tbody").append(html);
                }
                $('#response-message').addClass('bg-green-300').html(res.data.message).slideDown();
                $('input, button', form).removeAttr('disabled');
            })
            .catch((error) => {
                console.log(error.response);
                $('input, button', form).removeAttr('disabled');
                $('#response-message').addClass('bg-red-300').html(error.response.data.message).slideDown();
            });
    });
});
