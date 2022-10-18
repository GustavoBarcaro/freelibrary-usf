<?php
  require_once "./models/connection.php";
  header('Content-type: application/json');
  header("Access-Control-Allow-Headers: *");
  header('Access-Control-Allow-Origin: *');
  $_POST = json_decode(file_get_contents("php://input"), true);
  $values = [
    "approved" => $_POST["approved"],
    "id" => $_POST["id"],
  ];
  $conn = Connection::getConnection();
  $sql = "UPDATE books SET approved = :approved WHERE id = :id";
  $stmt = $conn->prepare($sql);
  $stmt->execute($values);
  echo json_encode(["status" => "200", "message" => "Book status updated"]);
?>
