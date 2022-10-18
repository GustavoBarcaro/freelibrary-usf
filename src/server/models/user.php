<?php
  class User {
    private $username;
    private $password;
    private $role;

    public function __construct($values) {
      $this->username = $values['username'];
      $this->password = $values['password'];
      $this->role = $values['role'];
    }

    public function getUsername () {
      return $this->username;
    }
    public function getPassword () {
      return $this->password;
    }
    public function getRole() {
      return $this->role;
    }
    public function validatePassword($password) {
      return $this->password === hash('sha256', $password);
    }
  }
?>