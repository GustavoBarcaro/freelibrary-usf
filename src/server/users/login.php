<?php
  require_once "../models/connection.php";
  header('Content-type: application/json');
  header("Access-Control-Allow-Headers: *");
  header('Access-Control-Allow-Origin: *');
  $_POST = json_decode(file_get_contents("php://input"), true);
  $conn = Connection::getConnection();
  $sql = "SELECT * FROM users WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->execute([$_POST["username"]]);
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  if ($result == false || $result["password"] != hash('sha256',$_POST["password"]) ){
    echo json_encode(["status" => 401, "message" => "Invalid password or email"]);
  } else {
    $token = bin2hex(openssl_random_pseudo_bytes(8));
    $result["token"] = $token;
    $result["password"] = "";
    echo json_encode(["status" => 200, "user" => $result]);
  }
?>