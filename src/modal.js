var Modal = function(options) {
    var element = document.getElementById('modal');
    var html =  '<div class="container"><header id="modalhead">';
    html += '<a href="#close" title="Close modal window" class="droite">&#10060;</a>'
    html += options.headerTitle || 'Modal window';
    html += '</header>';
    html += '<article>';
    html += options.body || 'No information';
    html += '</section>';
    html += '<footer class="cf">';
    html += '<a href="#close" class="btn droite" title="Close modal window">Close</a>';
    html += '</footer></div>';

    element.innerHTML = html;
    
    var header = element.children[0].children[0];  // aka document.getElementById("modalhead");
    console.log(header);
    header.style.backgroundImage = options.headerImage || 'url("images/default-background.jpg")';

    // Display modal
    element.classList.toggle("oModal_target");

}
