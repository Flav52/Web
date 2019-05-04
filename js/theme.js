function theme(index){
    var body = document.body;
    
	if(document.getElementById('lien'))
        var a = document.getElementById('lien');
    else 
        var a = document.getElementById('lien2');

    switch(index){
        case 0:
            body.style.backgroundColor = "lightgray";
            body.style.color = "black";
            a.style.color = "black";
            break;

        case 1 :
            body.style.backgroundColor = "#172935";
            body.style.color = "white";
            a.style.color = "white";
            break;

        case 2 : 
            body.style.backgroundColor = "rgb(2, 73, 34)";
            body.style.color = "white";
            a.style.color = "white";
            break;
    }
}