/* Template: Aria - Business HTML Landing Page Template
   Author: Inovatik
   Created: Jul 2019
   Description: Custom JS file
*/


(function($) {
    "use strict"; 
	
	/* Preloader */
	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});

	
	/* Navbar Scripts */
	// jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 20) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });


    /* Rotating Text - Morphtext */
	$("#js-rotating").Morphext({
		// The [in] animation type. Refer to Animate.css for a list of available animations.
		animation: "fadeIn",
		// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
		separator: ",",
		// The delay between the changing of each phrase in milliseconds.
		speed: 2000,
		complete: function () {
			// Called after the entrance animation is executed.
		}
    });
    

    /* Card Slider - Swiper */
	var cardSlider = new Swiper('.card-slider', {
		autoplay: {
            delay: 4000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		slidesPerView: 3,
		spaceBetween: 20,
        breakpoints: {
            // when window is <= 992px
            992: {
                slidesPerView: 2
            },
            // when window is <= 768px
            768: {
                slidesPerView: 1
            } 
        }
    });

    
    /* Lightbox - Magnific Popup */
	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false, /* keep it false to avoid html tag shift with margin-right: 17px */
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
    });
    

    /* Filter - Isotope */
    var $grid = $('.grid').isotope({
        // options
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    });
    
    // filter items on button click
    $('.filters-button-group').on( 'click', 'a', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
    
    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'a', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });	
    });
    

    /* Counter - CountTo */
	var a = 0;
	$(window).scroll(function() {
		if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
			var oTop = $('#counter').offset().top - window.innerHeight;
			if (a == 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
				countNum: $this.text()
				}).animate({
					countNum: countTo
				},
				{
					duration: 2000,
					easing: 'swing',
					step: function() {
					$this.text(Math.floor(this.countNum));
					},
					complete: function() {
					$this.text(this.countNum);
					//alert('finished');
					}
				});
			});
			a = 1;
			}
		}
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
    });


    /* Call Me Form */
    $("#callMeForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            lformError();
            lsubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            lsubmitForm();
        }
    });

    function lsubmitForm() {
        // initiate variables with form content
		var name = $("#lname").val();
		var phone = $("#lphone").val();
		var email = $("#lemail").val();
		var select = $("#lselect").val();
        var terms = $("#lterms").val();
        
        $.ajax({
            type: "POST",
            url: "php/callmeform-process.php",
            data: "name=" + name + "&phone=" + phone + "&email=" + email + "&select=" + select + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    lformSuccess();
                } else {
                    lformError();
                    lsubmitMSG(false, text);
                }
            }
        });
	}

    function lformSuccess() {
        $("#callMeForm")[0].reset();
        lsubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function lformError() {
        $("#callMeForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function lsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#lmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Contact Form */
    $("#contactForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            cformError();
            csubmitMSG(false, "¡Por favor llena todos los campos!");
        } else {
            // everything looks good!
            event.preventDefault();
            csubmitForm();
        }
    });

    function csubmitForm() {
        // initiate variables with form content
		var name = $("#cname").val();
		var email = $("#cemail").val();
        var message = $("#cmessage").val();
        var terms = $("#cterms").val();
        $.ajax({
            type: "POST",
            url: "php/contactform-process.php",
            data: "name=" + name + "&email=" + email + "&message=" + message + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    cformSuccess();
                    console.log('entra a succes');
                } else {
                    console.log('entra a error');

                    cformError();
                    csubmitMSG(false, text);
                }
            }
        });
	}

    function cformSuccess() {
        $("#contactForm")[0].reset();
        csubmitMSG(true, "Mensaje Enviado!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
        $("textarea").removeClass('notEmpty'); // resets the field label after submission
    }

    function cformError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function csubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Privacy Form */
    $("#loginForm").validator().on("submit", function(event) {
        console.log('entra 1');
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            pformError();
            psubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            psubmitForm();
        }
    });

    function psubmitForm() {
        console.log('entra 2');
        // initiate variables with form content 
		var email = $("#pemail").val(); 
        var password = $("#ppassword").val();

        $.ajax({
            type: "POST",
            url: "php/login-process.php",
            data: { email: email, password: password }, // Pasar los datos como objeto
            dataType: 'json', // Esperar JSON como respuesta
            success: function(response) { 
                if (response.status === "success") { 
                    console.log('QUE TRAE ',response)
                    pformSuccess();  

                    // Crear un nuevo objeto con los campos necesarios
                    var userData = {
                        Name: response.user.Name,
                        email: response.user.email,
                        idUser: response.user.idUser,
                        lastName: response.user.lastName
                    };
                    // Guardar los datos del usuario en localStorage
                    localStorage.setItem('user', JSON.stringify(userData));

                } else { 
                    pformError();
                    psubmitMSG(false, response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud AJAX:', error);
                // Manejar errores de la solicitud AJAX aquí
            }
        });
	}

    function pformSuccess() {
        $("#loginForm")[0].reset();
        psubmitMSG(true, "Inicio de sesión exitoso");
        $("input").removeClass('notEmpty'); // resets the field label after submission
        
        window.location.href = "news-admin.html";
    }

    function pformError() {
        $("#loginForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function psubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    
    /* NEWS */
    $("#newsForm").validator().on("submit", function(event) {
        console.log('entra 1');
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
           /* pformError();
            psubmitMSG(false, "Please fill all fields!");*/
        } else {
            // everything looks good!
            event.preventDefault();
            nsubmitForm();
        }
    });

    function nsubmitForm() {

        $("#newsForm").submit(function(e) {
            e.preventDefault();
            
            var formData = new FormData(this);
            var user = JSON.parse(localStorage.getItem('user')); // Obtener los datos del usuario del localStorage
            console.log('ID', user.idUser)
            // Agregar los datos del usuario al formData
            formData.append('idUser', user.idUser);

            $.ajax({
                url:  "php/news-process.php",
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                    console.log(response);
                    // Puedes hacer algo con la respuesta aquí
                }
            });
        });
       
        // initiate variables with form content 
		/*var title = $("#ptitle").val(); 
        var detail = $("#pdetail").val();
        var imagen = $("#pimagen")[0].files[0];

        console.log('entra 2', detail);

        $.ajax({
            type: "POST",
            url: "php/news-process.php",
            data:"&title=" + title + "&detail=" + detail + "&image=" + imagen, 
            success: function(text) {
                if (text == "success") {
                    console.log('entra 3'); 
                    //pformSuccess(); 
                } else {
                   /* pformError();
                    psubmitMSG(false, text); */
             /*   }
            }
        }); */
	}

    /* END NEWS */
    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});


    /*NEW ALL LIST  */

 
    function loadNews() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "php/list-all-news-process.php", true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('UQE DEVUELVE',xhr.responseText);
                var newsData = JSON.parse(xhr.responseText);
                var newsContainer = document.getElementById("newsList");
                var html = "";

                // Recorrer los datos de las noticias y generar HTML
                for (var i = 0; i < newsData.length; i++) {
                    var news = newsData[i];
                    html += '<div class="col-lg-4">';
                    html += '<div class="item">';
                    html += '<div class="p-3">';
                    // La ruta de la imagen y el título deben provenir de los datos de la noticia
                    html += '<img src="' + news.image + '" class="img-fluid" alt="' + news.title + '">';
                    html += '</div>';
                    html += '<div class="p-3">';
                    html += '<h2>' + news.title + '</h2>';
                    // Agregar los botones con la clase btn de Bootstrap
                    html += '<button type="button" class="btn btn-primary">Botón 1</button>';
                    html += '<button type="button" class="btn btn-secondary">Botón 2</button>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                }

                // Mostrar el HTML generado en el contenedor de noticias
                newsContainer.innerHTML = html;
            } else {
                console.error("Error al cargar las noticias: " + xhr.status);
            }
        };
        xhr.send();
    }

    // Llamar a la función para cargar las noticias cuando la página se carga completamente
    window.onload = loadNews;
 




})(jQuery);