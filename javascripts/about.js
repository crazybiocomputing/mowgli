var About = function(the_id)) {
    this.element = document.getElementById(the_id);
    this.handleEvent = function(event) {
        console.log(the_id); // 'Something Good', as this is the Something object
        switch(event.type) {
        case 'click':
            // some code here...
            var popup = new Modal({
                header : "<p>About Mowgli... </p>",
                headerImage : "img/headerprot.jpg",
                body  : content
            });
            break;
        case 'dblclick':
            // some code here...
            break;
        }
    };

    // Note that the listeners in this case are this, not this.handleEvent
    this.element.addEventListener('click', this, false);
    this.element.addEventListener('dblclick', this, false);

    // You can properly remove the listeners
    // this.element.removeEventListener('click', this, false);
    // this.element.removeEventListener('dblclick', this, false);
  
    var content = [
        "<p>MOWGLI &mdash; <b>MO</b>lecule <b>W</b>eb<b>GL</b> & <b>I</b>mage viewer &mdash; ",
        "is a collaborative project developed by students of the Master of Science in Bioinformatics, Bordeaux ",
        "during the course \"Structural Bioinformatics\". </p>",
        "<p>Maintained and supervised by Jean-Christophe Taveau</a></p>",
        "<h3>Contributors</h3>",
        "<h4>Promotion 2014</h4>",
        "<p>Nullam at enim at nibh mollis feugiat ac nec lorem. Mauris eu ornare erat. Integer facilisis aliquet leo a iaculis. </p>",
        "<h4>Promotion 2015</h4>",
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis orci vel velit rutrum, a dapibus nisl convallis. ",
        "Nulla quis hendrerit dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>",
        "<h4>Promotion 2016</h4>",
        "<p>Integer commodo faucibus dui vitae maximus. Nullam at enim at nibh mollis feugiat ac nec lorem. Mauris eu ornare erat. </p>",
        "<p>Published with <a href=\"http://pages.github.com\">GitHub Pages</a></p>"
    ]
}
