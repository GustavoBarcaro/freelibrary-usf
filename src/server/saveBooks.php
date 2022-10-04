<?php

  header('Content-type: multipart/form-data');
  header("Access-Control-Allow-Headers: *");
  header('Access-Control-Allow-Origin: *');
  $username = "root";
  $values = [
    "name" => $_POST["name"],
    "filename" => uniqid("", true).$_FILES["book"]["name"],
  ];
  $conn = new PDO('mysql:host=localhost;dbname=freelibrary', $username);
  $sql = "INSERT INTO books (name, filename) VALUES (:name, :filename)";
  $stmt = $conn->prepare($sql);
  $stmt->execute($values);
  $tmp_name = $_FILES['book']['tmp_name'];
  move_uploaded_file($tmp_name,  "../books/".$values["filename"]);
  echo json_encode($values);
?>