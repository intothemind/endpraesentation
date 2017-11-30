<?php
session_start();

 ?>
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8">
     <meta name="theme-color" content="#212121">
     <meta author="Allan Bachmann IT-Dienstleistungen">
     <!-- Meta Data for Apple Devices -->
     <meta name="mobile-web-app-capable" content="yes">
     <meta name="apple-mobile-web-app-capable" content="yes">
     <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
     <link rel="apple-touch-icon" href="/AppleTouchIcon.png">
     <!-- Title -->
     <title>Deflection Visualizer</title>
     <!-- Material Design -->
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
     <!-- Optimize for Mobile Devices -->
     <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
     <!-- Main CSS -->
     <link rel="stylesheet" href="./css/main.css">
     <!-- JSON Manifest -->
     <link rel="manifest" href="manifest.json">
   </head>
   <body>
     <!-- Header Container -->
     <header>
       <nav class="nav-wrapper">
         <div class="container">
           <a href="welcome.php" class="brand-logo center">Deflection<span>Visualizer</span></a>
         </div>
       </nav>
     </header>

     <main class="valign-wrapper">
       <div class="container center">
         <div id="welcome" class="white-text">
           <div id="welcomeTxt">
             <h3>Herzlich willkommen</h3>
           </div>
           <!-- Buttons -->
           <div class="button-wrapper">
             <a id="startAuswahl" class="waves-effect waves-light btn cyan pulse">Ski auswählen</a>
           </div>
           <ul id="auswahl" class="collection center">
             <li class="collection-item center"><a href="./index.php?ski=laisa">Laisa</a></li>
             <li class="collection-item center"><a href="./index.php?ski=onza">Onza</a></li>
             <li class="collection-item center"><a href="./index.php?ski=franco">Franco</a></li>
           </ul>
         </div>
       </div>
     </main>

     <!-- Footer -->
     <footer>
         <div class="container">
           <div class="left">
             <small><a id="ajaybachmann" href="https://ajaybachmann.ch" target="_blank">&copy; 2017 Allan Bachmann IT-Dienstleistungen</a></small>
           </div>
           <div class="right">
             <small><a id="zai" href="http://www.zai.ch" target="_blank">Zai AG</a> | <a id="zai" href="http://www.htwchur.ch" target="_blank">HTW Chur</a></small>
           </div>
         </div>
     </footer>
     <!-- Core Javascript p5 -->

     <!-- Core Material Design Javascript + Dependencies -->
     <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>

     <!-- Main Javascript -->
     <script type="text/javascript">

      // Variablen speichern
      const auswahl = document.querySelector('#auswahl');
      const startAuswahl = document.querySelector('#startAuswahl');
      const welcomeTxt = document.querySelector('#welcomeTxt');
      const animations = document.getAnimations();

      // Init
      auswahl.style.display = 'none';

      // EventListener
       startAuswahl.addEventListener('click', function() {
         auswahl.style.display = 'block';
         startAuswahl.style.display = 'none';
         welcomeTxt.style.display = 'none';
         achievement();
      });

      // Welcome Toast
      function achievement() {
        // Materialize.toast(message, displayLength, className, completeCallback);
        Materialize.toast('Zai is proud of you!', 4000);
      }

      // MoveDown [Herzlich willkommen]
      welcomeTxt.animate([
      	{ transform: 'translate(0, 0)', opacity: 0 },
      	{ transform: 'translate(0, 20px)' },
      ], {
      	duration: 4000,
        fill: 'forwards',
        direction: 'alternate',
        easing: 'ease-in-out'
      });

      // MoveUp [Ski auswählen]
      startAuswahl.animate([
      	{ transform: 'translate(0, 20px)', opacity: 0 },
      	{ transform: 'translate(0, 0)' },
      ], {
      	duration: 2000,
        fill: 'forwards',
        direction: 'alternate',
        easing: 'ease-in-out'
      });

     </script>
   </body>
 </html>
