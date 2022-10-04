<?php

  header('Content-type: application/json');
  header("Access-Control-Allow-Headers: *");
  header('Access-Control-Allow-Origin: *');
  $username = "root";
  $conn = new PDO('mysql:host=localhost;dbname=freelibrary', $username);  
  $stmt = $conn->query("SELECT * from books");
  $data = $stmt->fetchAll();
  echo json_encode($data);
?>