<?php
  require_once "../models/connection.php";
  header('Content-type: application/json');
  header("Access-Control-Allow-Headers: *");
  header('Access-Control-Allow-Origin: *');
  $_POST = json_decode(file_get_contents("php://input"), true);
  $values = [
    "id" => uniqid("", true),
    "username" => $_POST["username"],
    "password" => hash(
      'sha256',
      $_POST["password"]
    ),
    "role" => 0,
  ];

  $conn = Connection::getConnection();
  $sql = "INSERT INTO users (id, username, password, role) VALUES (:id ,:username, :password, :role)";
  $stmt = $conn->prepare($sql);
  $stmt->execute($values);
?>