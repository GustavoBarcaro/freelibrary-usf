<?php 

class Connection {
  public static function getConnection () {
    $username = "root";
    return new PDO('mysql:host=localhost;dbname=freelibrary', $username);
  }
}


?>