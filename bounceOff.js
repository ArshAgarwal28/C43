function bounceOff(p1, p2) {
    if (p2.x - p1.x < p1.width/2 + p2.width / 2 && p1.x - p2.x < p1.width/2 + p2.width/2) {
      p1.velocityX*=-1;
      p2.velocityX*=-1;
    } if(p2.y - p1.y < p2.height/2 + p1.height/2 && p1.y - p2.y < p2.height / 2 + p1.height / 2) {
      p1.velocityY*=-1;
      p2.velocityY*=-1;  
    } 
  
    //distanceX = (p2.width + p1.width) / 2;
   // distanceY = (p2.height + p1.height) / 2;
  }

  //Sun Diameter = sun.height / 6.5
  //or 120
  //increase by 30