$(document).ready(function () {
    //MAKES TOOLTIPS WORK
    $("[data-toggle=tooltip]").tooltip();

    // ADJUST WHEN THE SIDE NAV UPDATES BUTTON COLORS
    $('#navbar-example').scrollspy(200)

    // HELPS LAYOUT CHANGES BE MORE FLUID
    var $container = $("#mainContent"),
        $mainNavbar = $(".navbar-inverse"),
        $body = ("body");

/*    $(window).resize(function () {
        if ($(window).width() < 1200) {
            $($container).removeClass("col-10").addClass("col-12");
        } else {
            $($container).removeClass("col-12").addClass("col-10");
        }

        if ($(window).width() < 768) {
            $($mainNavbar).addClass("navbar-fixed-bottom").removeClass("navbar-fixed-top");
            $($body).css("padding-top", "0");
        } else {
            $($mainNavbar).addClass("navbar-fixed-top").removeClass("navbar-fixed-bottom");
            $($body).css("padding-top", "70px");
        }
    });
*/
    // RELOAD LISTING #MAINCONTENT DIV
    var $screen = $("#screen"),
        $navParent = $(".navbar-brand").parent();

    $($screen).on("click", function () {
        if ($($screen).hasClass("centered")) {
            $("#listing").removeClass("container");
            $($navParent).removeClass("container");
            $($screen).text("Centered");
            $($screen).addClass("fullScreen").removeClass("centered");
            $($container).addClass("grow");
        } else if ($($screen).hasClass("fullScreen")) {
            $($screen).removeClass("fullScreen").addClass("centered");
            $("#listing").addClass("container");
            $($navParent).addClass("container");
            $($screen).text("Full Screen")
            $($container).removeClass("grow");
        }
    });

    // ISOTOPE
    $container.isotope({
        sortBy: 'record',
        sortAscending: false,
        itemSelector: ".col-3",
        getSortData: {
            name: function ($elem) {
                return $elem.find('.name').text();
            },
            record: function ($elem) {
                return parseFloat($elem.find('.record').text());
            }
        },
        resizable: false, // disable normal resizing
        // set columnWidth to a percentage of container width
        masonry: { columnWidth: $container.width() / 3 }
    });

    // update columnWidth on window resize
    $(window).smartresize(function () {
        $container.isotope({
            // update columnWidth to a percentage of container width
            masonry: { columnWidth: $container.width() / 3 }
        });
    });

    // sort items when filter link is clicked
    $('#sort-by a').click(function () {
        // get href attribute, minus the '#'
        var sortName = $(this).attr('href').slice(1);
        $container.isotope({
            sortBy: sortName
        });
        return false;
    });

    // filter items when filter link is clicked
    $('#filters a').click(function () {
        var selector = $(this).attr('data-filter');
        $container.isotope({ filter: selector });
        return false;
    });

});
