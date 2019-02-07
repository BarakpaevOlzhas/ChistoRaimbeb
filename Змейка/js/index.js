window.onload = function() {
  document.addEventListener('keydown', changeDirection);
  setInterval(loop, 1000/60); // 60 FPS
}


var
  canv 				= document.getElementById('mc'), // canvas
  ctx					= canv.getContext('2d'), // 2d прорисовка
  gs = fkp			= false, // начало игры после нажатие клавиши

  speed = baseSpeed 	= 3, // скорость змейки
  speed2 = baseSpeed  = 3,
  speed3 = baseSpeed  = 3,
  speed4 = baseSpeed  = 3,

  xv = yv				= 0, // ускорение(X x Y)
  xv2 = yv2				= 0,
  xv3 = yv3				= 0,
  xv4 = yv4				= 0,

  px 					= ~~(canv.width) / 20, //1 игрок х позиция
  py 					= ~~(canv.height) / 20, //1 игрок х позиция

  px2 				= ~~(canv.width) / 1.1, //2 игрок х позиция
  py2 				= ~~(canv.height) / 1.1, //2 игрок y позиция

  px3 				= ~~(canv.width) / 18, //3 игрок х позиция
  py3 				= ~~(canv.height) / 1.1, //3 игрок y позиция

  px4 				= ~~(canv.width) / 1.1, //4 игрок х позиция
  py4 				= ~~(canv.height) / 20, //4 игрок y позиция


  pw = ph				= 20, // размеры игроков
  aw = ah				= 20, // размер яблока
  apples				= [], // лист яблок

  trail				= [], // змейки
  trail2			= [],
  trail3			= [],
  trail4			= [],

  tail 				= 50, // длина змейки
  tail2       = 50,
  tail3       = 50,
  tail4       = 50,

  tailSafeZone		= 20, // защита от само поедание
  cooldown			= false, // кд на повороты

  score				= 0; // очки
  score2      = 0;
  score3      = 0
  score4      = 0;


// игра
function loop()
{
  // логика
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canv.width, canv.height);

  // ускорение
  px += xv;
  py += yv;


  // телепорты
  if( px > canv.width )
    {px = 0;}

  if( px + pw < 0 )
    {px = canv.width;}

  if( py + ph < 0 )
    {py = canv.height;}

  if( py > canv.height )
    {py = 0;}



  ctx.fillStyle = 'lime';
  for( var i = 0; i < trail.length; i++ )
  {
    ctx.fillStyle = trail[i].color || 'lime';
    ctx.fillRect(trail[i].x, trail[i].y, pw, ph);
  }
    trail.push({x: px, y: py, color: ctx.fillStyle});

  // лимит
  if( trail.length > tail )
  {
    trail.shift();
  }
// само поедание
  if( trail.length > tail )
  {
    trail.shift();
  }

  // разрушение змейки
  if( trail.length >= tail && gs )
  {
    for( var i = trail.length - tailSafeZone; i >= 0; i-- )
    {
      if(
        px < (trail[i].x + pw)
        && px + pw > trail[i].x
        && py < (trail[i].y + ph)
        && py + ph > trail[i].y
      )
      {
        // последствие самое поедание
        tail = 10; // отрез хвоста
        speed = baseSpeed; // скидываем скорость
        score=0;// скидываем счёт

        for( var t = 0; t < trail.length; t++ )
        {
          // зона разрушение змейки
          trail[t].color = 'red';

          if( t >= trail.length - tail )
            {break;}
        }
      }
      // уничтожение змейки 2
      if(
        px2 < (trail[i].x + pw)
        && px2 + pw > trail[i].x
        && py2 < (trail[i].y + ph)
        && py2 + ph > trail[i].y
      )
      {

        tail2 = 10; // отрезать хвост противника
        speed2 = baseSpeed; //  скидываем скорость
        score2=0;// скидываем очки

        for( var t = 0; t < trail2.length; t++ )
        {
          // уничтожение противника
          trail2[t].color = 'red';

          if( t >= trail2.length - tail2 )
            {break;}
        }
      }


      // уничтожение змейки 3
      if(
        px3 < (trail[i].x + pw)
        && px3 + pw > trail[i].x
        && py3 < (trail[i].y + ph)
        && py3 + ph > trail[i].y
      )
      {

        tail3 = 10; // отрезать хвост противника
        speed3 = baseSpeed; //  скидываем скорость
        score3 =0;// скидываем очки

        for( var t = 0; t < trail3.length; t++ )
        {
          // уничтожение противника
          trail3[t].color = 'red';

          if( t >= trail3.length - tail3)
            {break;}
        }
      }

      // уничтожение змейки противника 4
            if(
              px4 < (trail[i].x + pw)
              && px4 + pw > trail[i].x
              && py4 < (trail[i].y + ph)
              && py4 + ph > trail[i].y
            )
            {
              //последствие
              tail4 = 10; // отрезаем хвост врагу
              speed4 = baseSpeed; // скидываем скорость
              score4=0;// скидываем счёт

              for( var t = 0; t < trail4.length; t++ )
              {
                // анимация уничтожение противника
                trail4[t].color = 'red';

                if( t >= trail4.length - tail4 )
                  {break;}
              }
            }

    }
  }




//_________________________________________________________________________________

// 2 змейка


  px2 += xv2;
  py2 += yv2;


  if( px2 > canv.width )
      {px2 = 0;}

  if( px2 + pw < 0 )
      {px2 = canv.width;}

  if( py2 + ph < 0 )
      {py2 = canv.height;}

  if( py2 > canv.height )
      {py2 = 0;}




  ctx.fillStyle = '#F0ABFF';
  for( var i = 0; i < trail2.length; i++ )
  {
    ctx.fillStyle = trail2[i].color || '#F0ABFF';
    ctx.fillRect(trail2[i].x, trail2[i].y, pw, ph);
  }

  trail2.push({x: px2, y: py2, color: ctx.fillStyle});



  // лимит 2
  if( trail2.length > tail2 )
  {
    trail2.shift();
  }

  // само поедание
  if( trail2.length > tail2 )
  {
    trail2.shift();
  }

  // до разрушение
  if( trail2.length >= tail2 && gs )
  {
    for( var i = trail2.length - tailSafeZone; i >= 0; i-- )
    {
      if(
        px2 < (trail2[i].x + pw)
        && px2 + pw > trail2[i].x
        && py2 < (trail2[i].y + ph)
        && py2 + ph > trail2[i].y
      )
      {
        // последствие самое поедание
        tail2 = 10; // отрезаем змейки хвост
        speed2 = baseSpeed; // скидываем скорость
        score2=0;// скидываем очки

        for( var t = 0; t < trail2.length; t++ )
        {
          // анимация разрушение
          trail2[t].color = 'red';

          if( t >= trail2.length - tail2 )
            {break;}
        }
      }
// уничтожение змейки противника 1
      if(
        px < (trail2[i].x + pw)
        && px + pw > trail2[i].x
        && py < (trail2[i].y + ph)
        && py + ph > trail2[i].y
      )
      {
        //последствие
        tail = 10; // отрезаем хвост врагу
        speed = baseSpeed; // скидываем скорость
        score=0;// скидываем счёт

        for( var t = 0; t < trail.length; t++ )
        {
          // анимация уничтожение противника
          trail[t].color = 'red';

          if( t >= trail.length - tail )
            {break;}
        }
      }


      // уничтожение змейки противника 3
            if(
              px3 < (trail2[i].x + pw)
              && px3 + pw > trail2[i].x
              && py3 < (trail2[i].y + ph)
              && py3 + ph > trail2[i].y
            )
            {
              //последствие
              tail3 = 10; // отрезаем хвост врагу
              speed3 = baseSpeed; // скидываем скорость
              score3=0;// скидываем счёт

              for( var t = 0; t < trail3.length; t++ )
              {
                // анимация уничтожение противника
                trail3[t].color = 'red';

                if( t >= trail3.length - tail3 )
                  {break;}
              }
            }

            // уничтожение змейки противника 4
                  if(
                    px4 < (trail2[i].x + pw)
                    && px4 + pw > trail2[i].x
                    && py4 < (trail2[i].y + ph)
                    && py4 + ph > trail2[i].y
                  )
                  {
                    //последствие
                    tail4 = 10; // отрезаем хвост врагу
                    speed4 = baseSpeed; // скидываем скорость
                    score4=0;// скидываем счёт

                    for( var t = 0; t < trail4.length; t++ )
                    {
                      // анимация уничтожение противника
                      trail4[t].color = 'red';

                      if( t >= trail4.length - tail4 )
                        {break;}
                    }
                  }
    }

  }



//_________________________________________________________________________________
//змейка 3




  px3 += xv3;
  py3 += yv3;


  if( px3 > canv.width )
      {px3 = 0;}

  if( px3 + pw < 0 )
      {px3 = canv.width;}

  if( py3 + ph < 0 )
      {py3 = canv.height;}

  if( py3 > canv.height )
      {py3 = 0;}




  ctx.fillStyle = 'yellow';
  for( var i = 0; i < trail3.length; i++ )
  {
    ctx.fillStyle = trail3[i].color || 'yellow';
    ctx.fillRect(trail3[i].x, trail3[i].y, pw, ph);
  }

  trail3.push({x: px3, y: py3, color: ctx.fillStyle});



  // лимит 2
  if( trail3.length > tail3 )
  {
    trail3.shift();
  }

  // само поедание
  if( trail3.length > tail3 )
  {
    trail3.shift();
  }

  // до разрушение
  if( trail3.length >= tail3 && gs )
  {
    for( var i = trail3.length - tailSafeZone; i >= 0; i-- )
    {
      if(
        px3 < (trail3[i].x + pw)
        && px3 + pw > trail3[i].x
        && py3 < (trail3[i].y + ph)
        && py3 + ph > trail3[i].y
      )
      {
        // последствие самое поедание
        tail3 = 10; // отрезаем змейки хвост
        speed3 = baseSpeed; // скидываем скорость
        score3=0;// скидываем очки

        for( var t = 0; t < trail3.length; t++ )
        {
          // анимация разрушение
          trail3[t].color = 'red';

          if( t >= trail3.length - tail3 )
            {break;}
        }
      }
// уничтожение змейки противника 1
      if(
        px < (trail3[i].x + pw)
        && px + pw > trail3[i].x
        && py < (trail3[i].y + ph)
        && py + ph > trail3[i].y
      )
      {
        //последствие
        tail = 10; // отрезаем хвост врагу
        speed = baseSpeed; // скидываем скорость
        score=0;// скидываем счёт

        for( var t = 0; t < trail.length; t++ )
        {
          // анимация уничтожение противника
          trail[t].color = 'red';

          if( t >= trail.length - tail )
            {break;}
        }
      }


      // уничтожение змейки противника 2
            if(
              px2 < (trail3[i].x + pw)
              && px2 + pw > trail3[i].x
              && py2 < (trail3[i].y + ph)
              && py2 + ph > trail3[i].y
            )
            {
              //последствие
              tail2 = 10; // отрезаем хвост врагу
              speed2 = baseSpeed; // скидываем скорость
              score2=0;// скидываем счёт

              for( var t = 0; t < trail2.length; t++ )
              {
                // анимация уничтожение противника
                trail2[t].color = 'red';

                if( t >= trail2.length - tail2 )
                  {break;}
              }
            }
            // уничтожение змейки противника 4
                  if(
                    px4 < (trail3[i].x + pw)
                    && px4 + pw > trail3[i].x
                    && py4 < (trail3[i].y + ph)
                    && py4 + ph > trail3[i].y
                  )
                  {
                    //последствие
                    tail4 = 10; // отрезаем хвост врагу
                    speed4 = baseSpeed; // скидываем скорость
                    score4=0;// скидываем счёт

                    for( var t = 0; t < trail4.length; t++ )
                    {
                      // анимация уничтожение противника
                      trail4[t].color = 'red';

                      if( t >= trail4.length - tail4 )
                        {break;}
                    }
                  }
    }

  }


  //_________________________________________________________________________________
  //змейка 4




    px4 += xv4;
    py4 += yv4;


    if( px4 > canv.width )
        {px4 = 0;}

    if( px4 + pw < 0 )
        {px4 = canv.width;}

    if( py4 + ph < 0 )
        {py4 = canv.height;}

    if( py4 > canv.height )
        {py4 = 0;}




    ctx.fillStyle = '#a0f7ff';
    for( var i = 0; i < trail4.length; i++ )
    {
      ctx.fillStyle = trail4[i].color || '#a0f7ff';
      ctx.fillRect(trail4[i].x, trail4[i].y, pw, ph);
    }

    trail4.push({x: px4, y: py4, color: ctx.fillStyle});



    // лимит 4
    if( trail4.length > tail4 )
    {
      trail4.shift();
    }

    // само поедание
    if( trail4.length > tail4 )
    {
      trail4.shift();
    }

    // до разрушение
    if( trail4.length >= tail4 && gs )
    {
      for( var i = trail4.length - tailSafeZone; i >= 0; i-- )
      {
        if(
          px4 < (trail4[i].x + pw)
          && px4 + pw > trail4[i].x
          && py4 < (trail4[i].y + ph)
          && py4 + ph > trail4[i].y
        )
        {
          // последствие самое поедание
          tail4 = 10; // отрезаем змейки хвост
          speed4 = baseSpeed; // скидываем скорость
          score4=0;// скидываем очки

          for( var t = 0; t < trail4.length; t++ )
          {
            // анимация разрушение
            trail4[t].color = 'red';

            if( t >= trail4.length - tail4 )
              {break;}
          }
        }
  // уничтожение змейки противника
        if(
          px < (trail4[i].x + pw)
          && px + pw > trail4[i].x
          && py < (trail4[i].y + ph)
          && py + ph > trail4[i].y
        )
        {
          //последствие
          tail = 10; // отрезаем хвост врагу
          speed = baseSpeed; // скидываем скорость
          score=0;// скидываем счёт

          for( var t = 0; t < trail.length; t++ )
          {
            // анимация уничтожение противника
            trail[t].color = 'red';

            if( t >= trail.length - tail )
              {break;}
          }
        }


        // уничтожение змейки противника 3
              if(
                px2 < (trail4[i].x + pw)
                && px2 + pw > trail4[i].x
                && py2 < (trail4[i].y + ph)
                && py2 + ph > trail4[i].y
              )
              {
                //последствие
                tail2 = 10; // отрезаем хвост врагу
                speed2 = baseSpeed; // скидываем скорость
                score2=0;// скидываем счёт

                for( var t = 0; t < trail2.length; t++ )
                {
                  // анимация уничтожение противника
                  trail2[t].color = 'red';

                  if( t >= trail2.length - tail2 )
                    {break;}
                }
              }
    // уничтожение змейки противника 2
              if(
                px3 < (trail4[i].x + pw)
                && px3 + pw > trail4[i].x
                && py3 < (trail4[i].y + ph)
                && py3 + ph > trail4[i].y
              )
              {
                //последствие
                tail3 = 10; // отрезаем хвост врагу
                speed3 = baseSpeed; // скидываем скорость
                score3=0;// скидываем счёт

                for( var t = 0; t < trail3.length; t++ )
                {
                  // анимация уничтожение противника
                  trail3[t].color = 'red';

                  if( t >= trail3.length - tail3 )
                    {break;}
                }
              }
      }

    }





//_________________________________________________________________________________
// прорисовка яблок
  for( var a = 0; a < apples.length; a++ )
    {
      ctx.fillStyle = apples[a].color;
      ctx.fillRect(apples[a].x, apples[a].y, aw, ah);
    }

    // покушать яблоко
    for( var a = 0; a < apples.length; a++ )
    {
      if(
        px < (apples[a].x + pw)
        && px + pw > apples[a].x
        && py < (apples[a].y + ph)
        && py + ph > apples[a].y
      )
      {
        // последствие кушанье
        apples.splice(a, 1); // удаление яблоко из листа
        tail += 10; // добавляем длину 1 змейки
        speed += .1; // добавляем скорость 1 змейки
        spawnApple(); // генерация нового яблоко
        break;
      }
    }

    // покушать яблоко 2
    for( var a = 0; a < apples.length; a++ )
    {
      if(
        px2 < (apples[a].x + pw)
        && px2 + pw > apples[a].x
        && py2 < (apples[a].y + ph)
        && py2 + ph > apples[a].y
      )
      {
        // последствие кушанье
        apples.splice(a, 1); // удаление яблоко из листа
        tail2 += 10; // добавляем длину 2 змейки
        speed2+= .1; // добавляем скорость 2 змейки
        spawnApple(); // генерация нового яблоко
        break;
      }
    }



    // покушать яблоко 3
    for( var a = 0; a < apples.length; a++ )
    {
      if(
        px3 < (apples[a].x + pw)
        && px3 + pw > apples[a].x
        && py3 < (apples[a].y + ph)
        && py3 + ph > apples[a].y
      )
      {
        // последствие кушанье
        apples.splice(a, 1); // удаление яблоко из листа
        tail3 += 10; // добавляем длину 2 змейки
        speed3+= .1; // добавляем скорость 2 змейки
        spawnApple(); // генерация нового яблоко
        break;
      }
    }



    // покушать яблоко 4
    for( var a = 0; a < apples.length; a++ )
    {
      if(
        px4 < (apples[a].x + pw)
        && px4 + pw > apples[a].x
        && py4 < (apples[a].y + ph)
        && py4 + ph > apples[a].y
      )
      {
        // последствие кушанье
        apples.splice(a, 1); // удаление яблоко из листа
        tail4 += 10; // добавляем длину 2 змейки
        speed4+= .1; // добавляем скорость 2 змейки
        spawnApple(); // генерация нового яблоко
        break;
      }
    }

  }








//_________________________________________________________________________________


// генерация яблок
function spawnApple()
{
  var
    newApple = {
      x: ~~(Math.random() * canv.width),
      y: ~~(Math.random() * canv.height),
      color: rc(),
    };

  // генерация яблок в поле
  if(
    (newApple.x < aw || newApple.x > canv.width - aw)
    ||
    (newApple.y < ah || newApple.y > canv.height - ah)
  )
  {
    spawnApple();
    return;
  }


  // проверка на генерацию не в голове змейки
  for( var i = 0; i < tail.length; i++ )
  {
    if(
      newApple.x < (trail[i].x + pw)
      && newApple.x + aw > trail[i].x
      && newApple.y < (trail[i].y + ph)
      && newApple.y + ah > trail[i].y
    )
    {

      spawnApple();
      return;
    }
  }

//для 2 игрока
  for( var i = 0; i < tail2.length; i++ )
  {
    if(
      newApple.x < (trail2[i].x + pw)
      && newApple.x + aw > trail2[i].x
      && newApple.y < (trail2[i].y + ph)
      && newApple.y + ah > trail2[i].y
    )
    {
      spawnApple();
      return;
    }
  }


  //для 3 игрока
    for( var i = 0; i < tail3.length; i++ )
    {
      if(
        newApple.x < (trail3[i].x + pw)
        && newApple.x + aw > trail3[i].x
        && newApple.y < (trail3[i].y + ph)
        && newApple.y + ah > trail3[i].y
      )
      {
        spawnApple();
        return;
      }
    }

    //для 4 игрока
      for( var i = 0; i < tail4.length; i++ )
      {
        if(
          newApple.x < (trail4[i].x + pw)
          && newApple.x + aw > trail4[i].x
          && newApple.y < (trail4[i].y + ph)
          && newApple.y + ah > trail4[i].y
        )
        {
          spawnApple();
          return;
        }
      }

  apples.push(newApple);

  if( apples.length < 10 && ~~(Math.random() * 1000) > 500 )
  {
    // 50% процентный шанс генерацию доп яблок
    spawnApple();
  }
}



//_________________________________________________________________________________

// режим mix color
function rc()
{
  return '#' + ((~~(Math.random() * 255)).toString(16)) + ((~~(Math.random() * 255)).toString(16)) + ((~~(Math.random() * 255)).toString(16));
}





//_________________________________________________________________________________

// управление
function changeDirection(evt)
{
  if( !fkp && [37,38,39,40,    65, 68, 83, 87,    71, 72, 74, 89,    76, 80, 186, 222].indexOf(evt.keyCode) > -1 )
  {
    setTimeout(function() {gs = true;}, 1000);
    fkp = true;
    spawnApple();
  }


  /*
   движение в 4 стороны
   */

// 1 игрок
  if( evt.keyCode == 37 && !(xv > 0) ) // ← влево
    {xv = -speed; yv = 0;}

  if( evt.keyCode == 38 && !(yv > 0) ) // ↑ вверх
    {xv = 0; yv = -speed;}

  if( evt.keyCode == 39 && !(xv < 0) ) // → вправо
    {xv = speed; yv = 0;}

  if( evt.keyCode == 40 && !(yv < 0) ) // ↓ вниз
    {xv = 0; yv = speed;}

    cooldown = true;
    setTimeout(function() {cooldown = false;}, 500);

//____________________________________________________________________
// 2 игрок

    if( evt.keyCode == 65 && !(xv2 > 0) ) // А влево
        {xv2 = -speed; yv2 = 0;}

    if( evt.keyCode == 87 && !(yv2 > 0) ) // W вверх
        {xv2 = 0; yv2 = -speed;}

    if( evt.keyCode == 68 && !(xv2 < 0) ) // D вправо
        {xv2 = speed; yv2 = 0;}

    if( evt.keyCode == 83 && !(yv2 < 0) ) // S вниз
        {xv2 = 0; yv2 = speed;}


  cooldown = true;
  setTimeout(function() {cooldown = false;}, 500);

//____________________________________________________________________
// 3 игрок

if( evt.keyCode == 71 && !(xv3 > 0) ) // G влево
    {xv3 = -speed; yv3 = 0;}

if( evt.keyCode == 89 && !(yv3 > 0) ) // Y вверх
    {xv3 = 0; yv3 = -speed;}

if( evt.keyCode == 74 && !(xv3 < 0) ) // J вправо
    {xv3 = speed; yv3 = 0;}

if( evt.keyCode == 72 && !(yv3 < 0) ) // H вниз
    {xv3 = 0; yv3 = speed;}


cooldown = true;
setTimeout(function() {cooldown = false;}, 500);


//____________________________________________________________________
// 4 игрок

if( evt.keyCode == 76 && !(xv4 > 0) ) // L влево
    {xv4 = -speed; yv4 = 0;}

if( evt.keyCode == 80 && !(yv4 > 0) ) // P вверх
    {xv4 = 0; yv4 = -speed;}

if( evt.keyCode == 222 && !(xv4 < 0) ) // " вправо
    {xv4 = speed; yv4 = 0;}

if( evt.keyCode == 186 && !(yv4 < 0) ) // ; вниз
    {xv4 = 0; yv4 = speed;}


cooldown = true;
setTimeout(function() {cooldown = false;}, 500);

}
