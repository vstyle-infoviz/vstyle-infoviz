$(document).ready(function() {
    var pressing = false;
    
    d3.select("body")
        .on("keydown", function() {
            if (d3.event.key == "s") {
                pressing = true;
//                console.log(pressing);
            }
        })
        .on("keyup", function() {
            pressing = false;
//            console.log(pressing);
        })
    
    
    var citySort = d3.comparator()
        .order(d3.ascending, function(d) { return cityNameArray[parseInt(d.city_id)]; });
    
    var categorySort = d3.comparator()
        .order(d3.ascending, function(d) { return d.clothing_category; })
        .order(d3.ascending, function(d) { return cityNameArray[parseInt(d.city_id)]; });
    
    var patternSort = d3.comparator()
        .order(d3.ascending, function(d) { return d.clothing_pattern; })
        .order(d3.ascending, function(d) { return cityNameArray[parseInt(d.city_id)]; });
    
    var colorSort = d3.comparator()
        .order(d3.ascending, function(d) { return d.major_color; })
        .order(d3.ascending, function(d) { return cityNameArray[parseInt(d.city_id)]; });
    
    var necklineSort = d3.comparator()
        .order(d3.ascending, function(d) { return d.neckline_shape; })
        .order(d3.ascending, function(d) { return cityNameArray[parseInt(d.city_id)]; });
    
    var hatSort = d3.comparator()
        .order(d3.descending, function(d) { return d.wearing_hat; })
        .order(d3.ascending, function(d) { return cityNameArray[parseInt(d.city_id)]; });
    
    var glassesSort = d3.comparator()
        .order(d3.descending, function(d) { return d.wearing_glasses; })
        .order(d3.ascending, function(d) { return cityNameArray[parseInt(d.city_id)]; });
    
    var scarfSort = d3.comparator()
        .order(d3.descending, function(d) { return d.wearing_scarf; })
        .order(d3.ascending, function(d) { return cityNameArray[parseInt(d.city_id)]; });
    
    var necktieSort = d3.comparator()
        .order(d3.descending, function(d) { return d.wearing_necktie; })
        .order(d3.ascending, function(d) { return cityNameArray[parseInt(d.city_id)]; });
    
    var timeSort = d3.comparator()
        .order(d3.ascending, function(d) { return d.key; });
    
    
    var timeline = [
        "2013 Summer",
        "2013 Fall",
        "2013 Winter",
        "2014 Spring",
        "2014 Summer",
        "2014 Fall",
        "2014 Winter",
        "2015 Spring",
        "2015 Summer",
        "2015 Fall",
        "2015 Winter"
    ];
    
    var colors_left = {
        "White": "#FCE5F6",
        "Black": "#301015",
        "Pink": "#ED71AB",
        "Blue": "#2DB2EB",
        "Red": "#D42E00",
        "Cyan": "#00A384",
        "Green": "#81BA00",
        "Gray": "#58595B",
        "Yellow": "#FCDD00",
        "Brown": "#9B6A39",
        "Purple": "#8F74B4",
        "Orange": "#F56E14",
        "More than 1 color": "url(#colorful)"
    };
    
    var colors_right = {
        "White": "#FCF7FF",
        "Black": "303030",
        "Pink": "#ED88B7",
        "Blue": "#5BC0EB",
        "Red": "#E55934",
        "Cyan": "#00BD9D",
        "Green": "#9BC53D",
        "Gray": "#6D6E71",
        "Yellow": "#FCE74C",
        "Brown": "#9B7652",
        "Purple": "#9C89B8",
        "Orange": "#F58940",
        "More than 1 color": "url(#colorful)"
    };
    
    var matrix_legend = [
        "clothing_pattern:Solid",
        "clothing_pattern:Graphics",
        "clothing_pattern:Floral",
        "clothing_pattern:Striped",
        "clothing_pattern:Plaid",
        "clothing_pattern:Spotted",
        "wearing_necktie:Necktie",
        "collar_presence:Collar",
        "wearing_scarf:Scarf",
        "wearing_hat:Hat",
        "wearing_glasses:Glasses",
        "clothing_category:Shirt",
        "clothing_category:T-shirt",
        "clothing_category:Dress",
        "clothing_category:Outerwear",
        "clothing_category:Sweater",
        "clothing_category:Tank top",
        "clothing_category:Suit"
    ];
    
    
    cityStamp = [];
    timeStamp = "2013_2";
    sortStamp = citySort;
    filterStamp = "Shirt";
    sliderValue = 1;
    
    $(".slider").on("input", function() {
        sliderValue = $(".slider").val();
        
        $(".year, .quarter").css("opacity", "0");
        
        $(".quarter" + sliderValue + " .year").css("opacity", "1");
        
        $(".quarter" + sliderValue + " .quarter").css("opacity", "1");
        
        timeStamp = "201"+(3+(Math.floor(sliderValue/4)))+"_"+((sliderValue%4)+1);
        if (cityStamp.length > 0) {
            $("#chernoff_title").text("The Similarities of "+cityNameArray[cityStamp[0]]+"'s Style of "+ timeline[sliderValue-1]);
        } else {
            $("#chernoff_title").text("The Most Popular Styles in " + timeline[sliderValue-1]);
        }
        updateChernoff(timeStamp, sortStamp);
        updateMatrixChart(cityStamp, timeStamp);
        if (cityStamp.length > 0) {
            updateSimilarityChart(cityStamp);            
        }
        d3.select(".ruler")
            .style("top", 59+(52*(sliderValue-1))+"px");
    });
    
    $("#sortCity").click(function() {
        $(this).addClass("tagselected");
        $("#sortCategory").removeClass("tagselected");
        $("#sortPattern").removeClass("tagselected");
        $("#sortColor").removeClass("tagselected");
        $("#sortNeckline").removeClass("tagselected");
        $("#sortHat").removeClass("tagselected");
        $("#sortGlasses").removeClass("tagselected");
        $("#sortScarf").removeClass("tagselected");
        $("#sortNecktie").removeClass("tagselected");
        
        sortStamp = citySort;
        updateChernoff(timeStamp, sortStamp);
        if (cityStamp.length > 0) {
            updateSimilarityChart(cityStamp);            
        }

    });
    
    $("#sortCategory").click(function() {
        $(this).addClass("tagselected");
        $("#sortCity").removeClass("tagselected");
        $("#sortPattern").removeClass("tagselected");
        $("#sortColor").removeClass("tagselected");
        $("#sortNeckline").removeClass("tagselected");
        $("#sortHat").removeClass("tagselected");
        $("#sortGlasses").removeClass("tagselected");
        $("#sortScarf").removeClass("tagselected");
        $("#sortNecktie").removeClass("tagselected");
        
        sortStamp = categorySort;
        updateChernoff(timeStamp, sortStamp);
        if (cityStamp.length > 0) {
            updateSimilarityChart(cityStamp);            
        }

    });
    
    $("#sortPattern").click(function() {
        $(this).addClass("tagselected");
        $("#sortCity").removeClass("tagselected");
        $("#sortCategory").removeClass("tagselected");
        $("#sortColor").removeClass("tagselected");
        $("#sortNeckline").removeClass("tagselected");
        $("#sortHat").removeClass("tagselected");
        $("#sortGlasses").removeClass("tagselected");
        $("#sortScarf").removeClass("tagselected");
        $("#sortNecktie").removeClass("tagselected");
        
        sortStamp = patternSort;
        updateChernoff(timeStamp, sortStamp);
        if (cityStamp.length > 0) {
            updateSimilarityChart(cityStamp);            
        }
    });
    
    $("#sortColor").click(function() {
        $(this).addClass("tagselected");
        $("#sortCity").removeClass("tagselected");
        $("#sortCategory").removeClass("tagselected");
        $("#sortPattern").removeClass("tagselected");
        $("#sortNeckline").removeClass("tagselected");
        $("#sortHat").removeClass("tagselected");
        $("#sortGlasses").removeClass("tagselected");
        $("#sortScarf").removeClass("tagselected");
        $("#sortNecktie").removeClass("tagselected");
        
        sortStamp = colorSort;
        updateChernoff(timeStamp, sortStamp);
        if (cityStamp.length > 0) {
            updateSimilarityChart(cityStamp);            
        }

    });
    
    $("#sortNeckline").click(function() {
        $(this).addClass("tagselected");
        $("#sortCity").removeClass("tagselected");
        $("#sortCategory").removeClass("tagselected");
        $("#sortPattern").removeClass("tagselected");
        $("#sortColor").removeClass("tagselected");
        $("#sortHat").removeClass("tagselected");
        $("#sortGlasses").removeClass("tagselected");
        $("#sortScarf").removeClass("tagselected");
        $("#sortNecktie").removeClass("tagselected");
        
        sortStamp = necklineSort;
        updateChernoff(timeStamp, sortStamp);
        if (cityStamp.length > 0) {
            updateSimilarityChart(cityStamp);            
        }

    });
    
    $("#sortHat").click(function() {
        $(this).addClass("tagselected");
        $("#sortCity").removeClass("tagselected");
        $("#sortCategory").removeClass("tagselected");
        $("#sortPattern").removeClass("tagselected");
        $("#sortColor").removeClass("tagselected");
        $("#sortNeckline").removeClass("tagselected");
        $("#sortGlasses").removeClass("tagselected");
        $("#sortScarf").removeClass("tagselected");
        $("#sortNecktie").removeClass("tagselected");
        
        sortStamp = hatSort;
        updateChernoff(timeStamp, sortStamp);
        if (cityStamp.length > 0) {
            updateSimilarityChart(cityStamp);            
        }
    });
    
    $("#sortGlasses").click(function() {
        $(this).addClass("tagselected");
        $("#sortCity").removeClass("tagselected");
        $("#sortCategory").removeClass("tagselected");
        $("#sortPattern").removeClass("tagselected");
        $("#sortColor").removeClass("tagselected");
        $("#sortNeckline").removeClass("tagselected");
        $("#sortHat").removeClass("tagselected");
        $("#sortScarf").removeClass("tagselected");
        $("#sortNecktie").removeClass("tagselected");
        
        sortStamp = glassesSort;
        updateChernoff(timeStamp, sortStamp);
        if (cityStamp.length > 0) {
            updateSimilarityChart(cityStamp);            
        }

    });
    
    $("#sortScarf").click(function() {
        $(this).addClass("tagselected");
        $("#sortCity").removeClass("tagselected");
        $("#sortCategory").removeClass("tagselected");
        $("#sortPattern").removeClass("tagselected");
        $("#sortColor").removeClass("tagselected");
        $("#sortNeckline").removeClass("tagselected");
        $("#sortHat").removeClass("tagselected");
        $("#sortGlasses").removeClass("tagselected");
        $("#sortNecktie").removeClass("tagselected");
        
        sortStamp = scarfSort;
        updateChernoff(timeStamp, sortStamp);
        if (cityStamp.length > 0) {
            updateSimilarityChart(cityStamp);            
        }

    });
    
    $("#sortNecktie").click(function() {
        $(this).addClass("tagselected");
        $("#sortCity").removeClass("tagselected");
        $("#sortCategory").removeClass("tagselected");
        $("#sortPattern").removeClass("tagselected");
        $("#sortColor").removeClass("tagselected");
        $("#sortNeckline").removeClass("tagselected");
        $("#sortHat").removeClass("tagselected");
        $("#sortGlasses").removeClass("tagselected");
        $("#sortScarf").removeClass("tagselected");
        
        sortStamp = necktieSort;
        updateChernoff(timeStamp, sortStamp);
        if (cityStamp.length > 0) {
            updateSimilarityChart(cityStamp);            
        }

    });
    
    
    $("#trend").click(function() {
        $(this).addClass("section-selected");
        $("#combo").removeClass("section-selected");
        
        $(".line-chart-container").css("display", "block");
        $(".matrix-part").css("display", "none");
        
        $(".legend-icon-major").attr("src", "image/major-legend.svg");
        $(".legend-icon-secondary").attr("src", "image/secondary-legend.svg");
    });
    
    $("#combo").click(function() {
        $(this).addClass("section-selected");
        $("#trend").removeClass("section-selected");
        
        $(".line-chart-container").css("display", "none");
        $(".matrix-part").css("display", "block");
        
        $(".legend-icon-major").attr("src", "image/major-matrix-legend.svg");
        $(".legend-icon-secondary").attr("src", "image/secondary-matrix-legend.svg");
    });
    
    
    $(".filter-display, .filter-cue").click(function() {
        $(".dropdown-menu").toggleClass("menu-active menu-not-active");
        $(".submenu-container").toggleClass("menu-active menu-not-active");
        
        if ($(".dropdown-menu").hasClass("menu-active")) {
            $(".filter-container").css("background-color", "#4a4a4a");
            $(".break3").css("opacity", "0");
            $(".filter-icon").attr("src", "image/dropup.svg");
            $(".filter-cue").css("opacity", "1");
        }
        else {
            $(".filter-container").css("background-color", "#fff");
            $(".break3").css("opacity", "1");
            $(".filter-icon").attr("src", "image/dropdown.svg");
            $(".filter-cue").css("opacity", "0");
        }
    });
    
    $(".filter-display, .filter-cue").hover(function() {
        $(".filter-container").css("background-color", "#4a4a4a");
        $(".break3").css("opacity", "0");
        $(".filter-icon").attr("src", "image/dropdown.svg");
        $(".filter-cue").css("opacity", "1");
    }, function() {
        if ($(".dropdown-menu").hasClass("menu-active")) {
            $(".filter-container").css("background-color", "#4a4a4a");
            $(".break3").css("opacity", "0");
            $(".filter-icon").attr("src", "image/dropup.svg");
            $(".filter-cue").css("opacity", "1");
        }
        else {
            $(".filter-container").css("background-color", "#fff");
            $(".break3").css("opacity", "1");
            $(".filter-icon").attr("src", "image/dropdown.svg");
            $(".filter-cue").css("opacity", "0");
        }
    });
    
    $(".dropdown-menu li").click(function() {
        $(".dropdown-menu li").css("font-weight", "300");
        $(this).css("font-weight", "bold");
        
        if ($(this).text() == "CATEGORY") {
            $(".menu-category").css("display", "block");
            
            $(".menu-pattern").css("display", "none");
            $(".menu-color").css("display", "none");
            $(".menu-accessory").css("display", "none");
            $(".menu-neckline").css("display", "none");
        }
        else if($(this).text() == "PATTERN") {
            $(".menu-pattern").css("display", "block");
            
            $(".menu-category").css("display", "none");
            $(".menu-color").css("display", "none");
            $(".menu-accessory").css("display", "none");
            $(".menu-neckline").css("display", "none");
        }
        else if($(this).text() == "COLOR") {
            $(".menu-color").css("display", "block");
            
            $(".menu-category").css("display", "none");
            $(".menu-pattern").css("display", "none");
            $(".menu-accessory").css("display", "none");
            $(".menu-neckline").css("display", "none");
        }
        else if($(this).text() == "ACCESSORY") {
            $(".menu-accessory").css("display", "block");
            
            $(".menu-category").css("display", "none");
            $(".menu-pattern").css("display", "none");
            $(".menu-color").css("display", "none");
            $(".menu-neckline").css("display", "none");
        }
        else if($(this).text() == "NECKLINE") {
            $(".menu-neckline").css("display", "block");
            
            $(".menu-category").css("display", "none");
            $(".menu-pattern").css("display", "none");
            $(".menu-color").css("display", "none");
            $(".menu-accessory").css("display", "none");
        }
    });
    
    $(".dropdown-submenu li").click(function() {
        $(".dropdown-submenu li").css("font-weight", "300");
        $(this).css("font-weight", "bold");
        
        if ($(this).parent().hasClass("menu-category")) {
            $(".filter-category").text("CATEGORY");
        }
        else if ($(this).parent().hasClass("menu-pattern")) {
            $(".filter-category").text("PATTERN");
        }
        else if ($(this).parent().hasClass("menu-color")) {
            $(".filter-category").text("COLOR");
        }
        else if ($(this).parent().hasClass("menu-accessory")) {
            $(".filter-category").text("ACCESSORY");
        }
        else if ($(this).parent().hasClass("menu-neckline")) {
            $(".filter-category").text("NECKLINE");
        }
        
        $(".filter-sub-category").text($(this).text());
        
        var str = $(this).text().toLowerCase();
        
        var str_changed = str.charAt(0).toUpperCase() + str.substr(1);
        
        console.log(str_changed);
        
        if (str_changed == "Colorful") {
            filterStamp = "More than 1 color";
        }
        else {
            filterStamp = str_changed;
        }
        
        if (cityStamp.length > 0) {
            updateLineChart(cityStamp, filterStamp);
        }
        
        $(".dropdown-menu").removeClass("menu-active");
        $(".dropdown-menu").addClass("menu-not-active");
        $(".submenu-container").removeClass("menu-active");
        $(".submenu-container").addClass("menu-not-active");
        
        $(".filter-container").css("background-color", "#fff");
        $(".break3").css("opacity", "1");
        $(".filter-icon").attr("src", "image/dropdown.svg");
        $(".filter-cue").css("opacity", "0");
        
    });
    
    
    
    
    d3.csv("../data/streetstyle.csv")
        .row(function(d) {
            var quarter_id;
            
            if ((d.month_id == "2013_7") || (d.month_id == "2013_8")) {
                quarter_id = "2013_2";
            }
            else if ((d.month_id == "2013_9") || (d.month_id == "2013_10") || (d.month_id == "2013_11")) {
                quarter_id = "2013_3";
            }
            else if ((d.month_id == "2013_12") || (d.month_id == "2014_1") || (d.month_id == "2014_2")) {
                quarter_id = "2013_4";
            }
            else if ((d.month_id == "2014_3") || (d.month_id == "2014_4") || (d.month_id == "2014_5")) {
                quarter_id = "2014_1";
            }
            else if ((d.month_id == "2014_6") || (d.month_id == "2014_7") || (d.month_id == "2014_8")) {
                quarter_id = "2014_2";
            }
            else if ((d.month_id == "2014_9") || (d.month_id == "2014_10") || (d.month_id == "2014_11")) {
                quarter_id = "2014_3";
            }
            else if ((d.month_id == "2014_12") || (d.month_id == "2015_1") || (d.month_id == "2015_2")) {
                quarter_id = "2014_4";
            }
            else if ((d.month_id == "2015_3") || (d.month_id == "2015_4") || (d.month_id == "2015_5")) {
                quarter_id = "2015_1";
            }
            else if ((d.month_id == "2015_6") || (d.month_id == "2015_7") || (d.month_id == "2015_8")) {
                quarter_id = "2015_2";
            }
            else if ((d.month_id == "2015_9") || (d.month_id == "2015_10") || (d.month_id == "2015_11")) {
                quarter_id = "2015_3";
            }
            else if (d.month_id == "2015_12") {
                quarter_id = "2015_4";
            }
        
        
            return {
                city_id: d.city_id,
                month_id: d.month_id,
                quarter_id: quarter_id,
                clothing_category: d.clothing_category,
                clothing_pattern: d.clothing_pattern,
                major_color: d.major_color,
                neckline_shape: d.neckline_shape,
                wearing_hat: d.wearing_hat,
                wearing_glasses: d.wearing_glasses,
                wearing_scarf: d.wearing_scarf,
                wearing_necktie: d.wearing_necktie,
                url : d.url,
                collar_presence : d.collar_presence
            }
        })
        .get(function(error, rows) {

            if (error) {
                console.log("Error while loading ./streetstyle.csv dataset.");
                console.log(error);
                return;
            }

            dataset = rows;

            // main body
            maleHeadHTML = '<svg><rect class="part1 malehead-cls-1" x="33.25" y="105.02" width="15.62" height="18.31"/><path id="_Path_" data-name="&lt;Path&gt;" class="part1 malehead-cls-1" d="M2.63,66.13C5.06,73.7,10,73.05,10,73.05L6.6,57.58S.2,58.56,2.63,66.13Z"/><path id="_Path_2" data-name="&lt;Path&gt;" class="part1 malehead-cls-1" d="M79.49,66.13c-2.43,7.57-7.41,6.92-7.41,6.92l3.44-15.47S81.92,58.56,79.49,66.13Z"/><path class="part2 malehead-cls-2" d="M76.06,51.69c0,19.33-10.78,57.24-35.14,57.24S6.06,71,6.06,51.69a35,35,0,0,1,70,0Z"/><path class="part1 malehead-cls-1" d="M40.92,108.93C16.56,108.93,6.06,71,6.06,51.69a35,35,0,0,1,35-35Z"/><path class="malehead-cls-3" d="M74.71,66.55s1.84-16.21,4.71-23.5,3.19-16.7-5.91-19.61c0,0,1.83-11.61-11.36-17.44S40.21-5.3,15.37,9.5c0,0-14.53,9.82-8.5,13.18,0,0-4.67,1.68-3.32,6,0,0-5.87,2.91-1.8,8,0,0-4.22,6.42.45,5.81,0,0-2.71,6,3.16,4.58,0,0,.45,10.55,1,10.85s1.81,9,1.81,9S9.73,57.53,9,51.57c0,0-.15-3.82,5.42-8.25,0,0,6.48-7.71,27.4-10,0,0,17.77-1.42,22.44-3,0,0,1.8,1.69,4.66,7.34,0,0-1.2,10.85,3.17,11.77C72.06,49.43,72,55.7,74.71,66.55Z"/><path class="malehead-cls-3" d="M74.3,69.52S74,84.1,75.93,87.12s-3.8,12.65-7.32,14.3c0,0-7,10.44-12.47,9.34a16.75,16.75,0,0,1-15.89,4.4s-9.87,2.48-14.48-4.12c0,0-10.57-4.12-13.55-10.72A13.76,13.76,0,0,1,6.8,83.82s.81-13.75,1.08-15.67,3,9.52,7.59,14.85a20,20,0,0,0,7.09,5.15,25.75,25.75,0,0,0,.78,5.57c1,2.8,8.44,14.57,14.11.55h7.3S49.9,108,58,94.82l.55-5.5s10.84-6,13.28-12.92Z"/></svg>';

            femaleHeadHTML = '<svg><rect class="part1 femalehead-cls-1" x="30.17" y="105.14" width="15.62" height="18.19"/><path id="_Path_" data-name="&lt;Path&gt;" class="part1 femalehead-cls-1" d="M.55,75.45C3,83,8,82.33,8,82.33L4.52,67S-1.88,67.93.55,75.45Z"/><path id="_Path_2" data-name="&lt;Path&gt;" class="part1 femalehead-cls-1" d="M75.41,75.45C73,83,68,82.33,68,82.33L71.44,67S77.84,67.93,75.41,75.45Z"/><path class="part2 femalehead-cls-2" d="M73,55.15C73,74.35,62.2,112,37.84,112S3,74.35,3,55.15a35,35,0,0,1,70,0Z"/><path class="part1 femalehead-cls-1" d="M37.84,112C13.48,112,3,74.35,3,55.15A34.89,34.89,0,0,1,38,20.38Z"/><path id="_Path_3" data-name="&lt;Path&gt;" class="femalehead-cls-3" d="M14.44,12.68l0,.06h0a28.32,28.32,0,0,0-2.5,11.63c0,.22-3.68,3.56-5.15,6.94-1.17,2.67-3.84,11-4.3,12.34a21.56,21.56,0,0,0-.58,7.41v.1a45,45,0,0,0,1.59,9.64c0,.55,0,1.17,0,1.85,0,.26,0,.52,0,.8s0,.55,0,.84,0,.36,0,.55,0,.56,0,.86c0,.14,0,.29,0,.44v.06c0,.19,0,.39,0,.59s0,.17,0,.26c0,.38,0,.78,0,1.18v.08c0,.09,0,.17,0,.26s0,.17,0,.26,0,.32,0,.47l0,.8c0,.93.06,1.89.1,2.87.07,2.12.17,4.34.27,6.57,0,.83.07,1.66.12,2.49,0,.3,0,.6,0,.89C4.61,89.27,5,95.33,5.59,99c.8,5.31,1.59,10.67,3.27,15.46,1.29,3.72,3.71,4.36,3.71,4.36-.32-1.27-.85-3.58-1.1-4.93A114,114,0,0,1,9.81,98.64c-.05-.93-.09-1.86-.12-2.8,0-.35,0-.71,0-1.06-.08-2.52-.11-5-.11-7.48v0c0-.2,0-.4,0-.6,0-6,.19-11.61.28-16.34.06-2.61.08-4.94.08-6.92,0-1.09,0-2.09,0-3,.86-.37,2.2-.88,3.89-1.42l.72,1,.09.14.08,0,.08.1a1.1,1.1,0,0,1,.09.14l.15,0,.45-.16a3.52,3.52,0,0,0,.45-.18l.84-.42.81-.46c.14-.08.27-.19.4-.28l.39-.29.12-.08-.06-.15c-.06-.18-.12-.37-.2-.56l.95-.24.3.38a1.34,1.34,0,0,1,.11.14l.06,0,.08.1.12.14.14-.06.48-.19a3.15,3.15,0,0,0,.47-.2l.88-.46.73-.48c0,.19.09.39.14.59a1.17,1.17,0,0,0,.05.2,1.25,1.25,0,0,0,.19,0,0,0,0,0,1,0,0c0,.07,0,.14.05.21l.19,0q1.08-.16,2.16-.27c.7-.15,1.4-.27,2.11-.38s1.39-.3,2.09-.42l2.08-.35.22,0a.68.68,0,0,1,0-.14l.69.05,1.28.19c.44.06.88.11,1.31.13l.67,0c.22,0,.45-.06.68-.1l.16,0,0-.19c0-.23,0-.46.09-.68.39,0,.8,0,1.21-.05,0,.24.06.48.1.71l0,.22h.23l0,.2h.21l1.33.1c.44,0,.89.08,1.35.09l.17,0a.84.84,0,0,1,.05-.17c.11-.38.23-.75.34-1.11,1.33.07,2.65.2,4,.36,1.11.27,2.21.58,3.3.92l.23.07q0-.13.06-.24c0-.06,0-.13,0-.19l1.57.31c.54.35,1.09.69,1.65,1s1.14.62,1.73.9c.29.13.59.27.9.38a7.89,7.89,0,0,0,.94.3l.18,0a1,1,0,0,0,.08-.18c.17-.33.33-.66.49-1,4.19,1.2,7,2.39,7.29,2.68a4.44,4.44,0,0,0,1.06-1.21c.08.4.15.8.22,1.21.07.8.1,1.76.12,2.85v.11c0,.12,0,.23,0,.35,0,1.57,0,3.33,0,5.24,0,2.87.12,6.07.22,9.48,0,1.13.07,2.29.1,3.46v.13c0,1.32.07,2.66.1,4,0,.21,0,.43,0,.64,0,3.25.07,6.57,0,9.9,0,.65-.08,2.43-.1,2.94,0,.28-.17,3.26-.28,4.46-.2,2.44-.45,4.83-.82,7.13-.17,1.15-.41,2.27-.6,3.38s-.46,2.17-.74,3.2c-.15.51-.28,1-.42,1.53s2-.8,3.4-4.2c.33-1.1.7-2.23,1-3.39.63-2.33,1.15-4.75,1.63-7.22s.84-5,1.17-7.53c.64-4.92,1.07-9.83,1.44-14.45l0-.39c0-.15,0-.32,0-.49,0-.67.07-1.48.09-2.41s0-1.82,0-2.84c0-.7,0-1.43,0-2.17,0-1.59,0-3.24,0-4.82v-.51c0-.83,0-1.63,0-2.39,0-.23,0-.45,0-.67,0-1.3,0-2.45,0-3.37.66-1.36,1.09-4.92,1-9.48-.12-6.92-1.42-16.16-4.92-23.55-.36-.75-3-3.75-3-4.19,0-3.67-1.9-7.9-4.59-11.72a33.94,33.94,0,0,0-9.45-9.21A30.93,30.93,0,0,0,34.81,0,21.89,21.89,0,0,0,14.44,12.68Z"/></svg>';

            maleUpperbodyHTML = '<svg><path class="part2 maleupperbody-cls-1" d="M24.49,107.05H96.36l-.67-59.89s6.18,18.21,9,64.5H120S118,53.46,105.23,17.91c0,0-8.16-17.91-44.5-17.91S15.81,17.6,15.81,17.6,7.19,26.4.8,111.66H16.17s3.34-51.52,9-64.5Z"/><path class="part1 maleupperbody-cls-2" d="M24.8,107.05H60.38L61,0C24.69,0,16.12,17.6,16.12,17.6s-8.62,8.8-15,94.06H16.48s3.33-51.52,9-64.5Z"/><path class="part1 maleupperbody-cls-2" d="M1.65,111.66A7.79,7.79,0,0,0,0,116.47v6.62a7.65,7.65,0,0,0,7.57,7.72,7.65,7.65,0,0,0,7.57-7.72v-4.73l1,2.59a2.29,2.29,0,0,0,4.31-1.53L19.15,116a2.44,2.44,0,0,0-.14-.28h0a13.8,13.8,0,0,0-3.2-4.08H1.65Z"/><path class="part2 maleupperbody-cls-1" d="M119.22,111.66H105a13.86,13.86,0,0,0-3.19,4.08h0a2.44,2.44,0,0,0-.14.28l-1.27,3.4a2.28,2.28,0,0,0,4.3,1.53l1-2.59v4.73a7.57,7.57,0,1,0,15.14,0v-6.62A7.79,7.79,0,0,0,119.22,111.66Z"/></svg>';

            femaleUpperbodyHTML = '<svg><path class="part2 femaleupperbody-cls-1" d="M24.49,107.05H96.36l-.67-59.89s6.18,18.21,9,64.5H120S118,53.46,105.23,17.91c0,0-8.16-17.91-44.5-17.91S15.81,17.6,15.81,17.6,7.19,26.4.8,111.66H16.17s3.34-51.52,9-64.5Z"/><path class="part1 femaleupperbody-cls-2" d="M24.8,107.05H60.38L61,0C24.69,0,16.12,17.6,16.12,17.6s-8.62,8.8-15,94.06H16.48s3.33-51.52,9-64.5Z"/><path class="part1 femaleupperbody-cls-2" d="M1.65,111.66A7.79,7.79,0,0,0,0,116.47v6.62a7.65,7.65,0,0,0,7.57,7.72,7.65,7.65,0,0,0,7.57-7.72v-4.73l1,2.59a2.29,2.29,0,0,0,4.31-1.53L19.15,116a2.44,2.44,0,0,0-.14-.28h0a13.8,13.8,0,0,0-3.2-4.08H1.65Z"/><path class="part2 femaleupperbody-cls-1" d="M119.22,111.66H105a13.86,13.86,0,0,0-3.19,4.08h0a2.44,2.44,0,0,0-.14.28l-1.27,3.4a2.28,2.28,0,0,0,4.3,1.53l1-2.59v4.73a7.57,7.57,0,1,0,15.14,0v-6.62A7.79,7.79,0,0,0,119.22,111.66Z"/></svg>';

            maleDownbodyHTML = '<svg><path class="part1 maledownbody-cls-1" d="M24.63,133.6a3.49,3.49,0,0,1,.64,0,3.52,3.52,0,0,1,2.29.68A3.47,3.47,0,0,1,29,136.61,4.8,4.8,0,0,1,28,140.14c-.31.41.58,1.59.81,1.83,1.57,1.68,4.37,1.87,6.51,1.89,1,0,2-.05,3-.13.77-.08,1.52-.23,2.28-.38a13.48,13.48,0,0,0,1.67-.52,4.39,4.39,0,0,1,1-.22c-.15-.51-.32-1-.52-1.55v-9.69H24.63Z"/><path class="part2 maledownbody-cls-2" d="M64.36,141.07c-.19.51-.37,1-.52,1.54a4,4,0,0,1,1.2.22,13.48,13.48,0,0,0,1.67.52c.75.15,1.51.3,2.28.38,1,.08,2,.14,3,.13,2.14,0,4.93-.21,6.51-1.89.22-.23,1-1.3.83-1.76l-.1-.07a4.73,4.73,0,0,1-1.05-3.5,3.71,3.71,0,0,1,3.73-3.09,3.19,3.19,0,0,1,.54,0v-4.47H64.36Z"/><path class="maledownbody-cls-3" d="M53.56.1V18.94h5.57l2.72,112.19H84.19l3-123.19A20.77,20.77,0,0,0,88.81,0H53.56Z"/><path class="maledownbody-cls-4" d="M18.3,0a21,21,0,0,0,1.6,7.92l3,123.45H45.27L48,18.94h5.56V.1Z"/><polygon class="maledownbody-cls-5" points="62.97 153.4 62.97 152.85 62.57 152.85 62.57 155.88 107.12 155.88 107.12 152.85 107.12 152.85 107.12 153.4 62.97 153.4"/><path class="maledownbody-cls-6" d="M86.6,135.74c2.45,1.74,12.15,4.74,12.15,4.74a17.16,17.16,0,0,1,1.76.62,3.16,3.16,0,0,1,1.51,3.7c-.57,2.75-7.42,1.88-8.88,1.64a29.53,29.53,0,0,1-11.94-4.85c-.63-.43-1.24-.9-1.84-1.38.19.46-.61,1.53-.83,1.76-1.58,1.68-4.37,1.87-6.51,1.89-1,0-2-.05-3-.13-.77-.08-1.53-.23-2.28-.38a13.48,13.48,0,0,1-1.67-.52,4,4,0,0,0-1.2-.22c-.46,0-.87.19-.87.8v10h44.15v-4.84c0-2.38-1.59-6.06-8.31-8.08,0,0-9.69-3-12.14-4.74a10.72,10.72,0,0,0-4.19-2.14,3.19,3.19,0,0,0-.54,0C83.58,133.61,85.21,134.74,86.6,135.74Z"/><path class="maledownbody-cls-5" d="M93.14,146.44c1.46.24,8.31,1.11,8.88-1.64a3.16,3.16,0,0,0-1.51-3.7,17.16,17.16,0,0,0-1.76-.62s-9.7-3-12.15-4.74c-1.39-1-3-2.13-4.66-2.19a3.71,3.71,0,0,0-3.73,3.09,4.73,4.73,0,0,0,1.05,3.5l.1.07c.6.48,1.21.95,1.84,1.38A29.53,29.53,0,0,0,93.14,146.44Z"/><polygon class="maledownbody-cls-7" points="0.21 153.4 0.21 152.85 0 152.85 0 155.88 44.54 155.88 44.54 152.85 44.34 152.85 44.34 153.4 0.21 153.4"/><path class="maledownbody-cls-8" d="M40.61,143.35c-.76.15-1.51.3-2.28.38-1,.08-2,.14-3,.13-2.14,0-4.94-.21-6.51-1.89-.23-.24-1.12-1.42-.81-1.83A4.8,4.8,0,0,0,29,136.61a3.47,3.47,0,0,0-1.47-2.37,3.52,3.52,0,0,0-2.29-.68,3.43,3.43,0,0,1,2.08.69c2.09,1.49,1.88,4,.43,5.89-.63.51-1.27,1-1.93,1.45a29.58,29.58,0,0,1-11.94,4.85c-1.46.24-8.32,1.11-8.88-1.64a3.18,3.18,0,0,1,1.17-3.49c-4.79,2.09-6,5.17-6,7.25v4.84H44.34v-10c0-.7-.51-.84-1.07-.8a4.39,4.39,0,0,0-1,.22A13.48,13.48,0,0,1,40.61,143.35Z"/><path class="maledownbody-cls-7" d="M5,144.8c.56,2.75,7.42,1.88,8.88,1.64a29.58,29.58,0,0,0,11.94-4.85c.66-.46,1.3-.94,1.93-1.45,1.45-1.89,1.66-4.4-.43-5.89a3.43,3.43,0,0,0-2.08-.69,3.49,3.49,0,0,0-.64,0,10.68,10.68,0,0,0-4.18,2.14C18,137.48,8.3,140.48,8.3,140.48a18,18,0,0,0-1.76.62,1.85,1.85,0,0,0-.34.21A3.18,3.18,0,0,0,5,144.8Z"/></svg>';

            femaleDownbodyHTML = '<svg><path id="_Path_" data-name="&lt;Path&gt;" class="part1 femaledownbody-cls-1" d="M25.68,56.27v76.42L13.49,139h0c-5.39,5.33,4,5.65,12.89,3.09a70.58,70.58,0,0,0,15.12-6.73c1.31-.76,2.08-1.27,2.08-1.27V56.31l-17.89.07S25.68,56.3,25.68,56.27Z"/><path id="_Path_2" data-name="&lt;Path&gt;" class="part2 femaledownbody-cls-2" d="M53.06,134.32s.78.51,2,1.26a70.72,70.72,0,0,0,15.15,6.74c8.83,2.55,18.21,2.24,12.94-3L71,133V56.38H53.06Z"/><path class="femaledownbody-cls-3" d="M48.32.1V18.94h3.57l1.17,98.7H71L81,8.94c2.61-1.63,2.6-6.1,2.61-8.94H48.32Z"/><path class="femaledownbody-cls-4" d="M13.07,0c0,2.84,0,7,2.6,8.92l10,108.71,17.91-.15,1.17-98.54h3.56V.1Z"/><path id="_Path_3" data-name="&lt;Path&gt;" class="femaledownbody-cls-5" d="M36.27,148.37a16.71,16.71,0,0,1,1,5.79h4.22c-.39-1.7,1.07-7.34,1.75-9.81.07-.22.12-.41.16-.57C42.35,146.55,38.74,147.72,36.27,148.37Z"/><path id="_Path_4" data-name="&lt;Path&gt;" class="femaledownbody-cls-6" d="M26.39,142.12c-8.87,2.56-18.28,2.24-12.89-3.09h0s-1.47.72-3.38,1.76l-1,.57a32.84,32.84,0,0,0-7.07,5c-3,3.2-4.55,11.56,8.92,8.8h0c1.44-.3,2.81-.6,4.13-.9,11-2.47,17.57-4.89,19.54-5.44h0l1.62-.41c2.47-.65,6.08-1.82,7.09-4.59a4.27,4.27,0,0,0,.18-.61h0a30.19,30.19,0,0,0,.05-9s-.77.51-2.08,1.27A70.58,70.58,0,0,1,26.39,142.12Z"/><path id="_Path_5" data-name="&lt;Path&gt;" class="femaledownbody-cls-5" d="M53.28,144l.18.63c.68,2.51,2.12,8.07,1.74,9.75h4.22a16.44,16.44,0,0,1,1-5.79C57.9,147.92,54.29,146.76,53.28,144Z"/><path id="_Path_6" data-name="&lt;Path&gt;" class="femaledownbody-cls-7" d="M70.26,142.32a70.72,70.72,0,0,1-15.15-6.74c-1.27-.75-2-1.24-2-1.26h0a30.19,30.19,0,0,0,.05,9l0,.15c0,.16.09.32.13.47,1,2.78,4.62,3.94,7.1,4.59L62,149a209.48,209.48,0,0,0,23.67,6.34c13.47,2.76,11.89-5.59,8.92-8.8-1.63-1.76-4.91-3.78-7.56-5.25l0,0c-2.16-1.2-3.86-2-3.86-2l0,.05C88.47,144.56,79.09,144.87,70.26,142.32Z"/></svg>';


            // clothing category
            tanktopHTML = '<svg><path class="tanktop-right tanktop-cls-1" d="M71.2,52.2l.66,54.85H0L.67,52C18.6,30.64,7.1,5.11,7.1,5.11,13.87,2.23,23.29,0,36.24,0,48.77,0,58,2.13,64.61,4.92,64.61,4.92,53.69,30.57,71.2,52.2Z"/><path class="tanktop-left tanktop-cls-2" d="M35.93,107.05H0L.67,52C18.6,30.64,7.1,5.11,7.1,5.11,13.87,2.23,23.29,0,36.24,0Z"/><path d="M71.2,52.2l.66,54.85H0L.67,52C18.6,30.64,7.1,5.11,7.1,5.11,13.87,2.23,23.29,0,36.24,0,48.77,0,58,2.13,64.61,4.92,64.61,4.92,53.69,30.57,71.2,52.2Z"/></svg>';

            tshirtHTML = '<svg><path class="tshirt-right tshirt-cls-1" d="M18.19,58.05a57.5,57.5,0,0,1,2.95-10.89l-.67,59.89H92.34l-.66-59.89A101.29,101.29,0,0,1,94.33,58l18.46-5.78s0-9-11.58-34.31c0,0-8.16-17.91-44.5-17.91S11.79,17.6,11.79,17.6s-8,14-11.79,34.89Z"/><path class="tshirt-left tshirt-cls-2" d="M18.51,58.05a57.39,57.39,0,0,1,3-10.89l-.67,59.89H56.72L57,0C20.69,0,12.12,17.6,12.12,17.6s-8,14-11.8,34.89Z"/><path d="M18.19,58.05a57.5,57.5,0,0,1,2.95-10.89l-.67,59.89H92.34l-.66-59.89A101.29,101.29,0,0,1,94.33,58l18.46-5.78s0-9-11.58-34.31c0,0-8.16-17.91-44.5-17.91S11.79,17.6,11.79,17.6s-8,14-11.79,34.89Z"/></svg>';

            shirtHTML = '<svg><path class="shirt-right shirt-cls-1" d="M24,107.05H95.86L95.2,47.16s6.17,18.21,9,64.5h15.38s-2.07-58.2-14.81-93.75c0,0-8.16-17.91-44.5-17.91S15.32,17.6,15.32,17.6,6.7,26.4.31,111.66H15.68s3.33-51.52,9-64.5Z"/><path class="shirt-cls-2" d="M72.37,24H87.48a0,0,0,0,1,0,0V40.27a2,2,0,0,1-2,2H74.37a2,2,0,0,1-2-2V24A0,0,0,0,1,72.37,24Z"/><path class="shirt-left shirt-cls-2" d="M23.69,107.05l.67-59.89c-5.65,13-9,64.5-9,64.5H0C6.39,26.4,15,17.6,15,17.6S23.59,0,59.93,0l-.31,107.05Z"/><rect class="shirt-cls-3" x="72.37" y="23.96" width="15.11" height="4"/><path d="M24,107.05H95.91l-.66-59.89s6.17,18.21,9,64.5h15.37s-2.06-58.2-14.81-93.75c0,0-8.16-17.91-44.5-17.91S15.36,17.6,15.36,17.6s-8.62,8.8-15,94.06H15.73s3.33-51.52,9-64.5Z"/></svg>';

            sweaterHTML = '<svg><path class="sweater-right sweater-cls-1" d="M25.15,107.05H94.89s-1.56-6.11-.3-6.81c1.1-.61.86-2.82.86-2.82L94.9,47.16s1,17.66,6.88,46.05c1.73,8.28,4,11.51,2.56,16.11l14.09,1.22c-2.12-5.82,1.55-13.16-.54-32-2.11-19-7.06-42.74-13.46-60.59,0,0-8.16-17.91-44.5-17.91S15,17.6,15,17.6s-7.5,6.84-13.89,92.1H13.42s5.29-49.56,10.94-62.54l-.57,51.48s1,2.08,2.5,1.69S25.15,107.05,25.15,107.05Z"/><path class="sweater-left sweater-cls-2" d="M24.38,107.05H59.27L59.93,0C23.59,0,15,17.6,15,17.6S7.77,24,2,78.36c-.91,8.54-1.46,23.21-.15,29.29a7.18,7.18,0,0,1-.07,2.84l11.67-.79s-.09,1.58,1-2.23c1.39-4.88,3-8.28,4.35-19.51,1.46-12,4.15-34.09,5.6-40.8L23.8,97c0,.93-.26,1.94.58,2.71C26.49,101.6,24.38,107.05,24.38,107.05Z"/><path class="sweater-cls-3" d="M94.13,107.66c-4.19,1.53-18.43,4-34.51,4-14.85.09-31.71-2.16-34.28-3.62s-2.4-2.55-2.41-4.26-.2-3.06,1.45-4.15c2.07-1.35,9.47,1.26,22.06,2.64,8.5.93,20.52,1.4,28.1.17,9.7-1.56,17.28-4.48,20.29-2.94,1.68.87,1.45,2,1.51,3.91S96.67,106.73,94.13,107.66Z"/><path class="sweater-cls-4" d="M24.85,99.46s-1.25,4.71,0,8.33a4.77,4.77,0,0,0,1.34.64c.66.19-1.68-7.21.43-9.12A9.32,9.32,0,0,0,24.85,99.46Z"/><path class="sweater-cls-4" d="M27.53,99.37s.68,5.83-.1,9.41l1.59.37c.27.07,0-8.82-.19-9.61C28.83,99.54,28,99.41,27.53,99.37Z"/><path class="sweater-cls-4" d="M30.34,99.76s.2,8.43.32,9.68c0,0,1.16.2,1.42.26s-.24-9.1-.41-9.71A8.5,8.5,0,0,0,30.34,99.76Z"/><path class="sweater-cls-4" d="M33.59,100.39s-.34,8.73.71,9.59a6.46,6.46,0,0,0,1.56.26s-2.09-8.73-.71-9.66A6.38,6.38,0,0,0,33.59,100.39Z"/><path class="sweater-cls-4" d="M37.18,101s1.48,3.45.24,9.39a11.43,11.43,0,0,0,1.27.14c.41,0,.12-8.79-.12-9.32A7.2,7.2,0,0,0,37.18,101Z"/><path class="sweater-cls-4" d="M40.31,101.5s-.33,7.88.41,9.28l1.29.11s-.7-.8-.58-9.23A3.36,3.36,0,0,0,40.31,101.5Z"/><path class="sweater-cls-4" d="M43.27,101.91s-.25,7.56.19,9.11a6.89,6.89,0,0,0,1.2.09c.25,0-.82-6.33-.16-9A9.36,9.36,0,0,0,43.27,101.91Z"/><path class="sweater-cls-4" d="M45.85,102.22s2.58,6.72.41,9a6.11,6.11,0,0,0,1.72.1s1-7.79-.17-8.89A10.1,10.1,0,0,0,45.85,102.22Z"/><path class="sweater-cls-4" d="M49.67,102.64s-.69,8.75.17,8.78a2.47,2.47,0,0,0,1.24.11c.38-.18-.31-8.89-.31-8.89A3.35,3.35,0,0,0,49.67,102.64Z"/><path class="sweater-cls-4" d="M53.05,102.88s-2,5.07.45,8.7a11.18,11.18,0,0,0,1.53.08s-3.14-7.33,0-8.66A12.85,12.85,0,0,0,53.05,102.88Z"/><path class="sweater-cls-4" d="M56.78,103.13s-1.28,6.7,0,8.45c0,0,.32.32,1.69.11,0,0-.09-8.06,0-8.54A7.79,7.79,0,0,0,56.78,103.13Z"/><path class="sweater-cls-4" d="M60.41,103.2s.78,6.35,0,8.46a6.71,6.71,0,0,0,2,0c.76-.17-1-8.46-1-8.46Z"/><path class="sweater-cls-4" d="M63.2,103.22s1.79,2.94,1.11,8.36a5.14,5.14,0,0,0,1.74,0c.87-.19-2.17-8.27-1.16-8.32A3.84,3.84,0,0,0,63.2,103.22Z"/><path class="sweater-cls-4" d="M66.5,103.15s.4,6.83,1.69,8.24a3.5,3.5,0,0,0,1.35-.07s-2.09-7.1-1.52-8.21A5.7,5.7,0,0,0,66.5,103.15Z"/><path class="sweater-cls-4" d="M69.3,103s2.16,5.29,1.94,8.21a6.65,6.65,0,0,0,1.54-.12s-1.32-8.21-2.4-8.15A2.82,2.82,0,0,0,69.3,103Z"/><path class="sweater-cls-4" d="M73.23,102.64s1.32,6.06.42,8.39a9.79,9.79,0,0,0,1.41-.12c.26-.09-.18-8.54-.18-8.54S73.47,102.34,73.23,102.64Z"/><path class="sweater-cls-4" d="M76,102.19s2.27,6.27,1,8.51a5.21,5.21,0,0,0,1.55-.15c.27-.18-1.29-8.55-1.29-8.55S76.22,101.92,76,102.19Z"/><path class="sweater-cls-4" d="M79.12,101.59s-.33,7.64,1.85,8.66l1-.15s-1.07-7.82-2-8.69Z"/><path class="sweater-cls-4" d="M81.74,101s3,6.93,2.21,8.78c0,0,1.11.06,1.26-.18s-2-8.83-2.36-8.86A3.47,3.47,0,0,0,81.74,101Z"/><path class="sweater-cls-4" d="M84.43,100.46s.6,7.91,2.51,8.86c0,0,1.22-.09,1.25-.23s-3.52-8.3-2.71-8.9C85.48,100.19,84.58,100.19,84.43,100.46Z"/><path class="sweater-cls-4" d="M86.73,99.92s3.13,7.61,2.81,8.87a2.6,2.6,0,0,0,1.4-.27c.66-.36-3.31-8.78-3.31-8.78Z"/><path class="sweater-cls-4" d="M89.86,99.35s2,8.45,2.3,8.87a3.46,3.46,0,0,0,1.2-.33c.21-.21-2.3-8.81-2.48-8.72S90.19,99.11,89.86,99.35Z"/><path class="sweater-cls-4" d="M93.37,99.15s1.73,7.71,1.43,8.23a5.4,5.4,0,0,0,1-.68c.21-.26-.93-7.17-.93-7.17A2.17,2.17,0,0,0,93.37,99.15Z"/><path class="sweater-cls-3" d="M1.48,105.92c1.78-.35,5.33-.88,13.32.36,1.32.21,1.36,5.28,0,5.47-5.84.79-8,.57-13.77,0C-.17,111.68-.67,106.34,1.48,105.92Z"/><path class="sweater-cls-4" d="M1.48,105.92A14,14,0,0,0,1,111.79l1.13.1.24-6.13A1.74,1.74,0,0,0,1.48,105.92Z"/><path class="sweater-cls-4" d="M3.7,105.6s-.77,4.83-.41,6.4a1.75,1.75,0,0,0,1.15.09c.59-.18,0-6.59,0-6.59A4.37,4.37,0,0,1,3.7,105.6Z"/><path class="sweater-cls-4" d="M5.63,105.51s.78,5.41,0,6.64a2.56,2.56,0,0,0,1.42.09c.65-.19-.36-6.73-.36-6.73A1.16,1.16,0,0,0,5.63,105.51Z"/><path class="sweater-cls-4" d="M8.16,105.56s-.33,5.17.59,6.7c0,0,1,.22,1.33,0s-1-6.61-1-6.61A1.22,1.22,0,0,0,8.16,105.56Z"/><path class="sweater-cls-4" d="M10.68,105.75s.79,4.71.44,6.4c0,0,1,.12,1.21-.11s-.19-6.13-.63-6.18S11.13,105.51,10.68,105.75Z"/><path class="sweater-cls-4" d="M13.21,106.05a50.92,50.92,0,0,0,.44,5.84,7.11,7.11,0,0,0,1.15-.14c.23-.09-.59-5.56-.59-5.56A1.19,1.19,0,0,0,13.21,106.05Z"/><path class="sweater-cls-3" d="M118.09,105.92c-1.79-.35-5.33-.88-13.32.36-1.33.21-1.36,5.28,0,5.47,5.83.79,8,.57,13.77,0C119.73,111.68,120.24,106.34,118.09,105.92Z"/><path class="sweater-cls-4" d="M104.77,106.28s1,4.45,0,5.47a2.94,2.94,0,0,0,1.34.17c.4-.15.82-5.55,0-5.84A1.34,1.34,0,0,0,104.77,106.28Z"/><path class="sweater-cls-4" d="M107.62,105.89s1,4.86,0,6.19l1.64.13c.35,0,0-6.5-.28-6.47S108.26,105.46,107.62,105.89Z"/><path class="sweater-cls-4" d="M110.32,105.66s.76,4.93.29,6.55a14.63,14.63,0,0,0,1.64,0c.89,0-1-6.59-1-6.59S111,105.29,110.32,105.66Z"/><path class="sweater-cls-4" d="M113.19,105.5a22.91,22.91,0,0,0,.71,6.68s1.16.21,1.34-.1-1.11-5.81-.76-6.58A1.86,1.86,0,0,0,113.19,105.5Z"/><path class="sweater-cls-4" d="M116.39,105.66s.68,5,.32,6.3c0,0,1.94,0,1.83-.17s-.65-5.92-1.07-6S116.9,105.4,116.39,105.66Z"/><path d="M95.6,97.42,95,47.16s1,17.66,6.89,46.05c1.72,8.28,1.72,8.28,2.84,13.07l13.32-.36c-.62-4.51,1.89-9-.06-27.42-2-19.39-7-42.74-13.45-60.59,0,0-8.16-17.91-44.5-17.91S15.16,17.6,15.16,17.6s-6,5.23-12,50.16a209.84,209.84,0,0,0-1.71,38.16l12.73.27s3-5.88,4.55-18.23c1.59-12.88,3.64-33,5.75-40.8L23.93,97Z"/></svg>';

            suitHTML = '<svg><path class="suit-cls-1" d="M23.76,107.05H95.63L95,47.16s6.18,18.21,9,64.5h15.37s-2.06-58.2-14.81-93.75C104.5,17.91,96.34,0,60,0S15.08,17.6,15.08,17.6s-8.62,8.8-15,94.06H15.45s3.33-51.52,9-64.5Z"/><path class="suit-left suit-cls-2" d="M21.67,107.07l35.75,14.18,2.36-64.09L45.12,1c-20.79,2-26.3,8-26.3,8S6.37,21.86,0,111.93H15.75s4.06-50.55,8.62-64.49l2.76,24.15Z"/><path class="suit-cls-3" d="M45.12,1C46.3,5.47,58.58,51.42,60.3,59.81c0,0-6.91-14.27-23.36-51.3l5.88-4L37.39,2C41.86,1.23,45.12,1,45.12,1Z"/><path class="suit-right suit-cls-4" d="M97.9,107.07,62.14,121.25,58.58,61.1,74.45,1c20.79,2,26.3,8,26.3,8s12.44,12.87,18.81,102.94H103.82S99.76,61.38,95.2,47.44L92.44,71.59Z"/><path class="suit-cls-3" d="M74.43,1C73.25,5.47,61.6,49.66,59.25,58.56c0,0,6.91-13,23.36-50.05l-5.88-4L82.16,2C77.69,1.23,74.43,1,74.43,1Z"/><circle class="suit-cls-3" cx="60.3" cy="61.1" r="1.29"/><path d="M21.66,107.07l35.76,14.18,1.83-62.69L36.94,8.51l5.88-4L37.39,2C24.78,3.71,18.81,9,18.81,9S6.36,21.86,0,111.93H15.74s4.06-50.55,8.62-64.49l2.76,24.15Z"/><path d="M97.89,107.07,62.13,121.25,58.57,61.1l24-52.59-5.88-4L82.16,2c14.33,2.53,18.58,7,18.58,7s12.45,12.87,18.81,102.94H103.81s-4.06-50.55-8.62-64.49L92.43,71.59Z"/></svg>';

            outerwearHTML = '<svg><path class="outerwear-cls-1" d="M24.5,115.32H96.36L95.7,55.43s6.17,18.21,9,64.5h15.38S118,61.73,105.23,26.18c0,0-8.16-17.91-44.5-17.91s-44.91,17.6-44.91,17.6-8.63,8.8-15,94.06H16.18s3.33-51.52,9-64.5Z"/><path class="outerwear-left outerwear-cls-2" d="M1.11,119.93H16.49s3.24-51.56,9-64.5l-4.91,62h34.9V36.58L47.6,21.09s-9.7.45-10.46-9.61c0,0-18,4.88-23.58,10.87C13.56,22.35,1,81.32,1.11,119.93Z"/><path class="outerwear-right outerwear-cls-3" d="M120,119.93H104.67s-3.25-51.56-9-64.5l4.91,62H65.7V36.58l7.86-15.49s9.69.45,10.46-9.61c0,0,18,4.88,23.58,10.87C107.6,22.35,120.15,81.32,120,119.93Z"/><path class="outerwear-cls-4" d="M17.16,111.4l-.33,8.53H.23a37,37,0,0,1,0-8.53Z"/><circle class="outerwear-cls-5" cx="3.62" cy="115.73" r="1.45"/><path class="outerwear-cls-4" d="M104,111.4l.33,8.53h16.6a37,37,0,0,0,0-8.53Z"/><circle class="outerwear-cls-5" cx="117.5" cy="115.73" r="1.45"/><circle class="outerwear-cls-5" cx="49.96" cy="70.84" r="2.41"/><circle class="outerwear-cls-5" cx="49.96" cy="55.84" r="2.41"/><circle class="outerwear-cls-5" cx="49.96" cy="40.84" r="2.41"/><circle class="outerwear-cls-5" cx="45" cy="29.71" r="2.41"/><circle class="outerwear-cls-5" cx="49.96" cy="100.84" r="2.41"/><circle class="outerwear-cls-5" cx="49.96" cy="85.84" r="2.41"/><circle class="outerwear-cls-5" cx="70.96" cy="70.84" r="2.41"/><circle class="outerwear-cls-5" cx="70.96" cy="55.84" r="2.41"/><circle class="outerwear-cls-5" cx="70.96" cy="40.84" r="2.41"/><circle class="outerwear-cls-5" cx="75.92" cy="29.71" r="2.41"/><circle class="outerwear-cls-5" cx="70.96" cy="100.84" r="2.41"/><circle class="outerwear-cls-5" cx="70.96" cy="85.84" r="2.41"/><path class="outerwear-cls-6" d="M52.89,8.56V2.48s-3.37-.71-4.7-1.71-12,3-11,10.71A50.5,50.5,0,0,1,52.89,8.56Z"/><path class="outerwear-cls-6" d="M68.51,8.56V2.13a19.61,19.61,0,0,0,4.37-2c1.33-1,12.37,3.58,11.38,11.34A50.5,50.5,0,0,0,68.51,8.56Z"/><path class="outerwear-cls-4" d="M48.19.77s-12.55-1-19.91,7.5L23.7,15.6,34.94,31.11l12.66-10s-9.3.73-10.46-9.61C37.14,11.48,36.56,2.18,48.19.77Z"/><path class="outerwear-cls-4" d="M72.88.14a23.21,23.21,0,0,1,20,8.13l4.59,7.33L86.18,31.11l-12.65-10s9.3.73,10.46-9.61C84,11.48,84.81,1.8,72.88.14Z"/><path d="M100.65,117.44H76.21V41.54l7.92-12.12,2.13,1.69L97.18,16.05a31,31,0,0,1,10.47,6.3s11.39,54.48,12,87.58H104.17s-2.34-41.52-8-54.5Z"/><path d="M20.56,117.44H45V41.54L37.08,29.42l-2.14,1.69L24,16.05a31,31,0,0,0-10.46,6.3s-11.39,54.48-12,87.58H17s2.33-41.52,8-54.5Z"/></svg>';

            dressHTML = '<svg><path class="dress-cls-1" d="M65.93,23.59s1.65,6.55,5.79,23.57l.66,59.89L59.06,224.7l-45.3,0L.52,107.05l.66-59.11c3.9-17.37,5.76-24.35,5.76-24.35Z"/><path id="_Path_" data-name="&lt;Path&gt;" class="dress-right dress-cls-2" d="M50.74,1a118.37,118.37,0,0,0-15-1l.55,163.35,22.76.08C78.7,89,73.17,95.64,62.19,74.45c-7-13.57-1.83-24.93-.65-28.92,4.58-7.61,4.89-15.82,4.67-20-.09-1.81-.28-1.89-.28-1.89Z"/><path id="_Path_2" data-name="&lt;Path&gt;" class="dress-left dress-cls-3" d="M22.13,1a118.11,118.11,0,0,1,15-1l-.55,163.35-22.75.08C-5.83,89-.3,95.64,10.68,74.45c7-13.57,1.82-24.93.64-28.92-4.57-7.61-4.89-15.82-4.67-20,.1-1.81.29-1.89.29-1.89Z"/><path id="_Path_3" data-name="&lt;Path&gt;" class="part1 dress-cls-4" d="M13.76,163.22v76.42L1.57,246h0c-5.39,5.33,4,5.65,12.89,3.09a70.35,70.35,0,0,0,15.12-6.73c1.31-.76,2.08-1.27,2.08-1.27V163.26l-17.88.07Z"/><path id="_Path_4" data-name="&lt;Path&gt;" class="part2 dress-cls-5" d="M41.14,241.28s.78.5,2,1.25a71,71,0,0,0,15.15,6.74c8.83,2.55,18.21,2.24,12.94-3l-12.22-6.32V163.33H41.14Z"/><path d="M22.13,1a108.31,108.31,0,0,1,15-1A78,78,0,0,1,50.74,1L65.93,23.59s1.85,11.65-4.39,21.94c0,0-7.28,14.27.65,28.92s10.52,16.85,9.47,32.6c0,0-5.66,32.6-12.6,56.28H13.79S2.13,120.45,1.15,107.05c0,0-2.65-13.6,5-24.58,0,0,5-8.56,5.79-10.82S16.91,60,11.32,45.53c0,0-5.88-8-4.38-21.94Z"/></svg>';


            // neckline shape
            foldedHTML = '<svg><polygon class="folded-cls-1" points="1.57 0 11.81 3.41 8.97 10.62 0 5.31 1.57 0"/><polygon class="folded-cls-1" points="24.4 0 14.16 3.41 17 10.62 25.97 5.31 24.4 0"/><polygon class="folded-cls-2" points="1.57 0 5.21 0 5.21 1.21 1.57 0"/><polyline class="folded-cls-2" points="20.82 1.21 24.45 0 20.82 0"/></svg>';

            vshapeHTML = '<svg><path class="vshape-cls-1" d="M0,2s4.18,15.16,19,30.1V0A89.24,89.24,0,0,0,0,2Z"/><path class="vshape-cls-1" d="M38.09,2S33.9,17.13,19,32.07V0A89.31,89.31,0,0,1,38.09,2Z"/><path class="part1 vshape-cls-2" d="M2,1.56S5.63,15.47,19,29V0A82,82,0,0,0,2,1.56Z"/><path class="part2 vshape-cls-3" d="M36.11,1.56S32.46,15.47,19,29V0A82.09,82.09,0,0,1,36.11,1.56Z"/></svg>';

            roundHTML = '<svg><path class="round-cls-1" d="M0,2.5A22.41,22.41,0,0,0,21.37,16.89L21.41,0C10.63,0,4.07,1.31,0,2.5Z"/><path class="part1 round-cls-2" d="M1.5,2.13S6,15.7,21.37,15.7l0-15.7C11.39,0,5.05,1.18,1.5,2.13Z"/><path class="round-cls-1" d="M42.73,2.5A22.41,22.41,0,0,1,21.36,16.89L21.31,0C32.09,0,38.66,1.31,42.73,2.5Z"/><path class="part2 round-cls-3" d="M41.22,2.13S36.76,15.7,21.36,15.7L21.31,0C31.34,0,37.68,1.18,41.22,2.13Z"/></svg>';


            // scarf, hat, glasses, necktie
            scarfHTML = '<svg><g id="Layer_2" data-name="Layer 2"><g id="Layer_16" data-name="Layer 16"><path class="scarf-cls-1" d="M55.32,11.4s13.84,13.53,8.09,31.05c0,0-3.33-6.9-7.16.64s-9.47,0-9.47,0-1.15-2.3-3.33.13c0,0,7.52-25,2.55-28.48Z"/><path class="scarf-cls-1" d="M5.84,2.25s19.84,9.15,48.47,0c1.51-.49,5.84-3.33,6.34-.55a4.33,4.33,0,0,1-.4,2.58s.57.37-.89,1.75.54,1.79.54,1.79,3.7.91-1.36,3.07-27.68,16-56.46,5.28c0,0-3.62-2,.09-3.69,2.11-1,.1-2.18.1-2.18s-.84-1.45,1-1.94.79-2.29.79-2.29S4.37,2.78,5.84,2.25Z"/><path class="scarf-cls-2" d="M6.3,2.25s18.66,8.52,48.46,0c0,0,3.46-1.31,3.19.56s1.37,1.52,1.37,1.52,2,.32.49,1.7.55,1.79.55,1.79,3.69.91-1.37,3.07-28.06,10.7-56.84,0c0,0-1.73-1.44.46-2.23s.1-2.19.1-2.19S1.86,5,3.75,4.53s.8-2.28.8-2.28S4.07,1,6.3,2.25Z"/></g></g></svg>';

            maleHatHTML = '<svg><path class="malehat-cls-1" d="M103.63,48.61S99.56,56.33,91.11,55C84.76,54,36,46.2,17.59,43.74c-2.25-.3-6.91-.33-9-1.18C5.58,41.34,0,34.15,0,30.86s7.85-1.45,9.3-1.32,8.12,1.25,8.12,1.25,5.08-13.67,6.89-18.52S27.23-7.5,55.61,4.64c11.69,5,26.27-.93,32.27,6,4.81,5.58,4.1,14.88,4.23,19.9S92.36,44.27,93.79,45A21.7,21.7,0,0,0,100,46.53C103.43,46.93,104,47.78,103.63,48.61Z"/><path class="malehat-cls-2" d="M19.85,24.24l-2.43,6.55A644.56,644.56,0,0,0,93.79,45s-1.22-1.44-1.43-7.17C92.36,37.79,60.45,36.51,19.85,24.24Z"/></svg>';

            femaleHatHTML ='<svg><path class="femalehat-cls-1" d="M110,47.29c.21,1.94,1.8,10.5-.2,16.63,0,0,15,3.75,24,.08,6.64-2.69,17.93-9,18.14-15.81C152.09,42.45,128.13,40.52,110,47.29Z"/><path class="femalehat-cls-2" d="M42.86,38.48S42.41,4,71.7.4,107.48,18,107.91,33.48c6,.91,9.12,1.88,15,3.14,4.89,1,9.76,2.19,14.54,3.61s10.15,2.83,13.73,6.31c1.79,1.74-.22,2.13-1.64,1.73-6.16-1.74-12-3.29-18.52-3.18-18.17.29-36,5.9-53.63,11.62C63.9,61.1,51.07,68,37.44,72a35.85,35.85,0,0,1-25.6-1.93c-4.52-2.19-17.53-10.82-9-17,4.34-3.18,9-4.78,13.72-6.9C18.72,45.19,42.76,36.31,42.86,38.48Z"/><path class="femalehat-cls-3" d="M44.29,37.33a2.43,2.43,0,0,0,1,.47c18.65,5.31,39.24,2.3,58.4-4.27.64-.22,3.88-.72,4.16-1.38.17-.38-.09-1-.09-1.43,0-1.52-.51-3.48-.6-5-.5.14-23,4.9-25,5.2A190.44,190.44,0,0,1,58.58,33c-1.2,0-15.35-1-15-2.31a23.89,23.89,0,0,0-.61,4.9c0,.46.88,1.16,1.11,1.52A.74.74,0,0,0,44.29,37.33Z"/><path class="femalehat-cls-4" d="M43,35.58s34.82,8.56,64.78-4.86l.15,2.76S77,48.14,42.86,38Z"/><path class="femalehat-cls-5" d="M44,35.1a.38.38,0,0,1-.2-.42.44.44,0,0,1,.46-.38s.69.08,1.94.18a.37.37,0,0,1,.33.45.44.44,0,0,1-.45.39l-2-.18Zm5.86.5,3.79.21a.44.44,0,0,0,.44-.4.38.38,0,0,0-.34-.44L50,34.76a.44.44,0,0,0-.45.39.38.38,0,0,0,.21.41A.28.28,0,0,0,49.9,35.6Zm7.59.35C58.71,36,60,36,61.3,36a.45.45,0,0,0,.43-.42.37.37,0,0,0-.36-.42c-1.32,0-2.59,0-3.8-.08a.44.44,0,0,0-.43.41.38.38,0,0,0,.2.39A.28.28,0,0,0,57.49,36Zm7.62.08c1.24,0,2.52,0,3.82-.06a.45.45,0,0,0,.41-.43.37.37,0,0,0-.37-.41c-1.3,0-2.57.06-3.81.07a.45.45,0,0,0-.42.42A.4.4,0,0,0,65,36,.41.41,0,0,0,65.11,36Zm7.64-.21c1.26-.06,2.54-.13,3.82-.23a.44.44,0,0,0,.4-.45.37.37,0,0,0-.39-.39c-1.28.1-2.55.17-3.81.24a.44.44,0,0,0-.41.43.39.39,0,0,0,.21.37A.34.34,0,0,0,72.75,35.82Zm7.65-.56c1.3-.13,2.59-.28,3.82-.44a.46.46,0,0,0,.38-.47.36.36,0,0,0-.41-.36c-1.23.16-2.51.31-3.81.44a.45.45,0,0,0-.39.45.41.41,0,0,0,.21.35A.34.34,0,0,0,80.4,35.26Zm7.64-1c1.31-.22,2.59-.46,3.82-.72a.46.46,0,0,0,.34-.49.36.36,0,0,0-.44-.33c-1.21.25-2.49.49-3.78.71a.44.44,0,0,0-.36.48.36.36,0,0,0,.21.31A.31.31,0,0,0,88,34.26Zm7.61-1.61c1.31-.35,2.57-.72,3.76-1.11a.46.46,0,0,0,.3-.53.36.36,0,0,0-.48-.27c-1.17.38-2.42.75-3.71,1.09a.47.47,0,0,0-.33.51.36.36,0,0,0,.21.28A.35.35,0,0,0,95.65,32.65Zm7.45-2.49c.65-.26,1.28-.55,1.89-.84a.45.45,0,0,0,.23-.56.36.36,0,0,0-.51-.2c-.6.29-1.22.56-1.85.83a.46.46,0,0,0-.26.54.41.41,0,0,0,.19.23A.37.37,0,0,0,103.1,30.16Z"/><path class="femalehat-cls-4" d="M43.47,31.43S61.68,38,107.16,25.68l-.41-2.11S77.23,34.93,43.8,29.41Z"/></svg>';

            maleGlassesHTML = '<svg><path class="maleglasses-cls-1" d="M46.56,1.84A10.83,10.83,0,1,0,57.38,12.66,10.84,10.84,0,0,0,46.56,1.84Z"/><path class="maleglasses-cls-1" d="M15.62,1.84A10.83,10.83,0,1,0,26.45,12.66,10.83,10.83,0,0,0,15.62,1.84Z"/><path class="maleglasses-cls-2" d="M55.45,3.52C51.59.13,45-1.42,39.8,1.66a13.52,13.52,0,0,0-5,5.08c-.58-.79-1.65-.88-3.63-.88S28,6,27.43,6.81a13.58,13.58,0,0,0-5.11-5.15C17.16-1.42,10.41.13,6.55,3.52S0,7.11,0,7.11v3.13s1.54,0,2,.88.65,2.22,1.79,2.71a11.87,11.87,0,1,0,23.47-3.42A3,3,0,0,0,28.33,9,6.13,6.13,0,0,0,28,8.11c.18-1,.22-1.21,3.1-1.21,2.6,0,2.86.22,3,1.12a5.93,5.93,0,0,0-.32,1,3,3,0,0,0,1,1.37,11.87,11.87,0,1,0,23.46,3.41c1.11-.5,1.24-2,1.62-2.7s1.83-.88,1.83-.88V7.11S59.31,6.91,55.45,3.52Zm-39.83,20A10.83,10.83,0,1,1,26.45,12.66,10.84,10.84,0,0,1,15.62,23.49Zm30.94,0A10.83,10.83,0,1,1,57.38,12.66,10.84,10.84,0,0,1,46.56,23.49Z"/></svg>';

            femaleGlassesHTML = '<svg><path class="femaleglasses-cls-1" d="M23.39,4.36c-.94-1.58-4.39-3-8.67-2.94S7.23,2,5.81,4.07s-1.43,5.6-.57,8.21a10.24,10.24,0,0,0,4.83,6.12c2.47,1.32,4.75,1.61,7.88-.86a16.6,16.6,0,0,0,5.69-8.2,7.18,7.18,0,0,0-.19-4.89Z"/><path class="femaleglasses-cls-2" d="M56,6.45c-.1-.62-.05-.76-1.37-1.24s-1.75-1.09-3-2.42A8.65,8.65,0,0,0,46.56.38a27.36,27.36,0,0,0-8-.19C34.64.52,32.69,2.37,32,2.37s-2.09-.76-4-.76-3.32.76-4,.76S21.45.52,17.52.19a27.36,27.36,0,0,0-8,.19A8.68,8.68,0,0,0,4.42,2.79c-1.23,1.33-1.66,2-3,2.42S.16,5.83.06,6.45-.12,8.82.59,9a2.78,2.78,0,0,1,2.13,1.66c.57,1.18,2.37,7.11,6.93,9.25s7.18.75,10.62-2.47C23.92,14,25.07,10.22,26,8.15c.73-1.69,0-1.14-.43-1.89S24.44,4,28.05,4,31,5.5,30.56,6.26s-1.16.2-.43,1.89c.89,2.07,2,5.84,5.69,9.25,3.44,3.22,6.07,4.6,10.63,2.47s6.35-8.07,6.92-9.25A2.78,2.78,0,0,1,55.5,9C56.22,8.82,56.12,7.06,56,6.45ZM23.64,9.34A16.6,16.6,0,0,1,18,17.54c-3.13,2.47-5.41,2.18-7.88.86a10.24,10.24,0,0,1-4.83-6.12c-.86-2.61-.86-6.17.57-8.21s4.55-2.6,8.91-2.65,7.73,1.36,8.67,2.94l.06.09A7.18,7.18,0,0,1,23.64,9.34Zm27.22,2.94A10.29,10.29,0,0,1,46,18.4c-2.47,1.32-4.74,1.61-7.87-.86a16.53,16.53,0,0,1-5.69-8.2,7.06,7.06,0,0,1,.19-4.89.41.41,0,0,1,.05-.09c.94-1.58,4.39-3,8.67-2.94s7.49.62,8.92,2.65S51.71,9.67,50.86,12.28Z"/><path class="femaleglasses-cls-1" d="M41.37,1.42c-4.28,0-7.73,1.36-8.67,2.94a.41.41,0,0,0-.05.09,7.06,7.06,0,0,0-.19,4.89,16.53,16.53,0,0,0,5.69,8.2c3.13,2.47,5.4,2.18,7.87.86a10.29,10.29,0,0,0,4.84-6.12c.85-2.61.85-6.17-.57-8.21S45.73,1.47,41.37,1.42Z"/></svg>';

            necktieHTML ='<svg><defs><style></style></defs><title>Asset 13</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_25" data-name="Layer 25"><path class="necktie-cls-1" d="M25.4,3.63l0-.44A2.72,2.72,0,0,0,22.19.75c-2.12.37-9.3,3.72-9.3,3.72V5.4h-.24V4.47S5.47,1.12,3.35.75A2.72,2.72,0,0,0,.17,3.19l0,.44a36,36,0,0,0,0,6.05l0,.44a2.73,2.73,0,0,0,3.18,2.44h0c2.12-.37,9.3-3.72,9.3-3.72V7.47h.24V8.84s7.18,3.35,9.3,3.72h0a2.73,2.73,0,0,0,3.18-2.44l0-.44A34,34,0,0,0,25.4,3.63Z"/><path class="necktie-cls-2" d="M25.4,2.92l0-.44A2.73,2.73,0,0,0,22.19,0c-2.12.37-9.3,3.72-9.3,3.72V4.7h-.24V3.76S5.47.41,3.35,0A2.73,2.73,0,0,0,.17,2.48l0,.44A36,36,0,0,0,.13,9l0,.44a2.72,2.72,0,0,0,3.18,2.44h0c2.12-.37,9.3-3.72,9.3-3.72V6.76h.24V8.13s7.18,3.35,9.3,3.72h0a2.72,2.72,0,0,0,3.18-2.44l0-.44A34,34,0,0,0,25.4,2.92Z"/><path class="necktie-cls-1" d="M12.89,4.7h-.24V3.76s-1.29-.6-2.93-1.32a1.49,1.49,0,0,0-.14.63V8.82a1.49,1.49,0,0,0,.14.63c1.64-.72,2.93-1.32,2.93-1.32V6.76h.24V8.13s1.28.6,2.93,1.32A1.49,1.49,0,0,0,16,8.82V3.07a1.49,1.49,0,0,0-.14-.63c-1.65.72-2.93,1.32-2.93,1.32Z"/><path class="necktie-cls-2" d="M14.19,2.36H11.34a1.24,1.24,0,0,0-1.21,1.28v5A1.24,1.24,0,0,0,11.34,10h2.85A1.24,1.24,0,0,0,15.4,8.67v-5A1.24,1.24,0,0,0,14.19,2.36Z"/><polygon class="necktie-cls-1" points="9.87 6.54 5.62 5.77 9.87 5.15 9.87 6.54"/><polygon class="necktie-cls-1" points="15.67 6.54 19.92 5.77 15.67 5.15 15.67 6.54"/></g></g></svg>';

            cityNameArray = ["", "Bangkok", "Beijing", "Bogota", "Buenos Aires", "Cairo", "Delhi", "Dhaka", "Guangzhou", "Istanbul", "Jakarta", "Karachi", "Kolkata", "Lagos", "London", "Los Angeles", "Manila", "Mexico City", "Mumbai", "New York", "Osaka", "Rio de Janeiro", "Sao Paulo", "Seoul", "Shanghai", "Tianjin", "Tokyo", "Paris", "Berlin", "Madrid", "Kiev", "Rome", "Budapest", "Milan", "Sofia", "Nairobi", "Sydney", "Moscow", "Johannesburg", "Toronto", "Vancouver", "Chicago", "Austin", "Seattle", "Singapore"];

            chernoff_nested = d3.nest()
                .key(function(c) {
                    return c.quarter_id;
                })
                .key(function(c) {
                    return c.city_id;
                })
                .entries(dataset);
        
            updateChernoff(timeStamp, sortStamp);
        
            line_nested = d3.nest()
                .key(function(c) {
                    return c.city_id;
                })
                .key(function(c) {
                    return c.quarter_id;
                })
                .entries(dataset);

            tooltip = d3.select("#chernoff")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", "0");
            
            d3.select("#chernoff")
                .append("div")
                .attr("class", "cover")
                .style("display", "none");
                
        
            linetip = d3.select(".line-chart-container")
                .append("div")
                .attr("class", "line-tip")
                .style("display", "none");
        
            ruler = d3.select(".line-chart-container")
                .append("div")
                .attr("class", "ruler")
                .style("opacity", "0");
        
            d3.select(".legend-container")
                .style("opacity", "0");
        
            lineChart = d3.select(".line-chart-container")
                .append("svg")
                .attr("class", "line-chart")
                .attr("width", "400")
                .attr("height", "620");
        
            lineContainer1 = lineChart.append("g")
                .attr("class", "line1");
        
            dotContainer1 = lineChart.append("g")
                .attr("class", "dots1");
        
            lineContainer2 = lineChart.append("g")
                .attr("class", "line2");
        
            dotContainer2 = lineChart.append("g")
                .attr("class", "dots2");
        
            lineAxis = lineChart.append("g")
                .attr("class", "axis x")
                .attr("transform", "translate(0, 600)")
                .style("opacity", "0");
            
            matrix_size = 350;
            var padding = .1;
            var translates = {top: 35, left: 35};
        
            matrixChart = d3.select("#grid")
                .append("svg")
                .attr("class", "matrix-chart")
                .attr("width", matrix_size+translates.left)
                .attr("height", matrix_size+translates.top);
            
            matrix_xScale = d3.scaleBand()
                .domain(d3.range(0, matrix_legend.length))
                .range([0, matrix_size])
                .paddingInner(padding);

            matrix_yScale = d3.scaleBand()
                .domain(d3.range(0, matrix_legend.length))
                .range([0, matrix_size])
                .paddingInner(padding);
        
            matrix_xAxis = d3.axisTop(matrix_yScale).tickSize(0);

            matrix_yAxis = d3.axisLeft(matrix_xScale).tickSize(0);

            iconDim = 12.5;
        
            matrixChart.append("g")
                .attr("class", "matrix-x matrix-axis")
                .attr("transform", "translate("+translates.left+",-5)")
                .style("opacity", "0")
                .call(matrix_xAxis);

            matrixChart.append("g")
                .attr("class", "matrix-y matrix-axis")
                .attr("transform", "translate(-5,"+translates.top+")")
                .style("opacity", "0")
                .call(matrix_yAxis);

//            diagonalLine = matrixChart.append("path")
//                .attr("class", "diagonal")
//                .attr("d", "M "+translates.left+" "+translates.top+" L "+matrix_size+" "+matrix_size)
//                .attr("stroke", "url(diagonalGradient)")
//                .attr("stroke-width", 1)
////                .attr("stroke-opacity", 0.5)
////                .style("stroke-dasharray", ("10, 6"))
//                .attr("fill", "none")
//                .style("opacity", "0");
        
            allSquares = matrixChart.append("g")
                .attr("class", "allSquares")
                .attr("transform", "translate("+translates.left+","+translates.top+")");

            toolTip = d3.tip()
                .attr("class", "d3-tip")
                .offset([0,0])
                .html(function(d) {
                    return "<div><h3>"+matrix_legend[d.col].split(":")[1]+" x "+matrix_legend[d.row].split(":")[1]+"</h4><h4>"+cityNameArray[parseInt(d.city)]+"</h4><h5>The combo of <strong>"+matrix_legend[d.col].split(":")[1]+"</strong> and <strong>"+matrix_legend[d.row].split(":")[1]+"</strong> appears "+((d.cor)*100).toFixed(0)+"% in the city of <strong>"+cityNameArray[parseInt(d.city)]+"</strong>, with the most common color combo being <strong>"+d.comboColor+".</strong></h5></div>";
                });
        
            matrixChart.call(toolTip);
        
            formatTicks(iconDim);
        


        });



    function updateChernoff(quarter, sort) {
        
        // filter data based on quarter
        
        var dataFiltered = chernoff_nested.filter(function(d) {
            return d.key == quarter;
        });
        
        var dominant = [];
        
        // calculate the dominant style
        
        dataFiltered[0].values.forEach(function(d) {
            var city_object = {
                city_id: d.key,
                wearing_hat: "",
                wearing_glasses: "",
                wearing_scarf: "",
                wearing_necktie: "",
                neckline_shape: "",
            };
            
            var hat_count = 0;
            var glasses_count = 0;
            var scarf_count = 0;
            var necktie_count = 0;
            
            var folded_count = 0;
            var round_count = 0;
            var vshape_count = 0;
            
            var tanktop_count = 0;
            var tshirt_count = 0;
            var shirt_count = 0;
            var sweater_count = 0;
            var suit_count = 0;
            var outerwear_count = 0;
            var dress_count = 0;
            
            var floral_count = 0;
            var spotted_count = 0;
            var graphics_count = 0;
            var striped_count = 0;
            var plaid_count = 0;
            var solid_count = 0;
            
            var white_count = 0;
            var black_count = 0;
            var pink_count = 0;
            var blue_count = 0;
            var red_count = 0;
            var cyan_count = 0;
            var green_count = 0;
            var gray_count = 0;
            var yellow_count = 0;
            var brown_count = 0;
            var purple_count = 0;
            var orange_count = 0;
            var colorful_count = 0;
            
            d.values.forEach(function(c) {
                if (c.wearing_hat == "Yes") { hat_count = hat_count + 1; }
                if (c.wearing_glasses == "Yes") { glasses_count = glasses_count + 1; }
                if (c.wearing_scarf == "Yes") { scarf_count = scarf_count + 1; }
                if (c.wearing_necktie == "Yes") { necktie_count = necktie_count + 1; }
                
                if (c.neckline_shape == "Folded") { folded_count = folded_count + 1; }
                if (c.neckline_shape == "Round") { round_count = round_count + 1; }
                if (c.neckline_shape == "V-shape") { vshape_count = vshape_count + 1; }
                
                if (c.clothing_category == "Tank top") { tanktop_count = tanktop_count + 1; }
                if (c.clothing_category == "T-shirt") { tshirt_count = tshirt_count + 1; }
                if (c.clothing_category == "Shirt") { shirt_count = shirt_count + 1; }
                if (c.clothing_category == "Sweater") { sweater_count = sweater_count + 1; }
                if (c.clothing_category == "Suit") { suit_count = suit_count + 1; }
                if (c.clothing_category == "Outerwear") { outerwear_count = outerwear_count + 1; }
                if (c.clothing_category == "Dress") { dress_count = dress_count + 1; }
                
                if (c.clothing_pattern == "Floral") { floral_count = floral_count + 1; }
                if (c.clothing_pattern == "Spotted") { spotted_count = spotted_count + 1; }
                if (c.clothing_pattern == "Graphics") { graphics_count = graphics_count + 1; }
                if (c.clothing_pattern == "Striped") { striped_count = striped_count + 1; }
                if (c.clothing_pattern == "Plaid") { plaid_count = plaid_count + 1; }
                if (c.clothing_pattern == "Solid") { solid_count = solid_count + 1; }
                
                if (c.major_color == "White") { white_count = white_count + 1; }
                else if (c.major_color == "Black") { black_count = black_count + 1; }
                else if (c.major_color == "Pink") { pink_count = pink_count + 1; }
                else if (c.major_color == "Blue") { blue_count = blue_count + 1; }
                else if (c.major_color == "Red") { red_count = red_count + 1; }
                else if (c.major_color == "Cyan") { cyan_count = cyan_count + 1; }
                else if (c.major_color == "Green") { green_count = green_count + 1; }
                else if (c.major_color == "Gray") { gray_count = gray_count + 1; }
                else if (c.major_color == "Yellow") { yellow_count = yellow_count + 1; }
                else if (c.major_color == "Brown") { brown_count = brown_count + 1; }
                else if (c.major_color == "Purple") { purple_count = purple_count + 1; }
                else if (c.major_color == "Orange") { orange_count = orange_count + 1; }
                else if (c.major_color == "More than 1 color") { colorful_count = colorful_count + 1; }
                
            });
            
            // hat dominant
            
            if ((hat_count / d.values.length) < 0.1) {
                city_object.wearing_hat = "No";
            } else {
                city_object.wearing_hat = "Yes";
            }
            
            // glasses dominant
            
            if ((glasses_count / d.values.length) < 0.1) {
                city_object.wearing_glasses = "No";
            } else {
                city_object.wearing_glasses = "Yes";
            }
            
            // scarf dominant
            
            if ((scarf_count / d.values.length) < 0.1) {
                city_object.wearing_scarf = "No";
            } else {
                city_object.wearing_scarf = "Yes";
            }
            
            // necktie dominant
            
            if ((necktie_count / d.values.length) < 0.1) {
                city_object.wearing_necktie = "No";
            } else {
                city_object.wearing_necktie = "Yes";
            }
            
            // neckline shape dominant
            
            if ((vshape_count / d.values.length) > 0.1) {
                city_object.neckline_shape = "V-shape";
            }
            else {
                if (folded_count == Math.max(folded_count, round_count, vshape_count)) {
                    city_object.neckline_shape = "Folded";
                }
                else if (round_count == Math.max(folded_count, round_count, vshape_count)) {
                    city_object.neckline_shape = "Round";
                }
                else if (vshape_count == Math.max(folded_count, round_count, vshape_count)) {
                    city_object.neckline_shape = "V-shape";
                }
            }
            
            // clothing category dominant
            
            if ((tshirt_count / d.values.length) >= 0.25 || (shirt_count / d.values.length) >= 0.25) {
                if ((tshirt_count / d.values.length) > (shirt_count / d.values.length)) {
                    city_object.clothing_category = "T-shirt";
                }
                else {
                    city_object.clothing_category = "Shirt";
                }
            }
            else {
                if ((outerwear_count / d.values.length) >= 0.4) {
                    city_object.clothing_category = "Outerwear";
                }
                else {
                    if ((dress_count / d.values.length) >= 0.15) {
                        city_object.clothing_category = "Dress";
                    }
                    else {
                        if ((tanktop_count / d.values.length) >= 0.08 ) {
                            city_object.clothing_category = "Tank top";
                        }
                        else {
                            if (sweater_count == Math.max(sweater_count, suit_count)) {
                                city_object.clothing_category = "Sweater";
                            }
                            else if (suit_count == Math.max(sweater_count, suit_count)) {
                                city_object.clothing_category = "Suit";
                            }
                        }
                    }
                }
            }
            
            // clothing pattern dominant
            
            if ((solid_count / d.values.length) >= 0.7) {
                city_object.clothing_pattern = "Solid";
            }
            else {
                if ((graphics_count / d.values.length) >= 0.18) {
                    city_object.clothing_pattern = "Graphics";
                }
                else {
                    if ((spotted_count / d.values.length) >= 0.03) {
                        city_object.clothing_pattern = "Spotted";
                    }
                    else {
                        if ((plaid_count / d.values.length) >= 0.06) {
                            city_object.clothing_pattern = "Plaid";
                        }
                        else {
                            if (floral_count == Math.max(floral_count, striped_count)) {
                                city_object.clothing_pattern = "Floral";
                            }
                            else if (striped_count == Math.max(floral_count, striped_count)) {
                                city_object.clothing_pattern = "Striped";
                            }
                        }
                    }
                }
            }
            
            // color dominant
            
            if ((white_count / d.values.length) >= 0.25 || (black_count / d.values.length) >= 0.25) {
                if ((white_count / d.values.length) > (black_count / d.values.length)) {
                    city_object.major_color = "White";
                }
                else {
                    city_object.major_color = "Black";
                }
            }
            else {
                if ((colorful_count / d.values.length) >= 0.15 || (blue_count / d.values.length) >= 0.15) {
                    if ((colorful_count / d.values.length) > (blue_count / d.values.length)) {
                        city_object.major_color = "More than 1 color";
                    }
                    else {
                        city_object.major_color = "Blue";
                    }
                }
                else {
                    if (pink_count == Math.max(pink_count, red_count, cyan_count, green_count, gray_count, yellow_count, brown_count, purple_count, orange_count)) {
                        city_object.major_color = "Pink";
                    }
                    else if (red_count == Math.max(pink_count, red_count, cyan_count, green_count, gray_count, yellow_count, brown_count, purple_count, orange_count)) {
                        city_object.major_color = "Red";
                    }
                    else if (cyan_count == Math.max(pink_count, red_count, cyan_count, green_count, gray_count, yellow_count, brown_count, purple_count, orange_count)) {
                        city_object.major_color = "Cyan";
                    }
                    else if (green_count == Math.max(pink_count, red_count, cyan_count, green_count, gray_count, yellow_count, brown_count, purple_count, orange_count)) {
                        city_object.major_color = "Green";
                    }
                    else if (gray_count == Math.max(pink_count, red_count, cyan_count, green_count, gray_count, yellow_count, brown_count, purple_count, orange_count)) {
                        city_object.major_color = "Gray";
                    }
                    else if (yellow_count == Math.max(pink_count, red_count, cyan_count, green_count, gray_count, yellow_count, brown_count, purple_count, orange_count)) {
                        city_object.major_color = "Yellow";
                    }
                    else if (brown_count == Math.max(pink_count, red_count, cyan_count, green_count, gray_count, yellow_count, brown_count, purple_count, orange_count)) {
                        city_object.major_color = "Brown";
                    }
                    else if (purple_count == Math.max(pink_count, red_count, cyan_count, green_count, gray_count, yellow_count, brown_count, purple_count, orange_count)) {
                        city_object.major_color = "Purple";
                    }
                    else if (orange_count == Math.max(pink_count, red_count, cyan_count, green_count, gray_count, yellow_count, brown_count, purple_count, orange_count)) {
                        city_object.major_color = "Orange";
                    }
                }
            }
            
            dominant.push(city_object);
            
        });
        
//        console.log(dominant);
        
        dataSorted = dominant.sort(sort);
        
//        console.log(dataSorted);

        // main body
        var person = d3.select("#chernoff")
            .selectAll(".person")
            .data(dataSorted);
        
        var personEnter = person.enter()
            .append("div")
            .attr("class", "person");
        
        var personMerge = personEnter.merge(person);
        
        // make the x buttons on legend work
        d3.select(".legend1")
            .select(".delete")
            .on("click", function() {
                cityStamp = [];
                d3.selectAll(".person")
                    .attr("major-selected", "0")
                    .attr("secondary-selected", "0");

                d3.selectAll(".personBKG")
                    .style("box-shadow", "none");
                updateMatrixChart(cityStamp, timeStamp);
                clearLineChart();
                d3.select(".legend2")
                    .style("opacity", "0")
                    .style("pointer-events", "none");
                d3.select(".legend1")
                    .style("opacity", "0")
                    .style("pointer-events", "none");
                d3.selectAll(".person")
                    .style("opacity","1");
                d3.select(".cover")
                    .style("display", "none");
            });
        
        d3.select(".legend2")
            .select(".delete")
            .on("click", function() {
                cityStamp.pop();
                d3.select(".legend2")
                    .style("opacity", "0")
                    .style("pointer-events", "none");
                d3.select(".line2").html("");
                d3.select(".dots2").html("");
                d3.selectAll(".person")
                    .attr("secondary-selected", "0");
                d3.select(".cover")
                    .style("display", "none");
                
                updateMatrixChart(cityStamp, timeStamp);
            });
        
        
       d3.selectAll(".person")
            .attr("data-gender", function(d) {
                if (d.clothing_category == "Dress") {
                    return 1;
                }
                else {
                    return Math.floor(Math.random() * 2);
                }
            })
            .attr("data-race", function(d) {
                return Math.floor(Math.random() * 3);
            })
            .attr("major-selected", function(d) {
                if(d.city_id == cityStamp[0]) {
                    return "1";
                } else {
                    return "0";
                }
            })
            .attr("secondary-selected", function(d) {
                if(d.city_id == cityStamp[1]) {
                    return "1";
                } else {
                    return "0";
                }
            })
            .on("click", function(d) {
                d3.selectAll(".instruction")
                    .style("display", "none");
            
                if (d3.select(this).attr("major-selected") == "0") {
                    if (cityStamp.length < 1) {
                        d3.selectAll(".person")
                            .attr("major-selected", "0");

                        d3.select(this)
                            .attr("major-selected", "1");
                        
                        d3.select(this).select(".personBKG")
                            .style("box-shadow", "0 0 8px 0 #000000");

                        cityStamp = [d.city_id];
                        d3.select("#chernoff_title").text("The Similarities of "+cityNameArray[cityStamp[0]]+"'s Style of "+ timeline[sliderValue-1]);
                        updateSimilarityChart(cityStamp);
                    } else {
                        if (cityStamp.length > 1) {
                            cityStamp.pop();
                            d3.select(".legend2")
                                .style("opacity", "0")
                                .style("pointer-events", "none");
                        }
                        
                        if (d3.select(this).attr("secondary-selected") != "1") {
                            d3.selectAll(".person")
                                .attr("secondary-selected", "0");
                            d3.select(this)
                                .attr("secondary-selected", "1");
                            
                            var positionX = $(this).offset().left - 6;
                            var positionY = $(this).offset().top -165;
                            
                            d3.select(".cover")
                                .style("display", "block")
                                .style("left", positionX + "px")
                                .style("top", positionY + "px");
                            
                            cityStamp.push(d.city_id);
                        } else {
                            clearLineChart();
                            d3.selectAll(".person")
                                .attr("secondary-selected", "0"); 
                            d3.select(".cover")
                                .style("display", "none");
                        }
                        
                        d3.selectAll(".personBKG")
                            .style("box-shadow", function(d) {
                                if (d3.select(this.parentNode).attr("secondary-selected") == "0" && d3.select(this.parentNode).attr("major-selected") == "0") {
                                    return "none";
                                } else if (d3.select(this.parentNode).attr("major-selected") == "1") {
                                    return "0 0 8px 0 #000000";
                                } else {
                                    return "0 0 8px 0 #aaaaaa";
                                }
                            });
                    }
                } else {
                    cityStamp = [];
                    d3.select("#chernoff_title").text("The Most Popular Styles of "+ timeline[sliderValue-1]);
                    d3.selectAll(".person")
                        .attr("major-selected", "0")
                        .attr("secondary-selected", "0");
                    
                    d3.selectAll(".personBKG")
                        .style("box-shadow", "none");
                    clearLineChart();
                    d3.select(".legend2")
                        .style("opacity", "0")
                        .style("pointer-events", "none");
                    d3.select(".legend1")
                        .style("opacity", "0")
                        .style("pointer-events", "none");
                    d3.selectAll(".person")
                        .style("opacity","1");
                    d3.select(".cover")
                        .style("display", "none");
                }
                
           
                console.log(cityStamp);
                updateLegend(cityStamp);
                if (cityStamp.length > 0) {
                    updateLineChart(cityStamp, filterStamp);   
                    updateMatrixChart(cityStamp, timeStamp); 
                } 
            })
            .select(".personBKG")
            .style("box-shadow", function(d) {
                if(d.city_id == cityStamp[0]) {
                    return "0 0 8px 0 #000000";
                } else if (d.city_id == cityStamp[1]) {
                    console.log(cityStamp[1]);
                    var positionX = $(this).offset().left - 37;
                    var positionY = $(this).offset().top - 180;
                    
                    console.log(positionX);
                    console.log(positionY);

                    d3.select(".cover")
                        .style("left", positionX + "px")
                        .style("top", positionY + "px");
                    return "0 0 8px 0 #aaaaaa";
                } else {
                    return "none";
                }
            });
//            .on("dblclick", function(d) {
//                d3.selectAll(".instruction, .instruction-text")
//                    .style("display", "none");
//                
//                original_opacity = "1";
//            
//                if (d3.select(this).attr("data-selected") == "0") {
//                    d3.selectAll(".person")
//                        .attr("data-selected", "0");
//                    
//                    d3.select(this)
//                        .attr("data-selected", "1");
//                }
//                else {
//                    d3.select(this)
//                        .attr("data-selected", "0");
//                }
//            
//                cityStamp = [d.city_id];
//            
//                updateSimilarityChart(cityStamp);
//            });
        
        var personBKG = personEnter.append("div")
            .attr("class", "personBKG");
        
        var headContainer = personEnter.append("div")
            .attr("class", "head head-position")
            .style("text-align", "center");

        var head = d3.selectAll(".head")
            .html(function(d) {
                if (d3.select(this.parentNode).attr("data-gender") == 0) {
                    return maleHeadHTML;
                }
                else {
                    return femaleHeadHTML;
                }
            })
            .attr("data-race", function(d) {
                return d3.select(this.parentNode).attr("data-race");
            });
        
        d3.selectAll(".head svg")
            .attr("data-race", function(d) {
                return d3.select(this.parentNode).attr("data-race");
            });
        
        var upperbodyContainer = personEnter.append("div")
            .attr("class", "upperbody upperbody-position")
            .style("text-align", "center");

        var upperbody = d3.selectAll(".upperbody")
            .html(function(d) {
                if (d3.select(this.parentNode).attr("data-gender") == 0) {
                    return maleUpperbodyHTML;
                }
                else {
                    return femaleUpperbodyHTML;
                }
            })
            .attr("data-race", function(d) {
                return d3.select(this.parentNode).attr("data-race");
            });
        
        d3.selectAll(".upperbody svg")
            .attr("data-race", function(d) {
                return d3.select(this.parentNode).attr("data-race");
            });

        var downbodyContainer = personEnter.append("div")
            .attr("class", "downbody downbody-position")
            .style("text-align", "center");

        var downbody = d3.selectAll(".downbody")
            .html(function(d) {
                if (d3.select(this.parentNode).attr("data-gender") == 0) {
                    return maleDownbodyHTML;
                }
                else {
                    return femaleDownbodyHTML;
                }
            })
            .attr("data-race", function(d) {
                return d3.select(this.parentNode).attr("data-race");
            });
        
        d3.selectAll(".downbody svg")
            .attr("data-race", function(d) {
                return d3.select(this.parentNode).attr("data-race");
            });


        // clothing category
        var tanktopContainer = personEnter.append("div")
            .attr("class", "tanktop tanktop-position")
            .style("text-align", "center")
            .html(tanktopHTML)
            .style("opacity", function(d) {
                if (d.clothing_category == "Tank top") {
                    return "1";
                }
                else {
                    return "0";
                }
            });

        personMerge.select(".tanktop")
            .style("opacity", function(d) {
                if (d.clothing_category == "Tank top") {
                    return "1";
                }
                else {
                    return "0";
                }
            });
        
        personMerge.select(".tanktop-left")
            .style("fill", function(d) {
                if (d.major_color == "White") {
                    return colors_left.White;
                }
                else if (d.major_color == "Black") {
                    return colors_left.Black;
                }
                else if (d.major_color == "Pink") {
                    return colors_left.Pink;
                }
                else if (d.major_color == "Blue") {
                    return colors_left.Blue;
                }
                else if (d.major_color == "Red") {
                    return colors_left.Red;
                }
                else if (d.major_color == "Cyan") {
                    return colors_left.Cyan;
                }
                else if (d.major_color == "Green") {
                    return colors_left.Green;
                }
                else if (d.major_color == "Gray") {
                    return colors_left.Gray;
                }
                else if (d.major_color == "Yellow") {
                    return colors_left.Yellow;
                }
                else if (d.major_color == "Brown") {
                    return colors_left.Brown;
                }
                else if (d.major_color == "Purple") {
                    return colors_left.Purple;
                }
                else if (d.major_color == "Orange") {
                    return colors_left.Orange;
                }
                else {
                    return "url(#colorful)";
                }
            });
        
        personMerge.select(".tanktop-right")
            .style("fill", function(d) {
                if (d.major_color == "White") {
                    return colors_right.White;
                }
                else if (d.major_color == "Black") {
                    return colors_right.Black;
                }
                else if (d.major_color == "Pink") {
                    return colors_right.Pink;
                }
                else if (d.major_color == "Blue") {
                    return colors_right.Blue;
                }
                else if (d.major_color == "Red") {
                    return colors_right.Red;
                }
                else if (d.major_color == "Cyan") {
                    return colors_right.Cyan;
                }
                else if (d.major_color == "Green") {
                    return colors_right.Green;
                }
                else if (d.major_color == "Gray") {
                    return colors_right.Gray;
                }
                else if (d.major_color == "Yellow") {
                    return colors_right.Yellow;
                }
                else if (d.major_color == "Brown") {
                    return colors_right.Brown;
                }
                else if (d.major_color == "Purple") {
                    return colors_right.Purple;
                }
                else if (d.major_color == "Orange") {
                    return colors_right.Orange;
                }
                else {
                    return "url(#colorful)";
                }
            });

        d3.selectAll(".tanktop")
            .select("svg")
            .attr("fill", function(d) {
                if (d.clothing_pattern == "Floral") {
                    return "url(#floralPattern)";
                }
                else if (d.clothing_pattern == "Spotted") {
                    return "url(#spottedPattern)";
                }
                else if (d.clothing_pattern == "Striped") {
                    return "url(#stripedPattern)";
                }
                else if (d.clothing_pattern == "Graphics") {
                    return "url(#graphicsPattern)";
                }
                else if (d.clothing_pattern == "Plaid") {
                    return "url(#plaidPattern)";
                }
                else if (d.clothing_pattern == "Solid") {
                    return "none";
                }
        });

        var tshirtContainer = personEnter.append("div")
            .attr("class", "tshirt tshirt-position")
            .style("text-align", "center")
            .html(tshirtHTML)
            .style("opacity", function(d) {
                if (d.clothing_category == "T-shirt") {
                    return "1";
                }
                else {
                    return "0";
                }
            });

        personMerge.select(".tshirt")
            .style("opacity", function(d) {
                if (d.clothing_category == "T-shirt") {
                    return "1";
                }
                else {
                    return "0";
                }
            });
        
        personMerge.select(".tshirt-left")
            .style("fill", function(d) {
                if (d.major_color == "White") {
                    return colors_left.White;
                }
                else if (d.major_color == "Black") {
                    return colors_left.Black;
                }
                else if (d.major_color == "Pink") {
                    return colors_left.Pink;
                }
                else if (d.major_color == "Blue") {
                    return colors_left.Blue;
                }
                else if (d.major_color == "Red") {
                    return colors_left.Red;
                }
                else if (d.major_color == "Cyan") {
                    return colors_left.Cyan;
                }
                else if (d.major_color == "Green") {
                    return colors_left.Green;
                }
                else if (d.major_color == "Gray") {
                    return colors_left.Gray;
                }
                else if (d.major_color == "Yellow") {
                    return colors_left.Yellow;
                }
                else if (d.major_color == "Brown") {
                    return colors_left.Brown;
                }
                else if (d.major_color == "Purple") {
                    return colors_left.Purple;
                }
                else if (d.major_color == "Orange") {
                    return colors_left.Orange;
                }
                else {
                    return "url(#colorful)";
                }
            });
        
        personMerge.select(".tshirt-right")
            .style("fill", function(d) {
                if (d.major_color == "White") {
                    return colors_right.White;
                }
                else if (d.major_color == "Black") {
                    return colors_right.Black;
                }
                else if (d.major_color == "Pink") {
                    return colors_right.Pink;
                }
                else if (d.major_color == "Blue") {
                    return colors_right.Blue;
                }
                else if (d.major_color == "Red") {
                    return colors_right.Red;
                }
                else if (d.major_color == "Cyan") {
                    return colors_right.Cyan;
                }
                else if (d.major_color == "Green") {
                    return colors_right.Green;
                }
                else if (d.major_color == "Gray") {
                    return colors_right.Gray;
                }
                else if (d.major_color == "Yellow") {
                    return colors_right.Yellow;
                }
                else if (d.major_color == "Brown") {
                    return colors_right.Brown;
                }
                else if (d.major_color == "Purple") {
                    return colors_right.Purple;
                }
                else if (d.major_color == "Orange") {
                    return colors_right.Orange;
                }
                else {
                    return "url(#colorful)";
                }
            });

        d3.selectAll(".tshirt")
            .select("svg")
            .attr("fill", function(d) {
                if (d.clothing_pattern == "Floral") {
                    return "url(#floralPattern)";
                }
                else if (d.clothing_pattern == "Spotted") {
                    return "url(#spottedPattern)";
                }
                else if (d.clothing_pattern == "Striped") {
                    return "url(#stripedPattern)";
                }
                else if (d.clothing_pattern == "Graphics") {
                    return "url(#graphicsPattern)";
                }
                else if (d.clothing_pattern == "Plaid") {
                    return "url(#plaidPattern)";
                }
                else if (d.clothing_pattern == "Solid") {
                    return "none";
                }
        });

        var shirtContainer = personEnter.append("div")
            .attr("class", "shirt shirt-position")
            .style("text-align", "center")
            .html(shirtHTML)
            .style("opacity", function(d) {
                if (d.clothing_category == "Shirt") {
                    return "1";
                }
                else {
                    return "0";
                }
            });

        personMerge.select(".shirt")
            .style("opacity", function(d) {
                if (d.clothing_category == "Shirt") {
                    return "1";
                }
                else {
                    return "0";
                }
            });
        
        personMerge.select(".shirt-left")
            .style("fill", function(d) {
                if (d.major_color == "White") {
                    return colors_left.White;
                }
                else if (d.major_color == "Black") {
                    return colors_left.Black;
                }
                else if (d.major_color == "Pink") {
                    return colors_left.Pink;
                }
                else if (d.major_color == "Blue") {
                    return colors_left.Blue;
                }
                else if (d.major_color == "Red") {
                    return colors_left.Red;
                }
                else if (d.major_color == "Cyan") {
                    return colors_left.Cyan;
                }
                else if (d.major_color == "Green") {
                    return colors_left.Green;
                }
                else if (d.major_color == "Gray") {
                    return colors_left.Gray;
                }
                else if (d.major_color == "Yellow") {
                    return colors_left.Yellow;
                }
                else if (d.major_color == "Brown") {
                    return colors_left.Brown;
                }
                else if (d.major_color == "Purple") {
                    return colors_left.Purple;
                }
                else if (d.major_color == "Orange") {
                    return colors_left.Orange;
                }
                else {
                    return "url(#colorful)";
                }
            });
        
        personMerge.select(".shirt-right")
            .style("fill", function(d) {
                if (d.major_color == "White") {
                    return colors_right.White;
                }
                else if (d.major_color == "Black") {
                    return colors_right.Black;
                }
                else if (d.major_color == "Pink") {
                    return colors_right.Pink;
                }
                else if (d.major_color == "Blue") {
                    return colors_right.Blue;
                }
                else if (d.major_color == "Red") {
                    return colors_right.Red;
                }
                else if (d.major_color == "Cyan") {
                    return colors_right.Cyan;
                }
                else if (d.major_color == "Green") {
                    return colors_right.Green;
                }
                else if (d.major_color == "Gray") {
                    return colors_right.Gray;
                }
                else if (d.major_color == "Yellow") {
                    return colors_right.Yellow;
                }
                else if (d.major_color == "Brown") {
                    return colors_right.Brown;
                }
                else if (d.major_color == "Purple") {
                    return colors_right.Purple;
                }
                else if (d.major_color == "Orange") {
                    return colors_right.Orange;
                }
                else {
                    return "url(#colorful)";
                }
            });

        d3.selectAll(".shirt")
            .select("svg")
            .attr("fill", function(d) {
                if (d.clothing_pattern == "Floral") {
                    return "url(#floralPattern)";
                }
                else if (d.clothing_pattern == "Spotted") {
                    return "url(#spottedPattern)";
                }
                else if (d.clothing_pattern == "Striped") {
                    return "url(#stripedPattern)";
                }
                else if (d.clothing_pattern == "Graphics") {
                    return "url(#graphicsPattern)";
                }
                else if (d.clothing_pattern == "Plaid") {
                    return "url(#plaidPattern)";
                }
                else if (d.clothing_pattern == "Solid") {
                    return "none";
                }
        });

        var sweaterContainer = personEnter.append("div")
            .attr("class", "sweater sweater-position")
            .style("text-align", "center")
            .html(sweaterHTML)
            .style("opacity", function(d) {
                if (d.clothing_category == "Sweater") {
                    return "1";
                }
                else {
                    return "0";
                }
            });
            
        personMerge.select(".sweater")
            .style("opacity", function(d) {
                if (d.clothing_category == "Sweater") {
                    return "1";
                }
                else {
                    return "0";
                    
                }
            });
        
        personMerge.select(".sweater-left")
            .style("fill", function(d) {
                if (d.major_color == "White") {
                    return colors_left.White;
                }
                else if (d.major_color == "Black") {
                    return colors_left.Black;
                }
                else if (d.major_color == "Pink") {
                    return colors_left.Pink;
                }
                else if (d.major_color == "Blue") {
                    return colors_left.Blue;
                }
                else if (d.major_color == "Red") {
                    return colors_left.Red;
                }
                else if (d.major_color == "Cyan") {
                    return colors_left.Cyan;
                }
                else if (d.major_color == "Green") {
                    return colors_left.Green;
                }
                else if (d.major_color == "Gray") {
                    return colors_left.Gray;
                }
                else if (d.major_color == "Yellow") {
                    return colors_left.Yellow;
                }
                else if (d.major_color == "Brown") {
                    return colors_left.Brown;
                }
                else if (d.major_color == "Purple") {
                    return colors_left.Purple;
                }
                else if (d.major_color == "Orange") {
                    return colors_left.Orange;
                }
                else {
                    return "url(#colorful)";
                }
            });
        
        personMerge.select(".sweater-right")
            .style("fill", function(d) {
                if (d.major_color == "White") {
                    return colors_right.White;
                }
                else if (d.major_color == "Black") {
                    return colors_right.Black;
                }
                else if (d.major_color == "Pink") {
                    return colors_right.Pink;
                }
                else if (d.major_color == "Blue") {
                    return colors_right.Blue;
                }
                else if (d.major_color == "Red") {
                    return colors_right.Red;
                }
                else if (d.major_color == "Cyan") {
                    return colors_right.Cyan;
                }
                else if (d.major_color == "Green") {
                    return colors_right.Green;
                }
                else if (d.major_color == "Gray") {
                    return colors_right.Gray;
                }
                else if (d.major_color == "Yellow") {
                    return colors_right.Yellow;
                }
                else if (d.major_color == "Brown") {
                    return colors_right.Brown;
                }
                else if (d.major_color == "Purple") {
                    return colors_right.Purple;
                }
                else if (d.major_color == "Orange") {
                    return colors_right.Orange;
                }
                else {
                    return "url(#colorful)";
                }
            });

        d3.selectAll(".sweater")
            .select("svg")
            .attr("fill", function(d) {
                if (d.clothing_pattern == "Floral") {
                    return "url(#floralPattern)";
                }
                else if (d.clothing_pattern == "Spotted") {
                    return "url(#spottedPattern)";
                }
                else if (d.clothing_pattern == "Striped") {
                    return "url(#stripedPattern)";
                }
                else if (d.clothing_pattern == "Graphics") {
                    return "url(#graphicsPattern)";
                }
                else if (d.clothing_pattern == "Plaid") {
                    return "url(#plaidPattern)";
                }
                else if (d.clothing_pattern == "Solid") {
                    return "none";
                }
        });

        var suitContainer = personEnter.append("div")
            .attr("class", "suit suit-position")
            .style("text-align", "center")
            .html(suitHTML)
            .style("opacity", function(d) {
                if (d.clothing_category == "Suit") {
                    return "1";
                }
                else {
                    return "0";
                }
            });

        personMerge.select(".suit")
            .style("opacity", function(d) {
                if (d.clothing_category == "Suit") {
                    return "1";
                }
                else {
                    return "0";
                }
            });
        
        personMerge.select(".suit-left")
            .style("fill", function(d) {
                if (d.major_color == "White") {
                    return colors_left.White;
                }
                else if (d.major_color == "Black") {
                    return colors_left.Black;
                }
                else if (d.major_color == "Pink") {
                    return colors_left.Pink;
                }
                else if (d.major_color == "Blue") {
                    return colors_left.Blue;
                }
                else if (d.major_color == "Red") {
                    return colors_left.Red;
                }
                else if (d.major_color == "Cyan") {
                    return colors_left.Cyan;
                }
                else if (d.major_color == "Green") {
                    return colors_left.Green;
                }
                else if (d.major_color == "Gray") {
                    return colors_left.Gray;
                }
                else if (d.major_color == "Yellow") {
                    return colors_left.Yellow;
                }
                else if (d.major_color == "Brown") {
                    return colors_left.Brown;
                }
                else if (d.major_color == "Purple") {
                    return colors_left.Purple;
                }
                else if (d.major_color == "Orange") {
                    return colors_left.Orange;
                }
                else {
                    return "url(#colorful)";
                }
            });
        
        personMerge.select(".suit-right")
            .style("fill", function(d) {
                if (d.major_color == "White") {
                    return colors_right.White;
                }
                else if (d.major_color == "Black") {
                    return colors_right.Black;
                }
                else if (d.major_color == "Pink") {
                    return colors_right.Pink;
                }
                else if (d.major_color == "Blue") {
                    return colors_right.Blue;
                }
                else if (d.major_color == "Red") {
                    return colors_right.Red;
                }
                else if (d.major_color == "Cyan") {
                    return colors_right.Cyan;
                }
                else if (d.major_color == "Green") {
                    return colors_right.Green;
                }
                else if (d.major_color == "Gray") {
                    return colors_right.Gray;
                }
                else if (d.major_color == "Yellow") {
                    return colors_right.Yellow;
                }
                else if (d.major_color == "Brown") {
                    return colors_right.Brown;
                }
                else if (d.major_color == "Purple") {
                    return colors_right.Purple;
                }
                else if (d.major_color == "Orange") {
                    return colors_right.Orange;
                }
                else {
                    return "url(#colorful)";
                }
            });

        d3.selectAll(".suit")
            .select("svg")
            .attr("fill", function(d) {
                if (d.clothing_pattern == "Floral") {
                    return "url(#floralPattern)";
                }
                else if (d.clothing_pattern == "Spotted") {
                    return "url(#spottedPattern)";
                }
                else if (d.clothing_pattern == "Striped") {
                    return "url(#stripedPattern)";
                }
                else if (d.clothing_pattern == "Graphics") {
                    return "url(#graphicsPattern)";
                }
                else if (d.clothing_pattern == "Plaid") {
                    return "url(#plaidPattern)";
                }
                else if (d.clothing_pattern == "Solid") {
                    return "none";
                }
        });

        var outerwearContainer = personEnter.append("div")
            .attr("class", "outerwear outerwear-position")
            .style("text-align", "center")
            .html(outerwearHTML)
            .style("opacity", function(d) {
                if (d.clothing_category == "outerwear") {
                    return "1";
                }
                else {
                    return "0";
                }
            });

        personMerge.select(".outerwear")
            .style("opacity", function(d) {
                if (d.clothing_category == "Outerwear") {
                    return "1";
                }
                else {
                    return "0";
                }
            });
        
        personMerge.select(".outerwear-left")
            .style("fill", function(d) {
                if (d.major_color == "White") {
                    return colors_left.White;
                }
                else if (d.major_color == "Black") {
                    return colors_left.Black;
                }
                else if (d.major_color == "Pink") {
                    return colors_left.Pink;
                }
                else if (d.major_color == "Blue") {
                    return colors_left.Blue;
                }
                else if (d.major_color == "Red") {
                    return colors_left.Red;
                }
                else if (d.major_color == "Cyan") {
                    return colors_left.Cyan;
                }
                else if (d.major_color == "Green") {
                    return colors_left.Green;
                }
                else if (d.major_color == "Gray") {
                    return colors_left.Gray;
                }
                else if (d.major_color == "Yellow") {
                    return colors_left.Yellow;
                }
                else if (d.major_color == "Brown") {
                    return colors_left.Brown;
                }
                else if (d.major_color == "Purple") {
                    return colors_left.Purple;
                }
                else if (d.major_color == "Orange") {
                    return colors_left.Orange;
                }
                else {
                    return "url(#colorful)";
                }
            });
        
        personMerge.select(".outerwear-right")
            .style("fill", function(d) {
                if (d.major_color == "White") {
                    return colors_right.White;
                }
                else if (d.major_color == "Black") {
                    return colors_right.Black;
                }
                else if (d.major_color == "Pink") {
                    return colors_right.Pink;
                }
                else if (d.major_color == "Blue") {
                    return colors_right.Blue;
                }
                else if (d.major_color == "Red") {
                    return colors_right.Red;
                }
                else if (d.major_color == "Cyan") {
                    return colors_right.Cyan;
                }
                else if (d.major_color == "Green") {
                    return colors_right.Green;
                }
                else if (d.major_color == "Gray") {
                    return colors_right.Gray;
                }
                else if (d.major_color == "Yellow") {
                    return colors_right.Yellow;
                }
                else if (d.major_color == "Brown") {
                    return colors_right.Brown;
                }
                else if (d.major_color == "Purple") {
                    return colors_right.Purple;
                }
                else if (d.major_color == "Orange") {
                    return colors_right.Orange;
                }
                else {
                    return "url(#colorful)";
                }
            });

        d3.selectAll(".outerwear")
            .select("svg")
            .attr("fill", function(d) {
                if (d.clothing_pattern == "Floral") {
                    return "url(#floralPattern)";
                }
                else if (d.clothing_pattern == "Spotted") {
                    return "url(#spottedPattern)";
                }
                else if (d.clothing_pattern == "Striped") {
                    return "url(#stripedPattern)";
                }
                else if (d.clothing_pattern == "Graphics") {
                    return "url(#graphicsPattern)";
                }
                else if (d.clothing_pattern == "Plaid") {
                    return "url(#plaidPattern)";
                }
                else if (d.clothing_pattern == "Solid") {
                    return "none";
                }
        });

        var dressContainer = personEnter.append("div")
            .attr("class", "dress dress-position")
            .style("text-align", "center")
            .html(dressHTML)
            .style("opacity", function(d) {
                if (d.clothing_category == "Dress") {
                    return "1";
                }
                else {
                    return "0";
                }
            });
        
        var dress = d3.selectAll(".dress")
            .attr("data-race", function(d) {
                return d3.select(this.parentNode).attr("data-race");
            });
        
        d3.selectAll(".dress svg")
            .attr("data-race", function(d) {
                return d3.select(this.parentNode).attr("data-race");
            });

        personMerge.select(".dress")
            .style("opacity", function(d) {
                if (d.clothing_category == "Dress") {
                    return "1";
                }
                else {
                    return "0";
                }
            });
        
        personMerge.select(".dress-left")
            .style("fill", function(d) {
                if (d.major_color == "White") {
                    return colors_left.White;
                }
                else if (d.major_color == "Black") {
                    return colors_left.Black;
                }
                else if (d.major_color == "Pink") {
                    return colors_left.Pink;
                }
                else if (d.major_color == "Blue") {
                    return colors_left.Blue;
                }
                else if (d.major_color == "Red") {
                    return colors_left.Red;
                }
                else if (d.major_color == "Cyan") {
                    return colors_left.Cyan;
                }
                else if (d.major_color == "Green") {
                    return colors_left.Green;
                }
                else if (d.major_color == "Gray") {
                    return colors_left.Gray;
                }
                else if (d.major_color == "Yellow") {
                    return colors_left.Yellow;
                }
                else if (d.major_color == "Brown") {
                    return colors_left.Brown;
                }
                else if (d.major_color == "Purple") {
                    return colors_left.Purple;
                }
                else if (d.major_color == "Orange") {
                    return colors_left.Orange;
                }
                else {
                    return "url(#colorful)";
                }
            });
        
        personMerge.select(".dress-right")
            .style("fill", function(d) {
                if (d.major_color == "White") {
                    return colors_right.White;
                }
                else if (d.major_color == "Black") {
                    return colors_right.Black;
                }
                else if (d.major_color == "Pink") {
                    return colors_right.Pink;
                }
                else if (d.major_color == "Blue") {
                    return colors_right.Blue;
                }
                else if (d.major_color == "Red") {
                    return colors_right.Red;
                }
                else if (d.major_color == "Cyan") {
                    return colors_right.Cyan;
                }
                else if (d.major_color == "Green") {
                    return colors_right.Green;
                }
                else if (d.major_color == "Gray") {
                    return colors_right.Gray;
                }
                else if (d.major_color == "Yellow") {
                    return colors_right.Yellow;
                }
                else if (d.major_color == "Brown") {
                    return colors_right.Brown;
                }
                else if (d.major_color == "Purple") {
                    return colors_right.Purple;
                }
                else if (d.major_color == "Orange") {
                    return colors_right.Orange;
                }
                else {
                    return "url(#colorful)";
                }
            });

        d3.selectAll(".dress")
            .select("svg")
            .attr("fill", function(d) {
                if (d.clothing_pattern == "Floral") {
                    return "url(#floralPattern)";
                }
                else if (d.clothing_pattern == "Spotted") {
                    return "url(#spottedPattern)";
                }
                else if (d.clothing_pattern == "Striped") {
                    return "url(#stripedPattern)";
                }
                else if (d.clothing_pattern == "Graphics") {
                    return "url(#graphicsPattern)";
                }
                else if (d.clothing_pattern == "Plaid") {
                    return "url(#plaidPattern)";
                }
                else if (d.clothing_pattern == "Solid") {
                    return "none";
                }
        });


        // neckline shape
        var foldedContainer = personEnter.append("div")
            .attr("class", "folded folded-position")
            .style("text-align", "center")
            .html(foldedHTML)
            .style("opacity", function(d) {
                if (d.neckline_shape == "Folded") {
                    return "1";
                }
                else {
                    return "0";
                }
            });

        personMerge.select(".folded")
            .style("opacity", function(d, i) {
                if (d.neckline_shape == "Folded") {
                    return "1";
                }
                else {
                    return "0";
                }
            });

        var vshapeContainer = personEnter.append("div")
            .attr("class", "vshape vshape-position")
            .style("text-align", "center")
            .html(vshapeHTML)
            .style("opacity", function(d) {
                if (d.neckline_shape == "V-shape") {
                    return "1";
                }
                else {
                    return "0";
                }
            });
        
        var vshape = d3.selectAll(".vshape")
            .attr("data-race", function(d) {
                return d3.select(this.parentNode).attr("data-race");
            });
        
        d3.selectAll(".vshape svg")
            .attr("data-race", function(d) {
                return d3.select(this.parentNode).attr("data-race");
            });

        personMerge.select(".vshape")
            .style("opacity", function(d) {
                if (d.neckline_shape == "V-shape") {
                    return "1";
                }
                else {
                    return "0";
                }
            });

        var roundContainer = personEnter.append("div")
            .attr("class", "round round-position")
            .style("text-align", "center")
            .html(roundHTML)
            .style("opacity", function(d) {
                if (d.neckline_shape == "Round") {
                    return "1";
                }
                else {
                    return "0";
                }
            });
        
        var round = d3.selectAll(".round")
            .attr("data-race", function(d) {
                return d3.select(this.parentNode).attr("data-race");
            });
        
        d3.selectAll(".round svg")
            .attr("data-race", function(d) {
                return d3.select(this.parentNode).attr("data-race");
            });

        personMerge.select(".round")
            .style("opacity", function(d) {
                if (d.neckline_shape == "Round") {
                    return "1";
                }
                else {
                    return "0";
                }
            });


        // scarf, hat, glasses, necktie
        var scarfContainer = personEnter.append("div")
            .attr("class", "scarf scarf-position")
            .style("text-align", "center")
            .html(scarfHTML)
            .style("opacity", function(d) {
                if (d.wearing_scarf == "Yes") {
                    return "1";
                }
                else {
                    return "0";
                }
            });

        personMerge.select(".scarf")
            .style("opacity", function(d) {
                if (d.wearing_scarf == "Yes") {
                    return "1";
                }
                else {
                    return "0";
                }
            });

        var hatContainer = personEnter.append("div")
            .attr("class", function(d) {
                if (d3.select(this.parentNode).attr("data-gender") == 0) {
                    return "hat malehat-position";
                }
                else {
                    return "hat femalehat-position";
                }
            })
            .style("text-align", "center")
            .html(function(d) {
                if (d3.select(this.parentNode).attr("data-gender") == 0) {
                    return maleHatHTML;
                }
                else {
                    return femaleHatHTML;
                }
            })
            .style("opacity", function(d) {
                if (d.wearing_hat == "Yes") {
                    return "1";
                }
                else {
                    return "0";
                }
            });

        personMerge.select(".hat")
            .attr("class", function(d) {
                if (d3.select(this.parentNode).attr("data-gender") == 0) {
                    return "hat malehat-position";
                }
                else {
                    return "hat femalehat-position";
                }
            })
            .html(function(d) {
                if (d3.select(this.parentNode).attr("data-gender") == 0) {
                    return maleHatHTML;
                }
                else {
                    return femaleHatHTML;
                }
            })
            .style("opacity", function(d, i) {
                if (d.wearing_hat == "Yes") {
                    return "1";
                }
                else {
                    return "0";
                }
            });

        var glassesContainer = personEnter.append("div")
            .attr("class", function(d) {
                if (d3.select(this.parentNode).attr("data-gender") == 0) {
                    return "glasses maleglasses-position";
                }
                else {
                    return "glasses femaleglasses-position";
                }
            })
            .style("text-align", "center")
            .html(function(d) {
                if (d3.select(this.parentNode).attr("data-gender") == 0) {
                    return maleGlassesHTML;
                }
                else {
                    return femaleGlassesHTML;
                }
            })
            .style("opacity", function(d) {
                if (d.wearing_glasses == "Yes") {
                    return "1";
                }
                else {
                    return "0";
                }
            });

        personMerge.select(".glasses")
            .attr("class", function(d) {
                if (d3.select(this.parentNode).attr("data-gender") == 0) {
                    return "glasses maleglasses-position";
                }
                else {
                    return "glasses femaleglasses-position";
                }
            })
            .html(function(d) {
                if (d3.select(this.parentNode).attr("data-gender") == 0) {
                    return maleGlassesHTML;
                }
                else {
                    return femaleGlassesHTML;
                }
            })
            .style("opacity", function(d) {
                if (d.wearing_glasses == "Yes") {
                    return "1";
                }
                else {
                    return "0";
                }
            });

        var necktieContainer = personEnter.append("div")
            .attr("class", "necktie necktie-position")
            .style("text-align", "center")
            .html(necktieHTML)
            .style("opacity", function(d) {
                if (d.wearing_necktie == "Yes") {
                    return "1";
                }
                else {
                    return "0";
                }
            });

        personMerge.select(".necktie")
            .style("opacity", function(d) {
                if (d.wearing_necktie == "Yes") {
                    return "1";
                }
                else {
                    return "0";
                }
            });
        
        
        // body color
        d3.selectAll(".part1")
            .style("fill", function(d) {
                if (d3.select(this.parentNode).attr("data-race") == 0) {
                    return "#926B45";
                }
                else if (d3.select(this.parentNode).attr("data-race") == 1) {
                    return "#DDBE9A";
                }
                else {
                    return "#D3AB84";
                }
            });
        
        d3.selectAll(".part2")
            .style("fill", function(d) {
                if (d3.select(this.parentNode).attr("data-race") == 0) {
                    return "#A97C50";
                }
                else if (d3.select(this.parentNode).attr("data-race") == 1) {
                    return "#E2C9B5";
                }
                else {
                    return "#DBB99A";
                }
            });


        // city name
        var cityNameContainer = personEnter.append("div")
            .attr("class", "city-name city-position")
            .style("text-align", "center");

        var cityName = cityNameContainer.append("svg")
            .attr("width", "80")
            .attr("height", "50")
            .append("text")
            .attr("x", "50%")
            .attr("y", "50%")
            .attr("alignment-baseline", "middle")
            .attr("text-anchor", "middle")
            .attr("fill", "#000")
            .style("font-size", "10px")
            .style("font-family", "'Josefin Sans', sans-serif")
            .style("letter-spacing", "-0.2px")
            .text(function(d) {
                return cityNameArray[parseInt(d.city_id)];
            });
        
        personMerge.select(".city-name text")
            .attr("x", "50%")
            .attr("y", "50%")
            .attr("alignment-baseline", "middle")
            .attr("text-anchor", "middle")
            .attr("fill", "#000")
            .style("font-size", "10px")
            .style("font-family", "'Josefin Sans', sans-serif")
            .style("letter-spacing", "1px")
            .text(function(d) {
                return cityNameArray[parseInt(d.city_id)];
            });

        // main body
        d3.selectAll(".head svg")
            .attr("width", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return headSize.width * 0.25;
            })
            .attr("height", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return headSize.height * 0.25;
            })
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".head")
            .style("width", function(d) {
                var headSize = d3.select(this).selectAll("*").node().getBBox();
                return headSize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var headSize = d3.select(this).selectAll("*").node().getBBox();
                return headSize.height * 0.25 + "px";
            });

        d3.selectAll(".upperbody svg")
            .attr("width", function(d) {
                var upperbodySize = d3.select(this).node().getBBox();
                return upperbodySize.width * 0.25;
            })
            .attr("height", function(d) {
                var upperbodySize = d3.select(this).node().getBBox();
                return upperbodySize.height * 0.25;
            })
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".upperbody")
            .style("width", function(d) {
                var upperbodySize = d3.select(this).selectAll("*").node().getBBox();
                return upperbodySize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var upperbodySize = d3.select(this).selectAll("*").node().getBBox();
                return upperbodySize.height * 0.25 + "px";
            });

        d3.selectAll(".downbody svg")
            .attr("width", function(d) {
                var downbodySize = d3.select(this).node().getBBox();
                return downbodySize.width * 0.25;
            })
            .attr("height", function(d) {
                var downbodySize = d3.select(this).node().getBBox();
                return downbodySize.height * 0.25;
            })
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".downbody")
            .style("width", function(d) {
                var downbodySize = d3.select(this).selectAll("*").node().getBBox();
                return downbodySize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var downbodySize = d3.select(this).selectAll("*").node().getBBox();
                return downbodySize.height * 0.25 + "px";
            });


        // clothing category
        var tanktopSize = d3.select(".tanktop svg").node().getBBox();

        d3.selectAll(".tanktop svg")
            .attr("width", tanktopSize.width * 0.25)
            .attr("height", tanktopSize.height * 0.25)
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".tanktop")
            .style("width", function(d) {
                var tanktopSize = d3.select(this).selectAll("*").node().getBBox();
                return tanktopSize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var tanktopSize = d3.select(this).selectAll("*").node().getBBox();
                return tanktopSize.height * 0.25 + "px";
            });

        var tshirtSize = d3.select(".tshirt svg").node().getBBox();

        d3.selectAll(".tshirt svg")
            .attr("width", tshirtSize.width * 0.25)
            .attr("height", tshirtSize.height * 0.25)
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".tshirt")
            .style("width", function(d) {
                var tshirtSize = d3.select(this).selectAll("*").node().getBBox();
                return tshirtSize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var tshirtSize = d3.select(this).selectAll("*").node().getBBox();
                return tshirtSize.height * 0.25 + "px";
            });

        var shirtSize = d3.select(".shirt svg").node().getBBox();

        d3.selectAll(".shirt svg")
            .attr("width", shirtSize.width * 0.25)
            .attr("height", shirtSize.height * 0.25)
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".shirt")
            .style("width", function(d) {
                var shirtSize = d3.select(this).selectAll("*").node().getBBox();
                return shirtSize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var shirtSize = d3.select(this).selectAll("*").node().getBBox();
                return shirtSize.height * 0.25 + "px";
            });


        var sweaterSize = d3.select(".sweater svg").node().getBBox();

        d3.selectAll(".sweater svg")
            .attr("width", sweaterSize.width * 0.25)
            .attr("height", sweaterSize.height * 0.25)
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".sweater")
            .style("width", function(d) {
                var sweaterSize = d3.select(this).selectAll("*").node().getBBox();
                return sweaterSize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var sweaterSize = d3.select(this).selectAll("*").node().getBBox();
                return sweaterSize.height * 0.25 + "px";
            });

        var suitSize = d3.select(".suit svg").node().getBBox();

        d3.selectAll(".suit svg")
            .attr("width", suitSize.width * 0.25)
            .attr("height", suitSize.height * 0.25)
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".suit")
            .style("width", function(d) {
                var suitSize = d3.select(this).selectAll("*").node().getBBox();
                return suitSize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var suitSize = d3.select(this).selectAll("*").node().getBBox();
                return suitSize.height * 0.25 + "px";
            });

        var outerwearSize = d3.select(".outerwear svg").node().getBBox();

        d3.selectAll(".outerwear svg")
            .attr("width", outerwearSize.width * 0.25)
            .attr("height", outerwearSize.height * 0.25)
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".outerwear")
            .style("width", function(d) {
                var outerwearSize = d3.select(this).selectAll("*").node().getBBox();
                return outerwearSize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var outerwearSize = d3.select(this).selectAll("*").node().getBBox();
                return outerwearSize.height * 0.25 + "px";
            });

        var dressSize = d3.select(".dress svg").node().getBBox();

        d3.selectAll(".dress svg")
            .attr("width", dressSize.width * 0.25)
            .attr("height", dressSize.height * 0.25)
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".dress")
            .style("width", function(d) {
                var dressSize = d3.select(this).selectAll("*").node().getBBox();
                return dressSize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var dressSize = d3.select(this).selectAll("*").node().getBBox();
                return dressSize.height * 0.25 + "px";
            });


        // neckline shape
        var foldedSize = d3.select(".folded svg").node().getBBox();

        d3.selectAll(".folded svg")
            .attr("width", foldedSize.width * 0.25)
            .attr("height", foldedSize.height * 0.25)
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".folded")
            .style("width", function(d) {
                var foldedSize = d3.select(this).selectAll("*").node().getBBox();
                return foldedSize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var foldedSize = d3.select(this).selectAll("*").node().getBBox();
                return foldedSize.height * 0.25 + "px";
            });

        var vshapeSize = d3.select(".vshape svg").node().getBBox();

        d3.selectAll(".vshape svg")
            .attr("width", vshapeSize.width * 0.25)
            .attr("height", vshapeSize.height * 0.25)
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".vshape")
            .style("width", function(d) {
                var vshapeSize = d3.select(this).selectAll("*").node().getBBox();
                return vshapeSize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var vshapeSize = d3.select(this).selectAll("*").node().getBBox();
                return vshapeSize.height * 0.25 + "px";
            });

        var roundSize = d3.select(".round svg").node().getBBox();

        d3.selectAll(".round svg")
            .attr("width", roundSize.width * 0.25)
            .attr("height", roundSize.height * 0.25)
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".round")
            .style("width", function(d) {
                var roundSize = d3.select(this).selectAll("*").node().getBBox();
                return roundSize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var roundSize = d3.select(this).selectAll("*").node().getBBox();
                return roundSize.height * 0.25 + "px";
            });


        // scarf, hat, glasses, necktie
        var scarfSize = d3.select(".scarf svg").node().getBBox();

        d3.selectAll(".scarf svg")
            .attr("width", scarfSize.width * 0.25)
            .attr("height", scarfSize.height * 0.25)
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".scarf")
            .style("width", function(d) {
                var scarfSize = d3.select(this).selectAll("*").node().getBBox();
                return scarfSize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var scarfSize = d3.select(this).selectAll("*").node().getBBox();
                return scarfSize.height * 0.25 + "px";
            });

        d3.selectAll(".hat svg")
            .attr("width", function(d) {
                var hatSize = d3.select(this).node().getBBox();
                return hatSize.width * 0.25;
            })
            .attr("height", function(d) {
                var hatSize = d3.select(this).node().getBBox();
                return hatSize.height * 0.25;
            })
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".hat")
            .style("width", function(d) {
                var hatSize = d3.select(this).selectAll("*").node().getBBox();
                return hatSize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var hatSize = d3.select(this).selectAll("*").node().getBBox();
                return hatSize.height * 0.25 + "px";
            });

        d3.selectAll(".glasses svg")
            .attr("width", function(d) {
                var glassesSize = d3.select(this).node().getBBox();
                return glassesSize.width * 0.25;
            })
            .attr("height", function(d) {
                var glassesSize = d3.select(this).node().getBBox();
                return glassesSize.height * 0.25;
            })
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".glasses")
            .style("width", function(d) {
                var glassesSize = d3.select(this).selectAll("*").node().getBBox();
                return glassesSize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var glassesSize = d3.select(this).selectAll("*").node().getBBox();
                return glassesSize.height * 0.25 + "px";
            });

        var necktieSize = d3.select(".necktie svg").node().getBBox();

        d3.selectAll(".necktie svg")
            .attr("width", necktieSize.width * 0.25)
            .attr("height", necktieSize.height * 0.25)
            .attr("viewBox", function(d) {
                var headSize = d3.select(this).node().getBBox();
                return "0 0 " + headSize.width + " " + headSize.height;
            });
        
        d3.selectAll(".necktie")
            .style("width", function(d) {
                var necktieSize = d3.select(this).selectAll("*").node().getBBox();
                return necktieSize.width * 0.25 + "px";
            })
            .style("height", function(d) {
                var necktieSize = d3.select(this).selectAll("*").node().getBBox();
                return necktieSize.height * 0.25 + "px";
            });
        
        
        
        d3.selectAll(".person")
            .on("mouseover", function(d) {
                var positionX = $(this).offset().left + 110;
                var positionY = $(this).offset().top - 198;
            
                var wearHat = "",
                    wearGlasses = "",
                    wearScarf = "",
                    wearNecktie = "";
            
                
            
                if (d.wearing_hat == "Yes") { wearHat = "Hat"; }
                if (d.wearing_glasses == "Yes") { wearGlasses = "Glasses"; }
                if (d.wearing_scarf == "Yes") { wearScarf = "Scarf"; }
                if (d.wearing_necktie == "Yes") { wearNecktie = "Necktie"; }
            
                tooltip.html("<div class='text'><p class='tooltip-name'>" + cityNameArray[parseInt(d.city_id)] + "</p><p class='tooltip-detail'>Category: " + d.clothing_category + "</p><p class='tooltip-detail'>Pattern: " + d.clothing_pattern + "</p><p class='tooltip-detail'>Neckline Shape: " + d.neckline_shape + "</p><p class='tooltip-detail color'>Major Color: " + d.major_color + "</p><p class='tooltip-detail wearing'>Wearing " + wearHat + " " + wearGlasses + " " + wearScarf + " " + wearNecktie + "</p><p class='cue'></p></div><div class='line'></div><div class='icon'><img class='icon-size' src='../image/" + d.clothing_category + ".svg'><img class='icon-size' src='../image/" + d.clothing_pattern + ".svg'><img class='icon-size' src='../image/" + d.neckline_shape + ".svg'><img class='icon-size hat-icon' src='../image/Hat.svg'><img class='icon-size glasses-icon' src='../image/Glasses.svg'><img class='icon-size scarf-icon' src='../image/Scarf.svg'><img class='icon-size necktie-icon' src='../image/Necktie.svg'><div class='color-icon-size' style='background-color: " + colors_left[d.major_color] + "'></div></div>")
                .style("left", positionX + "px")
                .style("top", positionY + "px");
            
                if (d.wearing_hat == "Yes") {
                    tooltip.select(".hat-icon")
                        .style("display", "inline-block");
                }
                
                if (d.wearing_glasses == "Yes") {
                    tooltip.select(".glasses-icon")
                        .style("display", "inline-block");
                }
            
                if (d.wearing_scarf == "Yes") {
                    tooltip.select(".scarf-icon")
                        .style("display", "inline-block");
                }
            
                if (d.wearing_necktie == "Yes") {
                    tooltip.select(".necktie-icon")
                        .style("display", "inline-block");
                }
            
                if (d.major_color == "More than 1 color") {
                    tooltip.select(".color")
                        .html("Major Color: Colorful");
                }
            
                if ((d.wearing_hat == "No") && (d.wearing_glasses == "No") && (d.wearing_scarf == "No") && (d.wearing_necktie == "No")) {
                    tooltip.select(".wearing")
                        .html("No accessories");
                }
            
                if (d3.select(this).attr("major-selected") == "1") {
                    d3.select(".cue")
                        .html("Click to unselect");
                }
                else if (d3.select(this).attr("secondary-selected") == "1") {
                    d3.select(".cue")
                        .html("Click to cancel");
                }
                else {
                    d3.select(".cue")
                        .html("Click to compare");
                }
            
                d3.selectAll(".cue")
                    .style("color", function() {
                        return colors_left[d.major_color];
                    });
            
                d3.select(this)
                    .select(".personBKG")
                    .style("opacity", "0");
            
                tooltip
//                    .transition()
//                    .duration(1000)
                    .style("opacity", "1");
            
                original_opacity = d3.select(this).style("opacity");
            
                d3.select(this)
                    .style("opacity", "1");
            })
            .on("mouseout", function(d) {
                tooltip.style("opacity", "0");
            
                d3.select(this)
                    .select(".personBKG")
                    .style("opacity", "1");
            
                d3.select(this)
                    .style("opacity", original_opacity);
            });
        

    }
    
    function updateLineChart(cities, filter) {
        
        var all_datapoint = [];
        
        line_nested.forEach(function(d) {
            var dataTimeSorted = d.values.sort(timeSort);
            
            var dataitem = {};
            
            var datapoint = [];
            
            dataTimeSorted.forEach(function(c) {
                var datapointObj = {};
                var count = 0;
                var percentage = 0;
                
                c.values.forEach(function(e) {
                    if (e.clothing_category == filter) { count = count + 1; }
                    if (e.clothing_pattern == filter) { count = count + 1; }
                    if (e.major_color == filter) { count = count + 1; }
                    if (e.neckline_shape == filter) { count = count + 1; }
                    
                    if (filter == "Hat") {
                        if (e.wearing_hat == "Yes") { count = count + 1; }
                    }
                    if (filter == "Glasses") {
                        if (e.wearing_glasses == "Yes") { count = count + 1; }
                    }
                    if (filter == "Scarf") {
                        if (e.wearing_scarf == "Yes") { count = count + 1; }
                    }
                    if (filter == "Necktie") {
                        if (e.wearing_necktie == "Yes") { count = count + 1; }
                    }

                });

                percentage = count / c.values.length;
                
                datapointObj.city = c.values[0].city_id;
                datapointObj.time = c.key;
                datapointObj.count = count;
                datapointObj.total = c.values.length;
                datapointObj.percentage = percentage;

                datapoint.push(datapointObj);
            });

            dataitem.city = d.key;
            dataitem.values = datapoint;
            
            all_datapoint.push(dataitem);
        });
        
        console.log(all_datapoint);
        
        var dataFiltered = all_datapoint.filter(function(d) {
            return d.city == cities[0] || d.city == cities[1];
        });
        
        if (dataFiltered.length == 2) {
            var city_data_1 = dataFiltered[0].values;
            var city_data_2 = dataFiltered[1].values;
            
            all_datapoint_concat = city_data_1.concat(city_data_2);
        }
        else if (dataFiltered.length == 1) {
            var city_data_1 = dataFiltered[0].values;
            
            all_datapoint_concat = city_data_1;
        }
        else {
            var city_data_1 = [];
            all_datapoint_concat = [];
        }
        
        xExtent = d3.extent(all_datapoint_concat, function(d) {
            return d.percentage;
        });

        xScale = d3.scaleLinear()
            .domain(xExtent)
            .range([20, 380]);

        yScale = d3.scaleLinear()
            .domain([0, 10])
            .range([50, 570]);

        xAxis = d3.axisBottom(xScale)
            .ticks(5)
            .tickFormat(d3.format(".0%"));
            
        var lineInterpolate = d3.line()
            .x(function(d) {
                return xScale(d);
            })
            .y(function(d, i) {
                return yScale(i);
            });

        var line1 = lineContainer1.selectAll(".line-plot")
            .data([city_data_1.map(function(d) { return d.percentage; })]);

        var lineEnter1 = line1.enter()
            .append("path")
            .attr("class", "line-plot plot1");
        
        d3.selectAll(".plot1")
            .transition()
            .duration(500)
            .attr("d", lineInterpolate);
        
        var dot1 = dotContainer1.selectAll(".dot")
            .data(city_data_1);
        
//        console.log(all_datapoint[0]);

        var dotEnter1 = dot1.enter()
            .append("circle")
            .attr("class", "dot dot1");
        
        d3.selectAll(".dot1")
            .transition()
            .duration(500)
            .attr("r", "5")
            .attr("cx", function(d) { return xScale(d.percentage); })
            .attr("cy", function(d, i) { return yScale(i); });
        
        if (dataFiltered.length == 2) {
            var line2 = lineContainer2.selectAll(".line-plot")
                .data([city_data_2.map(function(d) { return d.percentage; })]);

            var lineEnter2 = line2.enter()
                .append("path")
                .attr("class", "line-plot plot2");

            d3.selectAll(".plot2")
                .transition()
                .duration(500)
                .attr("d", lineInterpolate);

            var dot2 = dotContainer2.selectAll(".dot")
                .data(city_data_2);

            var dotEnter2 = dot2.enter()
                .append("circle")
                .attr("class", "dot dot2");

            d3.selectAll(".dot2")
                .transition()
                .duration(500)
                .attr("r", "5")
                .attr("cx", function(d) { return xScale(d.percentage); })
                .attr("cy", function(d, i) { return yScale(i); });
        }
        
        d3.select(".x")
            .transition()
            .duration(500)
            .style("opacity", "1")
            .call(xAxis); 
        
        d3.select(".ruler")
            .style("opacity", "1");
            
        d3.selectAll(".dot1")
            .on("mouseover", function(d, i) {
                var positionX = $(this).offset().left - 970;
                var positionY = $(this).offset().top - 350;
            
                var linetip_title = filter.toUpperCase();
            
                var linetip_time = timeline[i];
            
                var cityMaxSign = "";
                var cityMinSign = "";
            
                var city_max_percentage = 0;
                var city_min_percentage = 1;
            
                all_datapoint.forEach(function(c) {
                    var data = c.values.filter(function(e) {
                        return e.time == d.time;
                    });
                    
                    var percentage = data[0].percentage;
                    
                    if (city_max_percentage <= percentage) {
                        city_max_percentage = percentage;
                        cityMaxSign = data[0].city;
                    }
                    
                });
            
                all_datapoint.forEach(function(c) {
                    var data = c.values.filter(function(e) {
                        return e.time == d.time;
                    });
                    
                    var percentage = data[0].percentage;
                    
                    if (city_min_percentage >= percentage) {
                        city_min_percentage = percentage;
                        cityMinSign = data[0].city;
                    }
                    
                });
            
                city_max_percentage = (city_max_percentage * 100).toFixed(0);
                city_min_percentage = (city_min_percentage * 100).toFixed(0);
            
                if (dataFiltered.length == 1) {
                    var city_percentage_1 = (d.percentage * 100).toFixed(0);
                    
                    linetip
                        .html(function() {
                            return "<p class='linetip-title'>" + linetip_title + "</p><p class='linetip-time'>" + linetip_time + "</p><p class='linetip-subtitle'>This / Total of bloggers</p><p class='linetip-content'>" + cityNameArray[parseInt(d.city)] + " : " + d.count + " / " + d.total + " (" + city_percentage_1 + "%)</p><div class='linetip-line'></div><p class='linetip-subtitle'>Cities with Max/Min% of this</p><p class='linetip-content'>" + cityNameArray[parseInt(cityMaxSign)] + " : " + city_max_percentage + "%</p><p class='linetip-content'>" + cityNameArray[parseInt(cityMinSign)] + " : " + city_min_percentage + "%</p>";
                        });
                }
                else if (dataFiltered.length == 2) {
                    var city_percentage_1 = (d.percentage * 100).toFixed(0);
                    
                    var another_city = dataFiltered[1].values.filter(function(c) {
                        return c.time == d.time;
                    });
                    
                    var city_percentage_2 = (another_city[0].percentage * 100).toFixed(0);
                    
                    linetip
                        .html(function() {
                            return "<p class='linetip-title'>" + linetip_title + "</p><p class='linetip-time'>" + linetip_time + "</p><p class='linetip-subtitle'>This / Total of bloggers</p><p class='linetip-content'>" + cityNameArray[parseInt(d.city)] + " : " + d.count + " / " + d.total + " (" + city_percentage_1 + "%)</p><p class='linetip-content'>" + cityNameArray[parseInt(another_city[0].city)] + " : " + another_city[0].count + " / " + another_city[0].total + " (" + city_percentage_2 + "%)</p><div class='linetip-line'></div><p class='linetip-subtitle'>Cities with Max/Min% of this</p><p class='linetip-content'>" + cityNameArray[parseInt(cityMaxSign)] + " : " + city_max_percentage + "%</p><p class='linetip-content'>" + cityNameArray[parseInt(cityMinSign)] + " : " + city_min_percentage + "%</p>";
                        });
                }
            
                d3.select(this)
                    .attr("r", "10");
            
                linetip.style("left", positionX + "px")
                    .style("top", positionY + "px")
                    .style("display", "block");
            })
            .on("mouseout", function(d) {
                d3.select(this)
                    .attr("r", "5");

                linetip.style("display", "none");
            });
        d3.selectAll(".dot2")
            .on("mouseover", function(d, i) {
                var positionX = $(this).offset().left - 970;
                var positionY = $(this).offset().top - 350;
            
                var linetip_title = filter.toUpperCase();
            
                var linetip_time = timeline[i];
            
                var cityMaxSign = "";
                var cityMinSign = "";
            
                var city_max_percentage = 0;
                var city_min_percentage = 1;
            
                all_datapoint.forEach(function(c) {
                    var data = c.values.filter(function(e) {
                        return e.time == d.time;
                    });
                    
                    var percentage = data[0].percentage;
                    
                    if (city_max_percentage <= percentage) {
                        city_max_percentage = percentage;
                        cityMaxSign = data[0].city;
                    }
                    
                });
            
                all_datapoint.forEach(function(c) {
                    var data = c.values.filter(function(e) {
                        return e.time == d.time;
                    });
                    
                    var percentage = data[0].percentage;
                    
                    if (city_min_percentage >= percentage) {
                        city_min_percentage = percentage;
                        cityMinSign = data[0].city;
                    }
                    
                });
            
                city_max_percentage = (city_max_percentage * 100).toFixed(0);
                city_min_percentage = (city_min_percentage * 100).toFixed(0);
            
                var city_percentage_1 = (d.percentage * 100).toFixed(0);
                    
                var another_city = dataFiltered[0].values.filter(function(c) {
                    return c.time == d.time;
                });

                var city_percentage_2 = (another_city[0].percentage * 100).toFixed(0);

                linetip
                    .html(function() {
                        return "<p class='linetip-title'>" + linetip_title + "</p><p class='linetip-time'>" + linetip_time + "</p><p class='linetip-subtitle'>This / Total of bloggers</p><p class='linetip-content'>" + cityNameArray[parseInt(d.city)] + " : " + d.count + " / " + d.total + " (" + city_percentage_1 + "%)</p><p class='linetip-content'>" + cityNameArray[parseInt(another_city[0].city)] + " : " + another_city[0].count + " / " + another_city[0].total + " (" + city_percentage_2 + "%)</p><div class='linetip-line'></div><p class='linetip-subtitle'>Cities with Max/Min% of this</p><p class='linetip-content'>" + cityNameArray[parseInt(cityMaxSign)] + " : " + city_max_percentage + "%</p><p class='linetip-content'>" + cityNameArray[parseInt(cityMinSign)] + " : " + city_min_percentage + "%</p>";
                    });

                d3.select(this)
                    .attr("r", "10");
            
                linetip.style("left", positionX + "px")
                    .style("top", positionY + "px")
                    .style("display", "block");
            })
            .on("mouseout", function(d) {
                d3.select(this)
                    .attr("r", "5");

                linetip.style("display", "none");
            });
        
        d3.select(".legend-container")
            .style("opacity", "1");

    }
    
    // clears line and matrix charts
    function clearLineChart() {
        d3.select(".line1").html("");
        d3.select(".line2").html("");
        d3.select(".dots1").html("");
        d3.select(".dots2").html("");
        d3.select(".ruler").style("opacity","0");
        d3.select(".line-chart").select(".axis").style("opacity","0");
        d3.select(".legend-container").style("opacity", "0");
        d3.select(".matrix-instructions").style("opacity", "0");
        d3.select(".matrix-comparison-icon").style("opacity","0");
        d3.select("#imageBox").style("opacity", "0");
        d3.select("#grid").style("opacity","0");
        d3.selectAll(".instruction").style("display", "inherit");
    }
    
    function updateMatrixChart(cities, quarter) {
        if (cities.length < 3) {
            
            d3.select(".matrix-instructions")
                .style("opacity", "1");
            d3.select("#imageBox")
                .style("opacity", "1");
            d3.select("#grid")
                .style("opacity", "1");
            d3.select(".matrix-comparison-icon").style("opacity","1");
            
            var dataFilter = line_nested.filter(function(d) {
                if (cities.length == 2) {
                    return d.key == cities[0] || d.key == cities[1]
                } else if (cities.length == 1) {
                    return d.key == cities[0];
                } else {
                    return [];
                }
            });

            var dataFiltered = [];

            for (var i = 0; i < dataFilter.length; i++) {
                var arr = dataFilter[i].values.filter(function (d) {
                    if (d.key == quarter) {
                        return d.values;
                    }
                });
                dataFiltered = dataFiltered.concat(arr[0].values);
            }


            var size = dataFiltered.length;

            var dataStore = new Array(matrix_legend.length);

            for (var i = 0; i < dataStore.length; i++) {
                dataStore[i] = new Array(dataStore.length);

                for (var j = 0; j < dataStore.length; j++) {
                    dataStore[i][j] = {
                        "value" : 0,
                        "image" : [],
                        "Red" : 0,
                        "Black": 0,
                        "Blue": 0,
                        "Pink": 0,
                        "Green": 0,
                        "Gray": 0,
                        "Orange": 0,
                        "Yellow": 0,
                        "White": 0,
                        "Brown": 0,
                        "Purple": 0
                    };
                }
            }

            dataFiltered.forEach(function(a) {
                for (var i = 0; i < dataStore.length; i++) { 
                    for (var j = 0; j < dataStore.length; j++) {
                        if ((a.city_id == cities[0] && i >= j) || a.city_id == cities[1] && j >= i) {
                            var i_test = "Yes";
                            var j_test = "Yes";
                            if (matrix_legend[i].split(":")[0] == "clothing_category" || matrix_legend[i].split(":")[0] == "clothing_pattern") {
                                i_test = matrix_legend[i].split(":")[1];
                            }
                            if (matrix_legend[j].split(":")[0] == "clothing_category" || matrix_legend[j].split(":")[0] == "clothing_pattern") {
                                j_test = matrix_legend[j].split(":")[1];
                            }
                            if (a[matrix_legend[i].split(":")[0]] == i_test && a[matrix_legend[j].split(":")[0]] == j_test) {
                                dataStore[i][j]["value"] += 1/size; // add a % of pop count
                                dataStore[i][j]["image"].push(a.url.split("/").pop());
                                if (a["major_color"] != "" && a["major_color"] != "More than 1 color") {    // tally color count
                                    dataStore[i][j][a["major_color"]] += 1;
                                }
                            }
                        }
                    }
                }
            });

            var newData = createDataset(dataStore, cities);
 

            var squares = allSquares.selectAll(".squareContainer")
                .data(newData);

            var squareEnter = squares.enter()
                .append("g")
                .attr("class", "squareContainer");

            var squaresAdd = squareEnter.append("rect")
                .attr("width", matrix_xScale.bandwidth())
                .attr("height", matrix_yScale.bandwidth())
                .attr("class", "square");

            squares.merge(squareEnter)
                .attr("transform", function(d) {
                    return "translate("+matrix_xScale(d.row)+", "+matrix_yScale(d.col)+")";
                })
                .select(".square")
                .style("fill-opacity", 0.01)
                .attr("class", function(d) {
                    if (d.comboColor == "White") {
                        return "square whiteSquare";
                    } else {
                        return "square";
                    }
                })
                .attr("id", function(d) {
                    return "n"+d.row +"-"+d.col;
                })
                .on("click", function(d) {
                    if (d3.select(this).classed("selected")) {
                        d3.select(this).classed("selected", false);
                        d3.select("#imageBox").select("p").text("Click a combo cell to see images.");
                        d3.select("#imageBox").selectAll("a").attr('href','image/placeholder.jpg');
                        d3.select("#imageBox").selectAll("img").attr('src','image/placeholder.jpg');
                    } else {
                        d3.selectAll(".square").classed("selected", false)
                            .style("stroke", function(d) {
                                if(!d3.select(this).classed("whiteSquare")) {
                                    return "none";
                                } else {
                                    d3.select(this).style("stroke-width","0.2px");
                                    return "#8F8F8F";
                                }
                            });
                        document.getElementById("imageHolder").innerHTML = "";
                        d3.select(this).classed("selected", true)
                            .style("stroke","#000")
                            .style("stroke-width","2px")
                            .style("stroke-opacity", 1);
                        showImages(d);
                    }
                })
                .on("mouseover", function(d) {
                    toolTip.show(d);    
                    d3.select(this).style("stroke", "#000").style("stroke-width","2px");
                    d3.select("#n"+d.col+"-"+d.row).style("stroke", "#000");
                    d3.select(this.parentNode).selectAll(".guideline").attr("opacity", 0.2);
                })
                .on("mouseout", function(d) {
                    toolTip.hide(d);
                    d3.select("#n"+d.col+"-"+d.row).style("stroke", "none");
                    d3.select(this.parentNode).selectAll(".guideline").attr("opacity", 0);
                    if (!d3.select(this).classed("selected")) {
                        if (!d3.select(this).classed("whiteSquare")) {
                            d3.select(this).style("stroke", "none");
                        } else {
                            d3.select(this).style("stroke", "#8F8F8F").style("stroke-width", "0.2px");
                        }
                    }
                })
                .transition()
                .duration(500)
                .style("fill", d => colors_left[d.comboColor])
                .style("fill-opacity", function(d) {
                    var presence = d.cor * 10;
                    if (presence > 1) {
                        presence = 1;
                    } else if (presence == 0) {
                        presence = 0.05;
                    }
                    return presence;
                });

            var markerLineX = squareEnter.append("rect")
                .attr("class", "guideline")
                .attr("height", matrix_yScale.bandwidth())
                .attr("width", matrix_size)
                .attr("transform", "translate("+(-matrix_size)+",0)")
                .attr("opacity", 0);

            var markerLineY = squareEnter.append("rect")
                .attr("class", "guideline")
                .attr("height", matrix_size)
                .attr("width", matrix_xScale.bandwidth())
                .attr("transform", "translate(0,"+(-matrix_size)+")")
                .attr("opacity", 0);
            
            d3.select(".matrix-x")
                .style("opacity", "1");
            
            d3.select(".matrix-y")
                .style("opacity", "1");
            
            d3.select(".diagonal")
                .style("opacity", "1");
            
            d3.select(".matrix-comparison-icon")
                .style("opacity", "1");

            // exit + remove functions
            squares.exit().remove();
        }
    }

    function createDataset(dataStore, cities) {
        var data = [];
        
        for (var i = 0; i < dataStore.length; i++) {
            for (var j = 0; j < dataStore[i].length; j++) {
                if (i != j && dataStore[i][j]["value"] != 0) { //ignore self-referencing parts in the matrix and only include points that have a correlation value
                    var element = {};
                    element.cor = dataStore[i][j]["value"];
                    element.col = i;
                    element.row = j;
                    var c = "Black"; //defaults to black if no color value
                    for (var k in dataStore[i][j]) {
                        if (k != "value" && dataStore[i][j][k] > dataStore[i][j][c]) {
                            c = k;
                        }
                    }
                    element.comboColor = c;
                    if (i > j) {
                        element.city = cities[0];
                    } else {
                        element.city = cities[1];
                    }
                    element.imageURL = dataStore[i][j]["image"];
                    data.push(element);
                }
            }
        }
        return data;
    }
        
    function formatTicks(iconDim) {

        matrixChart.selectAll(".matrix-axis")
            .selectAll("text")
            .remove();

        matrixChart.selectAll(".matrix-axis")
            .selectAll(".tick")
            .each(function (d,i) {
                d3.select(this)
                    .append("image")
                    .attr("width", iconDim)
                    .attr("height", iconDim)
                    .attr("fill", "gray")
                    .attr("x", function(d) {
                        var check = this.parentElement.parentElement;

                        if (check.classList.contains("x1") || check.classList.contains("matrix-x")) {
                            return (-iconDim/2);
                        }
                        else if (check.classList.contains("y1")) {
                            return (-iconDim - 8);
                        }
                        else if (check.classList.contains("matrix-y")) {
                            return 8;
                        }
                    })
                    .attr("y", function(d) {
                        var check = this.parentElement.parentElement;

                        if (check.classList.contains("y1") || check.classList.contains("matrix-y")) {
                            return (-iconDim/2);
                        } else if (check.classList.contains("x1")) {
                            return (-iconDim - 8);
                        } else if (check.classList.contains("matrix-x")) {
                            return 8;
                        }
                    })
                    .attr("class", "tick-icon")
                    .attr("xlink:href", "image/" + matrix_legend[i].split(":")[1] + ".svg");
            });
    }
        
    function showImages(d) {
//        console.log("hit");
        var urls = d.imageURL;
        var selectedImages = [];
        if (urls.length > 3) { // grab 3 random images
            while (selectedImages.length < 3) {
                var choose = Math.floor(Math.random()*urls.length);
                var token = urls[choose];
                if (selectedImages.indexOf(token) == -1) {
                    selectedImages.push(token);
                }
            }
        } else {
            selectedImages = urls;
        }
        d3.select("#imageBox").select("p").text( matrix_legend[d.col].split(":")[1]+" x "+matrix_legend[d.row].split(":")[1]+" combos in "+cityNameArray[parseInt(d.city)]);
        for (var i = 0; i < selectedImages.length; i++) {
            var firstThree = selectedImages[i].substring(0,3).split("");
            console.log(firstThree);
            var urlString = "https://gitlab.com/joshuapyao/fashion-data/raw/master/pictures/"+firstThree[0]+"/"+firstThree[1]+"/"+firstThree[2]+"/"+selectedImages[i];
            var lightB = document.createElement("a");
            lightB.href = urlString;
            lightB.setAttribute('data-lightbox', 'imagebox');
            var img = document.createElement("img");
            img.src = urlString;
            img.style.width = "110px";
            lightB.appendChild(img);
            document.getElementById("imageHolder").appendChild(lightB);
        }
    }
    
    function updateSimilarityChart(city) {
//        d3.selectAll(".personBKG")
//            .style("box-shadow", function(d) {
//                if (d3.select(this.parentNode).attr("data-selected") == "0") {
//                    return "none";
//                }
//                else {
//                    return "0 0 8px 0 #014cff";
//                }
//            });
        var none_selected = true;
        d3.selectAll(".person")
            .each(function(d) {
                if (d3.select(this).attr("major-selected") == "1") {
                    none_selected = false;
                }
            });
        

        if (none_selected == false) {
//            console.log(dataSorted);
        
            var select_city = dataSorted.filter(function(d) {
                return d.city_id == city[0];
            });

//            console.log(select_city);
//            console.log(select_city[0].major_color);

            d3.selectAll(".person")
                .attr("data-similarity", function(d) {
                    var similarity = 0;
                    if (d.clothing_category == select_city[0].clothing_category) { similarity = similarity + 1; }

                    if (d.clothing_pattern == select_city[0].clothing_pattern) { similarity = similarity + 0.8; }

                    if (d.neckline_shape == select_city[0].neckline_shape) { similarity = similarity + 0.4; }

                    if (d.major_color == select_city[0].major_color) { similarity = similarity + 1; }

                    if (d.wearing_hat == select_city[0].wearing_hat) { similarity = similarity + 1; }

                    if (d.wearing_glasses == select_city[0].wearing_glasses) { similarity = similarity + 0.8; }

                    if (d.wearing_scarf == select_city[0].wearing_scarf) { similarity = similarity + 1; }

                    if (d.wearing_necktie == select_city[0].wearing_necktie) { similarity = similarity + 0.4; }

                    return similarity;
                })
                .style("opacity", function(d) {
                    if (d3.select(this).attr("data-similarity") >= 5) {
                        return "1";
                    }
                    else if (d3.select(this).attr("data-similarity") >= 3 && d3.select(this).attr("data-similarity") < 5){
                        return "0.5";
                    }
                    else {
                        return "0.1";
                    }
                });
        }
        else {
            d3.selectAll(".person")
                .style("opacity", "1");
        }
        
        
        
    }

    function updateLegend(city) {
//        console.log(city);
//        console.log("kkk");
        if (city.length == 1) {
            var city_id_1 = city[0];
            
            d3.select(".legend1").style("opacity", "1").style("pointer-events", "auto");
            d3.select(".legend1 .legend-text").text(cityNameArray[parseInt(city_id_1)]);       
        } else if (city.length == 2) {
            var city_id_2 = city[1];

            d3.select(".legend2").style("opacity", "1").style("pointer-events", "auto");
            d3.select(".legend2 .legend-text").text(cityNameArray[parseInt(city_id_2)]);
            
            d3.select(".legend2")
                .transition()
                .duration(500)
                .style("background-color", "rgba(255, 0, 31, 0.15)")
                .transition()
                .duration(500)
                .style("background-color", "rgba(255, 0, 31, 0)");
        }

        
//        console.log(city.length); 
    }

});



















