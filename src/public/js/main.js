// Open close dropdown on click
$("li.dropdown").click(function() {
    if ($(this).hasClass("open")) {
        $(this).find(".dropdown-menu").slideUp("fast");
        $(this).removeClass("open");
    } else {
        $(this).find(".dropdown-menu").slideDown("fast");
        $(this).toggleClass("open");
    }
});

// Close dropdown on mouseleave
$("li.dropdown").mouseleave(function() {
    $(this).find(".dropdown-menu").slideUp("fast");
    $(this).removeClass("open");
});

// Navbar toggle
$(".navbar-toggle").click(function() {
    $(".navbar-collapse").toggleClass("collapse").slideToggle("fast");
});

// Navbar colors
$("#nav-colors > .btn").click(function() {
    if ($(this).is("#pink")) {
        $(".navbar").css("background", "linear-gradient(to right, #ff5858, #f857a6)");
        $(".dropdown-menu").css("background", "#ff5858");
    } else if ($(this).is("#red")) {
        $(".navbar").css("background", "linear-gradient(to right, #d31027, #ea384d)");
        $(".dropdown-menu").css("background", "#d31027");
    } else if ($(this).is("#purple")) {
        $(".navbar").css("background", "linear-gradient(to right, #41295a, #2f0743)");
        $(".dropdown-menu").css("background", "#41295a");
    } else if ($(this).is("#blue")) {
        $(".navbar").css("background", "linear-gradient(to right, #396afc, #2948ff)");
        $(".dropdown-menu").css("background", "#396afc");
    } else if ($(this).is("#green")) {
        $(".navbar").css("background", "linear-gradient(to right, #add100, #7b920a)");
        $(".dropdown-menu").css("background", "#add100");
    } else if ($(this).is("#yellow")) {
        $(".navbar").css("background", "linear-gradient(to right, #f7971e, #ffd200)");
        $(".dropdown-menu").css("background", "#f7971e");
    } else if ($(this).is("#orange")) {
        $(".navbar").css("background", "linear-gradient(to right, #e43a15, #e65245)");
        $(".dropdown-menu").css("background", "#e43a15");
    }
})

// Font colors
$("#font-colors > .btn").click(function() {
    if ($(this).is("#white")) {
        $(".navbar .fa, .link, a").css("color", "white");
        $(".icon-bar").css("background", "white");
    } else if ($(this).is("#black")) {
        $(".navbar .fa, .link, a").css("color", "black");
        $(".icon-bar").css("background", "black");
    }
})

// edges
$("#edges > .btn").click(function() {
    if ($(this).is("#rounded")) {
        $(".navbar, .form-control").css("border-radius", "8px");
        if ($(window).width() > 768) {
            $(".dropdown-menu").css({
                "border-bottom-right-radius": "8px",
                "border-bottom-left-radius": "8px"
            });
        }
    } else if ($(this).is("#square")) {
        $(".navbar, .form-control").css("border-radius", "0");
        $(".dropdown-menu").css({
            "border-bottom-right-radius": "0",
            "border-bottom-left-radius": "0"
        });
    }
})