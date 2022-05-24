status = '';
objects = [];

function preload(){

    market_image = loadImage('img_market.jpg');
    office_image = loadImage('img_Office_table.jpg');
    toys_image = loadImage('img_Toys.jpg');
    stationary_image = loadImage('img_room.jfif');
    children_image = loadImage('Children_In_Park.jpg');

}   

function setup(){

    canvas = createCanvas(600, 400);
    canvas.center();

    object_detection = ml5.objectDetector('cocossd', model_loaded);
    
}

function model_loaded(){

    status = true;

    if(localStorage.getItem('image_returned') == 'Children'){
        object_detection.detect(children_image, got_results);
    }
    if(localStorage.getItem('image_returned') == 'Room'){
        object_detection.detect(stationary_image, got_results);
    }
    if(localStorage.getItem('image_returned') == 'Market'){
        object_detection.detect(market_image, got_results);
    }
    if(localStorage.getItem('image_returned') == 'Office'){
        object_detection.detect(office_image, got_results);
    }
    if(localStorage.getItem('image_returned') == 'Toys'){
        object_detection.detect(toys_image, got_results);
    }

    document.getElementById('image_choosed').innerHTML = localStorage.getItem('image_returned');
    

}

function got_results(error, results){

    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }

}

function back(){

    window.location = 'index.html';
}

function draw(){

    if(localStorage.getItem('image_returned') == 'Children'){
        image(children_image, 0, 0, 600, 400);
    }
    if(localStorage.getItem('image_returned') == 'Room'){
        image(stationary_image, 0, 0, 600, 400);
    }
    if(localStorage.getItem('image_returned') == 'Market'){
        image(market_image, 0, 0, 600, 400);
    }
    if(localStorage.getItem('image_returned') == 'Office'){
        image(office_image, 0, 0, 600, 400);
    }
    if(localStorage.getItem('image_returned') == 'Toys'){
        image(toys_image, 0, 0, 600, 400);
    }

    if(status != ''){

        for(i = 0; i < objects.length; i++){

            percent = floor(objects[i].confidence * 100);
            label = objects[i].label;
            
            noFill();
            stroke('blue');
            strokeWeight(3);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height, 10, 10, 10, 10);
            fill('blue');
            stroke('blue');
            strokeWeight(3);
            rect(objects[i].x, objects[i].y, 140, 30, 10, 10, 10, 10);
            fill('white');
            textSize(20);
            strokeWeight(0);
            textFont('cursive');
            text(`${label} ${percent}%`, objects[i].x + 5, objects[i].y + 20);

            document.getElementById('number_of_objects_detected').innerHTML = `Number Of Objects Detected: This cocoSSD Model Has Detected ${objects.length} Objects!`

        }

    }

}