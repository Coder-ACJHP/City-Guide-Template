
    var clickCount = 0;
    var navigationBar = document.querySelector('.nav-bar');
    var togglerBtn = document.querySelector('.toggler-btn');
    var collapsibleNavbar = document.querySelector('#collapsibleNavbar');

    function showCollapseNav() {
        togglerBtn.setAttribute('id', 'toggler-btn-rotated');
        collapsibleNavbar.style.display = "block";
        navigationBar.setAttribute('id', 'nav-bar-border');
        clickCount = 1;
    }

    function hideCollapseNav() {
        togglerBtn.setAttribute('id', '');
        collapsibleNavbar.style.display = "none";
        navigationBar.setAttribute('id', '');
        clickCount = 0;
    }

    if(togglerBtn) {
        togglerBtn.addEventListener('click', () => {

            if (clickCount == 0) {
                showCollapseNav();
            } else {
                hideCollapseNav();
            }
    
        });
    }

    /** Collapsible side bar */
    var clickCounter = 0;
    var sidebar = document.getElementById('customSidebar');
    var togglerBtnLeft = document.querySelector('.toggler-btn-left');

    function showCollapseSidebar() {
        togglerBtnLeft.setAttribute('id', 'toggler-btn-left-rotated');
        navigationBar.style.marginLeft = '250px';
        sidebar.style.display = "inline-block";
        clickCounter = 1;
    }

    function hideCollapseSidebar() {
        togglerBtnLeft.setAttribute('id', '');
        navigationBar.style.marginLeft = '0';
        sidebar.style.display = "none";
        clickCounter = 0;
    }

    if(togglerBtnLeft) {
        togglerBtnLeft.addEventListener('click', () => {

            if (clickCounter == 0) {
                showCollapseSidebar();
            } else {
                hideCollapseSidebar();
            }
    
        });
    }

    /** UI elements */
    var isOpen = false;
    var uiElementLink = document.getElementById('ui-element');

    if(uiElementLink) {
        uiElementLink.onclick = ()=> {

            if(isOpen) {
                isOpen = false;
                document.getElementById('drop-icon').setAttribute('class', 'dropDown-icon-up');
                document.querySelector('.dropDown').style.display = 'none';
            } else {
                isOpen = true;
                document.getElementById('drop-icon').setAttribute('class', 'dropDown-icon-down');
                document.querySelector('.dropDown').style.display = 'flex';
            }
            
        }
    }
    
/** Directing to lists with passing parameter */
    let allDivs = document.getElementsByTagName('div');
    const branches = ['hotels', 'shoppings', 'restaurants', 'historicals', 'librarys', 'gardens-parks'];
    if (allDivs.length > 0) {
        for (let i = 0; i < allDivs.length; i++) {
            for (let j = 0; j < branches.length; j++) {
                const element = branches[j];

                if (allDivs[i].id === element) {
                    allDivs[i].onclick = ()=> {
                        window.location.href = 'html/directions-list.html?list='+element;
                    }
                }
            }

        }
    }

    let directionHeader = document.getElementById('direction-title');
    if (directionHeader) {
        var url = new URL(window.location.href);

        directionHeader.innerHTML = " "+url.searchParams.get("list");
    }
/** This function end... */


    /** Scroll page functions */
    var directionPage = document.getElementById('directions');
    var mostViewedPage = document.getElementById('mostViewed');
    var otherPopularsPage = document.getElementById('otherPopulars');

    if(directionPage && mostViewedPage && otherPopularsPage) {
        function takeMeToPosition(params) {
            var bounds = document.querySelector(params).getBoundingClientRect();
            hideCollapseNav();
            window.scrollBy(0, bounds.top - 100);
        }
        
        directionPage.addEventListener('click', ()=> {
            takeMeToPosition('#section-one');
        });  
        mostViewedPage.addEventListener('click', ()=> {
            takeMeToPosition('#section-two');
        }); 
        otherPopularsPage.addEventListener('click', ()=> {
            takeMeToPosition('#section-three');
        }); 
    }

 /** Map initialize and config */
 var mapOptions = {};
 var initialCityAddress = {lat: 35.47000000, lng: 44.3950000};

function selectMapType(type) {
    var innerType;
    
    switch (type) {
        case 'HYBRID':
            innerType = google.maps.MapTypeId.HYBRID;
            break;
        case 'ROADMAP':
            innerType = google.maps.MapTypeId.ROADMAP;
            break;
        case 'SATELLITE':
            innerType = google.maps.MapTypeId.SATELLITE;
            break;
        case 'TERRAIN':
            innerType = google.maps.MapTypeId.TERRAIN;
            break;         
        default:
            break;
    }
    mapOptions = {
        center: initialCityAddress,
        zoom: 13,
        mapTypeId: innerType
    }
 }

 function initializeMap(mapType) {  
    selectMapType(mapType);
    var map = new google.maps.Map(document.querySelector(".map"), mapOptions);
    var marker = new google.maps.Marker({
        position: initialCityAddress,
        map: map,
        icon: 'resources/icons/map-pointer.png',
        title: 'Heart of Iraq'
      });
}

 var iconsList = document.querySelectorAll('.map-icon');
 for (let index = 0; index < iconsList.length; index++) {
    iconsList[index].onclick = changeMap;
 }

 function changeMap(event) {
    initializeMap(event.target.id);
 }

/** Add shadow effect to images when mouse over. */

 var imageList = document.querySelectorAll('.list-image');
 
 for (let i = 0; i < imageList.length; i++) {
    imageList[i].onmouseover = showOverlayText;
    imageList[i].onmouseout = hideOverlayText;
 }

 function showOverlayText() {
     document.querySelector('.ribbon-hero').style.zIndex = "1";
     document.querySelectorAll('.ribbon').forEach(rb=> {
         rb.style.zIndex = "1";
     })
 }

 function hideOverlayText() {
    document.querySelector('.ribbon-hero').style.zIndex = "0";
     document.querySelectorAll('.ribbon').forEach(rb=> {
        rb.style.zIndex = "0";
    })
}

/** Hero Slider */
var slides = document.getElementsByClassName("slide");
if(slides.length !== 0) {
   
    var slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(n) {
    showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
    showSlides(slideIndex = n);
    }

    function showSlides(n) {
    var i;
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";

    } 
} 


/** Get mini pictures to show them bigger in overlay */

var imageOverlay = document.getElementById('imageOverlay');
var overlayImage = document.getElementById('overlayImage');
var closeButton = document.querySelector(".closeOverlay");

var miniMaps = document.querySelectorAll('.mini-maps');

function addOverlayActionToListItem(paramsList) {
    paramsList.forEach(param => {
        param.onclick = (event)=> {
            var tempImage =  param.getAttribute('src', event.target.result);
            overlayImage.setAttribute('src', tempImage.toString());
            /** Show global image holder */
            imageOverlay.style.display = 'block';
            
        }
    });
}
addOverlayActionToListItem(miniMaps);

if(closeButton) {
    closeButton.onclick = () => {
        imageOverlay.style.display = 'none';
    }    
}



/** Send Contact us form via Ajax */

/** Convert form elements to Json object */
function convertToJson(form) {
    var object = {};
    form.forEach(element => {
        var name = element.name;
        var value = element.value;

        if(name) {
            object[name] = value;
        }
    });
    return JSON.stringify(object);
}

/** Create function for form validation */
function makeUpForError(element, errorMessage) {
    element.style.outline = "0";
    element.style.border = "1px solid #b70707";
    element.setAttribute('placeholder', errorMessage);
}

function makeUpForValid(element) {
    element.style.outline = " ";
    element.style.border = "1px solid #cccccc";
    element.setAttribute('placeholder', '');
}

function formValidation(form) {
    var isValid = true;
    var email = document.getElementById('email');
    var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    form.forEach(element => {

        if (element.type === 'email') {
            if (!element.value.match(emailRegExp)) {
                makeUpForError(element, 'Invalid email address!');
            }
        }
        else if (element.value.trim().length === 0) {
            makeUpForError(element, 'Cannot be empty!');
            isValid = false;
        }
    })
    return isValid;
}

/** Function for reseting form errors (clean) */
function reset(params) {
    params.forEach(element => {
        element.innerHTML = '';
        element.value = '';
        makeUpForValid(element);
    });
}

/** Send form via Ajax */
var form = document.querySelectorAll('input, textarea');
var loaderAnimation = document.getElementById('loader-base');

document.addEventListener("DOMContentLoaded", function () {
    var sendFormBtn = document.getElementById('form-button');
    if(sendFormBtn) {
        sendFormBtn.onclick = (event) => {
            event.preventDefault();
    
            loaderAnimation.style.display = 'block';
            var output = document.getElementById('output');
    
            /*         var xhr = new XMLHttpRequest();
                    xhr.open('POST', 'about-us.html');
                    xhr.onreadystatechange = () => {
                        
                        if(xhr.status === 200) {
                            console.log(xhr.responseText);
                        } else {
                            console.log('Error: ' + xhr.status);
                        }
                    }
                    xhr.send(convertToJson(form)); */
    
            if(formValidation(form)) {
                output.innerHTML = convertToJson(form);
                loaderAnimation.style.display = 'none';
                reset(form);
            } else {
                output.innerHTML = "There is some invlid values in the form!";
                loaderAnimation.style.display = 'none';
            } 
        }
    }
});

/** Login page content */

    var emailInput = document.getElementById('email');
    var emailInputShadow = document.getElementById('email-shadow');
    var passwordInput = document.getElementById('password');
    var passwordInputShadow = document.getElementById('password-shadow');
    var rememberMe = document.querySelector('.remember-me');

    var compass = document.querySelector('.box-icon');

    document.body.onclick = ()=>{
        var selectedObject = document.activeElement;
        if(selectedObject === emailInput) {
            compass.setAttribute('class', 'box-icon');
            passwordInputShadow.removeAttribute('class');
            emailInput.setAttribute('placeholder', 'Email');
            emailInputShadow.setAttribute('class', 'email-shadow');
        } else if(selectedObject === passwordInput) {
            compass.setAttribute('class', 'rotate-icon-90');
            emailInputShadow.removeAttribute('class');
            passwordInput.setAttribute('placeholder', 'Password');
            passwordInputShadow.setAttribute('class', 'password-shadow');
        }
    }


    /** Create function to validate the form */
    function validateForm() {
        var isValid = true;
        var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var formElements = document.querySelectorAll('#login-form input[id="email"], input[id="password"]');

        formElements.forEach(elem=> {
            if(elem.id === 'email') {
                if(elem.value.length <= 0 || !elem.value.match(emailRegExp)) {
                    elem.value = '';
                    elem.setAttribute('placeholder', 'Invalid email!');
                    emailInputShadow.setAttribute('class', 'email-error-shadow');
                    isValid = false;
                }
            } else {
                if(elem.value.length <= 0 || elem.value.length >= 15) {
                    elem.setAttribute('placeholder', 'Invalid password!');
                    passwordInputShadow.setAttribute('class', 'password-error-shadow');
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    /** Mock server accepting Json object so we need to create Json object from form datas */
    function createJsonobj(userEmail, userPassword, rememberUser) {
        /** User Id it's optional if it's undefined generate random Id */
        
        var jsonObject = JSON.stringify({
            title: emailInput.value,
            body: passwordInput.value,
            userId: rememberUser
        });
        return jsonObject;
    }

    function ajaxPost(url, data) {
        if(validateForm() == true) {
            /** Animation trigger */
            compass.setAttribute('class', 'rotate-icon-360');

            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.onreadystatechange = () => {
                if(xhr.readyState == XMLHttpRequest.DONE) {
                    console.log(xhr.responseText);
                    document.location.href = 'admin-panel.html';
                } else {
                    console.log(xhr.status);
                }
            }

            xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
            xhr.send(data);
        }
    }

    var loginButton = document.querySelector('.form-button');
    /** Mock database server url */
    var url = 'https://jsonplaceholder.typicode.com/posts';

    if(loginButton) {
        loginButton.onclick = (event)=> {
            event.preventDefault();
            const loginObj = createJsonobj(emailInput.value, passwordInput.value, rememberMe.checked);
            ajaxPost(url, loginObj);
        }
    }
    

    /** Hide the alert modal */
    var cancelBtn = document.getElementById('cancel');
    if(cancelBtn) {
        cancelBtn.onclick = ()=> {
            document.querySelector('.alert-modal-container').style.display = 'none';
        }
    }
    /** Login page end */

    /** Dashboard */

    var messageTable = document.getElementById('messagesTable');

    if(messageTable) {

        var replayEmail = document.querySelectorAll('.reply-email');
        var tableRows = messageTable.getElementsByTagName('tr');
        let recieverAddress;
        let emailDetail;
        let emailDate;

        /** Iterate table rows and collect details from the table cells */
    for (let index = 0; index < tableRows.length; index++) {
        const element = tableRows[index];
        element.onmouseover = function(event) {
            const currentRowCount = this.rowIndex;

            recieverAddress = tableRows[currentRowCount].getElementsByTagName('td')[0].innerText;
            emailDetail = tableRows[currentRowCount].getElementsByTagName('td')[1].innerText;
            emailDate = tableRows[currentRowCount].getElementsByTagName('td')[2].innerText;

            /** Then make it an email and show in message viewer*/
            quickReplyToEmail(replayEmail);
        }
    }

    /** Message viewer (show and replay) */
    function quickReplyToEmail(params) {
        if(params.length > 0) {
            const modalFrameTemp = document.getElementById('messageViewer');
            const clientMessage = document.querySelector('.clientMessage');
            const messageViewerButton = document.querySelector(".quickReplButton");
            const closeSpan = document.getElementsByClassName("messageViewer-close")[0];


            /** Create elements to show email detail */
            const MESSAGE_HEADER = document.createElement('span');
            MESSAGE_HEADER.setAttribute('class', 'clientMessage-header');
            MESSAGE_HEADER.innerHTML = "Client : <small>("+recieverAddress+")</small>";

            const MESSAGE_BODY = document.createElement('div');
            MESSAGE_BODY.innerHTML = emailDetail;

            const MESSAGE_DATE = document.createElement('p');
            MESSAGE_DATE.setAttribute('class', 'emailDate');
            MESSAGE_DATE.innerHTML = emailDate;
            
            params.forEach(reply => {
                reply.onclick = ()=> {
                    clientMessage.appendChild(MESSAGE_HEADER);
                    clientMessage.appendChild(MESSAGE_BODY);
                    clientMessage.appendChild(MESSAGE_DATE);
                    modalFrameTemp.style.display = 'block';
                }
                
                closeSpan.onclick = ()=> {
                    clientMessage.textContent = '';
                    modalFrameTemp.style.display = "none";
                    
                } 
            });

            messageViewerButton.onclick = (event)=> {

                event.preventDefault();

                // const from = "city_guide@support.com";  REMEMBER TO ADDING THIS PART IN BACKEND!
                const adminMessage = document.querySelector('.responseArea').value;
                const date = new Date().toString();
                const backendUrl = "#";
                
                var emailToJson = JSON.stringify({
                    message: adminMessage,
                    dateTime: date,
                    to: recieverAddress
                });

                var xhr = new XMLHttpRequest();
                xhr.open('POST', backendUrl, true);
                xhr.onreadystatechange = () => {

                    if(xhr.readyState == XMLHttpRequest.DONE) {
                        
                        if (xhr.status >= 400) {
                            // The request failed; fall back to e-mail client
                            window.open('mailto:' + recieverAddress + '?subject=' + encodeURIComponent("test") + "&body=" + encodeURIComponent(adminMessage.concat("\n") + date));
                        }
                        
                        console.log(xhr.responseText);
                        
                    } else {
                        console.log(xhr.status);
                    }

                    cleanMessageViewer();
                    modalFrameTemp.style.display = "none";
                }

                xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
                xhr.send(emailToJson);

            }

            function cleanMessageViewer() {
                while (clientMessage.firstChild) {
                    clientMessage.removeChild(clientMessage.firstChild);
                }
                document.querySelector('.responseArea').value = "";
            }

            
        }
    }
    }

    /** let the function works as default page */
    setIframePage("");
    const sidebarItem = document.querySelector(".sidebar-item");
    if (sidebarItem !== null) {
        sidebarItem.addEventListener("click", function() {
            setIframePage("");
        });
    }

    /** Load page paths when links are clicked */
    function setIframePage(pagePath) {
        if(pagePath.length <= 0) {
            pagePath = "../html/admin-innerPages/default.html";
        }

        const iFrame = document.getElementById("iframe-container");
        if (iFrame) {
            iFrame.setAttribute("src", pagePath);
        }
    }


    let dropDownElements = document.querySelectorAll(".dropDown-item");

    if(dropDownElements) {
        for (let index = 0; index < dropDownElements.length; index++) {
            const element = dropDownElements[index];
    
            element.addEventListener("click", function() {
                switch (element.id) {
                    case "home":
                        setIframePage("../html/admin-innerPages/home.html");
                        break;
                    case "directions":
                        setIframePage("../html/admin-innerPages/directions.html");
                        break;
                    case "cityHistory":
                        setIframePage("../html/admin-innerPages/cityHistory.html");
                        break;
                    case "aboutUs":
                        setIframePage("../html/admin-innerPages/aboutUs.html");
                        break;
                    default:
                        break;
                }
            });
        }
    }

    function goToDown(event) {
        window.location.href = window.location.href+'#bottomOfPage'
        event.style.display = "none";
    }

    /** Directions page enable property */
    var selectInput = document.getElementById('select-kind');
    var selectPlace = document.getElementById('select-place');
    if (selectInput) {
        selectInput.onclick = ()=> {
            
            if (selectInput.selectedIndex > 0) {
                selectPlace.style.pointerEvents = "auto";
                selectPlace.style.opacity = 1;
            }

        }
    }

    if (selectPlace) {
        selectPlace.onclick = ()=> {
            document.querySelector('.edit-container').style.pointerEvents = "auto";
            document.querySelector('.edit-container').style.opacity = 1;
        }
    }

/** Trigger modal width events */
/** Show Modal */
    var modal = document.getElementById('modalFrame');
    
        /** Get the all modal triggers */
        var allTriggers = document.querySelectorAll('.event');
        var span = document.getElementsByClassName("close")[0];
        var modalHeader = document.getElementById('modal-header-text');

        /** Iterate all selected elements and show the modal */
        allTriggers.forEach((btn)=> {
            btn.onclick =()=> {
                const element = btn.querySelector('.event-name').innerHTML;
                modalHeader.innerHTML = element;
                modal.style.display = "block";
            }
        });

        /** Hide modal when user click on X icon */
        span.onclick = function() {
            modal.style.display = "none";
        }

        /** Hide the modal if clicked outside of modal */
        window.onclick = (event) => {
            if (event.target == modal) 
                modal.style.display = "none";
        }

