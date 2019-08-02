var domain;
var isMobile = false;
var products = ["SP", "FP"];
var selected = "";
var sw;
var firstRun = true;

var init = setInterval(function() {
  if (typeof jQuery != "undefined" && typeof jQuery != undefined) {
    jQuery(window).on("load", function() {
      mobileCheck(navigator.userAgent || navigator.vendor || window.opera);

      isMobile = jQuery.browser.mobile;
      domain = window.location.hostname;

      initGestures();

      initOverlay();
    });
    clearInterval(init);
  }
}, 50);

function initOverlay() {
  jQuery("#o-overlay").appendTo("#main");
}

function initGestures() {
  //CHOOSE A PRODUCT
  var formOffset = 0;

  if (isMobile) {
    var formOffset = 0;
  }

  // OVERLAY
  jQuery("#o-overlay .o-close, .o-overlay-bg").on("click", function() {
    jQuery("#o-overlay").addClass("o-hide");
  });

  jQuery("#o-overlay a").on("click", function() {
    jQuery("#o-overlay").addClass("o-hide");
  });

  jQuery(".o-details-trigger").on("click", function(e) {
    var p = jQuery(this)
      .parent()
      .data("id");

    updateOverlay(p);

    jQuery("#o-overlay").removeClass("o-hide");
    e.preventDefault();
  });

  jQuery(".o-other-products .o-cta-blue").on("click", function(e) {
    // Change the text on the button
    jQuery(".o-product .o-cta").html("Vælg aftale");
    jQuery(this).html("Valgt");

    // Change design of button
    jQuery(".o-other-products .o-cta")
      .addClass("o-cta-blue")
      .removeClass("o-cta-border");
    jQuery(this)
      .removeClass("o-cta-blue")
      .addClass("o-cta-border");

    // Set the active product
    var p = jQuery(this)
      .parent()
      .parent()
      .data("id");
    selected = p;

    updateOverlay(p);

    handleForms();

    var form;

    if (selected === "SP") form = jQuery("#block-form-acf-3").offset().top;
    else if (selected === "FP") form = jQuery("#block-form-acf-5").offset().top;

    ///Scrolls the window up to the Agreement area
    jQuery("html, body")
      .delay(500)
      .animate(
        {
          scrollTop: form - formOffset
        },
        400
      );

    e.preventDefault();
  });
}

function updateOverlay(p) {
  selected = p;

  // Starts by showing the right overlay. Either fixed og variable
  jQuery(".o-overlay-content").addClass("o-hide");
  if (p === "SP") {
    jQuery(".o-overlay-content.o-variable-price").removeClass("o-hide");
  } else {
    jQuery(".o-overlay-content.o-fixed-price").removeClass("o-hide");
  }
}

// Forms
function handleForms() {
  //Hides all the forms, and shows the active one
  jQuery("#block-form-acf-3").removeClass("o-show");
  jQuery("#block-form-acf-5").removeClass("o-show");

  if (selected === "SP") {
    jQuery("#block-form-acf-3").addClass("o-show");
  } else if (selected === "FP") {
    jQuery("#block-form-acf-5").addClass("o-show");
  }
}

function mobileCheck(a) {
  (jQuery.browser = jQuery.browser || {}).mobile =
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    );
}
