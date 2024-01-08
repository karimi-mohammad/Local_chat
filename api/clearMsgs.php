<?php
require_once("./configs/databseConn.php");
try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $requestData = json_decode(file_get_contents("php://input"), true);
        if (
            isset($requestData["userName"]) &&
            isset($requestData["password"]) &&
            $requestData["userName"] === $adminUserName &&
            $requestData["password"] === $adminPassword
        ) {
            $sql = "TRUNCATE TABLE tbl_msgs";
            $conn->exec($sql);
            $response = array("success" => true);
            echo json_encode($response);
            http_response_code(200);
        } else {
            $response = array("success" => false, "error" => "Invalid username or password");
            echo json_encode($response);
            http_response_code(401);
        }
    } else {
        $response = array("success" => false, "error" => "Invalid request method");
        echo json_encode($response);
        http_response_code(405);
    }
} catch (\Throwable $th) {
    echo "Error: Database Connection =>" . $th->getMessage();
}
