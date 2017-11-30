<?php
// Session Start
session_start();

// GET-Variable zuweisen
if(isset($_GET['ski'])) {
  $ski = $_GET['ski'];
}

// Redirect wenn kein Ski ausgewählt wurde.
if(!isset($_SESSION['ski'])) {
  header("Location: ./welcome.php");
}

// Switch
switch ($ski) {
    case "laisa":
        $_SESSION['ski'] = './img/laisa.png';
        break;
    case "spada":
        $_SESSION['ski'] = './img/spada.png';
        break;
    default:
        header("Location: ./welcome.php");
}

 ?>
<!DOCTYPE html>
<html lang="de">
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
          <a href="welcome.php" class="brand-logo left">Deflection<span>Visualizer</span></a>
          <!-- <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a> -->
          <ul id="nav-mobile" class="right hide-on-small-only">
            <li><a href="./index.php?ski=laisa">Laisa</a></li>
            <li><a href="./index.php?ski=onza">Onza</a></li>
            <li><a href="./index.php?ski=franco">Franco</a></li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- Main Container -->
    <main class="container">
      <div class="row">
        <div class="col s8 offset-s2">
          <!-- Ski -->
          <div id="ski">
            <img src="<?php echo $_SESSION['ski']; ?>" alt="" class="responsive-img">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s2">
          <img src="./img/skalaLinks.png" alt="" class="responsive-img">
        </div>
        <div class="col s8">
          <!-- p5-Container -->
          <div id="slider"></div>
          <div id="p5"></div>
        </div>
        <div class="col s2">
          <img src="./img/skalaRechts.png" alt="" class="responsive-img">
        </div>
      </div>
    </main>

    <!-- FAB to Toolbar -->
    <div class="fixed-action-btn toolbar">
      <a class="btn-floating btn-large cyan scale-transition">
        <i class="large material-icons">help_outline</i>
      </a>
      <ul>
        <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">insert_chart</i></a></li>
        <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">format_quote</i></a></li>
        <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">publish</i></a></li>
        <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">attach_file</i></a></li>
      </ul>
    </div>


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
    <script language="javascript" type="text/javascript" src="./lib/p5.js"></script>
    <script language="javascript" type="text/javascript" src="./lib/musedata.min.js"></script>
    <script language="javascript" type="text/javascript" src="./lib/p5.dom.js"></script>
    <script language="javascript" type="text/javascript" src="./sketch.js"></script>

    <!-- Core Material Design Javascript + Dependencies -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>

    <script type="text/javascript">
    // Materialize.toast(message, displayLength, className, completeCallback);
    Materialize.toast('Try to relax and visualize the deflection', 4000, 'toast');
    </script>


  </body>
</html>
