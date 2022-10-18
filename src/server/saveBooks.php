<?php
  require_once "./models/connection.php";
  header('Content-type: multipart/form-data');
  header("Access-Control-Allow-Headers: *");
  header('Access-Control-Allow-Origin: *');
  $values = [
    "name" => $_POST["name"],
    "filename" => uniqid("", true).$_FILES["book"]["name"],
    "approved" => 0,
  ];
  $conn = Connection::getConnection();
  $sql = "INSERT INTO books (name, filename, approved) VALUES (:name, :filename, :approved)";
  $stmt = $conn->prepare($sql);
  $stmt->execute($values);
  $tmp_name = $_FILES['book']['tmp_name'];
  move_uploaded_file($tmp_name,  "../books/".$values["filename"]);
  echo json_encode($values);
?>