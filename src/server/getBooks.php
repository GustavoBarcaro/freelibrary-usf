<?php
  require_once "./models/connection.php";
  header('Content-type: application/json');
  header("Access-Control-Allow-Headers: *");
  header('Access-Control-Allow-Origin: *');
  $conn = Connection::getConnection();
  $stmt = $conn->query("SELECT * from books");
  $data = $stmt->fetchAll();
  echo json_encode($data);
?>