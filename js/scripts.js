/* Template: Aria - Business HTML Landing Page Template
   Author: Inovatik
   Created: Jul 2019
   Description: Custom JS file
*/


(function ($) {
    "use strict";

    /* Preloader */
    $(window).on('load', function () {
        var preloaderFadeOutTime = 500;
        function hidePreloader() {
            var preloader = $('.spinner-wrapper');
            setTimeout(function () {
                preloader.fadeOut(preloaderFadeOutTime);
            }, 500);
        }
        hidePreloader();
    });


    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function () {
        if ($(".navbar").offset().top > 20) {
            $(".fixed-top").addClass("top-nav-collapse");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
        }
    });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function () {
        $(document).on('click', 'a.page-scroll', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 600, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function (event) {
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
    $('.filters-button-group').on('click', 'a', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'a', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });


    /* Counter - CountTo */
    var a = 0;
    $(window).scroll(function () {
        if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
            var oTop = $('#counter').offset().top - window.innerHeight;
            if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter-value').each(function () {
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
                            step: function () {
                                $this.text(Math.floor(this.countNum));
                            },
                            complete: function () {
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
    $("input, textarea").keyup(function () {
        if ($(this).val() != '') {
            $(this).addClass('notEmpty');
        } else {
            $(this).removeClass('notEmpty');
        }
    });


    /* Call Me Form */
    $("#callMeForm").validator().on("submit", function (event) {
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
            success: function (text) {
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
        $("#callMeForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
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
    $("#contactForm").validator().on("submit", function (event) {
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
            success: function (text) {
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
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
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
    $("#loginForm").validator().on("submit", function (event) { 
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
        // initiate variables with form content 
        var email = $("#pemail").val();
        var password = $("#ppassword").val();

        $.ajax({
            type: "POST",
            url: "php/login-process.php",
            data: { email: email, password: password }, // Pasar los datos como objeto
            dataType: 'json', // Esperar JSON como respuesta
            success: function (response) {
                if (response.status === "success") { 
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
            error: function (xhr, status, error) {
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
        $("#loginForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
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
    $("#newsForm").on("submit", function(event) { 
        event.preventDefault();
        var isValid = true;

        // Ocultar mensajes de error
        $("#titleError, #imageError, #detailError").hide();

        // Validación del título
        if ($("#title").val().trim() === "") {
            $("#titleError").show();
            isValid = false;
        }

        // Validación de la imagen
        if ($("#image")[0].files.length === 0) {
            $("#imageError").show();
            isValid = false;
        }

        var detailContent = tinymce.get('detail').getContent({ format: 'text' }); 

        // Validación del detalle
        if (detailContent.trim() === "") {
            $("#detailError").show();
            isValid = false; 
        }

        // Validación del usuario
        var user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.idUser) {
            alert("Es obligatorio haber iniciado sesión.");
            isValid = false;
        }

        if (isValid) {
            nsubmitForm();
        }
    });


    function nsubmitForm() {
        var formData = new FormData($("#newsForm")[0]);
        var user = JSON.parse(localStorage.getItem('user'));
        formData.append('idUser', user.idUser);
        var detailContent = tinymce.get('detail').getContent();
        
        formData.append('detail', detailContent);
 
         $.ajax({
            url: "php/news-process.php",
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                if (response === "Ya existe un registro con un título similar.") {
                    alert(response);
                } else if (response === "Datos guardados exitosamente." || response === "Datos actualizados exitosamente.") {
                    alert(response);
                    // Limpiar el formulario
                    resetForm();
                    // Recargar las noticias
                    getNews();
                } else {
                    alert("Error al guardar los datos: " + response);
                }
            },
            error: function(xhr, status, error) {
                alert("Ha ocurrido un error: " + error);
            }
        });
    }
    function resetForm() {
        $("#newsForm")[0].reset();
        $("#vista-previa").attr("src", "#").hide();
        tinymce.get('detail').setContent(''); // Limpiar el contenido del editor TinyMCE
        $("#idNews").val(''); // Limpiar el campo oculto de idNews si existe
    
        // Limpiar el campo de archivo de imagen y restablecer el valor predeterminado del nombre de archivo
        var imageInput = document.getElementById('image');
        imageInput.value = ''; // Limpiar el valor del campo de archivo
        imageInput.files = null; // Limpiar los archivos seleccionados
        var defaultFileName = 'Seleccione una imagen'; // Nombre de archivo predeterminado
        //document.getElementById('imageFileName').innerText = defaultFileName; // Restablecer el nombre del archivo en la etiqueta
    }
    
    /* END NEWS */
    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function () {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


    /* Removes Long Focus On Buttons */
    $(".button, a, button").mouseup(function () {
        $(this).blur();
    });





    // Función para eliminar una noticia mediante AJAX 

    // Llamar a la función para obtener y mostrar las noticias al cargar la página
    window.onload = function () {
        getNews();
        fetchNews();
        getNewsCards();
    };


})(jQuery);

// Variable para almacenar todos los datos de noticias
var allNewsData = [];
 
// Función para mostrar las noticias
function showNews(newsData) {
    var newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar noticias

    // Iterar sobre los datos de las noticias
    newsData.forEach(function (news, index) {
        // Crear un div para cada noticia y aplicar clases según la estructura HTML deseada
        var newsItem = document.createElement('div');
        // Verificar si existe un usuario en el localStorage
        var user = JSON.parse(localStorage.getItem('user'));
        // Verificar si el usuario existe y tiene un ID
        if (user && user.idUser) {
            newsItem.innerHTML = '<div class="list-item card mb-2">' +
            '<div class="p-3">' +
            '<h2>' + news.title + '</h2>' +
            '<img src="data:image/jpeg;base64,' + news.image + '" class="img-fluid" alt="Imagen ' + (index + 1) + '">' +
            '</div>' +
            '<div class="p-3">' +
            '<div class="btn-group">' +
            '<button type="button" class="btn btn-primary mr-2" onclick="updateNews(' + news.idNews + ')"><i class="fas fa-edit"></i> Editar </button>' +
            '<button type="button" class="btn btn-secondary mr-2" onclick="deleteNews(' + news.idNews + ')"><i class="fas fa-trash-alt"></i> Eliminar</button>' +
            '<button type="button" class="btn btn-info" onclick="viewNews(\'' + news.title + '\')">Ver</button>' +
            '</div>' +
            '</div>' +
            '</div>';
        } else {
            newsItem.innerHTML = '<div class="list-item card mb-2" onclick="viewNews(\'' + news.title + '\')" style="cursor: pointer;">' +
            '<div class="p-3">' +
            '<h2>' + news.title + '</h2>' +
            '<img src="data:image/jpeg;base64,' + news.image + '" class="img-fluid" alt="Imagen ' + (index + 1) + '">' +
            '</div>' +
            '</div>';
        }

        // Agregar el div de la noticia al contenedor
        newsContainer.appendChild(newsItem);
    });
}

function filterNewsByTitle() {
    var input = document.querySelector('#titles');
    var filter = input.value.toUpperCase();
    var filteredNews = []; 

    // Filtrar noticias por título
    allNewsData.forEach(function(news) {
        if (news.title.toUpperCase().includes(filter)) {
            filteredNews.push(news);
        }
    });
    // Mostrar las noticias filtradas
    showNews(filteredNews);
}

// Método para obtener las noticias
function getNews() {  
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/list-all-news-process.php?action=getNews', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            allNewsData = JSON.parse(xhr.responseText);  
            showNews(allNewsData); // Mostrar todas las noticias inicialmente 
           
        } else if (xhr.readyState === 4 && xhr.status === 404) {
            console.log('Error: No se encontraron noticias');
        }
    };
    xhr.send();
}

// Método para obtener las noticias
function getNewsCards() {  
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/list-all-news-process.php?action=getNews', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            allNewsData = JSON.parse(xhr.responseText);  
            cardNews(allNewsData); 
           
        } else if (xhr.readyState === 4 && xhr.status === 404) {
            console.log('Error: No se encontraron noticias');
        }
    };
    xhr.send();
}

// Función para cargar datos de una noticia en el formulario
function updateNews(idNews) {
    var news = allNewsData.find(news => news.idNews === String(idNews));
    news.nameImg = 'news.jpeg'
    if (news) {
        document.getElementById('idNews').value = news.idNews;
        document.getElementById('title').value = news.title;
        document.getElementById('detail').value = news.detail;
 
        // Convertir la imagen base64 a un Blob para mostrarla en el campo de vista previa
        var base64Image = news.image.startsWith('data:image') ? news.image.split(',')[1] : news.image;
        var byteString = atob(base64Image);
        var mimeString = news.image.startsWith('data:image') ? news.image.split(',')[0].split(':')[1].split(';')[0] : 'image/jpeg';
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], { type: mimeString });
        var url = URL.createObjectURL(blob);

        document.getElementById('vista-previa').src = url;
        document.getElementById('vista-previa').style.display = 'block';

        // Simula la carga del archivo en el input file
        var imageInput = document.getElementById('image');
        var dataTransfer = new DataTransfer();
        dataTransfer.items.add(new File([blob], news.nameImg, { type: mimeString }));
        imageInput.files = dataTransfer.files;

        // Limpiar errores previos
        document.getElementById('titleError').style.display = 'none';
        document.getElementById('imageError').style.display = 'none';
        document.getElementById('detailError').style.display = 'none';

        tinymce.get('detail').setContent(news.detail);

    }
}
 
function deleteNews(idNews) { 
    var confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta noticia?");
    if (confirmDelete) {
        $.ajax({
            type: "POST",
            url: 'php/list-all-news-process.php?action=delete', // Reemplaza "tuscript.php" con la ruta a tu script PHP
            data: { delete: idNews },
            success: function (response) {
                alert(response); // Muestra la respuesta del servidor
                getNews();
                // Actualizar la lista de noticias o realizar otras acciones necesarias
            }
        });
    }
}

function viewNews(title) {
    var url = '../new.html?title=' + encodeURIComponent(title);
    window.open(url, '_blank');
}

function getNewByTitle(title) { 
    $.ajax({
        url: 'php/list-all-news-process.php',
        type: 'GET',
        data: {
            action: 'getNewsByTitle',
            title: title
        },
        dataType: 'json',
        success: function (response) {
            if (response.length > 0) {
                var news = response[0];
                $('#new h1').text(news.title);

                // Convertir la fecha al formato deseado
                var date = new Date(news.date);
                var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                var formattedDate = "Publicado en " + monthNames[date.getMonth()] + ", " + date.getFullYear();
                $('#new h4').text(formattedDate);

                $('#new img').attr('src', 'data:image/jpeg;base64,' + news.image);
                $('#new .text-container').html(news.detail);
            } else {
                $('#new h1').text('No se encontraron noticias con el título especificado');
                $('#new h4').text('');
                $('#new img').attr('src', '');
                $('#new .text-container').html('');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', status, error);
        }
    });

}

function fetchNews() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "php/list-all-news-process.php?action=getLastThreeNews", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var newsData = JSON.parse(xhr.responseText);
                displayNews(newsData);
            } else {
                console.error("Error al obtener datos de las noticias");
            }
        }
    };
    xhr.send();
}

    // Función para formatear la fecha
    function formatDate(dateString) {
        var date = new Date(dateString);
        var day = date.getDate();
        var month = date.toLocaleString('es-ES', { month: 'long' });
        var year = date.getFullYear();

        // Sufijos para los días
        var suffix = 'th';
        if (day === 1 || day === 21 || day === 31) {
            suffix = 'st';
        } else if (day === 2 || day === 22) {
            suffix = 'nd';
        } else if (day === 3 || day === 23) {
            suffix = 'rd';
        }

        return `${month} ${day}${suffix}, ${year}`;
    }

 // Función para mostrar los datos de las noticias en las tarjetas HTML
 function displayNews(newsData) {
    var newsContainer = document.getElementById("newsContainerLastThreeNews");

    newsData.forEach(function(news) {
        var card = document.createElement("div");
        card.className = "col-lg-4";

        card.innerHTML = `
            <div class="card" onclick="viewNews('${news.title}')" style="cursor: pointer;">
                <div class="card-image" style="height: 20vh;">
                    <img class="img-fluid" src="data:image/jpeg;base64,${news.image}" style="height: 100%;width: 100%;" alt="alternative">
                </div>
                <div class="card-body">
                    <h3 class="section-title" style="text-align: justify;">${news.title}</h3>
                    <h4 class="detail">${formatDate(news.date)}</h4>
                    <div class="detail">${news.detail}</div>
                </div>
            </div>
        `;

        newsContainer.appendChild(card);
    });
}

function cardNews(newsData) {
    console.log('demo 2');
    var newsContainer = document.getElementById("newsContainerCards");

    newsData.forEach(function(news) {
        var card = document.createElement("div");
        card.className = "col-lg-4";

        card.innerHTML = `
            <div class="card mb-3" onclick="viewNews('${news.title}')" style="cursor: pointer;">
                <div class="card-image" style="height: 20vh;">
                    <img class="img-fluid" src="data:image/jpeg;base64,${news.image}" style="height: 100%;width: 100%;" alt="alternative">
                </div>
                <div class="card-body">
                    <h3 class="section-title" style="text-align: justify;">${news.title}</h3>
                    <h4 class="detail">${formatDate(news.date)}</h4>
                    <div class="detail">${news.detail}</div>
                </div>
            </div>
        `;

        newsContainer.appendChild(card);
    });
}

document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
    localStorage.removeItem('user'); // Eliminar el usuario del localStorage
    window.location.href = 'login.html'; // Redireccionar a la página de login
});

document.addEventListener('DOMContentLoaded', function () {
    var user = JSON.parse(localStorage.getItem('user'));

    if (user && user.idUser) {
        // Ocultar el elemento de login
        document.querySelector('.menu-login').style.display = 'none';

        // Mostrar el menú desplegable
        document.querySelector('.dropdown').style.display = 'block';
    }
});